import preloader from "../../../assets/svgs/preloader.svg";
import "./preLoader.scss";

function PreLoader() {
  return (
    <div className="preloader">
      <img className="preloader-image" src={preloader} alt="loading..." />
    </div>
  );
}

export default PreLoader;
