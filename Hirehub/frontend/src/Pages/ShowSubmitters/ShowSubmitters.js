import { useEffect, useState } from "react";
import { baseURL, headers, showSubmitter } from "../../Api/Api";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegFile } from "react-icons/fa";

import Sidebar from "../../Components/Sidebar";
import Test from "../../Components/Test";
export default function ShowSubmitters() {
  let showSubmitters;
  const [submitters, setSubmitters] = useState();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const nav = useNavigate();
  useEffect(() => {
    ShowSubmitter();
  }, []);
  async function ShowSubmitter() {
    try {
      let response = await axios.get(`${baseURL}/${showSubmitter}/${id}`, {
        headers: headers,
      });
      setSubmitters(response.data[0]);
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
  if (submitters) {
    showSubmitters =
      submitters.length === 0 ? (
        <div className="no-result">No Result Found</div>
      ) : (
        submitters.map((submitter, index) => (
          <div key={index} className="submitters-details">
            <div>
              <h4>{submitter.first_name + " " + submitter.last_name}</h4>
              <p>Country: {submitter.country}</p>
            </div>
            <p className="phone_number">
              Phone number: {submitter.phone_number}{" "}
            </p>
            <div className="show-submitter-cv">
              <Link
                to={`/show-submitter-cv?id=${submitter.id}`}
                className="link"
              >
                <FaRegFile className="icon" />
                <span className="text">CV</span>
              </Link>
            </div>
          </div>
        ))
      );
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />

      <section className="submitters-section">
        <h1>Submitters</h1>
        <div className="submitters-container">{showSubmitters}</div>
      </section>
    </>
  );
}
