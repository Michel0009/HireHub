import { useState } from "react";
import "./Verify.css";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseURL, headers, REVERIFY, VERIFY } from "../../Api/Api";
import { err_m, err_s } from "../../Components/Mess";
import Test from "../../Components/Test";

export default function Verify() {
  // Cookies
  const cookie = Cookie();

  // states
  const [step, setstep] = useState(new Array(6).fill(""));
  const [vercode, setvercode] = useState({
    verification_code: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState("");

  function handlechange(e, indexx) {
    setstep([
      ...step.map((data, index) => (index === indexx ? e.target.value : data)),
    ]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  const user_name = cookie.get("username");
  let token = cookie.get("token");

  const verificationCode = step.join("");

  vercode.verification_code = verificationCode;
  console.log(vercode);

  // Handle Submite
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(`${baseURL}/${VERIFY}/${user_name}`, vercode, {
        headers: headers,
      });
      if (res.data.message === "your email has been verified successfully") {
        setLoading(false);
        err_s("your email has been verified successfully");
        if (cookie.get("user_type") === 2) {
          window.location.pathname = "/user";
        } else if (cookie.get("user_type") === 1) {
          window.location.pathname = "/comp";
        }
      }
      if (res.data.message === "the code is wrong, please try again") {
        setLoading(false);

        seterr(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // resend code
  async function resend(e) {
    e.preventDefault();
    console.log(user_name);
    try {
      let res = await axios.get(`${baseURL}/${REVERIFY}/${user_name}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return loading ? (
    <Test />
  ) : (
    <div className="bodyverify">
      <form onSubmit={handleSubmit} action="">
        <div className="emailcontainer">
          <h1>Enter your code</h1>
          <p>
            we have sent an Email verification to your Email address Please
            chack it
          </p>
          <div className="inp">
            {step.map((data, i) => {
              return (
                <input
                  type="text"
                  value={data}
                  maxLength={1}
                  onChange={(e) => handlechange(e, i)}
                  required
                />
              );
            })}
          </div>
          <div className="errverify">
            {<p className="errmes_verify">{err}</p>}
          </div>
          <div className="buttonvere">
            <button onClick={resend}>resend it</button>
            <button type="submit">Verify</button>
          </div>
        </div>
      </form>
    </div>
  );
}
