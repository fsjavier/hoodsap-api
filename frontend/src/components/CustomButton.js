import React from "react";
import styles from "../styles/CustomButton.module.css";

function CustomButton({
  children,
  type = "button",
  variant = "Primary",
  size = "Medium",
  disabled = false,
  selected = false,
  onClick,
}) {
  const variantClassName = styles[variant] || styles.Primary;
  const sizeClassName = styles[size] || "";
  const selectedClassName = selected ? styles.Selected : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.Button} ${variantClassName} ${sizeClassName} ${selectedClassName}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
