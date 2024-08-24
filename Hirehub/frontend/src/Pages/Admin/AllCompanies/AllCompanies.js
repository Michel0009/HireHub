import { useEffect, useState } from "react";
import { baseURL, headers, showAllCompanies } from "../../../Api/Api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import Test from "../../../Components/Test";

export default function AllCompanies() {
  let showCompanies;
  const [companies, setCompanies] = useState();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    ShowCompanies();
  }, []);
  async function ShowCompanies() {
    try {
      let response = await axios.get(`${baseURL}/${showAllCompanies}`, {
        headers: headers,
      });
      setCompanies(response.data[0]);
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
  if (companies) {
    showCompanies = companies.map((company, index) => (
      <Link key={index} to={`/block?id=${company.id}`} className="link">
        <div className="submitters-details">
          <div>
            <h4>{company.company_name}</h4>
            <p >Country: {company.country}</p>
          </div>
          <p className="phone_number">Phone number: {company.phone_number} </p>
        </div>
      </Link>
    ));
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      <section className="submitters-section">
        <h1>Companies</h1>
        <div className="submitters-container">{showCompanies}</div>
      </section>
    </>
  );
}
