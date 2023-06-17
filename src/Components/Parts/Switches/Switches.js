import React, { useState, useRef } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Switches.css";

export default function Switches({ setInd, data }) {
  const ref = useRef();
  let [position, setPosition] = useState(0);

  function prev() {
    const carousel = ref.current;
    if (position !== 0) {
      setPosition((position -= 40));
      carousel.style.transform = `translateX(-${position}px)`;
    }
  }

  function next() {
    const carousel = ref.current;
    const count = 40 * data.length - 80;
    if (position !== count) {
      setPosition(position + 40);
      carousel.style.transform = `translateX(-${position}px)`;
    }
  }

  return (
    <div className="switches">
      <div className="switches-content">
        {data.length > 3 ? (
          <div className="switches__prev" onClick={prev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        ) : null}
        <div className="switches-container">
          <div className="switches-carousel" ref={ref}>
            {data.map((_, index) => {
              return (
                <button
                  key={index}
                  className="switches__item"
                  onClick={() => setInd(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
        {data.length > 3 ? (
          <div className="switches__next" onClick={() => next()}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
