import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useRecoilState } from "recoil";
import { authTokenAtom, userDataAtom } from "../../Atom";

export default function TutorCard({ tutor }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const authToken = JSON.parse(sessionStorage.getItem("token"))
  // const userData = JSON.parse(sessionStorage.getItem("user"))
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  console.log("userdata in reservercard", userData?.role);
  const handleClick = () => {
    const url = `/reserveClass/${tutor._id}`;

    if (authToken && userData?.isProfileCompleted===true) navigate(url);
    else if(authToken && userData?.isProfileCompleted===false){
      enqueueSnackbar("Complete profile to reserve a class", { variant: "warning" });
      navigate('/studentcompleteprofile')
    }
    else{
      enqueueSnackbar("Login to reserve a class", { variant: "warning" });
      navigate("/login", { state: { from: location }, replace: true });
    }
   
  };
  return (
    <>
      <div className="bg-white shadow-xl p-8 rounded-xl">
        <div className="flex justify-center p-4">
          <img
            src={`${import.meta.env.VITE_API_URL}/assets/${tutor?.profilePic}`}
            alt=""
            className="rounded-full w-36 h-36 object-cover"
          />
        </div>
        <div className="p-2">
          <h3 className="text-center text-2xl text-gray-900 font-bold leading-8 ">
            {tutor?.name}
          </h3>
          {tutor?.tutorForm?.avgRating>0 && 
            <div className="text-center text-gray-400 font-semibold flex items-center justify-center ">
              {tutor?.tutorForm?.avgRating}<span className="text-xs ml-2">⭐</span>
            </div>
          }
          <div className="flex justify-center">
            <table className="text-sm my-3 ">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Address
                  </td>
                  <td className="px-2 py-2">{tutor?.tutorForm?.city}</td>
                </tr>

                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Email
                  </td>
                  <td className="px-2 py-2">{tutor?.email}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Hourly fee
                  </td>
                  <td className="px-2 py-2">₹{tutor?.tutorForm?.rate}/hr</td>
                </tr>
              </tbody>
            </table>
          </div>
          {userData?.role !== "admin" && userData?.role !== "tutor" && (
           <div className="text-center">
           <button onClick={handleClick} className="my-5  text-white bg-primary-color p-4 rounded-lg">
             <span> Reserve the class</span>
            </button>
           </div>
          )}
          
        </div>
      </div>
    </>
  );
}
