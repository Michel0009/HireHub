import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
  CardDescription,
} from "../../../Components/Card";
import { Label } from "../../../Components/Label";
import { Button } from "../../../Components/Button";
import { baseURL, headers, showProfile } from "../../../Api/Api";
import Test from "../../../Components/Test";

const ShowCompanyProfile = () => {
  const [companyPosts, setCompanyPosts] = useState();
  const [followers,setFollowers]=useState();
  const [companyDetails, setCompanyDetails] = useState({});
  const [walletDetails, setWalletDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyProfile();
  }, []);
  async function fetchCompanyProfile() {
    try {
      let response = await axios.get(`${baseURL}/${showProfile}`, {
        headers: headers,
      });
      setCompanyDetails(response.data["Company Information"]);
      setWalletDetails(response.data["Wallet Information"]);
      setCompanyPosts(response.data["Companys Posts Number"])
      setFollowers(response.data["Followers Number"])
      setLoading(false);

    } catch (error) {
      setLoading(false);

      if (error.response.status === 401) {
        navigate("/", { replace: true });
      } else {
        console.log(error);
      }
    }
  }
  const handleEditClick = () => {
    navigate("/edit-company-profile");
  };

  return loading ? (
    <Test />
  ) : (
    <section className="w-full">
      <div className="usercontainer">
        <div className="space-y-2">
         
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
           
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <p className="profilep">{companyDetails.company_name }</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <p className="profilep">{companyDetails.country }</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <p className="profilep">{walletDetails.account_number }</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balance">Balance</Label>
                <p className="profilep">{walletDetails.account }</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <p className="profilep">{companyDetails.phone_number}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <p className="profilep">{companyDetails.description}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="posts-count">Posts count</Label>
                <p className="profilep">{companyPosts}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="followers-number">Followers number</Label>
                <p className="profilep">{followers}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" type="submit" onClick={handleEditClick}>
              Edit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ShowCompanyProfile;
