import "./User.css";
import { TiUser } from "react-icons/ti";
import { FaFlag, FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { COMP, baseURL, headers, showAllDomians } from "../../Api/Api";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { err_m, err_s } from "../../Components/Mess";
import { GiWallet } from "react-icons/gi";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import Test from "../../Components/Test";

export default function Comp() {
  let showDomains;
  //useNavigate
  const navigate = useNavigate();
  // Cookies
  const cookie = Cookie();

  // useState
  const [form, setForm] = useState({
    company_Name: "",
    country: "",
    phone_number: "",
    domain: "",
    description: "",
    account_number: "",
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

  // Handle Submite
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(`${baseURL}/${COMP}/${UserNa}`, form);
      if (res.data.message == "Company has created Succefully.") {
        setLoading(false);
        err_s("Company has created Succefully.");
        navigate("/company-home");
      }
      if (res.data[0] == "You already have company.") {
        setLoading(false);
        err_m("You already have company.");
      }
    } catch (err) {
      setLoading(false);
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
      <div className="wrapper_comp col-lg-6 col-md-7 col-11">
        <div className="form-box register">
          <h3 className="mb-4">Pleas enter your company information</h3>

          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="company_Name" className="form-label">
                Company name:
              </label>

              <input
                type="text"
                className="form-input"
                id="company_Name"
                name="company_Name"
                value={form.company_Name}
                onChange={handleChange}
                required
              />
              <TiUser className="icon" />
            </div>

            <div className="col-md-6">
              <label htmlFor="Country" className="form-label">
                Country
              </label>
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
              <label htmlFor="phone_number" className="form-label">
                Phone
              </label>
              <input
                type="number"
                inputMode="numeric"
                className="form-input"
                id="phone_number"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
              />
              <FaPhoneAlt className="icon2" />
            </div>

            <div className="col-md-6">
              <label htmlFor="domain" className="form-label">
                Your company domain
              </label>
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

            <div className="acc-n col-md-6">
              <label htmlFor="account_number" className="form-label">
                Account number
              </label>
              <input
                type="number"
                inputMode="numeric"
                className="form-input"
                id="account_number"
                name="account_number"
                value={form.account_number}
                onChange={handleChange}
                required
              />
              <GiWallet className="icon2" />
            </div>

            <div className="col-12" style={{ marginTop: "10px" }}>
              <label htmlFor="description" className="form-label">
                Describtion
              </label>
              <textarea
                className="form-control-dess"
                type="text"
                placeholder="please enter more info about your company...."
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit">Next</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  
}
