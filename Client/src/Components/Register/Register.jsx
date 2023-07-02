import RegisterImage from "../../assets/register.svg";
import { useLottie } from "lottie-react";
import LoginSignUp from "../LoginSignUp";
import loginLoti from "../../assets/login-loty.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavComponent from "../Nav/NavComponent";

function Register() {
  const options = {
    animationData: loginLoti,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <>
    <NavComponent/>
      <div className=" h-[105vh]">
        <div className="container mx-auto py-12 lg:w-[70vw]">
          <div className="flex shadow-xl flex-col items-center justify-around lg:justify-center lg:flex-row">
            <div className="left w-1/2 bg-[#9fe4da] justify-center items-center rounded-l-lg hidden lg:flex lg:h-[90vh]">
              <img src={RegisterImage} alt="" className="h-2/3" />
            </div>
            <div className="w-2/4 lg:hidden  z-[-5]">{View}</div>
            <div className="right rounded-r-lg flex justify-center my-8 lg:w-1/2">
              <LoginSignUp
                type="register"
                title="Sign up to TeachConnect"
                additionalText="Already a member ?"
                firstBtnText="Sign up"
                secondBtnText="Sign Up using Google"
                redirectingBtn={<Link to="/login">Log In</Link>}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
