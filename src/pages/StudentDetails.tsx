import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatForBrazilDateStandard } from "../utils/formatDatetime";
import { useStudent } from "../hooks/StudentContext";

const StudentDetails: React.FC = () => {
  const { student } = useStudent();

  return (
    <>
      <Heading title="Dados do aluno" />

      <section className="flex flex-col gap-4 mt-4">
        <article>
          <label className="font-normal text-gray">Nome</label>
          <p className="font-semibold text-black">{student?.name}</p>
        </article>
        <article>
          <label className="font-normal text-gray">Data de nascimento</label>
          <p className="font-semibold text-black">
            {formatForBrazilDateStandard(student?.dateOfBirth)}
          </p>
        </article>
        <article>
          <label className="font-normal text-gray">Matrícula</label>
          <p className="font-semibold text-black">{student?.registration}</p>
        </article>
        <article>
          <label className="font-normal text-gray">Curso</label>
          <p className="font-semibold text-black">
            {student?.schoolClass?.course.name}
          </p>
        </article>
        <article>
          <label className="font-normal text-gray">Turma</label>
          <p className="font-semibold text-black">
            {student?.schoolClass?.course.byname}{" "}
            {student?.schoolClass?.referencePeriod}° período
          </p>
        </article>
      </section>
    </>
  );
};

export default StudentDetails;
