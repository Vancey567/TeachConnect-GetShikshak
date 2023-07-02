import { Navigate,Outlet,useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authTokenAtom ,userDataAtom} from "../Atom";

const PrivateRoute=({allowedRole})=>{
    const location = useLocation();
    // console.log("location in private",location);
    const token = useRecoilValue(authTokenAtom);
    const user=useRecoilValue(userDataAtom);

    // console.log("sss",allowedRole)
    // console.log("role",user?.role)

    return (
        user?.role===`${allowedRole}`
        ?<Outlet/> 
        :token 
            ? <Navigate to="*" state={{from:location}} replace/>
            : <Navigate to="/login" state={{from:location}} replace/>
        )
};
export default PrivateRoute;