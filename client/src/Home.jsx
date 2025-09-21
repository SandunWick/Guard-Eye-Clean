import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import back1 from "./assets/back1.jpg";
import back2 from "./assets/back2.jpg";
import back3 from "./assets/back3.jpg";
import back4 from "./assets/back4.jpg";
import back5 from "./assets/back5.jpg";
import back6 from "./assets/back6.jpg";
import back7 from "./assets/back7.jpg";
import back8 from "./assets/back8.jpg";
import back9 from "./assets/back9.jpg";
import back10 from "./assets/back10.jpg";
import back11 from "./assets/back11.jpg";
import back12 from "./assets/back12.jpg";
import back13 from "./assets/back13.jpg";
import Guard from "./assets/guard.png";

function Home() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backgroundImages = [
    back1,
    back2,
    back3,
    back4,
    back5,
    back6,
    back7,
    back8,
    back9,
    back10,
    back11,
    back12,
    back13,
  ];

  // Preload images to prevent blinking
  useEffect(() => {
    backgroundImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [backgroundImages]);

  // Background image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);


  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="home-wrapper">
        <div className="container home-content">
          <h1>Welcome to GuardEye</h1>
          <p>A project by Team SOVA.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="signup">
              Sign Up
            </Link>
            <Link to="/login" className="learn-more">
              Login
            </Link>
          </div>
        </div>
        <div className="image-container">
          <img
            src={Guard}
            alt="GuardEye security professional"
            className="person-image"
          />
        </div>
      </div>
      <footer className="footer">
        <p className="description">
          At GUARDEYE, we are committed to delivering trusted security solutions
          that combine professional manpower with modern technology.
          <br />
          Our goal is simple: to keep you, your assets, and your business safe at
          all times.
        </p>
      </footer>
    </div>
  );
}

export default Home;