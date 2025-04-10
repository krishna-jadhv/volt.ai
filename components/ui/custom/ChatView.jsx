"use client"

import { MessagesContext } from '@/context/MessagesContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

function ChatView() {
    const { id } = useParams();
    const convex = useConvex();
    // const {userDetails}
    const { messages, setMessages } = useContext(MessagesContext);

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
        <div>
            <div>
                {messages?.map((msg, index) => {
                    return (
                        <div key={index} 
                        className='p-3 rounded-lg mb-2'
                        style={{
                            backgroundColor:Colors.CHAT_BACKGROUND
                        }}>
                            <h2>{msg.content}</h2>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default ChatView