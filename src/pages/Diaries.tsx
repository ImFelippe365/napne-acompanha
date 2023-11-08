import React from "react";
import TCell from "../components/TCell";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import Table from "../components/Table";
import TActions from "../components/TActions";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";

const Diaries: React.FC = () => {
  return (
    <>
      <section className="my-3 flex flex-row justify-end">
        <Button
          onClick={() => {}}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar novo diário</span>
        </Button>
      </section>
      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Ano e período letivo</THeader>
            <THeader>Início</THeader>
            <THeader>Fim</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell contrast>2023.1</TCell>
            <TCell>1 de abril de 2023</TCell>
            <TCell>30 de agosto de 2023</TCell>
            <TCell className={"text-primary"}>
              <TActions />
            </TCell>
          </TRow>
          <TRow>
            <TCell contrast>2023.1</TCell>
            <TCell>1 de abril de 2023</TCell>
            <TCell>30 de agosto de 2023</TCell>
            <TCell className={"text-primary"}>
              <TActions />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Diaries;
