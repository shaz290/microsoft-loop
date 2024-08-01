import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'

const DocumentEditorSection = ({ params }) => {
    return (
        <div>
            {/* Header */}
            <DocumentHeader />

            <DocumentInfo params={params} />
            {/* Text Editor */}

            <RichDocumentEditor params={params} />

        </div>
    )
}

export default DocumentEditorSection