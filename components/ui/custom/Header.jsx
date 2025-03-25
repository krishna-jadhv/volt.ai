// Header.jsx
import Image from 'next/image'
import React from 'react';
import { Button } from "@/components/ui/Button";
import Colors from '@/data/Colors';
import { Ghost } from 'lucide-react';

function Header() {
  return (
    <div className='p-4 flex justify-between items-center' >
        <Image src={'/logo.png'} alt='Logo' width={40} height={30}/>
        <div className='flex gap-5'>
            <Button
            variant="ghost"
            >Sigh In</Button>
            <Button 
            className="text-white"
            style={{
                backgroundColor:Colors.BLUE,
            }}>Get Started</Button>
        </div>
    </div>
  )
}

export default Header;
