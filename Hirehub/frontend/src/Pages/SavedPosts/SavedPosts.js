import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import { baseURL, getSavedPosts, headers, unfavourite } from "../../Api/Api";
import { useEffect, useState } from "react";
import { RiDislikeLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Test from "../../Components/Test";

export default function SavedPosts() {
  let showSaved;
  const [saved, setSaved] = useState();
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();
  useEffect(() => {ShowSavedPosts()}, []);

  function notify(message) {
    toast.success(message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  function deleteFromFavourite(id) {
    try {
      axios.get(`${baseURL}/${unfavourite}/${id}`, { headers: headers });
    } catch (err) {
      console.log(err);
    }
  }

  async function ShowSavedPosts() {
    try {
      let response = await axios.get(`${baseURL}/${getSavedPosts}`, {
        headers: headers,
      });
      setSaved(response.data[0]);
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
  if (saved) {
    saved.length === 0
      ? (showSaved = <div className="no-result-saved">No Result Found</div>)
      : (showSaved = saved.map((post, index) => (
          <div key={index} className="saved-post-card">
            <div className="favouriteHeader">
              <p className="fav-company-name">{post.company_name}</p>
              <RiDislikeLine
                className="fav-icon1"
                onClick={(e) => {
                  e.preventDefault();
                  deleteFromFavourite(post.id);
                  notify("The post deleted from favourite successfully");
                }}
              />
              <TbListDetails
                className="fav-icon2"
                onClick={(e) => {
                  e.preventDefault();
                  nav(`/post?id=${post.id}`);
                }}
              />
            </div>
            <div className="fav-desc">
              {post.jop_description.length > 177 ? (
                <p>{post.jop_description.substring(0, 177) + "..."}</p>
              ) : (
                <p>{post.jop_description}</p>
              )}
            </div>

            <div className="fav-req">
              <span>Requirments: </span>
              {post.requirements.length > 177 ? (
                <p>{post.requirements.substring(0, 177) + "..."}</p>
              ) : (
                <p>{post.requirements}</p>
              )}
            </div>
          </div>
        )));
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      <div className="saved-main">
        <h1 className="saved-posts-h1">Saved Posts</h1>
        <div className="saved-posts-container">{showSaved}</div>
      </div>
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
