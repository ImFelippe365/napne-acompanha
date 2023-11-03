import React from "react"
import TCell from "../components/TCell"
import THeader from "../components/THeader"
import TRow from "../components/TRow"
import Table from "../components/Table"
import { FaTrash } from "react-icons/fa6"
import { MdModeEdit } from "react-icons/md"

const Courses: React.FC = () => {
  return (
    <>
      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Nome</THeader>
            <THeader>Apelido</THeader>
            <THeader>Grau</THeader>
            <THeader>Quantidade de períodos</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell contrast>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>ADS</TCell>
            <TCell>Ensino superior</TCell>
            <TCell>7</TCell>
            <TCell className={"text-primary"}>
              <div className="flex gap-4">
                <FaTrash className={"cursor-pointer"} size={24} />
                <MdModeEdit className={"cursor-pointer"} size={24} />
              </div>
            </TCell>
          </TRow>
          <TRow>
            <TCell contrast>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>ADS</TCell>
            <TCell>Ensino superior</TCell>
            <TCell>7</TCell>
            <TCell className={"text-primary"}>
              <div className="flex gap-4">
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

export default Courses