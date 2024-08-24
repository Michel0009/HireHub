import "./Creat_post.css";
import { FaClock, FaFlag } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { MdChecklist } from "react-icons/md";
import { GiStrong } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { err_m, err_s } from "../../Components/Mess";
import { CREATE, baseURL, headers, showAllDomians } from "../../Api/Api";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Test from "../../Components/Test";

export default function CreatePost() {
  const navigator = useNavigate();
  let showDomains;
  const [domains, setDomains] = useState();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    getAllDomians();
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
      let res = await axios.post(`${baseURL}/${CREATE}`, form, {
        headers: headers,
      });
      if (
        res.status === 200 &&
        res.data.massage === "Post has been created successfully"
      ) {
        setLoading1(false);
        console.log(res);
        setTimeout(() => {
          err_s(res.data.massage);
        }, 1000);

        setTimeout(() => {
          navigator("/company-home");
        }, 3000);
      } else if (
        res.data.massage ===
        "you do not have enough money..please charge your wallet"
      ) {
        setLoading1(false);
        err_m(res.data.massage);
      }
    } catch (err) {
      setLoading1(false);
      err_m(err.data.massage);
      console.log(err);
    }
  }
  async function getAllDomians() {
    try {
      let response = await axios.get(`${baseURL}/${showAllDomians}`, {
        headers: headers,
      });
      setDomains(response.data[0]);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        setLoading(false);
        navigator("/", { replace: true });
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
  return loading || loading1 ? (
    <Test />
  ) : (
    <div className="body">
      <div className="wrapper_creat">
        <div className="form-box register">
          <form className="row g-3" onSubmit={handleSubmit}>
            <h3>Please enter information about your post</h3>

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
                <option>Remotly</option>
                <option>On site</option>
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
                <option>Part time</option>
                <option>Full time</option>
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
                {showDomains}
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
                experience years
              </label>
              <input
                type="number"
                className="form-input"
                id="experiance"
                name="experience_years"
                value={form.experience_years}
                onChange={handleChange}
                required
                placeholder="experience..."
              />
              <GiStrong className="icon" />
            </div>
            {/* experiance */}

            {/* salory */}
            <div className="col-md-6">
              <label htmlFor="salary" className="form-label">
                salary
              </label>
              <input
                type="text"
                className="form-input"
                id="salary"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                required
                placeholder="salary..."
              />
              <AiFillDollarCircle className="icon" />
            </div>
            {/* salory */}

            {/* description */}
            <div className="col-12">
              <label htmlFor="jop_description" className="form-label">
                description
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
              Create
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
