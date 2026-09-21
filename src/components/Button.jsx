import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Button({ children, onClick, variant = "primary", type = "button", className = "", disabled = false }) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`btn btn-${variant} ${className}`}>
      <span>{children}</span>
      {variant !== "text" && <ArrowUpRight size={16} strokeWidth={1.5} />}
    </button>
  );
}
