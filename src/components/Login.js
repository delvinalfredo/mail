import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Typography } from "antd";
// import { login } from "../repository/DataRepository";
import "./Login.css";
import { login } from "../repository/DataRepository";
import axios from "axios";

const { Title } = Typography;

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    const val = e.target.value;
    setUsername(val);
  };

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  // const handleValidation = () => {
  //   if (username === "") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const handleSubmitLogin = (e) => {
  //   e.preventDefault();
  //   if (handleValidation()) {
  //     const user = {
  //       username: username,
  //       password: password,
  //     };
  //     login(user);
  //     setUsername("");
  //     setPassword("");
  //   } else {
  //     alert("Username or Password required");
  //   }
  // };

  return (
    <div className="Login">
      <Row >
        <Col span={12} className="side">
          <img src="./side.png" alt="sideimg"></img>
        </Col>
        <Col span={12} className="Submit-Login">
          <div className="Login-Form">
            <div className="garis">
              <img src="./garis.png" alt="garis"></img>
            </div>
            <div className="Judul">
              <Title>Login Now!</Title>
            </div>
            <Form >
              <Input
                style={{ marginBottom: 20, borderRadius: 6 }}
                value={username}
                onChange={handleUsername}
                placeholder="Username"
              />
              <Input.Password
                style={{ marginBottom: 20, borderRadius: 6 }}
                value={password}
                onChange={handlePassword}
                placeholder="Password"
              />
              <div className="Input-Form">
                <Button
                onClick={()=>{
                //   const data = {
                //     username: username,
                //     password: password,
                //   }
                //   login(data).then(response => {
                //     localStorage.setItem("token", response.data.token);
                //     window.location.href ="/mail-template"
                // });
                }}
                  target="_self"
                  rel="noopener noreferrer"
                  href="/mail-template"
                  type="primary"
                  size="large"
                 
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
