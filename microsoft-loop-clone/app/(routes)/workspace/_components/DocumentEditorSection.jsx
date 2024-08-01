import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'

const DocumentEditorSection = ({ params }) => {
    return (
        <div>
            {/* Header */}
            <DocumentHeader />

            <DocumentInfo params={params} />
            {/* Text Editor */}


        </div>
    )
}

export default DocumentEditorSection