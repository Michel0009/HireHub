import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import { baseURL, getNotifications, headers } from "../../Api/Api";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "cookie-universal";
import Test from "../../Components/Test";

export default function CompanyNotifications() {
  const cookie = Cookies();
  let showNotifications;
  let showNewNotifications;
  const countRef = useRef(cookie.get("count"));
  const nav = useNavigate();
  //useState
  const [notifications, setNotifications] = useState();
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);

  //useEffect
  useEffect(() => {
    getNotification();
  }, []);
  //functions

  async function getNotification() {
    try {
      let response = await axios.get(`${baseURL}/${getNotifications}`, {
        headers: headers,
      });
      setNotifications(response.data[0]);
      setCount(response.data.count);
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

  if (notifications) {
    showNotifications = notifications
      .slice(countRef.current, notifications.length)
      .map((notification, index) => (
        <div key={index} className="notificationCard">
          <div className="description">
            <p className="notif-text">{notification.message}</p>
            <p id="notif_time">{notification.created_at.split("T")[0]}</p>
          </div>
        </div>
      ));
    if (notifications.slice(0, countRef.current).length > 0) {
      showNewNotifications = notifications
        .slice(0, countRef.current)
        .map((notification, index) => (
          <div key={index} className="notificationCard">
            <div className="description">
              <p className="notif-text">{notification.message}</p>
              <p id="notif_time">{notification.created_at.split("T")[0]}</p>
            </div>
          </div>
        ));
    }
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      <div className="notification-container">
        <div className="notificationContainer">
          <header>
            <div className="notificationHeader">
              <h1>Notifications</h1>
              <span id="num_of_notif">{count}</span>
            </div>
          </header>
          <main>
            {countRef.current === 0 ? (
              <div className="noNew">No new notifacations</div>
            ) : (
              <>
                {showNewNotifications}
                <div className="notificationsSpliter"></div>
                <br />
              </>
            )}

            {showNotifications}
          </main>
        </div>
      </div>
    </>
  );
}
