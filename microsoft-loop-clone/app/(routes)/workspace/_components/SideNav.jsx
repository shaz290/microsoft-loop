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
import { Progress } from "@/components/ui/progress"
import { toast } from 'sonner'
import NotificationBox from './NotificationBox'

const MAX_FILE = 5;

const SideNav = ({ params }) => {
    const [documentList, setDocumentList] = useState([]);
    const router = useRouter();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [documentCount, setDocumentCount] = useState(0);

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
                documents.push({ id: doc.id, ...doc.data() });
            });
            setDocumentList(documents);
            setDocumentCount(querySnapshot.size);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    };

    // Create New Document
    const CreateNewDocument = async () => {
        if (documentList?.length >= MAX_FILE) {
            toast("Upgrade to add new file.", {
                description: "You reach max file, Please upgrade for unlimited file creation",
                action: {
                    label: "Upgrade",
                    onClick: () => console.log("Undo"),
                },
            })
            return;
        }

        setLoading(true); // Start loading state

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

        await setDoc(doc(db, 'DocumentOutput', docId.toString()), {
            docId: docId,
            Output: []
        });

        await router.replace('/workspace/' + params?.workspaceid + "/" + docId);

    };

    return (
        <div className='h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md'>
            <div className='flex justify-between items-center'>
                <Logo />
                {/* <NotificationBox>
                    <Bell className='h-5 w-5 text-gray-400' />
                </NotificationBox> */}
            </div>
            <hr className='my-5' />
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
            {/* ProgressBar */}
            <div className='absolute bottom-10 w-[85%]'>
                <Progress value={(documentList?.length / MAX_FILE) * 100} />
                <h2 className='text-sm font-light my-2'><strong>{documentList?.length}</strong> Out of <strong>{MAX_FILE}</strong> files used</h2>
                <h2 className='text-sm font-light '>Upgrade your plan for unlimited access</h2>
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
                    <LoaderCircle className='h-10 w-10 animate-spin text-white' />
                </div>
            )}
        </div>
    );
};

export default SideNav;
