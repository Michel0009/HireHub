import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import {
  baseURL,
  showPostsByDomain,
  saveToggle,
  report,
  headers,
  search,
} from "../../Api/Api";
import { RiSearch2Line } from "react-icons/ri";
import { LuMoreVertical } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { IoFlag } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Test from "../../Components/Test";

export default function EmployeeMain() {
  const [loading, setLoading] = useState(true);

  const cookie = Cookie();

  let showPosts;
  const domainSearchInput = document.getElementById("domain");
  const countrySearchInput = document.getElementById("country");

  //usenavigate
  const nav = useNavigate();
  //useState
  const [dropdown, setDropdown] = useState(false);
  const [postKey, setPostKey] = useState(null);
  const [posts, setPosts] = useState();
  const [domainSearch, setDomainSearch] = useState();
  const [countrySearch, setCountrySearch] = useState();

  //useRef
  const dropdownRef = useRef(null);

  //useEffect
  useEffect(() => {
    getPostsByDomain();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //functions
  function checkInputs() {
    if(domainSearchInput &&countrySearchInput){    
    if (domainSearchInput.value === "" && countrySearchInput.value === "") {
      getPostsByDomain();
    }}
  }
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  }

  function notify(message) {
    toast.success(message);
  }
  function searchResults() {
    try {
      axios
        .post(
          `${baseURL}/${search}`,
          {
            domain: domainSearch,
            country: countrySearch,
          },
          { headers: headers }
        )
        .then((response) => {
          if (response.data.message === "No Result") {
            setPosts(response.data.message);
          } else {
            setPosts(response.data[0]);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function getPostsByDomain() {
    try {
      let response = await axios.get(`${baseURL}/${showPostsByDomain}`, {
        headers: headers,
      });
      setPosts(response.data[0]);
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
  async function reportPost(id) {
    try {
      let response = await axios.get(`${baseURL}/${report}/${id}`, {
        headers: headers,
      });
      if (response.data.massage === "you reported this post") {
        notify("Post reported successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postSaveToggle(postId) {
    try {
      let response = await axios.get(`${baseURL}/${saveToggle}/${postId}`, {
        headers: headers,
      });

      if (response.data.massage === "you have added this post successffully") {
        notify("Saved to my job");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (posts) {
    posts === "No Result" || posts.length === 0
      ? (showPosts = <div className="no-result">No Result Found</div>)
      : (showPosts = posts.map((post, index) => (
          <Link key={index} className="post-link" to={`/post?id=${post.id}`}>
            <div key={index} className="post">
              <p
                className="company-name"
                onClick={(e) => {
                  e.preventDefault();
                  nav(`/company-posts?id=${post.company_id}`);
                }}
              >
                {post.company_name}
              </p>
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
        )));
  }
  return loading ? (
    <Test />
  ) : (
    <div className="main-body">
      <Sidebar />
      <section className="home">
        <form className="search">
          <input
            type="search"
            placeholder="search for a specific domain..."
            className="search-input"
            id="domain"
            onChange={(e) => {
              setDomainSearch(e.target.value);
              checkInputs();
            }}
          ></input>
          <input
            type="search"
            placeholder="search for a specific country..."
            className="search-input"
            id="country"
            onChange={(e) => {
              setCountrySearch(e.target.value);
              checkInputs();
            }}
          ></input>
          <div className="search-button" onClick={() => searchResults()}>
            <RiSearch2Line className="search-icon" />
          </div>
        </form>
        <div className="posts">{showPosts}</div>
      </section>

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
    </div>
  );
}
