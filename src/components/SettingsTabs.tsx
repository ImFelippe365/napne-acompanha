import { Link, useLocation } from "react-router-dom";

import { BiSolidBookBookmark } from "react-icons/bi"
import { FaGraduationCap } from "react-icons/fa"
import { HiUsers } from "react-icons/hi2"
import { IoLibrarySharp } from "react-icons/io5"

const SettingsTabs = () => {
  const { pathname } = useLocation();
  const currentPath = "/" + pathname?.split("/")[1] + "/" + pathname?.split("/")[2];

  const tabs = [
    {
      title: "Diários",
      path: "/gestao-academica/diarios",
      icon: <BiSolidBookBookmark size={24} />,
    },
    {
      title: "Cursos",
      path: "/gestao-academica/cursos",
      icon: <FaGraduationCap size={24} />,
    },
    {
      title: "Turmas",
      path: "/gestao-academica/turmas",
      icon: <HiUsers size={24} />,
    },
    {
      title: "Disciplinas",
      path: "/gestao-academica/disciplinas",
      icon: <IoLibrarySharp size={24} />,
    },
  ]

  return (
    <div className="w-full flex flex-row items-center justify-between mt-4">
      <ul className="flex flex-row items-center gap-8">
        {tabs.map(({ title, icon, path }, index) => (
          <Link to={path} key={index}>
            <li
              key={index}
              className={`cursor-pointer p-4 flex flex-row items-center gap-2 text-gray font-normal inset-0 relative hover:opacity-80 
            ${currentPath === path
                  ? "text-primary !font-semibold border-b-2"
                  : "headerNavOption"
                }`}
            >
              {icon}
              {title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SettingsTabs;
