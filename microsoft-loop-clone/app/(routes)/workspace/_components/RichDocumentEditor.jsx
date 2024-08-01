import React, { useEffect, useRef } from 'react'
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


function RichDocumentEditor() {

    const ref = useRef();
    let editor;


    useEffect(() => {
        InitEditor();
    }, [])

    // Used to save document

    const SaveDocument = () => {
        ref.current.save().then((outputData) => {
            console.log(outputData)
        })
    }


    const InitEditor = () => {
        if (!editor?.current) {
            editor = new EditorJS({

                onChange: (ap, event) => {
                    SaveDocument();
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
                        }
                    },
                    quote: Quote,
                    // warning: Warning,

                }
            });
            ref.current = editor;
        }
    }
    return (
        <div className='ml-0'>
            <div id='editorjs'>

            </div>
        </div>
    )
}

export default RichDocumentEditor