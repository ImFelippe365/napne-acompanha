import React from "react";
import TCell from "../components/TCell";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import Table from "../components/Table";
import TActions from "../components/TActions";

const Diaries: React.FC = () => {
  return (
    <>
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
