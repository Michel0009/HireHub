import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FaRegFile, FaChevronDown, FaRegBuilding } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  MdFavoriteBorder,
  MdKeyboardArrowRight,
  MdBlockFlipped,
} from "react-icons/md";
import {
  IoIosHelpCircleOutline,
  IoMdNotificationsOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import { BsFileEarmarkPostFill, BsWallet } from "react-icons/bs";
import { BiLogOut, BiShow } from "react-icons/bi";
import { SlUserFollowing } from "react-icons/sl";
import {
  IoSunnyOutline,
  IoMoonOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, headers, logout, NewNotifications } from "../Api/Api";
import Cookies from "cookie-universal";
export default function Sidebar() {
  const cookie = Cookies();
  //useNavigate
  const nav = useNavigate();
  //useState
  const [mode, setMode] = useState("Dark Mode");
  const [open, setOpen] = useState("sub-menu");
  const [newNotificationsCount, setNewNotificationsCount] = useState();
  //useEffect
  useEffect(() => {
    if (cookie.get("user_type") === 2 || cookie.get("user_type") === 1) {
      numOfNotifications();
    }
  }, []);
  //useLocation
  const location = useLocation();

  //constants
  const isHomePage =
    location.pathname === "/employee-home" ||
    location.pathname === "/company-home" ||
    location.pathname === "/all-posts";
  const body = document.body;
  //functions

  function handleLogout() {
    try {
      axios
        .get(`${baseURL}/${logout}`, { headers: headers })
        .then((response) => {
          console.log(response);
          if (response.data.message === "You logged out successfully") {
            cookie.remove("user_type");
            cookie.remove("token");
            nav("/");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  async function numOfNotifications() {
    try {
      let response = await axios.get(`${baseURL}/${NewNotifications}`, {
        headers: headers,
      });
      setNewNotificationsCount(response.data.count);
      cookie.set("count", response.data.count);
    } catch (error) {
      if (error.response.status === 401) {
        nav("/", { replace: true });
      } else {
        console.log(error);
      }
    }
  }
  const toggleMode = () => {
    setMode((prevMode) =>
      prevMode === "Dark Mode" ? "Light Mode" : "Dark Mode"
    );
  };
  
  return (
    <nav className="sider close">
      <header>
        <div className="logo-text">
          <span className="logo">
            <img src={require("../Assets/Images/Logo.png")} alt="logo"></img>
          </span>
          <div className="text header-text">
            <span className="name">Hirehub</span>
          </div>
        </div>
        <MdKeyboardArrowRight
          className="toggle"
          onClick={() => body.querySelector(".sider").classList.toggle("close")}
        />
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li>
              <Link
                to={
                  cookie.get("user_type") === 2
                    ? "/employee-home"
                    : cookie.get("user_type") === 1
                    ? "/company-home"
                    : cookie.get("user_type") === 3
                    ? "/all-posts"
                    : "login"
                }
                className="link"
              >
                <GoHome className="icon" />
                <span className="text ">Home</span>
              </Link>
            </li>
            {cookie.get("user_type") === 3 && (
              <li>
                <Link to="/reported-posts" className="link">
                  <MdBlockFlipped className="icon" />
                  <span className="text">Reported Posts</span>
                </Link>
              </li>
            )}
            {cookie.get("user_type") === 3 && (
              <li>
                <Link to="/all-companies" className="link">
                  <FaRegBuilding className="icon" />
                  <span className="text">All companies</span>
                </Link>
              </li>
            )}
            {(cookie.get("user_type") === 2 ||
              cookie.get("user_type") === 1) && (
              <li>
                <Link
                  to={
                    cookie.get("user_type") === 2
                      ? "/employee-notifications"
                      : "/company-notifications"
                  }
                  className="link"
                  id="notifaction_link"
                >
                  <IoMdNotificationsOutline className="icon" />
                  {newNotificationsCount > 0 && (
                    <span className="notifacation-number-bubble">
                      {newNotificationsCount}
                    </span>
                  )}
                  <span className="text notify-text">Notifications</span>
                </Link>
              </li>
            )}
            {cookie.get("user_type") === 1 && (
              <li>
                <Link to="/myposts" className="link">
                  <BsFileEarmarkPostFill className="icon" />
                  <span className="text">My posts</span>
                </Link>
              </li>
            )}
            {cookie.get("user_type") === 1 && (
              <li>
                <Link to="/create" className="link">
                  <IoIosAddCircleOutline className="icon" />
                  <span className="text">Create post</span>
                </Link>
              </li>
            )}
            {cookie.get("user_type") === 2 && (
              <>
                <li>
                  <Link to="/cv" className="link">
                    <FaRegFile className="icon" />
                    <span className="text">Cv</span>
                  </Link>
                </li>
                <li>
                  <Link to="/showcv" className="link">
                    <BiShow className="icon" />
                    <span className="text">Show CV</span>
                  </Link>
                </li>
              </>
            )}
            {(cookie.get("user_type") === 2 ||
              cookie.get("user_type") === 1) && (
              <li>
                <Link
                  to={
                    cookie.get("user_type") === 2
                      ? "/show-user-profile"
                      : "/show-company-profile"
                  }
                  className="link"
                >
                  <CgProfile className="icon" />
                  <span className="text">Profile</span>
                </Link>
              </li>
            )}
            {cookie.get("user_type") === 2 && (
              <li>
                <Link to="/saved-posts" className="link">
                  <MdFavoriteBorder className="icon" />
                  <span className="text">Saved posts</span>
                </Link>
              </li>
            )}
            {cookie.get("user_type") === 2 && (
              <li>
                <Link to="/following" className="link">
                  <SlUserFollowing className="icon" />
                  <span className="text">Following</span>
                </Link>
              </li>
            )}
           
            {cookie.get("user_type") === 3 && (
              <li>
                <Link to="/domains" className="link">
                  <IoBriefcaseOutline className="icon" />
                  <span className="text">Domains</span>
                </Link>
              </li>
            )}
            {cookie.get("user_type") === 1 && (
              <li>
                <Link to="/wallet" className="link">
                  <BsWallet className="icon" />
                  <span className="text">Wallet</span>
                </Link>
              </li>
            )}
            {(cookie.get("user_type") === 1 ||
              cookie.get("user_type") === 2) && (
              <li>
                <Link to="/help" className="link">
                  <IoIosHelpCircleOutline className="icon" />
                  <span className="text">Help</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="bottom-content">
          <li onClick={handleLogout}>
            <Link className="link">
              <BiLogOut className="icon" />
              <span className="text ">Logout</span>
            </Link>
          </li>
          {isHomePage && (
            <li className="mode">
              <div className="moon-sun">
                <IoMoonOutline className="icon i moon" />
                <IoSunnyOutline className="icon i sun" />
              </div>
              <span className="text mode-text">{mode}</span>
              <div
                className="toggle-switch"
                onClick={() => {
                  body.classList.toggle("dark");
                  toggleMode();
                }}
              >
                <span className="switch"></span>
              </div>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}
