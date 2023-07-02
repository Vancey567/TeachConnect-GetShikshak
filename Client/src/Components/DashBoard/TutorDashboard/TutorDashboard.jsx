import { useState, useEffect } from "react";
import "../style.css";
import ProfileDetails from "./ProfileDetails";
import HomePage from "./HomePage";
import EditButton from "../EditButton";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authTokenAtom, userDataAtom } from "../../../Atom";
import AccountSettings from "../AccountSettings";
import ListingItems from "../ListingItems";
import { GiBookCover } from "react-icons/gi";
import {Link, useNavigate} from "react-router-dom"
import { useLottie } from "lottie-react";
import LoadingLottie from "../../../../src/assets/lf30_ykdoon9j.json";
import { useSnackbar } from "notistack";


function TutorDashboard() {
  // console.log("DashBoard Rendered");

  const setCurrentUser = useSetRecoilState(userDataAtom);
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  const [pageId, setPageId] = useState(0);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchStudents = async () => {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/tutor/getmystudents`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("clases", response.data.filtered);
    const fetchedStudent = response.data.filteredStudents;
    const fetchedClass = response.data.filteredClasses;
    setStudents(fetchedStudent);
    setClasses(fetchedClass);
  };

  const fetchData = async () => {
    let response = await axios({
      url: `${import.meta.env.VITE_API_URL}/dashboard/userdata`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setUserData(response.data.user);
    setIsLoading(false);
    console.log("In Home ", userData);
    //JSON.parse(JSON.stringify(
    //console.log(userData);
  };

  useEffect(() => {
    fetchData();
    fetchStudents();
  }, []);

  function handleClick(id) {
    console.log(id);
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
    //);
    // console.log("inside renderpage");
    switch (id) {
      case 0:
        return <HomePage fetchedData={userData} />;
      case 1:
        return <ProfileDetails fetchedData={userData} />;
      case 2:
        if (userData?.tutorForm?.isProfileVerified === "accepted") {
          return (
            <ListingItems
              pageheading={"Students List"}
              receivedData={students}
              listName={"Students"}
            />
          );
        } else {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h1
                style={{
                  fontSize: "x-large",
                  textAlign: "center",
                  backgroundColor: "lightcyan",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                {userData?.tutorForm?.isProfileVerified === "pending" ? (
                  <>
                    <span>
                      Account Verification{" "}
                      {userData?.tutorForm?.isProfileVerified.toUpperCase()}
                    </span>
                    <span style={{ display: "block" }}>No Students Yet</span>
                  </>
                ) : (
                  <span>
                    Account{" "}
                    {userData?.tutorForm?.isProfileVerified.toUpperCase()}
                  </span>
                )}
              </h1>
            </div>
          );
        }
      case 3:
        if (userData?.tutorForm?.isProfileVerified === "accepted") {
          return (
            <ListingItems
              pageheading={"Students List"}
              receivedData={classes}
              listName={"Classes"}
            />
          );
        } else {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h1
                style={{
                  fontSize: "x-large",
                  textAlign: "center",
                  backgroundColor: "lightcyan",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                {userData?.tutorForm?.isProfileVerified === "pending" ? (
                  <>
                    <span>
                      Account Verification{" "}
                      {userData?.tutorForm?.isProfileVerified.toUpperCase()}
                    </span>
                    <span style={{ display: "block" }}>No Classes Yet</span>
                  </>
                ) : (
                  <span>
                    Account{" "}
                    {userData?.tutorForm?.isProfileVerified.toUpperCase()}
                  </span>
                )}
              </h1>
            </div>
          );
        }
      case 4:
        return (
          <AccountSettings
            status={userData.isAccountActive}
            userRole={userData.role}
          />
        );
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
              <span className="logoName tracking-wider">
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
                    {/* {userData || "Showed"} */}
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
                    Students
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
                    Classes
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

export default TutorDashboard;
