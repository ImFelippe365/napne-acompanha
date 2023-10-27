import React from "react";
import Heading from "../components/Heading";
import Table from "../components/Table";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import TCell from "../components/TCell";

const Events: React.FC = () => {
  return (
    <>
      <Heading
        title="Eventos"
        description="Gerencie os eventos do campus"
      />

      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Nome</THeader>
            <THeader>Início</THeader>
            <THeader>Fim</THeader>
            <THeader>Descrição</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell contrast>Abertura do NADIC</TCell>
            <TCell>13 de março de 2023 às 16:20</TCell>
            <TCell>13 de março de 2023 às 18:00</TCell>
            <TCell className="w-2/6">Evento de abertura do NADIC do ano letivo de 2023 e apresentação para os novatos do campus para se interessarem e ingressarem em projetos.</TCell>
          </TRow>
          <TRow>
            <TCell contrast>Abertura do NADIC</TCell>
            <TCell>13 de março de 2023 às 16:20</TCell>
            <TCell>13 de março de 2023 às 18:00</TCell>
            <TCell className="w-2/6">Evento de abertura do NADIC do ano letivo de 2023 e apresentação para os novatos do campus para se interessarem e ingressarem em projetos.</TCell>
          </TRow>
          <TRow>
            <TCell contrast>Abertura do NADIC</TCell>
            <TCell>13 de março de 2023 às 16:20</TCell>
            <TCell>13 de março de 2023 às 18:00</TCell>
            <TCell className="w-2/6">Evento de abertura do NADIC do ano letivo de 2023 e apresentação para os novatos do campus para se interessarem e ingressarem em projetos.</TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  )
}

export default Events