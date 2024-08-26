import React, { useState } from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CommentBox from './CommentBox'

const DocumentEditorSection = ({ params }) => {

    const [openComment, setOpneComment] = useState(false);
    return (
        <div>
            {/* Header */}
            <DocumentHeader />

            <DocumentInfo params={params} />
            {/* Text Editor */}
            <div className='grid grid-cols-4'>
                <div className='col-span-4'>
                    <RichDocumentEditor params={params} />
                </div>
                <div className='fixed right-5 bottom-5 '>
                    <Button onClick={() => setOpneComment(!openComment)}>
                        {openComment ? <X /> : <MessageCircle />}
                    </Button>
                    {openComment && <CommentBox />}
                </div>
            </div>

        </div>
    )
}

export default DocumentEditorSection