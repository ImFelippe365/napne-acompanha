import React, { useState } from "react";
import Heading from "../../components/Heading";
import Table from "../../components/Table";
import THeader from "../../components/THeader";
import TRow from "../../components/TRow";
import TCell from "../../components/TCell";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledInput } from "../../components/Input";
import { IoMdAdd } from "react-icons/io";
import TActions from "../../components/TActions";
import LinkStudentToEventFormModal from "./components/LinkStudentToEventFormModal";

interface EventData {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface CreateEventData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

const Events: React.FC = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
    startTime: yup.string().required("Campo obrigatório"),
    endTime: yup.string().required("Campo obrigatório"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [showBindStudentModal, setShowBindStudentModal] = useState(false);

  const [eventToRemove, setEventToRemove] = useState("");
  const [enabledFields, setEnabledFields] = useState(true);

  const [eventToBind, setEventToBind] = useState("");

  const toggleCreateEventModal = () => {
    reset({});
    setShowCreateEventModal((visible) => !visible);

    if (!enabledFields) setEnabledFields(true);
  };

  const toggleDeleteEventModal = () =>
    setShowDeleteEventModal((visible) => !visible);

  const toggleBindStudentModal = () => {
    // if (eventToBindId) {
    //   setEventToBind(eventToBindId);
    // } else {
    //   setEventToBind("");
    // }
    reset({});
    setShowBindStudentModal((visible) => !visible);
    // if (!enabledFields) setEnabledFields(true);
  };

  const handleEditEvent = (event: EventData) => {
    // Só dá para setar o input de datetime com este formato: 2017-06-01T08:30
    reset(event);
    setShowCreateEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEventToRemove(eventId);
    toggleDeleteEventModal();
  };

  const handleViewEvent = (event: EventData) => {
    reset(event);
    setEnabledFields(false);
    setShowCreateEventModal((visible) => !visible);
  };

  const onSubmitEvent = async (data: CreateEventData) => {
    console.log("Formulário: ", data);
    toggleCreateEventModal();
  };

  const onDeleteEvent = async () => {
    console.log("Remover este evento", eventToRemove);
    toggleDeleteEventModal();
  };

  return (
    <>
      {showDeleteEventModal && (
        <Modal
          title="Tem certeza?"
          description="Deseja excluir este evento permanentemente?"
          onClose={() => toggleDeleteEventModal()}
          onConfirm={() => onDeleteEvent()}
        />
      )}
      {showCreateEventModal && (
        <Modal
          title="Cadastrar novo evento"
          description="Preencha os dados para gerar um novo evento"
          onClose={() => toggleCreateEventModal()}
          onConfirm={handleSubmit(onSubmitEvent)}
          contentClassName="flex flex-col gap-4"
        >
          <ControlledInput
            control={control}
            name="title"
            type="text"
            label="Nome"
            placeholder="Nome do evento"
            disabled={!enabledFields}
          />

          <ControlledInput
            control={control}
            name="description"
            type="text"
            label="Descrição"
            placeholder="Descreva informações sobre o evento"
            disabled={!enabledFields}
          />

          <section className="flex flex-row items-center gap-6">
            <ControlledInput
              control={control}
              name="startTime"
              type="datetime-local"
              label="Data e horário de inicio"
              placeholder="Digite algo"
              disabled={!enabledFields}
            />

            <ControlledInput
              control={control}
              type="datetime-local"
              name="endTime"
              label="Data e horário fim"
              placeholder="Digite algo"
              disabled={!enabledFields}
            />
          </section>
        </Modal>
      )}

      {showBindStudentModal && (
        <LinkStudentToEventFormModal 
          eventToBind={eventToBind}
          setOpenModal={toggleBindStudentModal}
        />
      )}
      <Heading title="Eventos" description="Gerencie os eventos do campus">
        <Button
          onClick={() => toggleCreateEventModal()}
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
                showBindStudent
                onBindClick={() => {
                  setEventToBind("1")
                  toggleBindStudentModal()
                }}
                onListClick={() =>
                  handleViewEvent({
                    id: "1",
                    title: "example",
                    description: "example desc",
                    startTime: "2017-06-01T08:30",
                    endTime: "2017-06-02T10:30",
                  })
                }
                onEditClick={() =>
                  handleEditEvent({
                    id: "1",
                    title: "example",
                    description: "example desc",
                    startTime: "2017-06-01T08:30",
                    endTime: "2017-06-02T10:30",
                  })
                }
                onRemoveClick={() => handleDeleteEvent("1")}
              />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Events;
