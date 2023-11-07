import React from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { BiSolidUser, BiSolidPencil } from "react-icons/bi";
import { IoDocumentText, IoSchool, IoCalendarNumber } from "react-icons/io5";

const StudentProfile: React.FC = () => {
  const menu = [
    {
      title: "Dados do aluno",
      path: "/discentes/1/dados-pessoais",
      icon: <BiSolidUser className="text-lg" />,
    },
    {
      title: "Boletins",
      path: "/discentes/1/boletins",
      icon: <IoDocumentText className="text-lg" />,
    },
    {
      title: "Eventos",
      path: "/discentes/1/eventos",
      icon: <IoCalendarNumber className="text-lg" />,
    },
    {
      title: "Anotações",
      path: "/discentes/1/anotacoes",
      icon: <BiSolidPencil className="text-lg" />,
    },
    {
      title: "Plano Educacional (PEI)",
      path: "/discentes/1/pei",
      icon: <IoSchool className="text-lg" />,
    },
  ];

  const { pathname } = useLocation();
  const { id } = useParams();
  const currentPath = `/discentes/${id}/${pathname?.split("/")[3]}`;

  return (
    <section className="grid grid-cols-studentProfileContainer gap-24">
      <aside className="min-[250px] overflow-y-hidden">
        <div className="w-[100px] h-[100px] bg-slate-500 rounded-full " />
        <article className="mt-2 mb-4">
          <h3 className="text-black font-bold text-xl">Xerolaine Xerox</h3>
          <p className="text-gray">19 anos</p>
        </article>

        {menu.map(({ title, path, icon }, index) => (
          <Link key={index} to={path}>
            <li
              className={`flex flex-items gap-3 flex-row items-center font-semibold transition-all py-2 ${
                currentPath === path ? "text-primary" : "text-gray"
              }`}
            >
              {icon}
              {title}
            </li>
          </Link>
        ))}
      </aside>

      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default StudentProfile;
