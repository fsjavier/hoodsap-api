import React from "react";
import styles from "../styles/CustomButton.module.css";

function CustomButton({ children, type, variant, disabled, onClick }) {
  const variantClassName = styles[variant] || styles.Primary
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.Button} ${variantClassName}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
