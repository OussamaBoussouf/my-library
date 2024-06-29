import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate("-1");
    return;
  }
  return <Outlet />;
}

export default Auth;
