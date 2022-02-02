import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import "./mainLayout.scss";

function MainLayout({ children }) {
  return (
    <>
      <div className="wrapper-main">
        <Sidebar />
        <div className="main-content">
          <Header />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
