import React, { useState } from "react";
import Heading from "../components/Heading";
import Table from "../components/Table";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import TCell from "../components/TCell";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledInput } from "../components/Input";
import { IoMdAdd } from "react-icons/io";

interface CreateEventData {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

const Events: React.FC = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
    startTime: yup.date().required("Campo obrigatório"),
    endTime: yup.date().required("Campo obrigatório"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  const toggleModal = () => {
    reset();
    setShowCreateEventModal((visible) => !visible);
  };

  const onSubmit = async (data: CreateEventData) => {
    console.log("Formulário: ", data);
  };

  return (
    <>
      {showCreateEventModal && (
        <Modal
          title="Cadastrar novo evento"
          description="Preencha os dados para gerar um novo evento"
          onClose={() => toggleModal()}
          onConfirm={handleSubmit(onSubmit)}
          contentClassName="flex flex-col gap-4"
        >
          <ControlledInput
            control={control}
            name="title"
            type="text"
            label="Nome"
            placeholder="Nome do evento"
          />

          <ControlledInput
            control={control}
            name="description"
            type="text"
            label="Descrição"
            placeholder="Descreva informações sobre o evento"
          />

          <section className="flex flex-row items-center gap-6">
            <ControlledInput
              control={control}
              name="startTime"
              type="datetime-local"
              label="Data e horário de inicio"
              placeholder="Digite algo"
            />

            <ControlledInput
              control={control}
              type="datetime-local"
              name="endTime"
              label="Data e horário fim"
              placeholder="Digite algo"
            />
          </section>
        </Modal>
      )}
      <Heading title="Eventos" description="Gerencie os eventos do campus">
        <Button
          onClick={() => toggleModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar novo evento</span>
        </Button>
      </Heading>

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
            <TCell className="w-2/6">
              Evento de abertura do NADIC do ano letivo de 2023 e apresentação
              para os novatos do campus para se interessarem e ingressarem em
              projetos.
            </TCell>
          </TRow>
          <TRow>
            <TCell contrast>Abertura do NADIC</TCell>
            <TCell>13 de março de 2023 às 16:20</TCell>
            <TCell>13 de março de 2023 às 18:00</TCell>
            <TCell className="w-2/6">
              Evento de abertura do NADIC do ano letivo de 2023 e apresentação
              para os novatos do campus para se interessarem e ingressarem em
              projetos.
            </TCell>
          </TRow>
          <TRow>
            <TCell contrast>Abertura do NADIC</TCell>
            <TCell>13 de março de 2023 às 16:20</TCell>
            <TCell>13 de março de 2023 às 18:00</TCell>
            <TCell className="w-2/6">
              Evento de abertura do NADIC do ano letivo de 2023 e apresentação
              para os novatos do campus para se interessarem e ingressarem em
              projetos.
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Events;
