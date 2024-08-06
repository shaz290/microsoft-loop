"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Trash } from 'lucide-react';
import { toast } from 'sonner'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'

const WorkspaceItemList = ({ workspaceList, refreshWorkspaceList }) => {
    const router = useRouter();

    const OnClickWorkspaceItem = (workspaceId) => {
        router.push('/workspace/' + workspaceId)
    }

    const onDeleteClick = async (workspaceId, event) => {
        event.stopPropagation();
        console.log(`Delete clicked for workspace ID: ${workspaceId}`);
        await DeleteDocument(workspaceId);
        refreshWorkspaceList(); // Refresh the workspace list after deletion
    }

    const DeleteDocument = async (docId) => {
        try {
            if (!docId) {
                throw new Error("Document ID is invalid");
            }

            const docIdStr = String(docId);

            console.log("Attempting to delete document with ID: ", docIdStr);

            const docRef = doc(db, "Workspace", docIdStr);
            console.log("Document Reference: ", docRef);

            await deleteDoc(docRef);

            toast.success('Workspace Deleted!');
        } catch (error) {
            console.error("Error deleting document: ", error.message);
            toast.error(`Failed to delete workspace. Error: ${error.message}`);
        }
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6'>
            {workspaceList && workspaceList.map((workspace, index) => (
                <div key={index} className='border shadow-xl rounded-xl hover:scale-105 transition-all cursor-pointer'
                    onClick={() => OnClickWorkspaceItem(workspace.id)}
                >
                    <Image src={workspace?.coverImage} width={400} height={200} alt="cover"
                        className='h-[140px] object-cover rounded-t-xl' />

                    <div className='p-4 mt-auto flex justify-start'>
                        <h2 className='flex gap-2'>{workspace?.emoji}{workspace?.workspaceName}</h2>
                    </div>

                    <div className='p-4 mt-auto flex justify-end'>
                        <button className='rounded text-red-500 hover:scale-110 transition-transform' onClick={(event) => onDeleteClick(workspace.id, event)}>
                            <Trash className='w-5 h-5' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WorkspaceItemList;
