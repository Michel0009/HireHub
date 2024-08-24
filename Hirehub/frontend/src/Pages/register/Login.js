import { useEffect, useState } from "react";
import "./Register.css";
import "./User.css";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LOGIN, baseURL } from "../../Api/Api";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { err_m, err_s } from "../../Components/Mess";
import Cookie from "cookie-universal";

export default function Login() {
  // Cookies
  const cookie = Cookie();

  // states
  const [form, setForm] = useState({
    login_type: "",
    password: "",
  });

  // Handel Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Submite
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res = await axios.post(`${baseURL}/${LOGIN}`, form);

      if (res.status === 200 && res.data.message === "Welcome") {
        cookie.set(`token`, res.data.token);
        cookie.set("user_type", res.data["user type"]);
        cookie.set("user_name", res.data["user name"]);
        if (cookie.get("user_type") === 1) {
          window.location.replace("/company-home");
        } else if (cookie.get("user_type") === 2) {
          window.location.replace("/employee-home");
        } else if (cookie.get("user_type") === 3) {
          window.location.replace("/all-posts");
        }
        err_s("welcome " + cookie.get("user_name"));
      }
      if (
        res.status === 200 &&
        res.data[0] === "Your Password is incorrect..Please try again"
      ) {
        err_m("Your Password is incorrect..Please try again");
      } else {
        err_m(res.data[0]);
      }
      if (
        res.status === 200 &&
        res.data.massage ===
          "you have not complete your register before .. you can not reach this account"
      ) {
        err_m(res.data.massage);
      }
      if (
        res.status === 200 &&
        res.data.message === "You are panned from using this web application."
      ) {
        err_m(res.data.message);
      }
     ;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="body">
      <div className="wrapperLogin col-lg-4 col-md-5 col-11">
        <div className="form-box login">
          <form onSubmit={handleSubmit} action="">
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email or Username"
                name="login_type"
                value={form.login_type}
                onChange={handleChange}
                required
              />
              <MdEmail className="icons" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icons" />
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Create account ...
                <a href="./register">Register</a>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
