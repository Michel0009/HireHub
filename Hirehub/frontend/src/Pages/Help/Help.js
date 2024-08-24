import "./Help.css";
import { LuUser2 } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";
import { FaRegPaperPlane } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";

export default function Help() {
  return (
    <div className="">
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

        <div className="Contact-us col-lg-12">
          <h1 style={{ color: "#695cfe" }}>Contact us</h1>
          <h4 style={{ color: "#707070" }}>
            Contact us if you encounter a problem via the following email
            address{" "}
          </h4>
          <p style={{ color: "#abb1c9" }}>bshara.h2003@gmail.com</p>
        </div>
        <div class="whatsapp-card contact-card">
          <a href="https://wa.me/9630938246910">
            <i class="fa-brands fa-whatsapp"><FaWhatsapp />

            </i>
          </a>
        </div>
      </div>
    </div>
  );
}
