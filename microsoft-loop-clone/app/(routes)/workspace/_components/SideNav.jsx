"use client"
import { Logo } from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from "@/config/firebaseConfig"
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { Bell, LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const SideNav = ({ params }) => {
    const [documentList, setDocumentList] = useState([]);
    const router = useRouter();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (params) {
            GetDocumentList();
        }
    }, [params]);

    // Fetch Document List
    const GetDocumentList = () => {
        const q = query(collection(db, 'workspaceDocuments'),
            where('workspaceId', '==', Number(params?.workspaceid)));
        setDocumentList([]);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data());
            });
            setDocumentList(documents);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    };

    // Create New Document
    const CreateNewDocument = async () => {
        setLoading(true);

        const docId = uuid4();
        await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
            workspaceId: Number(params?.workspaceid),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emoji: null,
            id: docId,
            documentName: 'Untitled Document',
            documentOutput: []
        });

        setLoading(false);
        router.replace('/workspace/' + params?.workspaceid + "/" + docId);
    };

    return (
        <div className='h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md'>
            <div className='flex justify-between items-center'>
                <Logo />
                <Bell className='h-5 w-5 text-gray-400' />
            </div>
            <hr className='my-5'></hr>
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className='font-medium'>Workspace Name</h2>
                    <Button size='sm' onClick={CreateNewDocument}>
                        {loading ? <LoaderCircle className='h-4 w-4 animate-spin' /> : '+'}
                    </Button>
                </div>
            </div>
            {/* DocumentList */}
            <DocumentList documentList={documentList} params={params} />
        </div>
    );
};

export default SideNav;
