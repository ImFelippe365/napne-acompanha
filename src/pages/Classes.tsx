import React from "react"
import TCell from "../components/TCell"
import THeader from "../components/THeader"
import TRow from "../components/TRow"
import Table from "../components/Table"
import { FaTrash } from "react-icons/fa6"
import { MdModeEdit, MdFormatListBulleted } from "react-icons/md"

const Classes: React.FC = () => {
  return (
    <>
      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Nome</THeader>
            <THeader>Curso</THeader>
            <THeader>Turno</THeader>
            <THeader>Ano e período letivo</THeader>
            <THeader>Quantidade de alunos</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell contrast>ADS6V</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>Vespertino</TCell>
            <TCell>2023.1</TCell>
            <TCell>7</TCell>
            <TCell className={"text-primary"}>
              <div className="flex gap-4">
                <MdFormatListBulleted className={"cursor-pointer"} size={24} />
                <FaTrash className={"cursor-pointer"} size={24} />
                <MdModeEdit className={"cursor-pointer"} size={24} />
              </div>
            </TCell>
          </TRow>
          <TRow>
            <TCell contrast>ADS6V</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>Vespertino</TCell>
            <TCell>2023.1</TCell>
            <TCell>7</TCell>
            <TCell className={"text-primary"}>
              <div className="flex gap-4">
                <MdFormatListBulleted className={"cursor-pointer"} size={24} />
                <FaTrash className={"cursor-pointer"} size={24} />
                <MdModeEdit className={"cursor-pointer"} size={24} />
              </div>
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  )
}

export default Classes