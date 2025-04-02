"use client"
import Lookup from '@/data/Lookup'
import { ArrowRight } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'lucide-react';
import Colors from '@/data/Colors';
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailsContext } from '@/context/UserDetailsContext';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';


function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace=useMutation(api.workspace.CreateWorkspace)
  const router= useRouter()


  const OnGenerate = async (input) => {
    if (!userDetails?.name) {
      setOpenDialog(true);
      return;
    }

    const msg={
      role: 'user',
      content: input
    }

    setMessages(msg);

    const workspaceId= await CreateWorkspace({
      user:userDetails._id,
      messages:[msg]
    });
    console.log(workspaceId);
    router.push(`/main/workspace/${workspaceId}`);
  }


  return (
    <div className='flex flex-col items-center mt-36 xl:mt-42 gap-2'>
      <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
      <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>

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
      <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3 cursor-pointer'>
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2 key={index}
            onClick={() => OnGenerate(suggestion)}
            className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white '
          >{suggestion}</h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={(v)=>setOpenDialog(false)}/>
    </div>
  )
}

export default Hero