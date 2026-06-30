import { useUserStore } from "../store/userStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const { user } = useUserStore();

  if (!user) {
    return <Navigate to={"/login"} />
  }

  return <Outlet />
}

export default ProtectedRoute;