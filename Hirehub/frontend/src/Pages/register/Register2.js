import { useEffect, useState } from "react";
import "./Register.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { REGISTER1, baseURL } from "../../Api/Api";
import { err_s } from "../../Components/Mess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Components/Test";
import Cookie from "cookie-universal";
import Test from "../../Components/Test";

export default function Register1() {
  // Cookies
  const cookie = Cookie();

  // states
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    user_type: cookie.get("user_type"),
  });
  cookie.set("username", form.username);
  const [accept, setAccept] = useState(false);

  const [passwordR, setpasswordR] = useState("");
  const [errN, seterrN] = useState("");
  const [errE, seterrE] = useState("");
  const [errP, seterrP] = useState("Password must be more than 8 char");
  const [errR, seterrR] = useState("Passwords do not match");
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (form.password.length < 8) {
      seterrP("Password must be more than 8 char");
    }
    if (passwordR !== form.password) {
      seterrR("Passwords do not match");
    }
  }, [passwordR, form.password]);

  // Handel Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Submite
  async function handleSubmit(e) {
    e.preventDefault();
    setAccept(true);
    if (form.password.length >= 8 && passwordR === form.password) {
      setLoading(true);
      try {
        let res = await axios.post(`${baseURL}/${REGISTER1}`, form);
        const token = res.data.token;
        cookie.set("token", token);
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          window.location.pathname = "/verify";
        }
      } catch (err) {
        setLoading(false);
        console.error(err);

        if (err.response.data["errors"]["email"] !== undefined) {
          if (
            err.response.data["errors"]["email"][0] ===
            "The email has already been taken."
          ) {
            seterrE(err.response.data["errors"]["email"][0]);
          }
        }
        if (err.response.data["errors"]["username"] !== undefined) {
          if (
            err.response.data["errors"]["username"][0] ===
            "The username has already been taken."
          ) {
            seterrN(err.response.data["errors"]["username"][0]);
          }
        }
      }
    }
  }

  return loading ? (
    <Test />
  ) : (
    <div className="body">
      <div className="wrapperRegister col-lg-4 col-md-6 col-11">
        <div className="form-box register ">
          <form onSubmit={handleSubmit} action="">
            <h1>Register</h1>

            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={(e) => {
                  handleChange(e);
                  seterrN("");
                }}
                required
              />
              <FaUser className="icons" />
            </div>

            {accept && errN !== "" && <p className="err_msg">{errN}</p>}

            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => {
                  handleChange(e);
                  seterrE("");
                }}
                required
              />
              <MdEmail className="icons" />
            </div>
            {accept && errE !== "" && <p className="err_msg">{errE}</p>}

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => {
                  seterrP("");
                  handleChange(e);
                }}
                required
              />
              <FaLock className="icons" />
            </div>
            {form.password.length < 8 && accept && errP !== "" && (
              <p className="err_msg">{errP}</p>
            )}
            <div className="input-box">
              <input
                type="password"
                name="passwordR"
                value={passwordR}
                onChange={(e) => {
                  seterrR("");
                  setpasswordR(e.target.value);
                  if (passwordR !== form.password) {
                    seterrR("Passwords do not match");
                  }
                }}
                placeholder="Repeat password"
                required
              />
              <FaLock className="icons" />
            </div>
            {passwordR !== form.password && accept && errR !== "" && (
              <p className="err_msg last_one">{errR}</p>
            )}

            {/* onClick={seterr && err_m} */}
            <button type="submit">Register</button>
            <div className="register-link">
              <p>
                Have an account ...
                <a href="./login">Login</a>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
