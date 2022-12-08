import React, { useEffect } from "react";
import "./Home.css";
import { TopNav, Hero, LoginForm } from "../parts";
import { getCurrentUser } from "../utils";
import { useNavigate } from "react-router-dom";

const heroTitle = "Iron Bank of Braavos";
const heroSubtitle = "The most trusted bank in all of Westeros and Essos";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate("/dashboard/profile", { replace: true });
    }
  }, []);

  const textBlock =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique nibh eu accumsan consequat. Donec iaculis sapien ac nibh laoreet pretium. Sed pharetra sodales est, nec suscipit nisi feugiat ut. Cras vel enim ac ipsum egestas maximus. Morbi varius convallis risus vel sollicitudin. Cras aliquam tincidunt mattis. Pellentesque sit amet ligula pulvinar, gravida metus ac, cursus nunc. ";

  return (
    <div className="home">
      <TopNav name="IBB" />
      <Hero title={heroTitle} subtitle={heroSubtitle} textBlock={textBlock}>
        <LoginForm />
      </Hero>
    </div>
  );
}

export default Home;
