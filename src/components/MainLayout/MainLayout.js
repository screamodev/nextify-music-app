import Nav from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import "./mainLayout.scss";

function MainLayout({ children }) {
  return (
    <>
      <div className="wrapper-main">
        <Sidebar />
        <div className="main-content">
          <Nav />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
