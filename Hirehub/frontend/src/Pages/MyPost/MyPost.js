import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import {
  baseURL,
  deleteCompanyPost,
  headers,
  showPostByOwner,
} from "../../Api/Api";
import { MdEdit, MdDelete } from "react-icons/md";
import { LuMoreVertical } from "react-icons/lu";
import { BiSolidShow } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Test from "../../Components/Test";

export default function CompanyMain() {
  let showPosts;
  const nav = useNavigate();
  //useState
  const [dropdown, setDropdown] = useState(false);
  const [postKey, setPostKey] = useState(null);
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  //useRef
  const dropdownRef = useRef(null);

  //useEffect
  useEffect(() => {
    getPostsByOwner();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //functions
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  }

  function notify(message) {
    toast.success(message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  async function getPostsByOwner() {
    try {
      let response = await axios.get(`${baseURL}/${showPostByOwner}`, {
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
  async function DeletePost(id) {
    try {
      let response = await axios.get(`${baseURL}/${deleteCompanyPost}/${id}`, {
        headers: headers,
      });
      if (response.data.message === "Post had been deleted Succeffuly.") {
        notify("Post had been deleted Succeffuly");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (posts) {
    showPosts =
      posts.length > 0 ? (
        posts.map((post, index) => (
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
                  className="dropdownMenu dropdownMenuM"
                  ref={dropdownRef}
                  onClick={(e) => e.preventDefault()}
                >
                  <ul>
                    <li
                      onClick={() => {
                        nav(`/edit?id=${post.id}`);
                        setDropdown(false);
                      }}
                    >
                      <MdEdit className="more-icons" />
                      <span>Edit job</span>
                    </li>
                    <li
                      onClick={() => {
                        DeletePost(post.id);
                        setDropdown(false);
                      }}
                    >
                      <MdDelete className="more-icons " />
                      <span>Delete job</span>
                    </li>
                    <li
                      onClick={() => {
                        nav(`/show-submitters?id=${post.id}`);
                        setDropdown(false);
                      }}
                    >
                      <BiSolidShow className="more-icons" />
                      <span>Show submitters</span>
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
        ))
      ) : (
        <div className="no-result-all">No results found</div>
      );
  }
  return loading? (
    <Test />
  ) : (
    <div className="main-body">
      <Sidebar />
      <section className="home my">
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
