import RegisterImage from '../../assets/register.svg'
import { useLottie } from "lottie-react";
import LoginSignUp from '../LoginSignUp'
import loginLoti from '../../assets/login-loty.json'
import {Link} from 'react-router-dom'
import React from 'react';
import NavComponent from '../Nav/NavComponent';

function Login(){
  console.log("login")
  
    const options = {
        animationData: loginLoti,
        loop: true
      };
    const { View } = useLottie(options);
    return(
      <>
      <NavComponent/>
     <div className=' h-[90vh]'>
        <div className="container mx-auto py-12 lg:w-[70vw]">
         <div className="login flex shadow-xl flex-col items-center justify-around lg:justify-center lg:flex-row">
            <div className='w-2/4 lg:hidden z-[-5]'>{View}</div>
            <div className="right rounded-r-lg flex justify-center my-8 lg:w-1/2">
               <LoginSignUp
                type="login" 
                title="Log in to TeachConnect" 
                additionalText="New User ?" 
                firstBtnText="Log In" 
                secondBtnText="Log in using Google" 
                redirectingBtn={<Link to="/register">Register now</Link>}
                />
            </div>
            <div className="left w-1/2 bg-[#9fe4da] justify-center items-center rounded-l-lg hidden lg:flex lg:h-[100vh]">
                    <img src={RegisterImage} alt="" className='h-2/3'/>
            </div>
        </div>
       </div>
     </div>
      </>
    )
}
export default Login