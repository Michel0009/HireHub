// first instal(npm install sweetalert2)

import Swal from "sweetalert2";
import "./Block.css";
import { MdBlockFlipped } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { BLOCK, Com_D, baseURL, headers } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { useLocation, useNavigate } from "react-router-dom";
import Test from "../../../Components/Test";

export default function Block() {
  // Cookies
  const cookie = Cookie();

  const nav = useNavigate();
  const [name, setname] = useState("");
  const [contry, setcontry] = useState("");
  const [phone, setphone] = useState("");
  const [d_id, setd_id] = useState("");
  const [c_p, setc_p] = useState("");
  const [r_p, setr_p] = useState("");
  const [c_status, setc_status] = useState("");
  const [popM, setpopM] = useState("Do you want to block combany!!");
  const [loading, setLoading] = useState(true);

  let token = cookie.get("token");
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    Com_d();
  }, [popM]);
  async function Com_d() {
    try {
      let res = await axios.get(`${baseURL}/${Com_D}/${id}`, {
        headers: headers,
      });
      setname(res.data[0].company_name);
      setcontry(res.data[0].country);
      setphone(res.data[0].phone_number);
      setd_id(res.data[0].domain_id);
      setc_p(res.data.Posts_count);
      setr_p(res.data.reports_count);
      setc_status(res.data.company_status);
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
  function alter() {
    console.log(popM);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `${popM}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .get(`${baseURL}/${BLOCK}/${id}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => console.log(res));
          // .then(setpopM(""))
          if (c_status == 1) {
            setpopM("Do you want to block combany!!");
          } else {
            setpopM("Do you want to unblock combany!!");
          }

          swalWithBootstrapButtons.fire({
            title: "succes!",
            text: "This company status has been changed.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "This Company still here :)",
            icon: "error",
          });
        }
      });
  }

  return loading ? (
    <Test />
  ) : (
    <div className="container">
      <div className="wrapper ">
        <div className="block1 col-lg-4 col-md-4 col-11">
          <div>
            <h3 className="h3_Block1">{name}</h3>
            <p className="p_Block1">Posts: {c_p}</p>
          </div>
          <div>
            <p>reports: {r_p}</p>
            <button type="button" className="button_Block" onClick={alter}>
              {c_status == 0 && (
                <div>
                  {" "}
                  <MdBlockFlipped className="iconblock" />
                  BLOCK
                </div>
              )}
              {c_status == 1 && (
                <div>
                  {" "}
                  <MdBlockFlipped className="iconblock" />
                  UNBLOCK
                </div>
              )}
            </button>
          </div>
        </div>
        {/* Block 2 */}
        <div className="block2 col-lg-6 col-md-6 col-11">
          <div className="form_comb_B">
            <h5>company name:</h5>
            <p>{name}</p>
          </div>
          <div className="form_comb_B">
            <h5> Country:</h5>
            <p>{contry}</p>
          </div>
          <div className="form_comb_B">
            <h5> company number</h5>
            <p>{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
