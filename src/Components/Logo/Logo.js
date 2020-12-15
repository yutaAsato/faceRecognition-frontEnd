import React from "react";
import "./Logo.css";
import brain from "./brain.png";

//'react-tilt' library for logo design
import Tilt from "react-tilt";

const Logo = () => {
  return (
    <div className="ma2 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 60 }}
        style={{ height: 120, width: 120 }}
      >
        <div className="Tilt-inner pa3">
          {" "}
          <img style={{ paddingTop: "5px" }} alt="logo" src={brain}></img>{" "}
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
