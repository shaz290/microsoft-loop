import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import Tooltip from 'editorjs-tooltip';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';


function RichDocumentEditor({ params }) {

    const ref = useRef();
    let editor;

    const [documentOutput, setDocumentOutput] = useState();
    const { user } = useUser();
    let isFetch = false;

    useEffect(() => {
        user && InitEditor();
    }, [user])

    // useEffect(() => {
    //     params && GetDocumentOutput();
    // }, [params])

    // Used to save document

    const SaveDocument = () => {
        ref.current.save().then(async (outputData) => {
            const docRef = doc(db, 'DocumentOutput', params?.documentid)

            await updateDoc(docRef, {
                output: outputData,
                editedBy: user?.primaryEmailAddress?.emailAddress
            })
        })
    }



    const GetDocumentOutput = () => {
        const docRef = doc(db, 'DocumentOutput', params?.documentid);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (isFetch == false || doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress)

                // console.log(doc.data())
                // setDocumentOutput(doc.data()?.output);
                doc.data()?.output && editor.render(doc.data()?.output)

            isFetch = true;
        });
    }



    const InitEditor = () => {
        if (!editor?.current) {
            editor = new EditorJS({

                onChange: (ap, event) => {
                    SaveDocument();
                },

                onReady: () => {
                    GetDocumentOutput();
                },
                /**
                 * Id of Element that should contain Editor instance
                 */
                holder: 'editorjs',
                tools: {
                    header: Header,
                    delimiter: Delimiter,
                    alert: {
                        class: Alert,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+A',
                        config: {
                            alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                            defaultType: 'primary',
                            messagePlaceholder: 'Enter something',
                        },
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        }
                    },
                    // table: Table,
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
                        }
                    },
                    quote: Quote,
                    // warning: Warning,

                },
            });
            ref.current = editor;
        }
    }
    return (
        <div className='lg:mml-40'>
            <div id='editorjs'>

            </div>
        </div>
    )
}

export default RichDocumentEditor