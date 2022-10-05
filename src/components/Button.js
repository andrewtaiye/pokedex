import React, { useState } from "react";

// <------------ Utility Components ------------>
import { capitaliseFirstLetter } from "../components/utility";

export default function Button(props) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      key={Math.random()}
      style={{ "--type": `var(--${props.type})` }}
      className={`filter-type-toggle-btn${
        isActive ? " filter-type-toggle-btn-active" : ""
      }`}
      onClick={handleToggle}
    >
      {capitaliseFirstLetter(props.type)}
    </button>
  );
}
