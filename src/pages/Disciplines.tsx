import React from "react";
import TCell from "../components/TCell";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import Table from "../components/Table";
import TActions from "../components/TActions";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";

const Disciplines: React.FC = () => {
  return (
    <>
      <section className="my-3 flex flex-row justify-end">
        <Button
          onClick={() => {}}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar nova disciplina</span>
        </Button>
      </section>
      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Código</THeader>
            <THeader>Nome</THeader>
            <THeader>Curso</THeader>
            <THeader>Período</THeader>
            <THeader>Optativa</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell>TEC.0023</TCell>
            <TCell contrast>Sistemas corporativos</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>6º</TCell>
            <TCell>Não</TCell>
            <TCell className={"text-primary"}>
              <TActions />
            </TCell>
          </TRow>
          <TRow>
            <TCell>TEC.0021</TCell>
            <TCell contrast>Informárica básica</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>-</TCell>
            <TCell>SIm</TCell>
            <TCell className={"text-primary"}>
              <TActions />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Disciplines;
