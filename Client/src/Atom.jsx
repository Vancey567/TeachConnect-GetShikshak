import { atom } from "recoil";
import { useEffect } from "react";
export const successState = atom({
  key: "successState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const authTokenAtom = atom({
  key: "authTokenAtom",
  default: JSON.parse(sessionStorage.getItem("token")),
});

const user = JSON.parse(sessionStorage.getItem("user"));

export const tutorFormDataAtom = atom({
  key: "tutorForm",
  default: {
    name:(user?.name) || "",
    email: (user?.email) || "",
    role: ( user?.role) || "",
    subjects: ( user?.tutorForm.subjects) || [],
    title: ( user?.tutorForm.title) || "",
    aboutYou: ( user?.tutorForm.aboutYou) || "",
    aboutClass: ( user?.tutorForm.aboutClass) || "",
    city: ( user?.tutorForm.city) || "",
    mode: ( user?.tutorForm.mode) || [],
    language: ( user?.tutorForm.language) || [],
    rate: ( user?.tutorForm.rate) || "",
    phone: ( user?.phone) || "",
    profilePic: ( user?.profilePic) || "",
    identity: ( user?.tutorForm.identity) || "",
    lastEducationalCertificate:
      ( user?.tutorForm.lastEducationalCertificate) || "",
    isProfileVerified: (user?.tutorForm?.isProfileVerified )||"",
    isProfileCompleted:(user?.isProfileCompleted)||""
  },
});


export const userDataAtom = atom({
  key: "userData",
  default: user ? {
    ...user,
    isProfileVerified: user.tutorForm.isProfileVerified
  
  } : {
    id:"",
    name:"",
    email: "",
    role: "",
    address:"",
    phone: "",
    profilePic: "",
    identity: "",
    lastEducationalCertificate:"",
    isProfileVerified: "",
    isProfileCompleted:"",
    isAccountActive:""

  },
});