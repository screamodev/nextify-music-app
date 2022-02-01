import { useDispatch } from "react-redux";
import PlayerLayout from "../../components/PlayerLayout";
import { signOut } from "../../store/authSlice";

function MyProfilePage() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <PlayerLayout>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </PlayerLayout>
  );
}

export default MyProfilePage;
