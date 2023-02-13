import React from "react";
import { Logo } from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae reprehenderit reiciendis praesentium est suscipit velit
            asperiores minima esse eius dignissimos?
          </p>
          <Link to="/register" className="btn hero-btn">
            Login/Register
          </Link>
        </div>
        <img src={main} className="img main-img" alt="job hunt" />
      </div>
    </Wrapper>
  );
};

export default Landing;
