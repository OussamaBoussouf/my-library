import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Auth() {
  const { user } = useAuth();

  if (user) {
    history.go(-1);
    return;
  }
  
  return <Outlet />;
}

export default Auth;
