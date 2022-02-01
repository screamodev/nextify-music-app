import { useDispatch } from "react-redux";
import MainLayout from "../../components/MainLayout";
import { signOut } from "../../store/authSlice";

function MyProfilePage() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <MainLayout>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </MainLayout>
  );
}

export default MyProfilePage;
