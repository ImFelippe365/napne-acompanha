import React from "react";
import TRow from "../components/TRow";
import TCell from "../components/TCell";
import Table from "../components/Table";
import THeader from "../components/THeader";
import Heading from "../components/Heading";

const Students: React.FC = () => {
  return (
    <>
      <Heading
        title="Lista de estudantes"
        description="Gerencie os estudantes com necessidades específicas"
      />

      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Nome</THeader>
            <THeader>Matrícula</THeader>
            <THeader>Idade</THeader>
            <THeader>Curso</THeader>
            <THeader>Ano/Período</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell>Felippe Rian de Oliveira</TCell>
            <TCell>20211094040028</TCell>
            <TCell>20</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>7 período</TCell>
          </TRow>
          <TRow>
            <TCell>Felippe Rian de Oliveira</TCell>
            <TCell>20211094040028</TCell>
            <TCell>20</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>7 período</TCell>
          </TRow>
          <TRow>
            <TCell>Felippe Rian de Oliveira</TCell>
            <TCell>20211094040028</TCell>
            <TCell>20</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>7 período</TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Students;
