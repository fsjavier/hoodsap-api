import React from "react";
import styles from "../styles/CustomButton.module.css";

function CustomButton({
  children,
  type = "button",
  variant = "Primary",
  size = "Medium",
  block = false,
  disabled = false,
  selected = false,
  onClick,
}) {
  const variantClassName = styles[variant] || styles.Primary;
  const sizeClassName = styles[size] || "";
  const blockClassName = block ? styles.Block : "";
  const selectedClassName = selected ? styles.Selected : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.Button} ${variantClassName} ${sizeClassName} ${blockClassName} ${selectedClassName}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
