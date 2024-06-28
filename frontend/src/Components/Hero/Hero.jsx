import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_img from "../Assets/hero1.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <div>
          <p className="p1">Fashion</p>
          <p className="p2">Never</p>
          <p className="p1">Sleeps</p>
        </div>
        <a href="#newCollections">
          <div className="hero-latest-btn">
            <div>See Latest Collection</div>
            <img src={arrow_icon} alt="" />
          </div>
        </a>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  );
};

export default Hero;
