import { FaClock, FaFlag } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { MdChecklist } from "react-icons/md";
import { GiStrong } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { err_s } from "../../Components/Mess";
import { baseURL, editPost, headers, showPostDetails } from "../../Api/Api";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Test from "../../Components/Test";

export default function EditPost() {
  const nav = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    getPostDetails();
  }, []);
  // states

  const [form, setForm] = useState({
    salary: "",
    jop_description: "",
    work_type: "",
    work_time: "",
    requirements: "",
    experience_years: "",
    domain: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);

  // err msg

  // Handel Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Submite
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading1(true);
    try {
      let res = await axios.post(`${baseURL}/${editPost}/${id}`, form, {
        headers: headers,
      });
      if (res.data.message === "Post had beed edited Successfully.") {
        setLoading1(false);
        setTimeout(() => {
          err_s(res.data.message);
        }, 1000);

        setTimeout(() => {
          nav("/myposts");
        }, 3000);
      }
    } catch (err) {
      setTimeout(() => {
        setLoading1(false);
        console.log(err);
      }, 2000);
    }
  }
  async function getPostDetails() {
    try {
      let response = await axios.get(`${baseURL}/${showPostDetails}/${id}`, {
        headers: headers,
      });
      setForm({
        salary: response.data["Post Details"].salary,
        jop_description: response.data["Post Details"].jop_description,
        work_type: response.data["Post Details"].work_type,
        work_time: response.data["Post Details"].work_time,
        requirements: response.data["Post Details"].requirements,
        experience_years: response.data["Post Details"].experience_years,
        domain: response.data.Domain.domain,
        location: response.data["Post Details"].location,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        nav("/", { replace: true });
      } else {
        console.log(error);
      }
    }
  }

  return loading || loading1 ? (
    <Test />
  ) : (
    <div className="body">
      <div className="wrapper_creat">
        <div className="form-box register">
          <form className="row g-3" onSubmit={handleSubmit}>
            <h3>Please Enter information about your post to edit</h3>

            {/* work type */}
            <div className="col-md-6">
              <label htmlFor="work_type" className="form-label">
                work type
              </label>
              <select
                className="form-select2"
                id="work_type"
                name="work_type"
                value={form.work_type}
                onChange={handleChange}
                required
              >
                <option disabled={true} value="">
                  Choose...
                </option>
                <option value="remotly">Remotely</option>
                <option value="normal">On site</option>
              </select>
              <FaAngleDown className="icon3" />
            </div>

            {/* work type */}

            {/* work time */}
            <div className="col-md-6">
              <label htmlFor="work_time" className="form-label">
                work time
              </label>
              <select
                className="form-select2"
                id="work_time"
                name="work_time"
                value={form.work_time}
                onChange={handleChange}
                required
              >
                <option disabled={true} value="">
                  Choose...
                </option>
                <option value="full_time">Full time</option>
                <option value="part_time">Part time</option>
              </select>
              <FaClock className="icon3" />
            </div>

            {/* work time */}

            {/* domain */}
            <div className="col-md-6">
              <label htmlFor="domain_post" className="form-label">
                domain
              </label>
              <select
                id="domain_post"
                className="form-select2"
                name="domain"
                value={form.domain}
                onChange={handleChange}
                required
              >
                <option disabled={true} value="">
                  Choose...
                </option>
                <option value="Websites, IT & Software">
                  Websites, IT & Software
                </option>
                <option value="Accounting">Accounting</option>
                <option value="Writing & Content">Writing & Content</option>
                <option value="Design, Media & Architecture">
                  Design, Media & Architecture
                </option>
                <option value="Data Entry & Admain">Data Entry & Admain</option>
                <option value="Engineering & Science">
                  Engineering & Science
                </option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Buisness, Accounting, Human Resources & Legal">
                  Buisness, Accounting, Human Resources & Legal
                </option>
                <option value="Product Sourcing & Manufacturing">
                  Product Sourcing & Manufacturing
                </option>
                <option value="Mobile Phones & Computing">
                  Mobile Phones & Computing
                </option>
                <option value="Translation & Languages">
                  Translation & Languages
                </option>
                <option value="Trades & Services">Trades & Services</option>
                <option value="Freight, Shipping & Transportation">
                  Freight, Shipping & Transportation
                </option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Education">Education</option>
                <option value="Health & Medicine">Health & Medicine</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Driving">Driving</option>
                <option value="Jobs for Anyone">Jobs for Anyone</option>
              </select>
              <FaAngleDown className="icon3" />
            </div>

            {/* domain */}

            {/* location */}

            <div className="col-md-6">
              <label htmlFor="location_post" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-input"
                id="location_post"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="location"
              />
              <FaFlag className="icon2" />
            </div>

            {/* location */}

            {/* requirment */}
            <div className="col-md-6">
              <label htmlFor="requirement" className="form-label">
                requirment
              </label>
              <input
                type="text"
                className="form-input"
                id="requirement"
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                required
                placeholder="requirment..."
              />
              <MdChecklist className="icon" />
            </div>

            {/* requirment */}

            {/* experiance */}
            <div className="col-md-6">
              <label htmlFor="experiance" className="form-label">
                experiance
              </label>
              <input
                type="text"
                className="form-input"
                id="experiance"
                name="experience_years"
                value={form.experience_years}
                onChange={handleChange}
                required
                placeholder="experiance..."
              />
              <GiStrong className="icon" />
            </div>
            {/* experiance */}

            {/* salory */}
            <div className="col-md-6">
              <label htmlFor="salary" className="form-label">
                salory
              </label>
              <input
                type="text"
                className="form-input"
                id="salary"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                required
                placeholder="salory..."
              />
              <AiFillDollarCircle className="icon" />
            </div>
            {/* salory */}

            {/* description */}
            <div className="col-12">
              <label htmlFor="jop_description" className="form-label">
                discription
              </label>
              <textarea
                className="form-control-des"
                placeholder="Leave a comment here"
                id="jop_description"
                name="jop_description"
                value={form.jop_description}
                onChange={handleChange}
                required
                style={{ height: 100 }}
              />
            </div>

            {/* description */}

            <button className="button-creatr" type="submit">
              Edit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
