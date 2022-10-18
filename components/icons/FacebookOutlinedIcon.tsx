import React from "react";

const FacebookOutlinedIcon = ({ isHover }: { isHover: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10.773"
      height="20"
      viewBox="0 0 10.773 21.551"
    >
      <path
        fill={isHover ? "#fff" : "#3b5998"}
        d="M8.807 3.579h1.966V.152A25.2 25.2 0 007.912 0C5.076 0 3.133 1.785 3.133 5.063v3.018H.003v3.83h3.13v9.638H6.97v-9.636h3l.477-3.83H6.966V5.444c0-1.107.3-1.865 1.841-1.865z"
      ></path>
    </svg>
  );
};

export default FacebookOutlinedIcon;
