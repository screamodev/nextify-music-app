import Footer from "../Footer";
import Sidebar from "../Sidebar";
import "./mainLayout.scss";

function MainLayout({ children }) {
  return (
    <>
      <div className="upper-content">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
