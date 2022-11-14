import React from "react";
import { Button } from "antd";
import "./Landing.css";

const Landing = () => {
  document.body.style.backgroundImage = "url('./landing.png')";
  return (
    <div className="Landing">
      <div className="talent">
        <p>DELVIN ALFREDO BINNENDIJK</p>
      </div>
      <div className="sub">
        <p>EMAIL BLAST</p>
      </div>
      <div className="desc">
        <p>
          Send emails from lists
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
