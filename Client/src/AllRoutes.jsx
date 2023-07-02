import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Landing from "./Components/Landing/Landing";
import SearchResult from "./Components/SearchResult";
import StudentDashboard from "./Components/DashBoard/StudentDashboard/StudentDashboard";
import TutorDashboard from "./Components/DashBoard/TutorDashboard/TutorDashboard";
import TutorProfile from "./Components/TutorProfile/TutorProfile";
import ReserveClass from "./ReserveClass";
import NoResultPage from "../src/Components/NoResultPage";
import NotFound from "../src/Components/NotFound";
import AdminDashboard from "./Components/DashBoard/AdminDashboard/AdminDashboard";
import TutorCompleteProfile from "./Components/TutorCompleteProfile/TutorCompleteProfile";
import StudentCompleteProfile from "./Components/StudentCompleteProfile";
import { useRecoilValue } from "recoil";
import { authTokenAtom, userDataAtom } from "./Atom";
import PrivateRoute from "./Components/PrivateRoute";
import PasswordReset from "./Components/PasswordReset.jsx";
import ForgotPassword from "./Components/DashBoard/ForgotPassword.jsx";


function AllRoutes() {

  // console.log("inside all routes")
  // const authToken =useRecoilValue(authTokenAtom);

  // const authToken = useRecoilValue(authTokenAtom);
  const userData = useRecoilValue(userDataAtom);

  // console.log("authtoken wow", authToken,userData);
  return (
    <Routes>
      <Route path="/search" element={<SearchResult />} />
      <Route path="/user/:id" element={<TutorProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/noresult" element={<NoResultPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Landing />} />
      <Route path="/password-reset" element={<PasswordReset/>}/>
      <Route path="/forgotpassword/:id" element={<ForgotPassword />} />

      <Route element={<PrivateRoute allowedRole="tutor" />}>
        <Route path="/tutordashboard" element={<TutorDashboard />} />
        <Route
          path="/tutorcompleteprofile"
          element={<TutorCompleteProfile />}
        />
        {/* <Route path="/" element={<Landing />} /> */}
      </Route>

      <Route element={<PrivateRoute allowedRole="student"/>}>
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route
          path="/studentcompleteprofile"
          element={<StudentCompleteProfile />}
        />
        <Route path="/reserveclass/:id" element={<ReserveClass />} />
        {/* <Route path="/" element={<Landing />} /> */}
      </Route>
      <Route element={<PrivateRoute allowedRole="admin" />}>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        {/* <Route path="/" element={<Landing />} /> */}
      </Route>
    </Routes>
  );
}

export default AllRoutes;
