import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const currentPath = "/" + pathname?.split("/")[1];

  const paths = [
    {
      title: "Visão geral",
      pathParent: "/",
      path: "/",
    },
    {
      title: "Discentes",
      pathParent: "/discentes",
      path: "/discentes",
    },
    {
      title: "Eventos",
      pathParent: "/eventos",
      path: "/eventos",
    },
    {
      title: "Gestão acadêmica",
      pathParent: "/gestao-academica",
      path: "/gestao-academica/diarios",
    },
  ];

  return (
    <header className="w-full flex flex-row items-center justify-between px-6">
      <span>Logo aqui</span>
      <nav>
        <ul className="flex flex-row items-center gap-6">
          {paths.map(({ title, path, pathParent }, index) => (
            <Link to={path} key={index}>
              <li
                key={index}
                className={`p-4 text-gray font-normal inset-0 relative hover:opacity-80 ${currentPath === pathParent
                    ? "text-primary !font-semibold border-b-2"
                    : "headerNavOption"
                  }`}
              >
                {title}
              </li>
            </Link>
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
