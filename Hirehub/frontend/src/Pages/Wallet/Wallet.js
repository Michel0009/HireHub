import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import { baseURL, chargeWallet, headers, showProfile } from "../../Api/Api";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Test from "../../Components/Test";

export default function Wallet() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    account: "",
    account_number: "",
  });
  const [balance, setBalance] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  function notify() {
    toast.success("Wallet charged successfully");
  }
  useEffect(() => {
    getWallet();
  }, []);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function getWallet() {
    try {
      let response = await axios.get(`${baseURL}/${showProfile}`, {
        headers: headers,
      });
      setBalance(response.data["Wallet Information"]["account"]);
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
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(`${baseURL}/${chargeWallet}`, form, {
        headers: headers,
      });
      if (res.data.message === "Success") {
        notify();
      } else if (
        res.data.message ===
        "Your account number is uncorrect..Please try again"
      ) {
        setError("Your account number is uncorrect");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return loading ? (
    <Test />
  ) : (
    <>
      <Sidebar />
      <div className="home walletContainer">
        <div className="wallet">
          <h1>Wallet</h1>
          <h4>Your balance : {balance || balance === 0 ? balance : ""}</h4>
          <form onSubmit={handleSubmit} className="walletForm">
            <input
              type="text"
              placeholder="Balance"
              name="account"
              value={form.account}
              onChange={handleChange}
              required
            />
            {error !== "" && <span className="walletError">{error}</span>}
            <input
              type="text"
              placeholder="Account number"
              name="account_number"
              value={form.account_number}
              onChange={handleChange}
              required
            />
            <button type="submit" className="charge">
              Charge
            </button>
          </form>
        </div>
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
    </>
  );
}
