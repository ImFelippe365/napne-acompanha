import React from "react";

interface TCellProps
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  children: React.ReactNode;
  contrast?: boolean;
}

const TCell = ({ children, contrast, ...props }: TCellProps) => {
  return (
    <td
      className={`${
        contrast ? "font-bold text-black" : "text-gray"
      } text-base py-3`}
      {...props}
    >
      {children}
    </td>
  );
};

export default TCell;
