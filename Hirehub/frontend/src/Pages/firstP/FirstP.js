import "./FirstP.css";
import { LuUser2 } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";
import { FaRegPaperPlane } from "react-icons/fa6";
import UncontrolledExample from "./Slickslider";
import logoo from "../../Assets/Images/Logo.png";
import { useEffect, useState } from "react";
import Test from "../../Components/Test";
export default function FirstP() {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  return loading ? (
    <Test />
  ) : (
    <div className="">
      <nav className="nav">
        <img className="imgN" src={logoo} alt="logo"></img>

        <div className="R_L_N">
          <a className="a_N" href="/register">
            Register
          </a>
          <a className="a_N" href="/login">
            Login
          </a>
        </div>
      </nav>

      <div className="mycontainer">
        <div className="header col-12">
          <div className="title col-lg-6">
            <h1>
              Hirehub, Publish work and
              <span style={{ color: "#695cfe" }}> find a job</span>
            </h1>
          </div>
          <div className="betwenline" />
          <div className="ul col-lg-6">
            <ul>
              <li>Start your company and find your employees with us.</li>
              <li>Find a job opportunity that suits you.</li>
              <li>
                Benefit from employment services in the fastest and easiest way
              </li>
              <li>
                Join a trusted partner committed to delivering what you need In
                business with precision and flair.
              </li>
            </ul>
          </div>
        </div>
        <div className="sleckslider">
          <UncontrolledExample />
        </div>
        <div className="ser col-lg-12">
          <h1 style={{ color: "#695cfe" }}>Our Services</h1>
          <p>
            Discover the Full Spectrum of Our Comprehensive and Tailored
            Services Designed to Meet Your Unique Needs and Goals
          </p>
        </div>
        <div className="ser1">
          <div className="pro col-lg-3 ">
            <LuUser2 className="s_icon" />
            <h4 style={{ color: "#695cfe" }}>Find jobs</h4>
            <p style={{ color: "#707070" }}>
              We create stunning, responsive websites specifically designed to
              let you search for work easily ensuring a seamless user experience
              across all devices.
            </p>
          </div>
          <div className="pro col-lg-3">
            <LuUserPlus className="s_icon" />
            <h4 style={{ color: "#695cfe" }}>Search for employees</h4>
            <p style={{ color: " #707070" }}>
              Look for experienced and distinguished employees in various fields
            </p>
          </div>
          <div className="pro col-lg-3">
            <FaRegPaperPlane className="s_icon" />
            <h4 style={{ color: "#695cfe" }}>Freelancing</h4>
            <p style={{ color: " #707070" }}>
              Find your comfortable work anywhere in your home easily and for
              free
            </p>
          </div>
        </div>

        <div className="about-us col-lg-12">
          <h1 style={{ color: "#695cfe" }}>About Us</h1>
          <h4 style={{ color: "#707070" }}>
            Ease and excellence in the field of job opportunities{" "}
          </h4>
          <p style={{ color: "#abb1c9" }}>
            Welcome to Hirehub, A website specialized in providing the service
            of searching for job opportunities and publishing job applications
            with the greatest speed and ease. This website was developed by a
            talented group of ITE students.
          </p>
        </div>
      </div>
    </div>
  );
}
