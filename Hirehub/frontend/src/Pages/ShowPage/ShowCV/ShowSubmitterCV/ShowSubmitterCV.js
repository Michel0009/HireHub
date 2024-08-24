import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
  CardDescription,
} from "../../../../Components/Card";
import { Label } from "../../../../Components/Label";
import { Button } from "../../../../Components/Button";
import { baseURL, headers, showSubmitterCV } from "../../../../Api/Api";
import Test from "../../../../Components/Test";
const ShowSubmitterCV = () => {
  const [cvDetails, setCVDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    fetchCV();
  }, []);
  async function fetchCV() {
    try {
      let response = await axios.get(`${baseURL}/${showSubmitterCV}/${id}`, {
        headers: headers,
      });
      setCVDetails(response.data[0]);
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
    navigate("/edit-cv");
  };

  return loading ? (
    <Test />
  ) : cvDetails ? (
    <section className="w-full">
      <div className="usercontainer">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your CV</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <p className="profilep">{cvDetails.first_name}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <p className="profilep">{cvDetails.last_name}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 ">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <p className="profilep">{cvDetails.email}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <p className="profilep">{cvDetails.phone_number}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <p className="profilep">{cvDetails.country}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Your date</Label>
                <p className="profilep">{cvDetails.date}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <p className="profilep">{cvDetails.domain}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <p className="profilep">{cvDetails.language}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <p className="profilep">{cvDetails.education}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License</Label>
                <p className="profilep">{cvDetails.license}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <p className="profilep">{cvDetails.skills}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <p className="profilep">{cvDetails.experience}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <p className="profilep">{cvDetails.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="ml-auto" type="submit" onClick={handleEditClick}>
              Edit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  ) : (
    <div className="no-result">You do not have a CV</div>
  );
};
export default ShowSubmitterCV;
