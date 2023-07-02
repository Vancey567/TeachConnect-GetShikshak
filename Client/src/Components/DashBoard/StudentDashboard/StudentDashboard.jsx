import { useState, useEffect } from "react";
import "../style.css";
// import ProfileDetails from './ProfileDetails';
import HomePage from "./HomePage";
import EditButton from "../EditButton";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authTokenAtom, userDataAtom } from "../../../Atom";
import AccountSettings from "../AccountSettings";
import ListingItems from "../ListingItems";
import { useLottie } from "lottie-react";
import LoadingLottie from "../../../../src/assets/lf30_ykdoon9j.json";
import ProfileDetails from "./ProfileDetails";
import { GiBookCover } from "react-icons/gi";
import {Link,useNavigate} from "react-router-dom";
import { useSnackbar } from "notistack";

function StudentDashboard() {
  // console.log("DashBoard Rendered");

  const [pageId, setPageId] = useState(0);
  // const [authToken,setAuthToken] = useRecoilState(authTokenAtom);
  // const authToken = JSON.parse(sessionStorage.getItem("token"));
  const setCurrentUser = useSetRecoilState(userDataAtom);
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  // const [myClasses, setMyClasses] = useRecoilState(studentsClassesAtom);

  const [userData, setUserData] = useState([]);
  const [allClassRequests, setAllClassRequests] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const [myTutors, setMyTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function removeToken() {
    // console.log("Inside logout");
    sessionStorage.clear();
    enqueueSnackbar("Logout Successfull !", { variant: "success" });
    // window.location.reload(); // Reload the window
    setCurrentUser(null);
    setAuthToken(null);
    navigate("/login");
  }

  const options = {
    animationData: LoadingLottie,
    loop: true,
  };

  const { view } = useLottie(options);

  const fetchData = async () => {
    let response = await axios({
      url: `${import.meta.env.VITE_API_URL}/dashboard/userdata`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setUserData(response.data.user);
  };

  const fetchAllClassRequest = async () => {
    let response = await axios({
      url: `${import.meta.env.VITE_API_URL}/dashboard/classrequest`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("All class ", response.data);
    const filteredData = response?.data?.map((classObj, index) => {
      return {
        key:index,
        ["tutor name"]: classObj.tutorId.name,
        subjects: classObj.subjects,
        mode: classObj.mode,
        fee: classObj.tutorId.tutorForm.rate,
        status: classObj.isAccepted,
      };
    });

    const acceptedClasses = response?.data
      ?.map((classObj, index) => {
        return {
          key:index,
          ["class id"]: classObj._id,
          ["tutor name"]: classObj.tutorId.name,
          subjects: classObj.subjects,
          mode: classObj.mode,
          fee: classObj.tutorId.tutorForm.rate,
          status: classObj.isAccepted,
          feedback: "feedback",
        };
      })
      .filter((classObj) => {
        return classObj.status === "accepted";
      });

    const tutorsList = response?.data
      ?.filter((classObj) => {
        return classObj.isAccepted === "accepted";
      })
      .map((classObj) => {
        return {
          ["tutor name"]: classObj.tutorId.name,
          email: classObj.tutorId.email,
          phone: classObj.tutorId.phone,
          ["account status"]: classObj.tutorId.isAccountActive,
        };
      });

    setAllClassRequests(filteredData);
    setMyClasses(acceptedClasses);
    setMyTutors(tutorsList);
    console.log("Tutors ", myTutors);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchAllClassRequest();
  }, []);

  function handleClick(id) {
    // console.log(id);
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

  function renderPage(id) {
    switch (id) {
      case 0:
        return (
          <HomePage
            fetchedData={userData}
            allClassRequests={allClassRequests}
          />
        );
      case 1:
        return <ProfileDetails fetchedData={userData} />;
      case 2:
        return (
          <ListingItems
            pageheading={"Tutors List"}
            receivedData={myTutors}
            listName={"Tutors"}
          />
        );
      case 3:
        return (
          <ListingItems
            pageheading={"Classes List"}
            receivedData={myClasses}
            listName={"Classes"}
          />
        );
      case 4:
        return <AccountSettings status={userData.isAccountActive} />;
      default:
        console.log("Default");
    }
  }

  return (
    <div id="dashboard-div">
      {isLoading ? (
        <div>{view}</div>
      ) : (
        <>
          <div className="dashboard-sub-div" id="dashboard-left-sub-div">
            <div id="dashboard-left-sub-container-div">
              <span className="logoName tracking-wider ">
                <Link className="flex justify-center items-center py-6" to="/">
                  <GiBookCover size="2.4em" color="white" />
                  <span className="mx-1 text-white text-lg font-semibold">
                    TeachConnect
                  </span>
                </Link>
              </span>

              <div id="dashboard-profile-section">
                <div id="profile-pic-section">
                  <div id="profile-pic">
                    {/* <FcManager/> */}
                    <img
                      id="profile-image"
                      alt="image"
                      src={`${import.meta.env.VITE_API_URL}/assets/${userData?.profilePic}`}
                    />
                    <div id="edit-profile-button">
                      <EditButton bgcolor="lightgray" />
                    </div>
                  </div>
                </div>
                <div id="profile-info-section">
                  {/* <p id='user-name'>{newTutorData.name}</p> */}
                  {/*  */}
                </div>
              </div>

              <div id="dashboard-menu-section">
                <div id="dashboard-menu-top-div">
                  <button
                    className="dashboard-menu-options"
                    onClick={(e) => {
                      handleClick(e.target.id);
                    }}
                    id={0}
                  >
                    {/* <d className='menu-option-label-outer-div'>
                                        <div className='menu-option-label-icon'>
                                            <AiOutlineHome/>
                                        </div> */}
                    Home
                    {/* {fetchedResponse || "Showed"} */}
                    {/* <Link to="/">Profile Section</Link> */}
                  </button>
                  <button
                    className="dashboard-menu-options"
                    onClick={(e) => {
                      handleClick(e.target.id);
                    }}
                    id={1}
                  >
                    {/* <div className='menu-option-label-outer-div'>
                                        <div className='menu-option-label-icon'>
                                            <AiOutlineProfile/>
                                        </div> */}
                    Profile
                    {/* <Link to="/">Profile Section</Link> */}
                  </button>
                  <button
                    className="dashboard-menu-options"
                    onClick={(e) => {
                      handleClick(e.target.id);
                    }}
                    id={2}
                  >
                    {/* <div className='menu-option-label-icon'>

                                    </div> */}
                    My Tutors
                  </button>
                  <button
                    className="dashboard-menu-options"
                    onClick={(e) => {
                      handleClick(e.target.id);
                    }}
                    id={3}
                  >
                    {/* <div className='menu-option-label-icon'>

                                    </div> */}
                    My Classes
                  </button>
                  <button
                    className="dashboard-menu-options"
                    onClick={(e) => {
                      handleClick(e.target.id);
                    }}
                    id={4}
                  >
                    {/* <div className='menu-option-label-icon'>

                                    </div> */}
                    Settings
                  </button>
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
        </>
      )}
    </div>
  );
}

export default StudentDashboard;
