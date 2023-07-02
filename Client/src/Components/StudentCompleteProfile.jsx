import { useFormik } from "formik";
import { useRef } from "react";
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import PreviewDocs from "./TutorCompleteProfile/PreviewDocs";
import { enqueueSnackbar } from "notistack";
import { useRecoilState, useRecoilValue } from "recoil";
import { authTokenAtom } from "../Atom";
import { userDataAtom } from "../Atom";
import axios from "axios";
import {StudentCompleteProfileSchema} from '../schemas/formValidation'
import NavComponent from "./Nav/NavComponent";


function StudentCompleteProfile() {
  const profileRef = useRef(null);
  const navigate=useNavigate();
  // const token = JSON.parse(sessionStorage.getItem("token"));
  const token=useRecoilValue(authTokenAtom)
  const [userData,setUserData]=useRecoilState(userDataAtom);

  const initialValues = {
    gender: "",
    age: "",
    phone:"",
    address: "",
    profilePic: "",
    education:"",
    isProfileCompleted:true
  };

  const Formik = useFormik({
    initialValues,
    validationSchema:StudentCompleteProfileSchema,
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        let response = await axios({
          url:`${import.meta.env.VITE_API_URL}/auth/studentcompleteprofile`,
          method:"POST",
          data:values,
          headers:{
            "content-type": ["application/json",'multipart/form-data'],
            // 'content-type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`,
          }
        })
        if(response.status===201){
          console.log("message",response.data.message,response.data.savedUser);
          // const user=JSON.parse(sessionStorage.getItem("user"));
          // user.isProfileCompleted=true;
          sessionStorage.setItem("user",JSON.stringify(response.data.savedUser))
          setUserData((prev)=>({
            ...prev,
            isProfileCompleted:true,
            phone:response.data.savedUser.phone,
            address:response.data.savedUser.address
          }))
          // const user = JSON.parse(sessionStorage.getItem("user"));
          // // user.isProfileCompleted=true;
          // sessionStorage.setItem("user",JSON.stringify);
          enqueueSnackbar(response.data.message,{variant:"success"});
          navigate("/");
        }
      } catch (err) {
        console.log("err", err);
      }
    },
  });
  return (
    <>
    <NavComponent/>
      <div className="flex justify-start ">
        <div className="w-1/4 left h-1/6 my-12  rounded-md  flex justify-end" > 
            <p className="p-8 w-2/3 rounded-md bg-green-200 font-semibold text-gray-600 tracking-wide leading-7">Complete your profile to be able to reserve class !</p>
        </div>
        <div className="w-1/2 flex justify-center items-center">
        <form
          onSubmit={Formik.handleSubmit}
          className="min-w-[40vw] shadow-sm rounded-md shadow-emerald-600 p-8 my-4"
        >
          <div className="flex justify-between mt-2 mb-4 ">
            <h1 className="font-semibold">Gender :</h1>
            <div className="flex">
            <div className="mx-2 w-1/2">
              <label className="flex">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={Formik.values.gender === "male"}
                  onChange={Formik.handleChange}
                  className="mx-2"
                />
                Male
              </label>
            </div>
            
            <div className="mx-2">
              <label className="flex">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={Formik.values.gender === "female"}
                  onChange={Formik.handleChange}
                  className="mx-2"
                />
                Female
              </label>
            </div>
            <div className="mx-2">
              <label className="flex">
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={Formik.values.gender === "others"}
                  onChange={Formik.handleChange}
                  className="mx-2"
                />
                Others
              </label>
            </div>
            </div>
          </div>
          {Formik.errors.gender && Formik.touched.gender ? (
                <p className="text-red-500">
                  {Formik.errors.gender}
                </p>
              ) : null}
          <div className="my-2 flex justify-between items-center">
            <label htmlFor="age" className="font-semibold ">Age :</label>
            <input
              type="text"
              className="border-2 p-2 rounded-md my-2 mx-4 w-1/2"
              name="age"
              onChange={Formik.handleChange}
              placeholder="Your age"
            />
          </div>
          {Formik.errors.age && Formik.touched.age ? (
                <p className="text-red-500">
                  {Formik.errors.age}
                </p>
              ) : null}
          <div className="my-2 flex justify-between items-center">
            <label htmlFor="age" className="font-semibold">Phone :</label>
            <input
              type="text"
              className="border-2 p-2 rounded-md my-2 mx-4 w-1/2"
              name="phone"
              onChange={Formik.handleChange}
              placeholder="Your phone number"
            />
          </div>
          {Formik.errors.phone && Formik.touched.phone ? (
                <p className="text-red-500">
                  {Formik.errors.phone}
                </p>
              ) : null}
          <div className="my-2 flex justify-between items-center">
            <label htmlFor="education" className="font-semibold">Education :</label>
            <input
              type="text"
              className="border-2 p-2 rounded-md my-2 mx-4 w-1/2"
              name="education"
              onChange={Formik.handleChange}
              placeholder="standard/degree"
            />
          </div>
          {Formik.errors.education && Formik.touched.education ? (
                <p className="text-red-500">
                  {Formik.errors.education}
                </p>
              ) : null}
          <div className="my-2 flex flex-col">
            <label htmlFor="address" className="font-semibold">Address :</label>
            <textarea className="border-2 p-2 rounded-md my-2" name="address" id="" cols="5" rows="3" onChange={Formik.handleChange}></textarea>
          </div>
          {Formik.errors.address && Formik.touched.address ? (
                <p className="text-red-500">
                  {Formik.errors.address}
                </p>
              ) : null}
          <input
            ref={profileRef}
            hidden
            type="file"
            name="profilePic"
            onChange={(event) => {
              Formik.setFieldValue("profilePic", event.target.files[0]);
            }}
          />
          <div className="flex flex-col my-2 gap-4 justify-center">
            <div className="uploadbtn flex justify-between items-center w-[100%]">
              {Formik.values.profilePic ? (
                <PreviewDocs
                  file={Formik.values.profilePic}
                  width="56"
                  height="48"
                  // height="100px"
                />
              ) : (
                <button
                  className="h-48 w-[100%] bg-white border-2 flex items-center justify-center"
                  onClick={() => {
                    profileRef.current.click();
                  }}
                >
                  Upload Profile Pictures
                  <span className="mx-2" ><AiOutlineCloudUpload size="1.6em"/></span>
                </button>
              )}

              {Formik.values.profilePic && (
                <button
                  className="my-2 text-sm flex justify-center items-center  border-2 w-1/3 rounded-sm p-2 transition-all ease-in-out duration-200 shadow-md hover:scale-105"
                  onClick={() => {
                    profileRef.current.click();
                  }}
                >
                  Upload
                  <span className="mx-2"><AiOutlineCloudUpload size="1.3em"/></span>
                </button>
              )}

            </div>
            {Formik.errors.profilePic && Formik.touched.profilePic ? (
                <p className="text-red-500">
                  {Formik.errors.profilePic}
                </p>
              ) : null}
            <button className="p-2 bg-primary-color text-white">Submit</button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default StudentCompleteProfile;
