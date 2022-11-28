import React from "react";
import "./Home.css";
import { TopNav, Hero, LoginForm } from "../parts";

const heroTitle = "Iron Bank of Braavos";
const heroSubtitle = "The most trusted bank in Westeros and Essos";

function Home() {
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
