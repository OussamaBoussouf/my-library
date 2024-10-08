import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Auth() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" />;
  
  return <Outlet />;
}

export default Auth;
