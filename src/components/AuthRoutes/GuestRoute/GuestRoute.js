import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { MAIN_PAGE } from "../../../constants/routes";

function GuestRoute() {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={MAIN_PAGE} state={{ from: location }} />;
  }

  return <Outlet />;
}

export default GuestRoute;
