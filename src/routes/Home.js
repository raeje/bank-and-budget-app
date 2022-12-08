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
    </div>
  );
}

export default Home;
