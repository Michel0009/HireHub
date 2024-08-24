import { TiUser } from "react-icons/ti";
import { FaFlag, FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { USER, baseURL, headers, showAllDomians } from "../../Api/Api";
import axios from "axios";
import { err_m, err_s } from "../../Components/Mess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import Test from "../../Components/Test";

export default function User() {
  let showDomains;
  // Cookies
  const cookie = Cookie();
  const navigate = useNavigate();

  // states
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    country: "",
    date: "",
    phone_number: "",
    domain: "",
  });
  const [domains, setDomains] = useState();
  const [loading0, setLoading0] = useState(true);
  const [loading, setLoading] = useState(false);
  const UserNa = cookie.get("username");

  useEffect(() => {
    getAllDomians();
  }, []);
  // Handel Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(`${baseURL}/${USER}/${UserNa}`, form);

      if (res.data.message === "Employee has created Succefully.") {
        setLoading(false);
        err_s(res.data.message);
        navigate("/employee-home");
      } else if (res.data[0] === "You already have an account.") {
        setLoading(false);
        err_m(res.data[0]);
      }
    } catch (err) {
      setLoading(false);
      err_m(err.request.data.message);
      console.log(err);
    }
  }
  async function getAllDomians() {
    try {
      let response = await axios.get(`${baseURL}/${showAllDomians}`, {
        headers: headers,
      });
      setDomains(response.data[0]);
      setLoading0(false);
    } catch (error) {
      setLoading0(false);
      if (error.response.status === 401) {
        navigate("/", { replace: true });
      } else {
        console.log(error);
      }
    }
  }
  if (domains) {
    showDomains = domains.map((domain, index) => (
      <option key={index}>{domain.domain}</option>
    ));
  }
  return (loading||loading0)? <Test/>:
    <div className="body">
      <div className="wrapper_user  col-lg-6 col-md-7 col-11">
        <div className="form-box register">
          <h3>Please enter you information</h3>

          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">First name:</label>

              <input
                type="text"
                className="form-input"
                id="first"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />
              <TiUser className="icon" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last name</label>
              <input
                type="text"
                className="form-input"
                id="last"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
              />
              <TiUser className="icon" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-input"
                id="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              />
              <FaFlag className="icon2" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="number"
                inputMode="numeric"
                className="form-input"
                id="phone"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
              />
              <FaPhoneAlt className="icon2" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Birthdate:</label>
              <input
                type="date"
                className="form-input"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6" style={{ marginBottom: "30px" }}>
              <label className="form-label">Your domain</label>
              <select
                className="form-select2"
                aria-label="Default select example"
                id="domain"
                name="domain"
                value={form.domain}
                onChange={handleChange}
                required
              >
                <option disabled={true} value="">
                  Open this select menu
                </option>
                {showDomains}
              </select>

              <FaChevronDown className="icon3" />
            </div>

            <button className="user_button" type="submit">
              Next
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>

}
