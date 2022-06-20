import * as React from "react"
import "./Chip.css"

export function Chip({ label = "", isActive = true, onClick}) {
    const buttonClassName = isActive ? "chip active" : "chip";
  return (
    <button onClick={onClick} className={buttonClassName}>
      <p className="label">{label}</p>
      <span className={buttonClassName} role="button">{`X`}</span>
    </button>
  )
}

export default Chip
