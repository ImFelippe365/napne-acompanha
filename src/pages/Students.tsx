import React from "react";
import TRow from "../components/TRow";
import TCell from "../components/TCell";
import Table from "../components/Table";
import THeader from "../components/THeader";
import Heading from "../components/Heading";
import Modal from "../components/Modal";
import { Input } from "../components/Input";
import { Select } from "../components/Select";

const Students: React.FC = () => {
  return (
    <>
      <Modal
        title="Cadastrar novo estudante"
        description="Preencha os dados para gerar um novo diário"
        onClose={() => {}}
      >
        <Input label="Nome" placeholder="Digite algo" />
        <Select label="Bolsonaro" options={[{ label: "teste", value: "1" }]} />
      </Modal>
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
            <TCell>
              <div className="flex flex-row items-center gap-3">
                <image href="" className="w-8 h-8 bg-black rounded-full" />
                <span>Felippe Rian de Oliveira</span>
              </div>
            </TCell>
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
