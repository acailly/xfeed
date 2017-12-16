import React from "react"

const Card = ({ children }) => (
  <div
    style={{
      backgroundColor: "white",
      textAlign: "center",
      margin: "5px",
      padding: "10px"
    }}
  >
    {children}
  </div>
)

export default Card
