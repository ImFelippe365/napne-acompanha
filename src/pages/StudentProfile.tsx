import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { BiSolidUser, BiSolidPencil } from "react-icons/bi";
import { IoDocumentText, IoSchool, IoCalendarNumber } from "react-icons/io5";
import { calculeAge } from "../utils/calculeAge";
import { useStudent } from "../hooks/StudentContext";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";

const StudentProfile: React.FC = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const currentPath = `/discentes/${id}/${pathname?.split("/")[3]}`;

  const { student, isLoadingStudent, getStudentDetails } = useStudent();

  useEffect(() => {
    getStudentDetails(id ?? "");
  }, []);

  const menu = [
    {
      title: "Dados do aluno",
      path: `/discentes/${id}/dados-pessoais`,
      icon: <BiSolidUser className="text-lg" />,
    },
    {
      title: "Boletins",
      path: `/discentes/${id}/boletins`,
      icon: <IoDocumentText className="text-lg" />,
    },
    {
      title: "Eventos",
      path: `/discentes/${id}/eventos`,
      icon: <IoCalendarNumber className="text-lg" />,
    },
    {
      title: "Anotações",
      path: `/discentes/${id}/anotacoes`,
      icon: <BiSolidPencil className="text-lg" />,
    },
  ];

  if (isLoadingStudent) return <Loading />;
  return (
    <section className="grid grid-cols-studentProfileContainer gap-24">
      <aside className="min-[250px] overflow-y-hidden">
        <Avatar
          image={`${process.env.VITE_MS_STUDENT_PICTURES}/${student?.picture}`}
          className="w-[150px] h-[150px]"
          size={150}
        />
        <article className="mt-2 mb-4">
          <h3 className="text-black font-bold text-xl">{student?.name}</h3>
          <p className="text-gray">{calculeAge(student?.dateOfBirth)} anos</p>
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
