import React from "react";
import { Link } from "react-router-dom";

import { BiSolidBookBookmark } from "react-icons/bi"
import { FaGraduationCap } from "react-icons/fa"
import { HiUsers } from "react-icons/hi2"
import { IoLibrarySharp } from "react-icons/io5"

const SettingsTabs: React.FC = () => {
  const paths = [
    {
      title: "Diários",
      path: "/",
      icon: <BiSolidBookBookmark size={24} />,
      currentTab: true
    },
    {
      title: "Cursos",
      path: "/",
      icon: <FaGraduationCap size={24} />,
      currentTab: false
    },
    {
      title: "Turmas",
      path: "/",
      icon: <HiUsers size={24} />,
      currentTab: false
    },
    {
      title: "Disciplinas",
      path: "/",
      icon: <IoLibrarySharp size={24} />,
      currentTab: false
    },
  ]

  return (
    <div className="w-full flex flex-row items-center justify-between mt-4">
      <ul className="flex flex-row items-center gap-8">
        {paths.map(({ title, icon, path, currentTab }, index) => (
          <li
            key={index}
            className={`p-4 text-gray font-normal inset-0 relative hover:opacity-80 ${
              currentTab === true
                ? "text-primary !font-semibold border-b-2"
                : "headerNavOption"
            }`}
          >
            <Link to={path} className="flex flex-row items-center gap-2">
              {icon}
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsTabs;
