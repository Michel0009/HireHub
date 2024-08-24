import { useEffect, useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import axios from "axios";
import { addDomain, baseURL, headers, showAllDomians } from "../../../Api/Api";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Test from "../../../Components/Test";

export default function AllDomains() {
  let showDomains;
  const nav = useNavigate();
  const [domains, setDomains] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDomians();
  }, []);

  const [form, setForm] = useState({
    domain: "",
  });
  function notify(message) {
    if (message === "new domain has been added successfully") {
      toast.success(message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else if (message === "The domain has already been taken.") {
      toast.error(message);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
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
  async function AddDomain(e) {
    e.preventDefault();
    try {
      let response = await axios.post(`${baseURL}/${addDomain}`, form, {
        headers: headers,
      });
      if (response.data.massage === "new domain has been added successfully") {
        notify(response.data.massage);
      }
    } catch (err) {
      if (err.response.data.message) {
        notify(err.response.data.message);
      }
    }
  }
  if (domains) {
    showDomains = domains.map((domain, index) => (
      <div className="domain-name" key={index}>
        {domain.domain}
      </div>
    ));
  }

  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      {domains && (
        <div className="home domains-container">
          <h1>Domains</h1>
          <div className="domain-container">{showDomains}</div>
          <div className="add-domain">
            <form className="domain-form" onSubmit={(e) => AddDomain(e)}>
              <div className="domain-div">
                <label className="domain-label" htmlFor="add-domain">
                  Add a domain:
                </label>
                <input
                  className="add-domain-input"
                  type="text"
                  id="add-domain"
                  name="domain"
                  placeholder="Domain name"
                  value={form.domain}
                  onChange={handleChange}
                />
              </div>
              <button className="add-btn">Add</button>
            </form>
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
        </div>
      )}
    </>
  );
}
