import React from "react";

const SmsIcon = ({color="#3b4e56"}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="17"
      viewBox="0 0 20 17"
    >
      <path
        fill={color}
        d="M15 0H5C2 0 0 1.5 0 5v7c0 3.5 2 5 5 5h10c3 0 5-1.5 5-5V5c0-3.5-2-5-5-5zm.47 6.09l-3.13 2.5a3.861 3.861 0 01-4.68 0l-3.13-2.5a.769.769 0 01-.12-1.06.748.748 0 011.05-.12l3.13 2.5a2.386 2.386 0 002.81 0l3.13-2.5a.738.738 0 011.05.12.759.759 0 01-.11 1.06z"
      ></path>
    </svg>
  );
}

export default SmsIcon;