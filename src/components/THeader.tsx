import React from "react";

interface THeaderProps
  extends React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  children: React.ReactNode;
}

const THeader = ({ children, ...props }: THeaderProps) => {
  return (
    <th className="font-bold text-gray text-xs uppercase text-left" {...props}>
      {children}
    </th>
  );
};

export default THeader;
