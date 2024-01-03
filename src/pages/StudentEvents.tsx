import React, { useEffect, useState } from "react";
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
import { api } from "../services/api";
import { EventData, EventParticipations } from "../interfaces/Event";
import { useQuickToast } from "../hooks/QuickToastContext";
import { formatDatetime } from "../utils/formatDatetime";
import { useStudent } from "../hooks/StudentContext";

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

  const {
    student,
    getStudentDetails,
  } = useStudent();

  const [
    showCreateEventParticipationModal,
    setShowCreateEventParticipationModal,
  ] = useState(false);
  const [
    showDeleteEventParticipationModal,
    setShowDeleteEventParticipationModal,
  ] = useState(false);

  const [events, setEvents] = useState<EventData>([]);
  const [eventsParticipations, setEventsParticipations] = useState<EventParticipations[]>([]);

  const [eventParticipationToRemove, setEventParticipationToRemove] =
    useState("");

  const [isDeletingEventParticipation, setIsDeletingEventParticipation] = useState(false);

  const { handleShowToast } = useQuickToast();

  const getAllEvents = async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/events/all`
    )

    setEvents(data)
  }

  const getEventParticipations = async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_STUDENT_URL}/students/${student?.id}/events/all`
    )
    setEventsParticipations(data)
  }

  const toggleCreateEventModal = () => {
    reset({});
    setShowCreateEventParticipationModal((visible) => !visible);
  };

  const toggleDeleteEventModal = () =>
    setShowDeleteEventParticipationModal((visible) => !visible);

  const handleDeleteEvent = (id: string) => {
    setEventParticipationToRemove(id);
    toggleDeleteEventModal();
  };

  const onSubmitEventParticipation = async (
    data: CreateStudentParticipation
  ) => {
    console.log("Formulário: ", data);
    try {
      const response = await api.post(
        `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/classes/create`, data
      )

      if (response.status === 201) {
        // getAllClasses();
        toggleCreateEventModal();
        reset({});
        handleShowToast("success", "Turma criada com sucesso!");
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado.")
    }
  };

  const onDeleteEventParticipation = async () => {
    console.log("Remover este evento", eventParticipationToRemove);
    try {
      // setIsDeletingDiscipline(true);
      const response = await api.delete(
        `${process.env.VITE_MS_STUDENT_URL}/students/events/${eventParticipationToRemove}/remove`
      )

      if (response.status === 204) {
        toggleDeleteEventModal();
        getEventParticipations();
        setEventParticipationToRemove("");
        // setIsDeletingDiscipline(false);
        handleShowToast("success", "Disciplina excluída com sucesso!");
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  useEffect(() => {
    getEventParticipations();
  }, [])

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
        {/* <Button
          onClick={() => toggleCreateEventModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar participação em evento</span>
        </Button> */}
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
          {eventsParticipations.map(({ id, event }) => (
            <TRow key={id}>
              <TCell contrast>{event.title}</TCell>
              <TCell>{formatDatetime(event.startTime, true)}</TCell>
              <TCell>{formatDatetime(event.endTime, true)}</TCell>
              <TCell className="w-1/3 pr-6">
                {event.description}
              </TCell>
              <TCell>
                <TActions
                  showList={false}
                  showEdit={false}
                  onRemoveClick={() => handleDeleteEvent(id)}
                />
              </TCell>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StudentEvents;
