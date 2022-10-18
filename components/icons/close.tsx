import * as React from "react"

const SvgComponent = (props:any) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={16} cy={16} r={16} fill="#D8D8D8" />
    <path
      d="m11.333 11.333 9.333 9.334m-9.333 0L16 16l4.666-4.667"
      stroke="#2D264B"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
)

export default SvgComponent