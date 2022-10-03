import React from "react";
import { Link } from "react-router-dom";

export default function Splash() {
  return (
    <div className="container splash">
      <Link to="/home">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
          // src="pages/logo.png"
          alt="Pokemon!"
        />
      </Link>
    </div>
  );
}
