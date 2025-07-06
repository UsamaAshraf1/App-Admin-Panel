import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/form.css";
import vector1 from "./../assets/smartCare_hero.jpg";
import vector2 from "./../assets/vector2.png";
import woodmark from "./../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../utils/urls.js";
// axios.defaults.withCredentials = true;

export default function Login(props) {
  // console.log(props);
  const location = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function login(email, password) {
    toast("please wait", {
      progress: true,
    });
    axios
      .post(
        `${url}/v1/admin/login`,
        {
          email: email,
          password: password,
        }
        // {
        //   // headers: {
        //   //   "Content-Type": "application/json",
        //   // },
        // }
      )
      .then(function (response) {
        console.log(response.data.data);
        if (response.data?.success) {
          localStorage.setItem("login", true);
          localStorage.setItem("role", response.data.data.role);
          props.setRole(response.data.data.role);
          props.setLogin(true);
          // localStorage.setItem("authToken", response.data.data.authToken);
          // localStorage.setItem("session_id", response.data.data.session_id);
          // props.setLogin(true);
          // location("/");
        }
      })
      .catch(function (error) {
        toast.dismiss();
        toast(error.response?.data?.message || "Login failed", {
          type: "error",
        });
        console.log(error.response.data);
      });
  }
  function handleSubmit(event) {
    event.preventDefault();
    login(email, password);
  }

  return (
    <div className="loginpage" style={{ height: "100vh", overflow: "hidden" }}>
      <section className="logosection tab1">
        <div className="vector1">
          <img src={vector1} alt="logoimage" style={{ height: "100vh" }} />
        </div>
      </section>
      <section className="formsection tab2">
        <div className="heading">
          <h3 className="h3">Admin Portal</h3>
          <p className="head-pg"></p>
        </div>
        <div className="form">
          <Form onSubmit={handleSubmit}>
            <div className="fields-group">
              <Form.Group className="mb-3 email" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  className="form-field"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="form-field"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </div>
            <Button
              className="btn form-btn"
              variant="secondary"
              type="submit"
              disabled={!validateForm()}
              style={{ cursor: "pointer" }}
            >
              Sign in
            </Button>
          </Form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
