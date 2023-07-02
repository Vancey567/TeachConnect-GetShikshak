import HeroSection from "../HeroSection/HeroSection";
import About from "../About/About";
import TutorCarousal from '../TutorCardSection/TutorCarousal'
import { useEffect, useState } from "react";
import axios from "axios";
import NoResultPage from "../NoResultPage";
import NavComponent from "../Nav/NavComponent";

function Landing(){
    const [tutors,setTutors]=useState([]);

    const fetchData=async()=>{
        let response = await axios({
            url:`${import.meta.env.VITE_API_URL}/user/gettutors`,
            method:"GET"
        })
        console.log(response);
        console.log("response.data.tutors",response.data.filteredTutors)
        setTutors(response.data.filteredTutors);
    }

    
    useEffect(()=>{
        fetchData();
    },[])
    

    // console.log("Tutors landing",response.data.tutors)
    return(
        <div>
            <NavComponent/>
            <HeroSection/>
            <div className="bg-gray-100">
            {tutors?.length>0 ? (<TutorCarousal tutors={tutors}/>):(<NoResultPage/>)}

            </div>
            {/* <About/> */}
            

            {/* <TutorCardSection/> */}
            {/* <div> {props.children}</div> */}
        </div>
    )
}

export default Landing;
