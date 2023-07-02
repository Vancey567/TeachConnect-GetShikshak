import "./homePage.css";
import "../style.css";
import { MdWavingHand } from "react-icons/md";
// import {IoCloseCircleOutline} from 'react-icons/io';
import {MdOutlineStar,MdOutlineError} from 'react-icons/md';
import { useEffect, useState } from 'react';
import EditButton from '../EditButton';
import {TiPin} from 'react-icons/ti';
import {AiOutlineEye} from 'react-icons/ai';
import {MdNotificationsActive,MdVerified} from 'react-icons/md';
import {VscVerifiedFilled} from 'react-icons/vsc';
import {RxCrossCircled} from 'react-icons/rx';
import {GoUnverified} from 'react-icons/go';
import DateTime from '../DateTime';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

function HomePage({ fetchedData }) {
  console.log("Homepage Rendered and the pros passed ");

  const [displayType, setDisplayType] = useState("none");
  const [currentNotification, setCurrentNotification] = useState(null);
  const [aboutYou, setAboutYou] = useState("");
  const [aboutClass, setAboutClass] = useState("");
  const [title, setTitle] = useState("");
  const [classRequests, setClassRequests] = useState(null);
  const [activeNotification, setActiveNotification] = useState(null);

  const authToken = JSON.parse(sessionStorage.getItem("token"));

  console.log("Current ", currentNotification);

  const fetchData = async () => {
    let response = await axios({
      url: `${import.meta.env.VITE_API_URL}/dashboard/classrequest`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("hello");

    console.log("In Response ", response.data);
    setClassRequests(response.data);
    console.log("in class requests ", classRequests);
  };

  const userData = fetchedData;

  useEffect(() => {
    fetchData();
    setAboutYou(userData?.tutorForm?.aboutYou);
    setAboutClass(userData?.tutorForm?.aboutClass);
    setTitle(userData?.tutorForm?.title);
  }, []);

  const handleRequestStatus = async (status) => {
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/tutor/updatereservationrequest`,
        method: "PATCH",
        data: {
          updatedStatus: status,
          reqId: currentNotification._id,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("response", response.data.updatedReservationRequest);
      closeNotificationDetailsPage();
      const updatedClassRequest = classRequests.filter((classRequest) => {
        return classRequest._id !== currentNotification._id;
      });
      setClassRequests(updatedClassRequest);
    } catch (err) {}
  };

    // console.log("class requests ",classRequests);
    function notificationList(){    
            console.log("Inside Class Request ",classRequests);
            let notifications = classRequests?.map((item,index)=>{
                return (
                    <div className="notification" onClick={(e)=>{handleActiveNotification(e,index)}} id={index}>
                            <TiPin/>
                            <span id='notification-name' className="flex flex-col">
                                {item.studentId.name}
                                <span>Sub: {item?.mode}</span>
                            </span>
                            <span id='show-notification-icon'><AiOutlineEye/></span>
                    </div>
                )
            })
            // console.log("notifi ",notifications);
            return(
                <div id="account-notification-div" className='sub-container-div' style={{backgroundColor:"white"}}>
                    <div className='div-heading'>
                        NEW CLASS REQUESTS
                        <span id="notification-icon">
                            <MdNotificationsActive/>
                        </span>
                    </div>
                    
                    <div id='notification-listing-div'>
                        {notifications?.length>0?notifications:
                        <div style={{ position:"relative" ,top:"200px", textAlign:"center", border:"none",backgroundColor:"transparent"}}>
                            NO NEW REQUESTS
                        </div>
                        }
                    </div>
                </div>
            )
    }

    function notificationDetailsPage(){
        console.log(currentNotification);
        return(
            <div id="notification-details-div" className='sub-container-div' style={{display:displayType , backgroundColor:"rgb(247, 247, 242)"}}>
                        <div className='row-div margin-buttom-div' id="crosss-div">
                            <RxCrossCircled size="1.4rem" color="red" className="cursor-type-pointer" onClick={()=>{closeNotificationDetailsPage()}}/>
                        </div>
                        <div className='row-div margin-buttom-div' >
                            <div className='display-type-flex width-100' id="request-details-div">
                                <div className='sub-container-div' id="student-profile-div">
                                    <div id='profile-pic-section'>
                                        <div id='profile-pic' style={{width:"100%"}}>
                                            <img id="profile-image" alt="image" src={`${import.meta.env.VITE_API_URL}/assets/${currentNotification?.studentId?.profilePic}`}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='sub-container-div' id='content-of-request-div'>
                                    <div id='content-heading' className='request-content-sub-div'>
                                        {currentNotification?.studentId.name}
                                        <span style={{textTransform:"none"}}>Email: <span style={{fontWeight:"normal"}}>{currentNotification?.studentId?.email}</span></span>
                                    </div>
                                    <div id='request-content' className='request-content-sub-div'>
                                        {currentNotification?.intro}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row-div margin-buttom-div' id='class-options'>
                            <div className='display-type-flex' >
                                <div className='sub-container-div' id='requested-subjects-div'>
                                    <div className='div-heading'>
                                        SUBJECTS
                                    </div>
                                    <div className='content-div display-type-flex' id='requested-subjects'>
                                        {
                                            currentNotification?.subjects.map((subject)=>{
                                                return <span className='requested-subject-span'>{subject}</span>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='sub-container-div' id='requested-mode-div'>
                                    <div className='div-heading'>
                                        MODE OF LEARNING
                                    </div>
                                    <div className='content-div' id='requested-modes'>
                                        {
                                            currentNotification?.mode.map((modeType)=>{
                                                return <span className='requested-subject-span'>{modeType}</span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row-div margin-buttom-div'>
                            <div className='width-100 display-type-flex' id='accept-reject-div'>
                                <div className='content-div'>
                                        <button className='accept-reject-button' id='accept-button' onClick={()=>{
                                            handleRequestStatus("accepted")
                                        }}>ACCEPT</button>
                                        <button className='accept-reject-button' id='reject-button'  onClick={()=>{
                                            handleRequestStatus("rejected")
                                        }}>REJECT</button>
                                </div>  
                        </div>
                </div>
            </div>
        )
    }

  function activateNotification(notificationDivObj) {
    if (notificationDivObj.className !== "notification") {
      notificationDivObj.closest(".notification").style.backgroundColor =
        "lightgray";
      notificationDivObj.closest(".notification").style.borderLeft =
        "5px solid purple";
      setActiveNotification(notificationDivObj.closest(".notification"));
    } else {
      notificationDivObj.style.backgroundColor = "lightgray";
      notificationDivObj.style.borderLeft = "5px solid purple";
      setActiveNotification(notificationDivObj);
    }
  }

  function deactivateNotification() {
    activeNotification.style.backgroundColor = "rgb(236, 236, 236)";
    activeNotification.style.borderLeft = "1px solid purple";
    setActiveNotification(null);
  }

  function closeNotificationDetailsPage() {
    console.log("clicked on cross");
    setDisplayType("none");
    deactivateNotification();
  }

  const handleActiveNotification = (event, index) => {
    // console.log("Called");
    if (activeNotification == null) setDisplayType("flex");

    setCurrentNotification(classRequests[index]);

    if (activeNotification) {
      if (
        activeNotification != event.target ||
        activeNotification != event.target.closest("notification")
      ) {
        deactivateNotification();
        activateNotification(event.target);
      }
    } else {
      activateNotification(event.target);
    }
    // console.log('current notification is-> ',currentNotification)
  };
  // console.log("data ",userData);

    //  setAboutClass(userData?.tutorForm?.aboutYou)

    const handleChangeText =(event)=> {
        switch(event.target.id){
            case "about":   setAboutYou(event.target.value); break;
            case "ads"  :   setAboutClass(event.target.value); break;
            case "title":   setTitle(event.target.value);break;
            default: console.log("default");
        }
    }

    console.log("Profile Status ",userData?.tutorForm?.isProfileVerified);
    return(
        <div id='home-page-root-div'>
            <div id="home-page-details-div">
                <div className='row-div mb-12' id="first-row-home-page">
                    <div id='welcome-greeting-div' className="sub-container-div">
                        <span id='welcome-msg'>Welcome</span>
                        <span id='user-name'>{userData?.name?.split(" ")[0]}
                            {/* <span id='tutor-home-page-waving-hand'><MdWavingHand/></span> */}
                            {userData?.tutorForm?.isProfileVerified==="accepted" 
                            ?
                            <Tooltip title="Account Verified" placement="right" arrow>
                                <span id="verified-tag"><VscVerifiedFilled color="green" /></span>
                            </Tooltip>
                            :
                            userData?.tutorForm?.isProfileVerified === "pending" || userData?.tutorForm?.isProfileVerified === "reverted"
                            ?
                            <Tooltip title="Account Not Verified" placement="right" arrow>
                                <span id="verified-tag"><GoUnverified color="rgb(165, 58, 58)"/></span>
                            </Tooltip>
                            :
                            <Tooltip title="Account Rejected" placement="right" arrow>
                                <span id="verified-tag"><MdOutlineError color="rgb(165, 58, 58)"/></span>
                            </Tooltip>
                            }
                            

                            {/* 
                            
                                {userData?.tutorForm?.isProfileVerified === "pending" && (
                                    <div class="tutor-sub-container-div text-red-500 font-semibold flex justify-center flex-col">
                                    <div>:warning: Your Ads will be displayed to others only if your account is
                                    verified by the Admin.</div>
                                    <div>:warning:It will take 1-2 working days.</div>
                                    </div>
                                )}
                                {userData?.tutorForm?.isProfileVerified === "reverted" && (
                                    <div class="tutor-sub-container-div text-red-500 font-semibold flex justify-center flex-col">
                                    <div>:warning: Admin has reverted your profile.</div>
                                    <div>:warning: Please revisit your documents. </div>            </div>
                                    )}
                                {userData?.tutorForm?.isProfileVerified === "rejected" && (
                                    <div class="tutor-sub-container-div text-red-500 font-semibold flex justify-center flex-col">
                                    <div>:warning: Admin has rejected your profile.</div>
                                    <div>:warning: You cannot enroll as teacher. </div>            
                                    </div>
                                )}

                             */}
                        </span>
                        
                    </div>

                    {userData?.tutorForm?.isProfileVerified === "pending" && (
                        <div class="sub-container-div account-info-div">
                            <span>⚠ Account verification pending</span>
                            <span>⚠ Your Ads will be displayed to others only if your account is
                            verified by the Admin.</span>
                            <span>⚠ It may take upto 1-2 working days.</span>
                        </div>
                    )}
                    {userData?.tutorForm?.isProfileVerified === "reverted" && (
                        <div class="sub-container-div account-info-div">
                            <span>⚠ Admin has reverted your profile.</span>
                            <span>Reason: <span className="text-black">{userData?.tutorForm?.revertReason} multiple account exists with the same for the one user</span></span>            
                        </div>
                        )}
                    {userData?.tutorForm?.isProfileVerified === "rejected" && (
                        <div class="sub-container-div account-info-div">
                            <span>⚠ Admin has rejected your profile.</span>
                            <span>⚠ You cannot enroll as teacher. </span>            
                        </div>
                    )}

                    <div id='home-page-top-sub-div' style={{justifyContent:"flex-end"}}>
                        {
                            userData?.tutorForm?.isProfileVerified === "accepted"  && userData?.tutorForm?.avgRating>0 && 
                            <div className='sub-container-div' id="rating-div">
                                <div id='rating-outer-div'>
                                    <div id='rating-label-div'>
                                        Class Rating
                                    </div>
                                    <div id='user-rating-tag'>
                                        <div className='star'><MdOutlineStar/></div>
                                        <span id="rating">{userData?.tutorForm?.avgRating}</span>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='sub-container-div' id="date-time-block-div">
                            <DateTime/>
                        </div>
                    </div>
                </div>
                <div className='row-div' id='second-row'>
                    <div className='sub-container-div w-1/2'>
                        <div className='div-heading'>
                            ABOUT YOU
                            <div className='edit-button-div' >
                                {
                                    <EditButton inputBoxId="about" path="updateaboutyou" newData={aboutYou}/>
                                }
                            </div>
                        </div>
                        <div className='content-div medium-content-div'>
                            <textarea 
                            id="about"
                            onChange={handleChangeText}
                            className='textarea-input-box' 
                            placeholder="Type here ....." 
                            disabled 
                            value={aboutYou}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='sub-container-div w-1/2'>
                        <div className='div-heading'>
                            ABOUT CLASS
                            <div className='edit-button-div' >
                                <EditButton inputBoxId="ads" path="updateaboutclass" newData={aboutClass}/>
                            </div>
                        </div>
                        <div className='content-div medium-content-div'>
                            <textarea 
                            id="ads" 
                            onChange={handleChangeText}
                            className='textarea-input-box' 
                            placeholder="Type here ....." 
                            disabled 
                            value={aboutClass}>

                            </textarea>
                        </div>
                    </div>
                    <div className='sub-container-div w-1/2'>
                        <div className='div-heading'>
                            AD TITLE
                            <div className='edit-button-div' >
                                <EditButton inputBoxId="title" path="updatetitle" newData={title}/>
                            </div>
                        </div>
                        <div className='content-div medium-content-div'>
                            <textarea 
                            id="title" 
                            onChange={handleChangeText}
                            className='textarea-input-box' 
                            placeholder="Type here ....." 
                            disabled 
                            value={title}>

                            </textarea>
                        </div>
                    </div>
                </div>
                <div className='row-div' id="third-row">
                        <div className='sub-container-div' id='language-div'>
                            <div className='div-heading'>
                                LANGUAGES    
                                <div className="edit-button-div">
                                    <EditButton/>
                                </div>
                            </div>
                            <div className='content-div flex-wrap-class'>
                                {
                                    userData?.tutorForm.subjects.map((subject)=>{
                                        return <span className='requested-subject-span'>{subject}</span>
                                    })
                                }
                            </div>
                        </div>
                        <div className='sub-container-div' id='subjects-div'>
                            <div className='div-heading'>
                                SUBJECTS 
                                <div className="edit-button-div">
                                    <EditButton/>
                                </div>  
                            </div>
                            <div className='content-div flex-wrap-class'>
                                {
                                    userData?.tutorForm.language.map((item)=>{
                                        return <span className='requested-subject-span'>{item}</span>
                                    })
                                }
                            </div>
                        </div>
                        <div className='sub-container-div' id="rate-div">
                            <div className='div-heading'>
                                RATE 
                                <div className="edit-button-div">
                                    <EditButton inputBoxId="rate"/>
                                </div>  
                            </div>
                            <div className='content-div' id='rate-display-div'>
                                {/* <input type="text" className='dashboard-input-box' id="rate" value={userData?userData.tutorForm.rate:""}/> */}
                                <span style={{fontSize:"large"}}>
                                ₹<span style={{fontWeight:"bold"}}>{userData?userData.tutorForm.rate:""}</span>/hr
                                </span>
                            </div>
                        </div>
                        <div className='sub-container-div' id='teaching-mode-div'>
                            <div className='div-heading'>
                                TEACHING MODE
                                <div className="edit-button-div">
                                    <EditButton inputBoxId="mode-of-teach"/>
                                </div>  
                            </div>
                            <div className='content-div flex-wrap-class'>
                                {
                                    userData?.tutorForm.mode.map((item)=>{
                                        return <span className='requested-subject-span'>{item}</span>
                                    })
                                }
                            </div>
                        </div>
                </div>
                {currentNotification ?notificationDetailsPage():null}
            </div>
            {notificationList()}
        </div>
    )
}

export default HomePage;
