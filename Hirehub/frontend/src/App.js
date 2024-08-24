import { Route, Routes } from "react-router-dom";
import EmployeeMain from "./Pages/Main/EmployeeMain";
import EmployeeNotifications from "./Pages/Notifications/EmployeeNotifications";
import PostDetail from "./Pages/PostDetails/PostDetails";
import Register1 from "./Pages/register/Register1";
import Login from "./Pages/register/Login";
import Register2 from "./Pages/register/Register2";
import User from "./Pages/register/User";
import CreatePost from "./Pages/Creat_post/CreatPost";
import MyPosts from "./Pages/MyPost/MyPost";
import Comp from "./Pages/register/Comp";
import FollowingCompanies from "./Pages/Following/FollowingCompanies";
import CompanyMain from "./Pages/Main/CompanyMain";
import CompanyDetails from "./Pages/CompanyDetails/CompanyDetails";
import CompanyNotifications from "./Pages/Notifications/CompanyNotifications";
import Wallet from "./Pages/Wallet/Wallet";
import SavedPosts from "./Pages/SavedPosts/SavedPosts";
import EditPost from "./Pages/EditPost/EditPost";
import ShowSubmitters from "./Pages/ShowSubmitters/ShowSubmitters";
import UserProfileEdit from "./Pages/EditPage/UserProfile/UserProfileEdit";
import ShowCompanyProfile from "./Pages/ShowPage/ShowCompanyProfile/ShowCompanyProfile";
import ShowCV from "./Pages/ShowPage/ShowCV/ShowCV/ShowCV";
import CVForm from "./Pages/Cv/Cv";
import ShowUserProfile from "./Pages/ShowPage/ShowUserProfile/ShowUserProfile";
import CompanyProfileEdit from "./Pages/EditPage/Company Profile/CompanyProfileEdit";
import ShowSubmitterCV from "./Pages/ShowPage/ShowCV/ShowSubmitterCV/ShowSubmitterCV";
import AllPosts from "./Pages/Admin/AllPosts/AllPosts";
import AllCompanies from "./Pages/Admin/AllCompanies/AllCompanies";
import ReportedPosts from "./Pages/Admin/ReportedPosts/ReportedPosts";
import FirstP from "./Pages/firstP/FirstP";
import Verify from "./Pages/verify/Verify";
import Help from "./Pages/Help/Help";
import AllDomains from "./Pages/Admin/AllDomains/AllDomains";
import EditCV from "./Pages/EditPage/EditCV/EditCV";
import Block from "./Pages/Admin/BLOCK/Block";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/" element={<FirstP />} />
        <Route path="/block" element={<Block />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/all-companies" element={<AllCompanies />} />
        <Route path="/reported-posts" element={<ReportedPosts />} />
        <Route path="/domains" element={<AllDomains />} />
        <Route path="/user-profile-edit" element={<UserProfileEdit />} />
        <Route path="/show-company-profile" element={<ShowCompanyProfile />} />
        <Route path="/showcv" element={<ShowCV />} />
        <Route path="/show-submitter-cv" element={<ShowSubmitterCV />} />
        <Route path="/cv" element={<CVForm />} />
        <Route path="/edit-company-profile" element={<CompanyProfileEdit />} />
        <Route path="/show-user-profile" element={<ShowUserProfile />} />
        <Route path="edit-cv" element={<EditCV />} />
        <Route path="/employee-home" element={<EmployeeMain />} />
        <Route path="/post" element={<PostDetail />} />
        <Route
          path="/employee-notifications"
          element={<EmployeeNotifications />}
        />
        <Route path="/user" element={<User />} />
        <Route path="/following" element={<FollowingCompanies />} />
        <Route path="/company-posts" element={<CompanyDetails />} />
        <Route path="/saved-posts" element={<SavedPosts />} />
        <Route path="/company-home" element={<CompanyMain />} />
        <Route path="/post" element={<PostDetail />} />
        <Route
          path="/company-notifications"
          element={<CompanyNotifications />}
        />
        <Route path="/comp" element={<Comp />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/edit" element={<EditPost />} />
        <Route path="/show-submitters" element={<ShowSubmitters />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}
