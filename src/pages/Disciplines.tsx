import React from "react"
import TCell from "../components/TCell"
import THeader from "../components/THeader"
import TRow from "../components/TRow"
import Table from "../components/Table"
import { FaTrash } from "react-icons/fa6"

const Disciplines: React.FC = () => {
  return (
    <>
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
              <FaTrash className={"cursor-pointer"} size={24} />
            </TCell>
          </TRow>
          <TRow>
            <TCell>TEC.0021</TCell>
            <TCell contrast>Informárica básica</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>-</TCell>
            <TCell>SIm</TCell>
            <TCell className={"text-primary"}>
              <FaTrash className={"cursor-pointer"} size={24} />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  )
}

export default Disciplines