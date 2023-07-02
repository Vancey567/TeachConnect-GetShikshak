import { useSnackbar } from "notistack";
import { useState } from "react";
import axios from "axios";
import NavComponent from "./Nav/NavComponent";

function PasswordReset() {

  const [email,setEmail]=useState("");
  // const [message,setMessage]=useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading,setIsLoading]=useState(null);

  const sendLink = async(e)=>{
    setIsLoading(true);
   try{
    e.preventDefault();
    const response = await axios({
      url:`${import.meta.env.VITE_API_URL}/auth/sendpasswordlink`,
      method:"POST",
      data:{email},
      headers:{
        "Content-type":"application/json"
      },
    }) 
   
    if(response.status===201){
      setIsLoading(false);
      enqueueSnackbar(response?.data?.message,{variant:"success"})
    }
    else{
      enqueueSnackbar("Invalid user",{variant:"error"})
    }
   }
   catch(err){
    enqueueSnackbar(err.response.data.message,{variant:"error"})
   }

  }
  const handleChange=(e)=>{
    setEmail(e.target.value)
  }

  return (
    <>
    <NavComponent/>
      <div className="w-full h-[90vh] flex justify-center items-center bg-gray-100">
        <form className="bg-white w-1/3 shadow-md rounded p-8 mb-4">
          <div className="flex justify-center"><h1 className="mb-4 text-xl font-bold">Enter you email to reset password</h1></div>
          {/* {message?<p className="font-bold text-green-500">Password Reset link sent successfully sent in your email</p>:""} */}
          <div className="my-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={sendLink}
            >
              Send
            </button>
           
          </div>
          {isLoading && <p className="mt-4 mb-2 text-green-700">Sending mail...</p>}
        </form>
        {/* <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p> */}
      </div>
    </>
  );
}

export default PasswordReset;
