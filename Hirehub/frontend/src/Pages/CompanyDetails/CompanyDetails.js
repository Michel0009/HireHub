import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  baseURL,
  followCompany,
  headers,
  report,
  saveToggle,
  showAllCompanyDetails,
} from "../../Api/Api";
import { useEffect, useRef, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { IoFlag } from "react-icons/io5";
import { toast } from "react-toastify";
import Sidebar from "../../Components/Sidebar";
import Cookie from "cookie-universal";
import Test from "../../Components/Test";

export default function CompanyDetails() {
  let showPosts;
  let firstNameInitial;
  let lastNameInitial;

  const cookie = Cookie();

  const nav = useNavigate();
  //useEffect
  useEffect(() => {
    getCompanyDetails();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //useLocation
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  //useState
  const [dropdown, setDropdown] = useState(false);
  const [postKey, setPostKey] = useState(null);
  const [company, setCompany] = useState();
  const [isFollowed, setIsFollowed] = useState(null);
  const [loading, setLoading] = useState(true);
  //useRef
  const dropdownRef = useRef(null);
  //functions
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  }
  function notify(message) {
    if (
      message === "you have added this post successffully" ||
      message === "you reported this post"
    ) {
      toast.success(message);
    } else if (
      message === "you have reported this post before" ||
      message === "you have added this post before"
    ) {
      toast.info(message);
    }
  }
  async function reportPost(id) {
    try {
      let response = await axios.get(`${baseURL}/${report}/${id}`, {
        headers: headers,
      });

      notify(response.data.massage);
    } catch (error) {
      console.log(error);
    }
  }

  async function postSaveToggle(postId) {
    try {
      let response = await axios.get(`${baseURL}/${saveToggle}/${postId}`, {
        headers: headers,
      });

      notify(response.data.massage);
    } catch (error) {
      console.log(error);
    }
  }
  function avatarLetters(name) {
    const nameParts = name.split(" ");
    firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
    lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
  }
  function followACompany() {
    try {
      axios
        .get(`${baseURL}/${followCompany}/${company[0].id}`, {
          headers: headers,
        })
        .then((response) => {
          if (
            response.data.massage ===
            "you have followed the company successffully"
          ) {
            setIsFollowed(true);
          } else if (
            response.data.massage ===
            "you have unfollowed the company successffully."
          ) {
            setIsFollowed(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function getCompanyDetails() {
    try {
      let response = await axios.get(
        `${baseURL}/${showAllCompanyDetails}/${id}`,
        { headers: headers }
      );
      setCompany(response.data);
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
  if (company) {
    if (cookie.get("user_type") === 2) {
      showPosts = company[2].map((post, index) => (
        <Link key={index} className="post-link" to={`/post?id=${post.id}`}>
          <div key={index} className="post">
            <p className="company-name">{post.company_name}</p>
            <LuMoreVertical
              className="more-icon"
              onClick={(e) => {
                e.preventDefault();
                setDropdown((prev) => !prev);
                setPostKey(index);
              }}
            />
            {dropdown && postKey === index && (
              <div
                className="dropdownMenu"
                ref={dropdownRef}
                onClick={(e) => e.preventDefault()}
              >
                <ul>
                  <li
                    onClick={() => {
                      postSaveToggle(post.id);
                      setDropdown(false);
                    }}
                  >
                    <FaRegBookmark className="more-icons" />
                    <span>save job</span>
                  </li>
                  <li
                    onClick={() => {
                      reportPost(post.id);
                      setDropdown(false);
                    }}
                  >
                    <IoFlag className="more-icons" />
                    <span>report job</span>
                  </li>
                </ul>
              </div>
            )}
            <div className="jobDetails">
              <p className="jobDetailsHeading">Location:&nbsp;</p>
              <p>{post.location}</p>
            </div>
            <div className="jobDetails">
              <p className="jobDetailsHeading">Job type:&nbsp;</p>
              <p>{post.work_type}</p>
            </div>
            <p className="jobDetailsHeading">Description:</p>
            {post.jop_description.length > 250 ? (
              <p>{post.jop_description.substring(0, 250) + "..."}</p>
            ) : (
              <p>{post.jop_description}</p>
            )}
            <div className="attachmentsContainer">
              <p className="attachments">salary: {post.salary}$</p>
              <p className="attachments">{post.work_time}</p>
            </div>
          </div>
        </Link>
      ));
    } else if (cookie.get("user_type") === 1) {
      showPosts = company[1].map((post, index) => (
        <Link key={index} className="post-link" to={`/post?id=${post.id}`}>
          <div key={index} className="post">
            <p className="company-name">{post.company_name}</p>
            <div className="jobDetails">
              <p className="jobDetailsHeading">Location:&nbsp;</p>
              <p>{post.location}</p>
            </div>
            <div className="jobDetails">
              <p className="jobDetailsHeading">Job type:&nbsp;</p>
              <p>{post.work_type}</p>
            </div>
            <p className="jobDetailsHeading">Description:</p>
            {post.jop_description.length > 250 ? (
              <p>{post.jop_description.substring(0, 250) + "..."}</p>
            ) : (
              <p>{post.jop_description}</p>
            )}
            <div className="attachmentsContainer">
              <p className="attachments">salary: {post.salary}$</p>
              <p className="attachments">{post.work_time}</p>
            </div>
          </div>
        </Link>
      ));
    }
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      <section className="home">
        <div className="company">
          {company && (
            <>
              <br />
              {avatarLetters(company[0].company_name)}
              <div className="main-avatar">
                {firstNameInitial}
                {lastNameInitial}
              </div>
              {cookie.get("user_type") === 2 &&
                (isFollowed === null ? (
                  company[1] === "unfollowed" ? (
                    <button
                      className="follow-btn"
                      onClick={() => {
                        followACompany();
                      }}
                    >
                      Follow
                    </button>
                  ) : company[1] === "followed" ? (
                    <button
                      className="follow-btn"
                      onClick={() => {
                        followACompany();
                      }}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <></>
                  )
                ) : isFollowed === true ? (
                  <button
                    className="follow-btn"
                    onClick={() => {
                      followACompany();
                    }}
                  >
                    Unfollow
                  </button>
                ) : isFollowed === false ? (
                  <button
                    className="follow-btn"
                    onClick={() => {
                      followACompany();
                    }}
                  >
                    Follow
                  </button>
                ) : (
                  <></>
                ))}
              <br />

              <div className="detailsOfCompany ">
                {cookie.get("user_type") === 2 ? (
                  <div className="company-domain">{company[3].domain} </div>
                ) : (
                  <div className="company-domain">{company[2].domain} </div>
                )}
                <div className="company-details-name">
                  {company[0].company_name}
                </div>
                <div className="company-details-location">
                  {company[0].country}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="posts">{showPosts}</div>
      </section>
    </>
  );
}
