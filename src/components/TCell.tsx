import React from "react";

interface TCellProps
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  children: React.ReactNode;
  contrast?: boolean;
}

const TCell = ({ children, contrast, className, ...props }: TCellProps) => {
  const mergedClasses = `${contrast ? "font-bold text-black" : "text-gray"} text-base py-3 ${className || ''}`;
  
  return (
    <td
      className={`${mergedClasses}`}
      {...props}
    >
      {children}
    </td>
  );
};

export default TCell;
