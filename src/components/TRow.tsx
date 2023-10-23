import React from "react";

interface TRowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  children: React.ReactNode;
}

const TRow = ({ children, ...props }: TRowProps) => {
  return (
    <tr className="" {...props}>
      {children}
    </tr>
  );
};

export default TRow;
