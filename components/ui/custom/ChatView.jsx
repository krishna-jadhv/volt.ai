"use client"

import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { ArrowRight, Link } from 'lucide-react';
import Lookup from '@/data/Lookup';


function ChatView() {
    const { id } = useParams();
    const convex = useConvex();
    const { userDetails, setUserDetails } = useContext(UserDetailsContext)
    const { messages, setMessages } = useContext(MessagesContext);
    const {userInput, setUserInput} = useState();

    useEffect(() => {
        GetWorkspaceData();
    }, [id])

    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspaceData, {
            workspaceId: id
        });
        setMessages(result?.messages);
        console.log(result);
    }
    return (
        
        <div className='relative h-[85vh] flex flex-col'> 
            <div className='flex-1 overflow-y-scroll '>
                {messages?.map((msg, index) => {
                    return (
                        <div key={index}
                            className='p-3 rounded-lg mb-2 flex gap-2 items-start'
                            style={{
                                backgroundColor: Colors.CHAT_BACKGROUND
                            }}>
                            {msg?.role == 'user' &&

                                <Image 
                                src={userDetails?.picture} 
                                    alt='userImage'
                                    width={35} 
                                    height={35} 
                                    className='rounded-full'
                                />}

                            <h2>{msg.content}</h2>
                        </div>
                    );
                })}

            </div>

            {/* input section */}

            <div className='p-5 border rounded-xl max-w-xl w-full mt-3 '
                    style={{
                      backgroundColor: Colors.BACKGROUND
                    }}
                  >
                    <div className='flex gap-2'>
                      <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
                        onChange={(event) => setUserInput(event.target.value)}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none' />
                      {userInput &&
                        <ArrowRight
                          onClick={() => OnGenerate(userInput)}
                          className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />}
                    </div>
                    <div>
                      <Link className='h-5 w-5' />
                    </div>
                  </div>
        </div>
    )
}

export default ChatView