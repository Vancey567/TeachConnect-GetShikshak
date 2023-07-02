import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import axios from "axios";
import ListingItems from "../ListingItems";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authTokenAtom, userDataAtom } from "../../../Atom";
import { GiBookCover } from "react-icons/gi";
import {Link,useNavigate} from "react-router-dom";
import { useSnackbar } from "notistack";



function AdminDashboard() {
  const [pageId, setPageId] = useState(0);
  const [students,setStudents]=useState([]);
  const [tutors,setTutors]=useState([]);
  const [classes, setClasses]=useState([]);
  const [user,setUser]=useState(null);
  // const authToken = JSON.parse(sessionStorage.getItem("token"));
  const setCurrentUser = useSetRecoilState(userDataAtom);
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // console.log(authToken);

  function removeToken() {
    // console.log("Inside logout");
    sessionStorage.clear();
    enqueueSnackbar("Logout Successfull !", { variant: "success" });
    // window.location.reload(); // Reload the window
    setCurrentUser(null);
    setAuthToken(null);
    navigate("/login");
  }

  const fetchStudent=async()=>{
    const response = await axios({
        url:`${import.meta.env.VITE_API_URL}/user/getstudents`,
        method:"GET"
    })
    // console.log("student",response.data.filteredStudents);
    const fetchedStudent=response.data.filteredStudents;
    setStudents(fetchedStudent);

  }

  const fetchTutor=async()=>{
    const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/user/gettutors`,
        method:"GET"
    })
    // console.log("tutor",response.data.filteredTutors);
    const fetchedTutors=response.data.filteredTutors;
    setTutors(fetchedTutors);
  }

  // const fetchStudent=async()=>{
  //   const response = await axios({
  //       url:"http://localhost:3000/user/getstudents",
  //       method:"GET"
  //   })
  //   // console.log("student",response.data.filteredStudents);
  //   const fetchedStudent=response.data.filteredStudents;
  //   setStudents(fetchedStudent);

  // }

  console.log("students",students);
  const fetchCurrentUser=async()=>{
    console.log("inside fatch admin")
    const response = await axios({
        url:`${import.meta.env.VITE_API_URL}/dashboard/userdata`,
        method:"GET",
        headers:{
            "Authorization":`Bearer ${authToken}`
        }
    })

    // headers:{
    //     "Content-Type":"application/json",
    //     "Authorization":`Bearer ${authToken}`
    //   }
    console.log("admin response",response.data.user);
    const fetchedData=response.data.user;
    setUser(fetchedData);
  }

  useEffect(()=>{
    fetchStudent();
    fetchTutor();
    fetchCurrentUser();
  },[])
  function handleClick(id) {
    switch (id) {
      case "0":
        setPageId(0);
        break;
      case "1":
        setPageId(1);
        break;
      case "2":
        setPageId(2);
        break;
      case "3":
        setPageId(3);
        break;
      case "4":
        setPageId(4);
        break;
      default:
        console.log("Default of Handle Click");
    }
  }

  const sidebarOptions = ["Home","Tutors", "Students", "Classes"];

  function renderPage(id) {
    switch (id) {
      case 0:
        return (<HomePage students={students} tutors={tutors} currentUser={user}/>);
      case 1:
        return (<ListingItems pageheading={"Tutors List"} receivedData={tutors}/>);
      case 2:
        return (<ListingItems pageheading={"Students List"} receivedData={students}/>);
      case 3:
        return (<><h1>Classes</h1></>);
      case 4:
        return (<><h1>AdvertiseInfo</h1></>);
      default:
        console.log("Default");
    }
  }
  return (
    <div id="dashboard-div">
      <div className="dashboard-sub-div" id="dashboard-left-sub-div">
        <div id="dashboard-left-sub-container-div">
          {/* <div id="logo"> */}
          <span className="logoName tracking-wider ">
            <Link className="flex justify-center items-center py-6" to="/">
              <GiBookCover size="2.4em" color="white" />
              <span className="mx-1 text-white text-lg font-semibold">
                TeachConnect
              </span>
            </Link>
          </span>
          {/* </div> */}

          <div id="dashboard-profile-section">
            <div id="profile-pic-section">
              <div className="w-[40%] h-[60%] text-4xl">
                {/* <FcManager/> */}
                <div className="flex justify-center items-center bg-white h-[100px] w-[100px] rounded-full">
                {user?.name?.toString()[0]?.toUpperCase()}
                </div>
                {/* <img
                  id="profile-image"
                  alt="image"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                /> */}
                {/* <div id="edit-profile-button">
                  <EditButton bgcolor="lightgray" />
                </div> */}
              </div>
            </div>
          </div>
          <div id="dashboard-menu-section">
            <div id="dashboard-menu-top-div">
              {sidebarOptions.map((option,index) => {
                return (
                  <>
                    <button
                      className="dashboard-menu-options"
                      onClick={(e) => {
                        handleClick(e.target.id);
                      }}
                      key={index}
                      id={index}
                    >
                      {option}
                    </button>
                  </>
                );
              })}
             
            </div>
            <div id="dashboard-menu-bottom-div">
              <button className="btn-class" id="log-out-btn" onClick={()=>{removeToken()}}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-sub-div" id="dashboard-right-sub-div">
        <div id="dashboard-details-container-div">{renderPage(pageId)}</div>
      </div>
    </div>
  );
}
export default AdminDashboard;
