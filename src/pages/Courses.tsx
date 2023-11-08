import React from "react"
import TCell from "../components/TCell"
import THeader from "../components/THeader"
import TRow from "../components/TRow"
import Table from "../components/Table"
import TActions from "../components/TActions"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"

const Courses: React.FC = () => {
  return (
    <>
    <section className="my-3 flex flex-row justify-end">
        <Button
          onClick={() => {}}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar novo curso</span>
        </Button>
      </section>
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
              <TActions />
            </TCell>
          </TRow>
          <TRow>
            <TCell contrast>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>ADS</TCell>
            <TCell>Ensino superior</TCell>
            <TCell>7</TCell>
            <TCell className={"text-primary"}>
              <TActions />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  )
}

export default Courses