import React, { useEffect } from "react";
import "./Home.css";
import { TopNav, Hero, LoginForm } from "../parts";
import { getCurrentUser } from "../utils";
import { useNavigate } from "react-router-dom";

const heroTitle = "Iron Bank of Braavos";
const heroSubtitle = "The most trusted bank in Westeros and Essos";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate("/dashboard/profile", { replace: true });
    }
  }, []);

  return (
    <div className="home">
      <TopNav name="IBB" />
      <Hero title={heroTitle} subtitle={heroSubtitle}>
        <LoginForm />
      </Hero>
      <div className="home-footer">
        <div className="first-ft">
          <i className="fa-solid fa-sliders fa-2xl"></i>
          <span>Easy control of<br></br>your money</span>
        </div>
        <div className="second-ft">
          <i className="fa-solid fa-circle-dollar-to-slot fa-2xl"></i>
          <span>Get cashback in every<br></br>transaction</span>
        </div>
        <div className="third-ft">
          <i className="fa-solid fa-chart-gantt fa-2xl"></i>
          <span>Track your cashflow with<br></br>the budget app</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
