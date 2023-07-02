import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import NavComponent from "../Nav/NavComponent";

function ForgotPassword() {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate=useNavigate();
  const userId = params.id;
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
console.log("user di",userId);
console.log("token",token);

  const handleChange = (e) => {
    console.log("indise handle chang", e.target.value);
    setNewPassword(e.target.value);
  };

  const userValid = async () => {
    try{
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/auth/forgotpassword/${userId}/${token}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status == 201) {
        console.log("user valid");
      } 
    }
    catch(err){
      navigate("*")
    }
  };
  useEffect(()=>{
    userValid();
  })

  const handleClick = async()=> {
    try{
      console.log("passwid",newPassword);
    const response = await axios({
      url:`${import.meta.env.VITE_API_URL}/auth/passwordreset/${userId}/${token}`,
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      data:{
        password:newPassword
      }
    })
    console.log(response,"response");
    enqueueSnackbar(response.data.message,{variant:"success"})
    console.log("insid handle click ");
    }
    catch(err){
      console.log("erroi",err);
      enqueueSnackbar(err.response.data.message,{variant:"error"})
    }
  }
  return (
    <>
    <NavComponent/>
      <div className="w-full h-[90vh] flex justify-center items-center bg-gray-100">
        <form className="bg-white w-1/3 shadow-md rounded p-8 mb-4">
          <div className="flex justify-center">
            <h1 className="mb-4 text-xl font-bold">Enter you new password</h1>
          </div>
          <div className="my-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Your new password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="password"
              onChange={handleChange}
              value={newPassword}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClick}
            >
              Send
            </button>
          </div>
        </form>
        {/* <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p> */}
      </div>
    </>
  );
}
export default ForgotPassword;
