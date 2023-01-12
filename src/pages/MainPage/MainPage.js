import { useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout";
import "./mainPage.scss";

function MainPage() {
  const { name } = useSelector((state) => state.auth.user);

  return (
    <MainLayout>
      <div className="main-greeting">
        <p className="main-greeting-text">Welcome to Nextify, {name}!</p>
      </div>
    </MainLayout>
  );
}

export default MainPage;
