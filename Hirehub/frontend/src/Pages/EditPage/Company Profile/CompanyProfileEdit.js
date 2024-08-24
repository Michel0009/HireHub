// CompanyProfileEdit.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "../../../Components/Card";
import { Label } from "../../../Components/Label";
import { Input } from "../../../Components/Input";
import { UserTextarea } from "../../../Components/Textarea";
import { Button } from "../../../Components/Button";
import "./CompanyProfileEdit.css";
import {
  baseURL,
  editProfile,
  headers,
  showAllDomians,
  showProfile,
} from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Test from "../../../Components/Test";

const CompanyProfileEdit = () => {
  let showDomains;
  const [companyDetails, setCompanyDetails] = useState({
    company_Name: "",
    phone_number: "",
    country: "",
    domain: "",
    account_number: "",
    description: "",
  });
  const [domains, setDomains] = useState();
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    fetchCompanyProfile();
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
  async function fetchCompanyProfile() {
    try {
      let response = await axios.get(`${baseURL}/${showProfile}`, {
        headers: headers,
      });
      setCompanyDetails(response.data);
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
      await axios.post(`${baseURL}/${editProfile}`, companyDetails, {
        headers: headers,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
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
          <h1 className="text-3xl">Company Profile</h1>
          <p className="prodesc">Update your company details as needed.</p>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit Company Details</CardTitle>
          </CardHeader>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    placeholder="Enter company name"
                    value={companyDetails.company_Name || ""}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        company_Name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Country">Country</Label>
                  <Input
                    id="Country"
                    placeholder="Enter country"
                    value={companyDetails.country || ""}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        country: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="Enter account number"
                    value={companyDetails.account_number || ""}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        account_number: e.target.value,
                      })
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
                    value={companyDetails.domain || ""}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={companyDetails.phone_number || ""}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        phone_number: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <UserTextarea
                    className="UserTextareapro"
                    id="description"
                    placeholder="Enter description"
                    value={companyDetails.description || ""}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        description: e.target.value,
                      })
                    }
                    required
                  />
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

export default CompanyProfileEdit;
