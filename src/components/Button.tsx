import { Spinner } from "flowbite-react";
import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  color?: "success" | "error" | "base";
  className?: string;
  isLoading?: boolean;
}

const Button = ({
  children,
  className,
  color = "base",
  isLoading,
  ...props
}: ButtonProps) => {
  const colorClass =
    color === "base"
      ? "bg-primary"
      : color === "success"
      ? "bg-success"
      : "bg-error";

  return (
    <button
      className={`text-white text-sm font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50 hover:opacity-50 ${colorClass} ${
        className ? className : ""
      }`}
      {...props}
    >
      {isLoading && (
        <Spinner size="sm" color={"success"} className="text-white mr-2" />
      )}
      {children}
    </button>
  );
};

export default Button;
