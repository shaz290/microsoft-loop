"use client"

import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@clerk/nextjs'
import { AlignLeft, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import WorkspaceItemList from './WorkspaceItemList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { TailSpin } from 'react-loader-spinner';

const WorkSpaceList = () => {

    const { user } = useUser();
    const { orgId } = useAuth();

    const [workspaceList, setWorkspaceList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && getWorkspaceList();
    }, [orgId, user]);

    const getWorkspaceList = async () => {
        setLoading(true);
        setWorkspaceList([]);
        const q = query(collection(db, 'Workspace'), where('orgId', '==', orgId ? orgId : user?.primaryEmailAddress.emailAddress));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            console.log(doc.data());
            setWorkspaceList(prev => [...prev, doc.data()]);
        });
        setLoading(false);
    }

    return (
        <div className='relative my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
            {loading && (
                <>
                    <div className='absolute inset-0 bg-white opacity-50 z-10'></div>
                    <div className='absolute inset-0 flex justify-center items-center z-20'>
                        <TailSpin
                            height="80"
                            width="80"
                            color="skyblue"
                            ariaLabel="loading"
                        />
                    </div>
                </>
            )}
            {!loading && (
                <div>
                    <div className='flex justify-between'>
                        <h2
                            className='font-bold text-2xl'
                            style={{
                                color: 'skyblue',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                fontFamily: "'Brush Script MT', cursive",
                                letterSpacing: '1px',
                                lineHeight: '1.5'
                            }}
                        >
                            Hello, {user?.fullName}
                        </h2>
                        <Link href={'/createworkspace'}>
                            <Button>+</Button>
                        </Link>
                    </div>
                    <div className='mt-10 flex justify-between'>
                        <div>
                            <h2 className='font-medium text-primary'>
                                Workspaces
                            </h2>
                        </div>
                        <div className='flex gap-2'>
                            <LayoutGrid />
                            <AlignLeft />
                        </div>
                    </div>

                    {workspaceList?.length === 0 ? (
                        <div className='flex flex-col justify-center items-center my-10'>
                            <Image src={'/createfile.png'} width={200} height={200} alt='workspace' />
                            <h2>Create a new workspace</h2>
                            <Link href={'/createworkspace'}>
                                <Button className='my-3'>+ New Workspace</Button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <WorkspaceItemList workspaceList={workspaceList} refreshWorkspaceList={getWorkspaceList} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default WorkSpaceList;
