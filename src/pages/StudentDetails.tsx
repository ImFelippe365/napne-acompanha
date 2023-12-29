import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { StudentData } from "../interfaces/Student";
import { api } from "../services/api";
import { useParams } from "react-router-dom";
import { formatForBrazilDateStandard } from "../utils/formatDatetime";

const StudentDetails: React.FC = () => {

  const { id } = useParams()

  const [student, setStudent] = useState<StudentData>();

  const getStudent = async () => {
    const { data } = await api.get(`napne/student/students/${id}/details`)
    setStudent(data)
  }

  useEffect(() => {
    getStudent();
  }, [])

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
          <p className="font-semibold text-black">{formatForBrazilDateStandard(student?.dateOfBirth)}</p>
        </article>
        <article>
          <label className="font-normal text-gray">Matrícula</label>
          <p className="font-semibold text-black">{student?.registration}</p>
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
