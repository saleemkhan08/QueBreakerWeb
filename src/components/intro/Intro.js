import React from "react";
import "./Intro.css";
const Intro = props => {
  return (
    <div className="view">
      <div
        style={{
          flexDirection: "column",
          backgroundColor: "#53125366"
        }}
        className="flex-center center-text"
      >
        <h2>This Navbar is fixed</h2>
        <h5>
          It will always stay visible on the top, even when you scroll down
        </h5>
        <p>
          Navbar's background will switch from transparent to solid color while
          scrolling down
        </p>
        <br />
        <p>
          Full page intro with background image will be always displayed in full
          screen mode, regardless of device{" "}
        </p>
      </div>
    </div>
  );
};

export default Intro;
