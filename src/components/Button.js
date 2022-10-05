import React, { useState } from "react";

// <------------ Utility Components ------------>
import { capitaliseFirstLetter } from "../components/utility";

const Button = React.forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    if (ref.current.indexOf(props.type) === -1) {
      ref.current.push(props.type);
    } else {
      const index = ref.current.indexOf(props.type);
      ref.current.splice(index, 1);
    }

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
});

export default Button;
