import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./Components/Sidebar.css";
import "./Pages/Main/Main.css";
import "./Pages/Notifications/Notifications.css";
import "./Pages/PostDetails/PostDetails.css";
import "./Pages/Following/FollowingCompanies.css";
import "./Pages/CompanyDetails/CompanyDetails.css";
import "./Pages/Wallet/Wallet.css";
import "./Pages/SavedPosts/SavedPosts.css";
import "./Pages/MyPost/MyPost.css";
import "./Components/Test.css";
import "./Pages/ShowSubmitters/ShowSubmitters.css";
import "./Pages/Admin/AllCompanies/AllCompanies.css";
import "./Pages/Admin/AllPosts/AllPosts.css";
import "./Pages/Admin/AllDomains/AllDomains.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
