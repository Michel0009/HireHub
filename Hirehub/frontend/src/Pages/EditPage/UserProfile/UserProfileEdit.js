import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
  CardDescription,
} from "../../../Components/Card";
import { Label } from "../../../Components/Label";
import { Input } from "../../../Components/Input";
import { Button } from "../../../Components/Button";
import {
  baseURL,
  editProfile,
  headers,
  showAllDomians,
  showProfile,
} from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Test from "../../../Components/Test";

const UserProfileEdit = () => {
  let showDomains;
  const [domains, setDomains] = useState();
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    country: "",
    domain: "",
    date: "",
  });

  useEffect(() => {
    fetchUserProfile();
    getAllDomians();
  }, []);
  async function getAllDomians() {
    try {
      let response = await axios.get(`${baseURL}/${showAllDomians}`, {
        headers: headers,
      });
      setDomains(response.data[0]);
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
  async function fetchUserProfile() {
    try {
      let response = await axios.get(`${baseURL}/${showProfile}`, {
        headers: headers,
      });
      setUserDetails(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        nav("/", { replace: true });
      } else {
        console.log(error);
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${baseURL}/${editProfile}`, userDetails, {
        headers: headers,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again later.");
    }
  };
  if (domains) {
    showDomains = domains.map((domain, index) => (
      <option className="domain-name" key={index}>
        {domain.domain}
      </option>
    ));
  }
  return loading ? (
    <Test />
  ) : (
    <section className="w-full">
      <div className="usercontainer">
        <div className="space-y-2">
          <h1 className="text-3xl">Employee Profile</h1>
          <p className="text-gray">
            Manage your profile details and settings here. Update your
            information as needed.
          </p>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Update Profile Details</CardTitle>
            <CardDescription>
              Fill out the form below to create your profile.
            </CardDescription>
          </CardHeader>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 ">
                <div className="space-y-2">
                  <Label htmlFor="employee-name">First Name</Label>
                  <Input
                    id="employee-name"
                    placeholder="Enter your name"
                    value={userDetails.first_name || ""}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        first_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-name">Last Name</Label>
                  <Input
                    id="employee-name"
                    placeholder="Enter your lastname"
                    value={userDetails.last_name || ""}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        last_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 ">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={userDetails.phone_number}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        phone_number: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country-name">Country</Label>
                  <Input
                    id="country-name"
                    placeholder="Enter your country"
                    value={userDetails.country}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        country: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Your date</Label>
                  <Input
                    id="date"
                    type="date"
                    placeholder="Enter your date"
                    value={userDetails.date}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <select
                    className="select"
                    id="domain"
                    placeholder="Enter domain"
                    value={userDetails.domain || ""}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        domain: e.target.value,
                      })
                    }
                    required
                  >
                    <option disabled={true} value="">
                      Choose...
                    </option>
                    {showDomains}
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" type="submit">
                Save Changes
              </Button>

              <Button className="ml-4" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default UserProfileEdit;
