import React from "react";

interface HeadingProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const Heading = ({ children, title, description, className }: HeadingProps) => {
  return (
    <section
      className={`flex flex-row items-center justify-between ${className}`}
    >
      <article className="self-start">
        <h2 className="text-4xl text-black font-bold mb-1">{title}</h2>
        <p className="text-gray text-base">{description}</p>
      </article>

      {children}
    </section>
  );
};

export default Heading;
