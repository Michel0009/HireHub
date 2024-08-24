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

const ShowUserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);
  async function fetchUserProfile() {
    try {
      let response = await axios.get(`${baseURL}/${showProfile}`, {
        headers: headers,
      });
      setUserDetails(response.data[0]);
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
    navigate("/user-profile-edit");
  };

  return loading ? (
    <Test />
  ) : (
    <section className="w-full">
      <div className="usercontainer">
       
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
         
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 ">
              <div className="space-y-2">
                <Label htmlFor="employee-name">First Name</Label>
                <p style={{ color: "gray" }}>
                  {userDetails.first_name || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-name">last Name</Label>
                <p style={{ color: "gray" }}>
                  {userDetails.last_name || "N/A"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 ">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <p style={{ color: "gray" }}>
                  {userDetails.phone_number || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <p style={{ color: "gray" }}>
                  {userDetails.country || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Your date</Label>
                <p style={{ color: "gray" }}>
                  {userDetails.date || "N/A"}
                </p>
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
export default ShowUserProfile;
