import React from "react";

interface THeaderProps
  extends React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  children: React.ReactNode;
  contentClassName?: string;
}

const THeader = ({ children, contentClassName, ...props }: THeaderProps) => {
  return (
    <th className={`font-bold text-gray text-xs uppercase text-left ${contentClassName}`} {...props}>
      {children}
    </th>
  );
};

export default THeader;
