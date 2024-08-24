import { GrUserWorker } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { err_m } from "../../Components/Mess";
import Cookie from "cookie-universal";

import { ToastContainer } from "react-toastify";

export default function Register2() {
  // Cookies
  const cookie = Cookie();

  // Handle Submite
  function handleSubmit(e) {
    e.preventDefault();
    try {
      window.location.pathname = "/register2";
    } catch (err) {
      console.log(err);

      err_m(err);
    }
  }

  return (
    <div className="body">
      <div className="wrapperRegister2 col-lg-4 col-md-6 col-11">
        <div className="form-box register">
          <form action="">
           
            <h3>Select account type</h3>
            <p>Sorry! this can't be changed later</p>
            <button
              type="submit"
              className="user_Admin"
              onClick={(e) => {
                cookie.set("user_type", 2);
                handleSubmit(e);
              }}
            >
              <GrUserWorker className="B_icon" />
              I Want to Work
              <FaArrowRightLong className="B_icon" />
            </button>
            <button
              className="user_Admin"
              onClick={(e) => {
                cookie.set("user_type", 1);
                handleSubmit(e);
              }}
            >
              <FaBuilding className="B_icon" />
              Search Employe
              <FaArrowRightLong className="B_icon" />
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
