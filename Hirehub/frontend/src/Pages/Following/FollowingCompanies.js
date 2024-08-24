import axios from "axios";
import { baseURL, headers, showCompanyfollowed } from "../../Api/Api";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Test from "../../Components/Test";
export default function FollowingCompanies() {
  let firstNameInitial;
  let lastNameInitial;
  let showFollowingCompanies;

  const nav = useNavigate();
  const [followingCompanies, setFollowingCompanies] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFollowingCompanies();
  }, []);

  async function getFollowingCompanies() {
    try {
      let response = await axios.get(`${baseURL}/${showCompanyfollowed}`, {
        headers: headers,
      });
      setFollowingCompanies(response.data[0]);
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
  function avatarLetters(name) {
    const nameParts = name.split(" ");
    firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
    lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
  }
  if (followingCompanies) {
    showFollowingCompanies =
      followingCompanies.length > 0 ? (
        followingCompanies.map((company, index) => (
          <Link
            className="company-link"
            to={`/company-posts?id=${company.pivot.company_id}`}
            key={index}
          >
            <div className="company-card">
              {avatarLetters(company.company_name)}
              <div className="avatar">
                {firstNameInitial}
                {lastNameInitial}
              </div>
              <div className="company_details">
                <h4>{company.company_name}</h4>
                <div className="company-detail">
                  <p>{company.domain_name}</p>
                  <p>{company.country}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="no-result-following">No results found</div>
      );
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      <section className="following">
        <h1>Following</h1>
        <div className="companies-container">{showFollowingCompanies}</div>
      </section>
    </>
  );
}
