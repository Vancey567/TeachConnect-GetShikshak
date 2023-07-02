import { useState } from "react";
import ChooseSubject from "./ChooseSubjects";
import AddTitleForAdd from "./AddTitleForAd";
import AboutClass from "./AboutClass";
import AboutYou from "./AboutYou";
import ClassDetails from "./ClassDetails";
import PreviewForm from "./PreviewForm";
import DocumentUpload from "./DocumentUpload";
import { useFormik } from "formik";
import axios from 'axios'
import { useRecoilState } from "recoil";
import { tutorFormDataAtom, userDataAtom } from "../../Atom";
import { Stepper, StepLabel, Step } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Navcomponent from '../Nav/NavComponent'

import {
  subjectSchema,
  titleSchema,
  aboutClassSchema,
  aboutYouSchema,
  classDetailsSchema,
  DocumentUploadSchema

} from "../../schemas/formValidation";


// const storedUser = sessionStorage.getItem("user");
// console.log("storedUser",JSON.parse(storedUser));

const FormTitle = [
  "Which Subjects do you Teach?",
  "Title of your ad",
  "About the class",
  "About you",
  "Class Details",
  "Documents Upload",
  "Preview Form",
];

const steps = [1, 2, 3, 4, 5, 6,7];

function TutorCompleteProfile() {
  const [tutorFormData, setTutorFormData] = useRecoilState(tutorFormDataAtom);
  const [userData,setUserData]=useRecoilState(userDataAtom)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  // console.log("tokeninside",));
  const token = JSON.parse(sessionStorage.getItem("token"));

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    if (activeStep == steps.length - 1) {
      return;
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = () => {
    switch (activeStep) {
      case 0:
        formikSubjectInfo.handleSubmit();
        break;
      case 1:
        formikTitleInfo.handleSubmit();
        break;
      case 2:
        formikAboutClassInfo.handleSubmit();
        break;
      case 3:
        formikAboutYouInfo.handleSubmit();
        break;
      case 4:
        formikClassDetailsInfo.handleSubmit();
        break;
      case 5:
        formikDocumentsInfo.handleSubmit();
        break;
      case 6:
        handleFormSubmit();
    }
  };

  // console.log("tutrformdata",tutorFormData);

  const handleFormSubmit = async () => {
    // console.log("inside handleFormSubmit");
    console.log("token inside atom",token);

    try {
      let response = await axios({
        url: `${import.meta.env.VITE_API_URL}/auth/tutorcompleteprofile`,
        method: "POST",
        data: tutorFormData,
        headers: {
          // "content-type": "application/json",
          // 'content-type': 'multipart/form-data',
          "content-type": ["application/json",'multipart/form-data'],

          "Authorization": `Bearer ${token}`,
        },
      });
      console.log("inside try")
      if (response.status === 201) {
        console.log("message", response.data.message,response.data.savedUser);
        const user=JSON.parse(sessionStorage.getItem("user"));
        user.isProfileCompleted=true;
        sessionStorage.setItem("user",JSON.stringify(user))
        setUserData((prev)=>({
          ...prev,
          isProfileCompleted:true
        }))
        // storedData.method();

        // console.log("respose by login",response);
        enqueueSnackbar(response.data.message, { variant: "success" });
        navigate("/tutordashboard")
      }
    } catch (err) {
      console.log("form submit error", err);
      // enqueueSnackbar(err.response.data.error, { variant: "error" });
    }
  };

  const handlePreview = () => {
    setTutorFormData((prevdata) => {
      return {
        ...prevdata,
        subjects: formikSubjectInfo.values.subjects,
        title: formikTitleInfo.values.title,
        aboutYou: formikAboutYouInfo.values.aboutYou,
        education:formikAboutYouInfo.values.education,
        age:formikAboutYouInfo.values.age,
        gender:formikAboutYouInfo.values.gender,
        aboutClass: formikAboutClassInfo.values.aboutClass,
        city: formikClassDetailsInfo.values.city,
        mode: formikClassDetailsInfo.values.mode,
        language: formikClassDetailsInfo.values.language,
        rate: formikClassDetailsInfo.values.rate,
        phone: formikClassDetailsInfo.values.phone,
        profilePic:formikDocumentsInfo.values.profilePic,
        identity:formikDocumentsInfo.values.identity,
        lastEducationalCertificate:formikDocumentsInfo.values.lastEducationalCertificate,
        isProfileCompleted:true,
        isProfileVerified:"pending",
        avgRating:0,
      };
    });
    handleNext();
  };

  //...................FORMIK..................

  const formikSubjectInfo = useFormik({
    initialValues: {
      subjects: [],
    },
    validationSchema: subjectSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });

  const formikTitleInfo = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: titleSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });

  const formikAboutClassInfo = useFormik({
    initialValues: {
      aboutClass: "",
    },
    validationSchema: aboutClassSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });

  const formikAboutYouInfo = useFormik({
    initialValues: {
      aboutYou: "",
      education:"",
      age:0,
      gender:""
    },

    validationSchema: aboutYouSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });

  const formikClassDetailsInfo = useFormik({
    initialValues: {
      city: "",
      mode: [],
      language: [],
      rate: 0,
      phone: "",
    },
    validationSchema: classDetailsSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });

  const formikDocumentsInfo = useFormik({
    initialValues:{
      profilePic:"",
      identity:"",
      lastEducationalCertificate:""
    },
    validationSchema: DocumentUploadSchema,
    onSubmit:(values)=>{
      console.log("values wow",values);
      handlePreview();
    }
  })

  // console.log("formikDocumentsInfo.values.profilePic",formikDocumentsInfo.values.profilePic);

  //...................FORMIK..................

  const FormContent = {
    0: <ChooseSubject title={FormTitle[0]} formik={formikSubjectInfo} />,
    1: <AddTitleForAdd title={FormTitle[1]} formik={formikTitleInfo} />,
    2: <AboutClass title={FormTitle[2]} formik={formikAboutClassInfo} />,
    3: <AboutYou title={FormTitle[3]} formik={formikAboutYouInfo} />,
    4: <ClassDetails title={FormTitle[4]} formik={formikClassDetailsInfo} />,
    5:<DocumentUpload title={FormTitle[5]} formik={formikDocumentsInfo}/>,
    6: <PreviewForm title={FormTitle[6]} fromData={tutorFormData} />,
  };

  const stepperStyle = {
    margin: "2rem 0",
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "rgb(220 38 38)",
        fontSize: "2rem",
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "green",
        fontSize: "2rem",
      },
    },
  };

  return (
    <>
    <Navcomponent/>
      <div className="md:container md:mx-auto md:w-4/6 p-6 my-8 mx-6 rounded-md shadow-sm shadow-primary-color">
        <div className="md:w-2/3 md:container md:mx-auto">
          {/* ............................STEPPER............................... */}
          <Stepper activeStep={activeStep} sx={stepperStyle}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {/* ............................STEPPER............................... */}
        </div>
        <div className="formContent ">{FormContent[activeStep]}</div>
        <div className="flex justify-center">
          <button
            className="px-5 py-2 bg-primary-color text-white rounded-lg disabled:bg-gray-400"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Go Back
          </button>
          <button
            className="px-5 py-2 bg-primary-color ml-7 text-white rounded-lg disabled:bg-gray-400"
            onClick={handleSubmit}
          >
            {activeStep === steps.length - 1
              ? "Submit"
              : activeStep === steps.length - 2
              ? "Preview Form"
              : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}

export default TutorCompleteProfile;
