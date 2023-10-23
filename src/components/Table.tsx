import React from "react";

interface TableProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  children: React.ReactNode;
  className?: string;
}

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <table className={`w-full ${className}`} {...props}>
      {children}
    </table>
  );
};

export default Table;
