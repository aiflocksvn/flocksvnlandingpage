import * as React from "react"

const SvgComponent = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    viewBox="0 0 16 16"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M8 15.5A7.5 7.5 0 1 0 .5 8 7.508 7.508 0 0 0 8 15.5zm0-14A6.5 6.5 0 1 1 1.5 8 6.508 6.508 0 0 1 8 1.5z"
      data-original="#000000"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M5.646 10.354a.5.5 0 0 0 .707 0L8 8.707l1.647 1.647a.5.5 0 0 0 .706-.707L8.707 8l1.647-1.647a.5.5 0 0 0-.707-.706L8 7.293 6.353 5.647a.5.5 0 0 0-.706.707L7.293 8 5.647 9.647a.5.5 0 0 0 0 .707z"
      data-original="#000000"
    />
  </svg>
)

export default SvgComponent