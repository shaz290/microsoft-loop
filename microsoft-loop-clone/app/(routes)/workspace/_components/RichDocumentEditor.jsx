import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import Tooltip from 'editorjs-tooltip';
import Quote from '@editorjs/quote';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const { user } = useUser();
    const isFetchRef = useRef(false);

    useEffect(() => {
        if (user && !editor) {
            InitEditor();
        }
    }, [user, editor]);

    const SaveDocument = async () => {
        if (!editorRef.current) return;
        const outputData = await editorRef.current.save();
        const docRef = doc(db, 'DocumentOutput', params?.documentid);

        await updateDoc(docRef, {
            output: JSON.stringify(outputData),
            editedBy: user?.primaryEmailAddress?.emailAddress,
        });
    };

    const GetDocumentOutput = () => {
        const docRef = doc(db, 'DocumentOutput', params?.documentid);
        onSnapshot(docRef, (doc) => {
            if (!isFetchRef.current || doc.data()?.editedBy !== user?.primaryEmailAddress?.emailAddress) {
                if (doc.data()?.output) {
                    editorRef.current?.render(JSON.parse(doc.data()?.output));
                }
                isFetchRef.current = true;
            }
        });
    };

    const InitEditor = () => {
        if (editorRef.current) return;

        const editorInstance = new EditorJS({
            onChange: SaveDocument,
            onReady: GetDocumentOutput,
            holder: 'editorjs',
            tools: {
                header: Header,
                delimiter: Delimiter,
                alert: {
                    class: Alert,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+A',
                    config: {
                        alertTypes: [
                            'primary',
                            'secondary',
                            'info',
                            'success',
                            'warning',
                            'danger',
                            'light',
                            'dark',
                        ],
                        defaultType: 'primary',
                        messagePlaceholder: 'Enter something',
                    },
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered',
                    },
                },
                table: Table,
                code: CodeTool,
                tooltip: {
                    class: Tooltip,
                    config: {
                        location: 'left',
                        underline: true,
                        placeholder: 'Enter a tooltip',
                        highlightColor: '#FFEFD5',
                        backgroundColor: '#154360',
                        textColor: '#FDFEFE',
                        holder: 'editorId',
                    },
                },
                quote: Quote,
            },
        });

        editorRef.current = editorInstance;
        setEditor(editorInstance);
    };

    return (
        <div>
            <div id="editorjs" className="w-[70%]"></div>
            <div className="fixed bottom-10 sm:ml-20 md:ml-80 left-0 z-10">
                <GenerateAITemplate setGenerateAIOutput={(output) => editor?.render(output)} />
            </div>
        </div>
    );
}

export default RichDocumentEditor;
