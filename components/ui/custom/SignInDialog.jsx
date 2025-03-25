import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../button'
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import axios from "axios";



function SignInDialog({openDialog,closeDialog}) {
const {userDetails, setUserDetails}=useContext(UserDetailsContext)
    
const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },
      );
  
      console.log(userInfo);
      setUserDetails(userInfo?.data)

      //save this inside our database
      closeDialog(false)
    },
    onError: errorResponse => console.log(errorResponse),
  });
  
    return (

        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription >
                        <div className="flex flex-col text-center items-center justify-center gap-3">
                            <h2 className='font-bold text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
                            <p className='mt-2 text-center text-lg '>{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3"
                                onClick={googleLogin}
                            >Sign In With Google</Button>
                            <p>{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default SignInDialog