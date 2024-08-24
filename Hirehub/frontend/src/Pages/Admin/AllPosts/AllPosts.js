import axios from "axios";
import Sidebar from "../../../Components/Sidebar";
import { getAllPosts, baseURL, headers, search } from "../../../Api/Api";
import { RiSearch2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Test from "../../../Components/Test";

export default function AllPosts() {
  let showPosts;
  //useState
  const [posts, setPosts] = useState();
  const [domainSearch, setDomainSearch] = useState();
  const [countrySearch, setCountrySearch] = useState();
  const [loading, setLoading] = useState(true);
  const domainSearchInput = document.getElementById("domain");
  const countrySearchInput = document.getElementById("country");
  const nav = useNavigate();

  //useEffect
  useEffect(() => {
    ShowAllPosts();
  }, []);
  function checkInputs() {
    if (domainSearchInput && countrySearchInput) {
      if (domainSearchInput.value === "" && countrySearchInput.value === "") {
        ShowAllPosts();
      }
    }
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
          console.log(response.data);
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

  async function ShowAllPosts() {
    try {
      let response = await axios.get(`${baseURL}/${getAllPosts}`, {
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
        <div className="no-result">No results found</div>
      ) : (
        posts.map((post, index) => (
          <Link key={index} className="post-link" to={`/post?id=${post.id}`}>
            <div key={index} className="post">
              <p className="company-name-all-posts">{post.company_name}</p>
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
