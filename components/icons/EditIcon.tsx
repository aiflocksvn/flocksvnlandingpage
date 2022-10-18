import React from "react";

const EditIcon = ({fill="none"}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21.951"
      height="21.951"
      viewBox="0 0 21.951 21.951"
    >
      <g
        fill={fill}
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      >
        <path
          d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
          transform="translate(-1.15 -.899)"
        ></path>
        <path
          strokeMiterlimit="10"
          d="M16.04 3.02L8.16 10.9a2.712 2.712 0 00-.66 1.32l-.43 3.01a1.424 1.424 0 001.7 1.7l3.01-.43a2.8 2.8 0 001.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94s-3.58-1.36-4.94 0zM14.91 4.15a7.144 7.144 0 004.94 4.94"
          transform="translate(-1.15 -.899)"
        ></path>
      </g>
    </svg>
  );
}

export default EditIcon;