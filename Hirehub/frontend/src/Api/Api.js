import Cookie from "cookie-universal";

const cookie = Cookie();

export const headers = {
  Accept: "application/json",
  Authorization: "Bearer " + cookie.get("token"),
};

export const baseURL = "http://127.0.0.1:8000/api";
export const showPostByOwner = "ShowPostsCompany";
export const showPostsByDomain = "ShowPostsDomain";
export const saveToggle = "AddToFavourite";
export const showPostDetails = "ShowPostsDetails";
export const submitToPost = "SubmitToPost";
export const report = "Report";
export const search = "Search";
export const showPostsfollowed = "ShowPostsfollowed";
export const followCompany = "Follow";
export const USER = "CreateEmployee";
export const COMP = "CreateCompany";
export const CREATE = "CreatePost";
export const REGISTER1 = "CreateUser";
export const LOGIN = "Login";
export const showCompanyfollowed = "ShowCompanyfollowed";
export const getNotifications = "Notifications";
export const showAllCompanyDetails = "ShowAllCompanyDetails";
export const BLOCK = "BlockCompany";
export const Com_D = "ShowCompanyDetails";
export const NewNotifications = "NewNotifications";
export const showProfile = "ShowProfile";
export const chargeWallet = "AddToWallet";
export const getSavedPosts = "ShowFavourite";
export const unfavourite = "DeleteFromFavourite";
export const deleteCompanyPost = "DeleteCompanyPost";
export const showSubmitter = "ShowSubmitter";
export const editPost = "EditPost";
export const logout = "Logout";
export const getAllPosts = "ShowAllPosts";
export const showAllCompanies = "ShowAllCompanies";
export const deletePost = "DeletePost";
export const getReportedPost = "ShowReportedPost";
export const showReportedPostDetails = "ShowReportedPostDetails";
export const VERIFY = "Verification";
export const REVERIFY = "ReSendEmail";
export const showAllDomians = "ShowAllDomains";
export const addDomain = "AddDomain";
export const createCV = "CreateCV";
export const editProfile = "EditProfile";
export const showCV="showCV"
export const showSubmitterCV="ShowSubmitterCV"
export const editCV="EditCV"