import { useRecoilValue } from "recoil";
import { tutorFormDataAtom } from "../../Atom";
import { useState } from "react";
import PreviewDocs from "./PreviewDocs";
function PreviewForm(props) {
  const userData = useRecoilValue(tutorFormDataAtom);
  console.log("userData", userData);
  return (
    <>
      <div className=" md:w-[90%] md:container md:mx-auto rounded-md mb-6">
        <div className="shadow-md p-2 rounded-md">
          <h1 className="text-lg font-bold">Subjects</h1>
          <div className="my-2 ">
            {userData?.subjects?.map((data) => (
              <span className="bg-gray-200 rounded-md p-1 mx-2" key={data}>
                {data}
              </span>
            ))}
          </div>
        </div>
        <div className="border-2 p-2 my-2 rounded-md">
          <h1 className="text-lg font-bold ">Title For the Add</h1>
          <div className="my-2">
            <p>{userData?.title}</p>
          </div>
        </div>
        <div className="border-2 p-2 my-2 rounded-md">
          <h1 className="text-lg font-bold ">About You</h1>
          <p className="my-2">{userData?.aboutYou}</p>
        </div>
       
        <div className="border-2 p-2 my-2 rounded-md">
          <h1 className="text-lg font-bold ">About Class</h1>
          <p className="my-2">{userData?.aboutClass}</p>
        </div>
        
        <div className="border-2 p-2 my-2 rounded-md flex justify-between">
        <div className="w-1/2">
          <h1 className="text-lg font-bold ">City</h1>
          <span> {userData?.city}</span>
        </div>
        <div className="w-1/2 flex items-start flex-col">
          <h1 className="text-lg font-bold">Qualification</h1>
          <span> {userData?.education}</span>
        </div>
        </div>

       <div className="border-2 p-2 my-2 rounded-md flex justify-between">
       <div className="w-1/2">
          <h1 className="text-lg font-bold ">Rate</h1>
          <span> {userData?.rate}</span>
        </div>
        <div className="w-1/2 flex flex-col justify-start">
          <h1 className="text-lg font-bold ">Phone</h1>
          <span> {userData?.phone}</span>
        </div>
       </div>
        <div className="border-2 p-2 my-2 rounded-md flex justify-between">
        <div className="w-1/2">
          <h1 className="text-lg font-bold ">Mode</h1>
          <div className="my-2 flex flex-wrap">
            {userData?.mode?.map((data) => (
              <span className="bg-gray-200 rounded-md p-1 mx-2 my-1" key={data}>
                {data}
              </span>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-col">
          <h1 className="text-lg font-bold mr-5">Language</h1>
          <div className="my-2 flex flex-wrap">
            {userData?.language?.map((data) => (
              <span className="bg-gray-200 rounded-md p-1 mx-2 my-1" key={data}>
                {data}
              </span>
            ))}
          </div>
        </div>
        </div>
        <div className="flex justify-between border-2 p-2 rounded-md">
          <div>
          <h1 className="mb-2 text-lg font-bold ">Profile Picture</h1>
          {userData?.profilePic && (
            <PreviewDocs
              file={userData?.profilePic}
              width="56"
              height="64"
            />
          )}
          </div>
          <div>
          <h1 className="mb-2 text-lg font-bold">Identity Proof</h1>
          {userData?.identity && (
            <PreviewDocs
              file={userData?.identity}
              width="56"
                  height="64"
            />
          )}
          </div>
          <div className=" flex flex-col items-center">
          <h1 className="mb-2 text-lg font-bold">Educational Certificate</h1>
          {userData?.lastEducationalCertificate && (
            <PreviewDocs
              file={userData?.lastEducationalCertificate}
              width="56"
                  height="64"
            />
          )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewForm;
