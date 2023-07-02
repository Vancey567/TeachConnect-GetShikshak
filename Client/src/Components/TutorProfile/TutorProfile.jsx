import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TutorCard from "./TutorCard";
import Rating from '@mui/material/Rating';
import NavComponent from "../Nav/NavComponent";

function TutorProfile() {
  const [tutor, setTutor] = useState(null);
  const [tutorFeedback,setTutorFeedback]=useState([]);
  const [cardPosition, setCardPosition] = useState(false);

  const { id } = useParams();
  const fetchData = async () => {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/user/${id}`,
      method: "GET",
    });
    console.log("response", response?.data?.user);
    setTutor(response.data.user);
  };

  const fetchReviews=async(req,res)=>{
    try{
      const response = await axios({
        url:`${import.meta.env.VITE_API_URL}/user/fetchfeedback/${id}`,
        method:"GET"
      })
      console.log("rerponse",response?.data?.feedback);
      setTutorFeedback(response?.data?.feedback);
    }
    catch(err){
      console.log("error",err);
    }
  }
  // console.log("tutorprofile", tutor.tutorForm.subjects);

  useEffect(() => {
    fetchData();
    fetchReviews();
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const threshold = 100; // Adjust this threshold as needed

      if (scrollTop > threshold) setCardPosition("fixed top-24");
      else setCardPosition("relative");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <NavComponent/>
     <div className="bg-gray-50">
     <div className=" w-4/5 container mx-auto flex">
        <div className="w-3/5 ">
          <div id="left" className="my-16 mx-10 ">
            <div className="subjects">
              {tutor &&
                tutor.tutorForm.subjects.map((subject, index) => {
                  return (
                    <span
                      className="rounded-full px-4 py-2 bg-gray-200 mr-2"
                      key={index}
                    >
                      {subject}
                    </span>
                  );
                })}
            </div>
            <div className="title my-6  text-3xl  font-[Quicksand] ">
              {tutor && tutor.tutorForm.title}
            </div>
            <div className="modes my-6">
              <div className="mb-6 text-lg font-bold font-[Quicksand]">
                Class Location
              </div>
              <div className="flex flex-wrap">
                {tutor &&
                  tutor.tutorForm.mode.map((mode, index) => {
                    return (
                      <span
                        key={index}
                        className="py-2 px-4 border-2 my-2 mr-2 rounded-full"
                      >
                        {mode}
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className="aboutyou my-6 rounded-md">
              <h1 className="mb-4 text-lg font-bold font-[Quicksand]">
                About {tutor && tutor.name.split(" ")[0]}
              </h1>
              <div className="bg-gray-100 rounded-md p-4">
                {" "}
                {tutor && tutor.tutorForm.aboutYou}
              </div>
            </div>
            <div className="aboutClass my-6 ">
              <h1 className="mb-4 text-lg font-bold font-[Quicksand] ">
                About The lesson
              </h1>
              <div className="flex gap-4 my-6">
                <h1 className="text-md font-[Quicksand]">Languages </h1>
                <div className="flex flex-wrap">
                  {tutor &&
                    tutor.tutorForm.language.map((language, index) => {
                      return (
                        <span
                          key={index}
                          className="text-md py-2 px-4 border-2 rounded-full mx-2 my-1"
                        >
                          {language}
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="bg-gray-100 rounded-md p-4">
                {tutor && tutor.tutorForm.aboutClass}
              </div>
            </div>
           {
            tutorFeedback.length>0 && <div className=" py-4">
            <h1 className="font-bold font-[Quicksand]">REVIEWS</h1>
            {
              tutorFeedback.map((feedback)=>{
                return(
                  <div className="p-4 rounded-md bg-white my-4 border border-1">
                    <div className="row1 flex justify-between">
                        <div className="flex gap-4 items-center">
                          <img src={`${import.meta.env.VITE_API_URL}/assets/${feedback?.studentProfile}`}
                              alt={feedback?.studentName?.toString()[0]?.toUpperCase()}
                              className="rounded-full h-10 w-10 object-cover"
                          />
                          <div className="font-semibold">{feedback?.studentName}
                              <div className="text-gray-600 text-sm font-normal">Subjects :
                                {
                                  feedback?.subjects?.map((sub,index)=>{
                                    return (
                                      index==0?<span className="ml-2">{sub}</span>:<span className="ml-1">,{sub}</span>)
                                  })
                                }
                              </div>
                          </div>
                        </div>
                        <div className="text-xs">
                          <Rating name="read-only" value={feedback.rating} readOnly size="small"/>
                        </div>
                    </div>
                    <div className="row2 my-4 ml-14 text-sm">
                        <p>{feedback?.review}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
           }
          </div>
        </div>

        <div id="right" className=" w-2/5">
          <div class="flex items-center h-screen  justify-center ">
            <div class={`transition duration-500 transform ${cardPosition}`}>
              <TutorCard tutor={tutor && tutor} />
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  );
}
export default TutorProfile;
