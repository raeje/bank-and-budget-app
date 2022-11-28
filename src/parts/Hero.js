import React from "react";
import "./Hero.css";

function Hero(props) {
  return (
    <section className="hero">
      <img src={props.img} alt={props.alt} />
      <span className="title">{props.title}</span>
      <span className="subtitle">{props.subtitle}</span>
      {props.children}
    </section>
  );
}

export default Hero;
