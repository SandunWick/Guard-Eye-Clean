import React, { useEffect } from "react";
import { animate, stagger } from "motion";
import "./Services.css"

const sentence = "Welcome to GuardEye Security Solutions";
const paragraphText = "GuardEye provides cutting-edge security solutions to protect your assets with advanced technology and reliable services.";

function Services() {
  useEffect(() => {
    const headingEls = document.querySelectorAll(".heading-word-inner");
    const paragraphEls = document.querySelectorAll(".paragraph-word-inner");

    headingEls.forEach((el) => (el.style.transform = "translateY(-100%)"));
    paragraphEls.forEach((el) => (el.style.transform = "translateY(-100%)"));

    animate(
      headingEls,
      {
        transform: ["translateY(-100%)", "translateY(0%)"],
        opacity: [0, 1],
      },
      {
        duration: 2.5,
        easing: "ease-in-out",
        delay: stagger(0.12),
        repeat: 0,
      }
    );

    animate(
      paragraphEls,
      {
        transform: ["translateY(-100%)", "translateY(0%)"],
        opacity: [0, 1],
      },
      {
        duration: 2.5,
        easing: "ease-in-out",
        delay: stagger(0.12, { start: 0.5 }),
        repeat: 0,
      }
    );
  }, []);

  return (
    <div className="Services">
      <h1 className="animated-heading">
        {sentence.split(" ").map((word, index) => (
          <span className="heading-word-clip" key={`heading-${index}`}>
            <span className="heading-word-inner">{word}</span>&nbsp;
          </span>
        ))}
      </h1>
      <p className="animated-paragraph">
        {paragraphText.split(" ").map((word, index) => (
          <span className="paragraph-word-clip" key={`paragraph-${index}`}>
            <span className="paragraph-word-inner">{word}</span>&nbsp;
          </span>
        ))}
      </p>
    </div>
  );
}

export default Services;