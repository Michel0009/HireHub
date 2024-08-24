import axios from "axios";
import Sidebar from "../../../Components/Sidebar";
import {
  baseURL,
  headers,
  deletePost,
  getReportedPost,
} from "../../../Api/Api";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Test from "../../../Components/Test";
import { MdDelete } from "react-icons/md";

export default function ReportedPosts() {
  let showPosts;
  //useState
  const nav = useNavigate();

  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  //useEffect
  useEffect(() => {
    ShowReportedPosts();
  }, []);

  function notify(message) {
    toast.success(message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  function DeletePost(id) {
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
  async function ShowReportedPosts() {
    try {
      let response = await axios.get(`${baseURL}/${getReportedPost}`, {
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

  if (posts) {
    showPosts =
      posts.length === 0 || posts === "No Result" ? (
        <div className="no-result-all">No results found</div>
      ) : (
        posts.map((post, index) => (
          <Link key={index} className="post-link" to={`/post?id=${post.id}`}>
            <div key={index} className="post">
              <p className="company-name-all-posts">{post.company_name}</p>

              <MdDelete
                className="delete-icon"
                onClick={(e) => {
                  e.preventDefault();
                  DeletePost(post.id);
                }}
              />

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
      );
  }
  return loading ? (
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
