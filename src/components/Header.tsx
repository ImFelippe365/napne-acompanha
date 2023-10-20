import React from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
const Header: React.FC = () => {
  const paths = [
    {
      title: "Visão geral",
      path: "/",
      currentPage: true,
    },
    {
      title: "Discentes",
      path: "/",
      currentPage: false,
    },
    {
      title: "Eventos",
      path: "/",
      currentPage: false,
    },
    {
      title: "Gestão acadêmica",
      path: "/",
      currentPage: false,
    },
  ];

  return (
    <header className="w-full flex flex-row items-center justify-between px-6">
      <span>Logo aqui</span>
      <nav>
        <ul className="flex flex-row items-center gap-8">
          {paths.map(({ title, path, currentPage }, index) => (
            <li
              key={index}
              className={`py-4 text-gray font-normal ${
                currentPage ? "text-primary !font-semibold border-b-2" : ""
              }`}
            >
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-primary-transparent p-2 rounded-full">
        <BiUser className="text-xl  text-primary" />
      </div>
    </header>
  );
};

export default Header;
