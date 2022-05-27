import React from "react";
import { Button } from "antd";
import "./Landing.css";

const Landing = () => {
  document.body.style.backgroundImage = "url('./landing.png')";
  return (
    <div className="Landing">
      <div className="logo">
        <img src="./talentlogo.png" alt="logo"></img>
      </div>
      <div className="talent">
        <p>TALENTHRM</p>
      </div>
      <div className="sub">
        <p>Communication Platform</p>
      </div>
      <div className="desc">
        <p>
          Platform for communicating businees email, marketing campaign and
          newsletter.
        </p>
      </div>
      <div className="start">
        <Button target="_self" rel="noopener noreferrer" href="/login" type="primary" size="large">
          Let's Get Started
        </Button>
      </div>
    </div>
  );
};

export default Landing;
