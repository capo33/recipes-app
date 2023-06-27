import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};
const Button = ({ children, type, handleClick, className }: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
