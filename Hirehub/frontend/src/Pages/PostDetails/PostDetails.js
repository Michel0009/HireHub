import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  baseURL,
  deletePost,
  headers,
  showPostDetails,
  submitToPost,
} from "../../Api/Api";
import { useEffect, useState } from "react";
import { IoBriefcaseOutline, IoCashOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { PiMedalLight } from "react-icons/pi";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Sidebar from "../../Components/Sidebar";
import Cookie from "cookie-universal";
import Test from "../../Components/Test";

export default function PostDetails() {
  //useLocation
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const nav = useNavigate();
  const cookie = Cookie();
  //useState
  const [postDetails, setPostDetails] = useState();
  const [domain, setDomain] = useState();
  const [reports, setReports] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {getPostDetails()}, []);

  function notify(message) {
    if (
      message === "you have submitted this jop" ||
      message === "Post has been deleted succeffuly"
    ) {
      toast.success(message);
    } else if (
      message === "you do not have cv.. please create one and try again"
    ) {
      toast.error(message);
    } else if (message === "you have submitted this jop before") {
      toast.info(message);
    }
  }
  function DeletePost() {
    try {
      axios
        .get(`${baseURL}/${deletePost}/${id}`, { headers: headers })
        .then((response) => {
          if (response.data.message === "Post has been deleted succeffuly") {
            notify("Post has been deleted succeffuly");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function getPostDetails() {
    try {
      let response = await axios.get(`${baseURL}/${showPostDetails}/${id}`, {
        headers: headers,
      });
      setPostDetails(response.data["Post Details"]);
      setDomain(response.data["Domain"]);
      setReports(response.data["Posts Reports"]);
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
  async function jobApply() {
    try {
      let response = await axios.get(`${baseURL}/${submitToPost}/${id}`, {
        headers: headers,
      });
      console.log(response.data.massage);

      notify(response.data.massage);
    } catch (error) {
      console.log(error);
    }
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      {postDetails && (
        <div className="jobContainer">
          <div className="job-details">
            <h2 className="details-heading">Job Details</h2>
            <div className="details">
              <div className="detail">
                <IoBriefcaseOutline className="details-icon" />
                <p className="p">Job Role</p>
                <p>{domain.domain}</p>
              </div>

              <div className="detail">
                {document.body.classList.value === "dark" ? (
                  <img
                    src={require("../../Assets/icons/job-position-dark.png")}
                    alt="workType icon"
                    className="workTypeIcon"
                  />
                ) : (
                  <img
                    src={require("../../Assets/icons/job-position-light.png")}
                    alt="workType icon"
                    className="workTypeIcon"
                  />
                )}

                <p className="p">Job Type</p>
                <p>{postDetails.work_type}</p>
              </div>
            </div>
            <div className="details">
              <div className="detail">
                <CiClock2 className="details-icon" />
                <p className="p">Job Time</p>
                <p>{postDetails.work_time}</p>
              </div>
              <div className="detail">
                <PiMedalLight className="details-icon" />
                <p className="p">Experience</p>
                <p>{postDetails.experience_years} Years</p>
              </div>
            </div>
            <div className="details">
              <div className="detail">
                <IoCashOutline className="details-icon" />
                <p className="p">Salary</p>
                <p>{postDetails.salary}$</p>
              </div>
              <div className="detail">
                <MdLocationOn className="details-icon" />
                <p className="p">Location</p>
                <p>{postDetails.location}</p>
              </div>
            </div>
          </div>
          <div className="job-details">
            <h2 className="details-heading">Job Description</h2>
            <div className="description-requirements">
              <p className="job-desc-require">{postDetails.jop_description}</p>
            </div>
          </div>
          <div className="job-details">
            <h2 className="details-heading">Job Requirements</h2>
            <div className="description-requirements">
              <p className="job-desc-require">{postDetails.requirements}</p>
            </div>
          </div>
          { cookie.get("user_type") === 2 && (
            <button
              className="apply-btn"
              onClick={(e) => {
                e.preventDefault();
                jobApply();
              }}
            >
              Apply
            </button>
          )}
          {cookie.get("user_type") === 3 && (
            <>
              <p className="reports-count">
                Reports count:{" "}
                <span>{reports || reports === 0 ? reports : ""}</span>
              </p>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.preventDefault();
                  DeletePost();
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme={document.body.classList.value === "dark" ? "dark" : "light"}
      />
    </>
  );
}
