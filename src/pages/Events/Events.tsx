import React, { useEffect, useState } from "react";
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
import { api } from "../../services/api";
import { CreateEventData, EventData } from "../../interfaces/Event";
import { formatDatetime, formatDatetimeToInput } from "../../utils/formatDatetime";


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

  const [events, setEvents] = useState<EventData[]>([]);

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [showBindStudentModal, setShowBindStudentModal] = useState(false);

  const [eventToRemove, setEventToRemove] = useState("");
  const [enabledFields, setEnabledFields] = useState(true);

  const [eventToBind, setEventToBind] = useState("");

  const getAllEvents = async () => {
    const { data } = await api.get("napne/academic/events/all")
    setEvents(data)
  };

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

  useEffect(() => {
    getAllEvents()
  }, [])

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
          {events.map(({ id, title, description, startTime, endTime }) => (
            <TRow key={id}>
              <TCell contrast>{title}</TCell>
              <TCell>{formatDatetime(startTime, true)}</TCell>
              <TCell>{formatDatetime(endTime, true)}</TCell>
              <TCell className="w-1/3 pr-6">
                {description}
              </TCell>
              <TCell>
                <TActions
                  showBindStudent
                  onBindClick={() => {
                    setEventToBind(id)
                    toggleBindStudentModal()
                  }}
                  onListClick={() =>
                    handleViewEvent({
                      id: id,
                      title: title,
                      description: description,
                      startTime: formatDatetimeToInput(startTime),
                      endTime: formatDatetimeToInput(endTime),
                    })
                  }
                  onEditClick={() =>
                    handleEditEvent({
                      id: id,
                      title: title,
                      description: description,
                      startTime: formatDatetimeToInput(startTime),
                      endTime: formatDatetimeToInput(endTime),
                    })
                  }
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

export default Events;
