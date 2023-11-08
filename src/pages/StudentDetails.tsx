import React from "react";
import Heading from "../components/Heading";

const StudentDetails: React.FC = () => {
  return (
    <>
      <Heading title="Dados do aluno" />

      <section className="flex flex-col gap-4 mt-4">
        <article>
          <label className="font-normal text-gray">Nome</label>
          <p className="font-semibold text-black">Bruna Maria</p>
        </article>
        <article>
          <label className="font-normal text-gray">Data de nascimento</label>
          <p className="font-semibold text-black">03/06/2003</p>
        </article>
        <article>
          <label className="font-normal text-gray">Matrícula</label>
          <p className="font-semibold text-black">20211094040028</p>
        </article>
        <article>
          <label className="font-normal text-gray">Curso</label>
          <p className="font-semibold text-black">Análise e Desenvolvimento de Sistemas</p>
        </article>
        <article>
          <label className="font-normal text-gray">Turma</label>
          <p className="font-semibold text-black">ADS 6° período</p>
        </article>
      </section>
    </>
  );
};

export default StudentDetails;
