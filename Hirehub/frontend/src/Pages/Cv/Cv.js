import axios from "axios";
import React, { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "../../Components/Card";
import { Label } from "../../Components/Label";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import "./Cv.css";
import { UserTextarea } from "../../Components/Textarea";
import { baseURL, createCV, headers, submitToPost } from "../../Api/Api";
import { Bounce, toast, ToastContainer } from "react-toastify";

const CVForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [domain, setDomain] = useState("");
  const [license, setLicense] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  function notify(message) {
    toast.error(message);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${baseURL}/${createCV}`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phone,
          country: country,
          date: date,
          domain: domain,
          skills: skills,
          experience: experience,
          language: language,
          license: license,
          description: description,
          education: education,
        },
        { headers: headers }
      );
      if (response.data.massage === "Your CV has been created successfully") {
        alert("Your CV has been created successfully");
      } else if (
        response.data.massage ===
        "You have a cv .. you can not create a new one"
      ) {
        notify(response.data.massage);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create Cv. Please try again later.");
    }
  };

  return (
    <section className="w-full">
      <div className="usercontainerr">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle style={{ fontWeight: "bold" }}>Create Your CV</CardTitle>
            <CardDescription>
              Fill out the form below to create your professional CV.
            </CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e)}>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Country">Country</Label>
                  <Input
                    id="Country"
                    type="text"
                    placeholder="Enter your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">BirthDate</Label>
                  <Input
                    id="date"
                    type="date"
                    placeholder="Enter your Birthdate "
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    type="text"
                    placeholder="Enter your domain "
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    placeholder="Enter your language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <select
                    className="select cv-select"
                    id="education"
                    placeholder="Enter your education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                  >
                    <option disabled={true} value="">
                      Choose...
                    </option>
                    <option>high school</option>
                    <option>college</option>
                    <option>master</option>
                    <option>null of them</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License</Label>
                  <Input
                    id="license"
                    placeholder="Enter your license"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <UserTextarea
                  className="usertextarea"
                  id="skills"
                  rows={4}
                  placeholder="Enter your skills background"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <UserTextarea
                  className="usertextarea"
                  id="experience"
                  rows={4}
                  placeholder="Enter your work experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <UserTextarea
                  className="usertextarea"
                  id="description"
                  rows={4}
                  placeholder="Enter your work description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="ml-auto" type="submit">
                Create
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme={document.body.classList.value === "dark" ? "dark" : "light"}
      />
    </section>
  );
};

export default CVForm;
