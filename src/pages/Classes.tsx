import React, { useState } from "react";
import TCell from "../components/TCell";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import Table from "../components/Table";
import TActions from "../components/TActions";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../components/Modal";
import { ControlledSelect } from "../components/Select";

interface ClassData {
  id: string;
  referencePeriod: number;
  shift: string;
  courseId: string;
  diaryId: string;
}

interface CreateClassData {
  referencePeriod: number;
  shift: string;
  courseId: string;
  diaryId: string;
}

const Classes: React.FC = () => {
  const schema = yup.object().shape({
    referencePeriod: yup.number().required("Campo obrigatório"),
    shift: yup.string().required("Campo obrigatório"),
    courseId: yup.string().required("Campo obrigatório"),
    diaryId: yup.string().required("Campo obrigatório"),
  });

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showDeleteClassModal, setShowDeleteClassModal] = useState(false);

  const [classToRemove, setClassToRemove] = useState("");

  const toggleCreateClassModal = () => {
    reset({});
    setShowCreateClassModal((visible) => !visible);
  };

  const toggleDeleteClassModal = () =>
    setShowDeleteClassModal((visible) => !visible);

  const handleEditClass = async (schoolClass: ClassData) => {
    reset(schoolClass);
    setShowCreateClassModal(true);
  };

  const handleDeleteClass = (classId: string) => {
    setClassToRemove(classId);
    toggleDeleteClassModal();
  };

  const onSubmitClass = async (data: CreateClassData) => {
    console.log("result", data);
    toggleCreateClassModal();
  };

  const onDeleteClass = async () => {
    console.log("turma para remover", classToRemove);
    toggleDeleteClassModal();
  };
  return (
    <>
      {showDeleteClassModal && (
        <Modal
          title="Tem certeza?"
          description="Deseja excluir esta turma permanentemente?"
          onClose={() => toggleDeleteClassModal()}
          onConfirm={() => onDeleteClass()}
        />
      )}
      {showCreateClassModal && (
        <Modal
          title="Criar nova turma"
          description="Preencha todos os dados para criar uma nova turma"
          onClose={() => toggleCreateClassModal()}
          onConfirm={() => handleSubmit(onSubmitClass)}
          contentClassName="flex flex-col gap-3"
        >
          <ControlledSelect
            control={control}
            name="courseId"
            label="Curso"
            placeholder="Selecione um curso"
            options={[
              {
                label: "Análise e Desenvolvimento de Sistemas",
                value: "1"
              }
            ]}
          />
          <ControlledSelect
            control={control}
            name="diaryId"
            label="Período letivo"
            placeholder="Selecione um período letivo"
            options={[
              {
                label: "2023.2",
                value: "1"
              }
            ]}
          />
          <ControlledSelect
            control={control}
            name="referencePeriod"
            label="Período de referência"
            placeholder="Selecione um período de referência"
            disabled={!watch("courseId")}
            options={[
              {
                label: "1",
                value: "1"
              },
              {
                label: "2",
                value: "2"
              },
            ]}
          />
          <ControlledSelect
            control={control}
            name="shift"
            label="Turno"
            disabled={!watch("courseId")}
            options={[
              {
                label: "Manhã",
                value: "1",
              },
              {
                label: "Tarde",
                value: "1",
              },
              {
                label: "Noite",
                value: "1",
              },
            ]}
          />
        </Modal>
      )}
      <section className="my-3 flex flex-row justify-end">
        <Button
          onClick={() => toggleCreateClassModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar nova turma</span>
        </Button>
      </section>
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
              <TActions
                showList={false}
                onEditClick={() => handleEditClass({
                  id: "1",
                  referencePeriod: 2,
                  shift: "Manhã",
                  diaryId: "1",
                  courseId: "1"
                })}
                onRemoveClick={() => handleDeleteClass("1")}
              />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Classes;
