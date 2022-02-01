import Footer from "../Footer";
import Sidebar from "../Sidebar";
import "./authLayout.scss";

function AuthLayout({ children }) {
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

export default AuthLayout;
