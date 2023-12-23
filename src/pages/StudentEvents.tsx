import React, { useState } from "react";
import TActions from "../components/TActions";
import TCell from "../components/TCell";
import TRow from "../components/TRow";
import THeader from "../components/THeader";
import Table from "../components/Table";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { ControlledSelect } from "../components/Select";

interface CreateStudentParticipation {
  studentId: string;
  eventId: string;
}

const StudentEvents: React.FC = () => {
  const schema = yup.object().shape({
    eventId: yup.string().required("Campo obrigatório"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [
    showCreateEventParticipationModal,
    setShowCreateEventParticipationModal,
  ] = useState(false);
  const [
    showDeleteEventParticipationModal,
    setShowDeleteEventParticipationModal,
  ] = useState(false);

  const [eventParticipationToRemove, setEventParticipationToRemove] =
    useState("");

  const getAllEvents = () => {
    // Request to get all events
  }

  const getEventParticipates = () => {
    // Eventos participados
  }

  const toggleCreateEventModal = () => {
    reset({});
    setShowCreateEventParticipationModal((visible) => !visible);
  };

  const toggleDeleteEventModal = () =>
    setShowDeleteEventParticipationModal((visible) => !visible);

  const handleDeleteEvent = (eventId: string) => {
    setEventParticipationToRemove(eventId);
    toggleDeleteEventModal();
  };

  const onSubmitEventParticipation = async (
    data: CreateStudentParticipation
  ) => {
    console.log("Formulário: ", data);
    toggleCreateEventModal();
  };

  const onDeleteEventParticipation = async () => {
    console.log("Remover este evento", eventParticipationToRemove);
    toggleDeleteEventModal();
  };

  return (
    <>
      {showDeleteEventParticipationModal && (
        <Modal
          title="Tem certeza?"
          description="Deseja remover a participação do aluno neste evento?"
          onClose={() => toggleDeleteEventModal()}
          onConfirm={() => onDeleteEventParticipation()}
        />
      )}
      {showCreateEventParticipationModal && (
        <Modal
          title="Cadastrar participação em evento"
          description="Selecione o evento que o estudante participou"
          onClose={() => toggleCreateEventModal()}
          onConfirm={handleSubmit(onSubmitEventParticipation)}
          contentClassName="flex flex-col gap-4"
        >
          <ControlledSelect
            control={control}
            name="eventId"
            label="Nome"
            placeholder="Nome do evento"
            options={[
              {
                label: "teste",
                value: "1",
              },
            ]}
          />
        </Modal>
      )}
      <Heading title="Participação em eventos">
        <Button
          onClick={() => toggleCreateEventModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar participação em evento</span>
        </Button>
      </Heading>

      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Nome</THeader>
            <THeader>Início</THeader>
            <THeader>Fim</THeader>
            <THeader>Descrição</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell contrast>Abertura do NADIC</TCell>
            <TCell>13 de março de 2023 às 16:20</TCell>
            <TCell>13 de março de 2023 às 18:00</TCell>
            <TCell className="w-1/3 pr-6">
              Evento de abertura do NADIC do ano letivo de 2023 e apresentação
              para os novatos do campus para se interessarem e ingressarem em
              projetos.
            </TCell>
            <TCell>
              <TActions
                showList={false}
                showEdit={false}
                onRemoveClick={() => handleDeleteEvent("1")}
              />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default StudentEvents;
