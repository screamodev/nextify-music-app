import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AUTH_PAGE } from "../../../constants/routes";

function ProtectedPage() {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={AUTH_PAGE} state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedPage;
