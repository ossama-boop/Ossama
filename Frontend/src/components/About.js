import React from "react";
import "../Style/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            This website offers you an exceptional experience 
            in planning your trips across Lebanon with smart 
            and sophisticated ease. We provide meticulously 
            crafted daily itineraries and the finest must-visit
             destinations, allowing you to savor every moment 
             of your journey without the hassle of planning.
          </p>
        </div>

        <div className="about-image">
          <img
            src="image5.jpeg"
            alt="About Us"
          />
        </div>
      </div>
    </div>
  );
};

export default About;