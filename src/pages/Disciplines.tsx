import React, { useState } from "react";
import TCell from "../components/TCell";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import Table from "../components/Table";
import TActions from "../components/TActions";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../components/Modal";
import { ControlledInput } from "../components/Input";
import { ControlledSelect } from "../components/Select";

interface DisciplineData {
  id: string;
  name: string;
  referencePeriod: number;
  code: string;
  isOptative: boolean;
  courseId: string;
}

interface CreateDisciplineData {
  name: string;
  referencePeriod: number;
  code: string;
  isOptative: boolean;
  courseId: string;
}

const Disciplines: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    code: yup.string().required("Campo obrigatório"),
    referencePeriod: yup.number().required("Campo obrigatório"),
    courseId: yup.string().required("Campo obrigatório"),
    isOptative: yup.boolean().required("Campo obrigatório"),
  });

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
  })

  const [showCreateDisciplineModal, setShowCreateDisciplineModal] = useState(false);
  const [showDeleteDisciplineModal, setShowDeleteDisciplineModal] = useState(false);

  const [disciplineToRemove, setDisciplineToRemove] = useState("");

  const toggleCreateDisciplineModal = () => {
    reset({});
    setShowCreateDisciplineModal((visible) => !visible);
  };

  const toggleDeleteDisciplineModal = () => 
    setShowDeleteDisciplineModal((visible) => !visible);

  const handleEditDiscipline = (discipline: DisciplineData) => {
    reset(discipline);
    setShowCreateDisciplineModal(true);
  };

  const handleDeleteDiscipline = (disciplineId: string) => {
    setDisciplineToRemove(disciplineId);
    toggleDeleteDisciplineModal();
  };

  const onSubmitDiscipline = (data: CreateDisciplineData) => {
    console.log("result", data)
    toggleCreateDisciplineModal();
  };

  const onDeleteDiscipline = () => {
    console.log("disciplina para remover", disciplineToRemove);
    toggleDeleteDisciplineModal();
  };

  return (
    <>
      {showDeleteDisciplineModal && (
        <Modal
          title="Tem certeza"
          description="Deseja excluir esta disciplina permanentemente?"
          onClose={() => toggleDeleteDisciplineModal()}
          onConfirm={() => onDeleteDiscipline()}
        />
      )}
      {showCreateDisciplineModal && (
        <Modal
          title="Criar nova disciplina"
          description="Preencha os dados para criar uma nova disciplina"
          onClose={() => toggleCreateDisciplineModal()}
          onConfirm={() => handleSubmit(onSubmitDiscipline)}
          contentClassName="flex flex-col gap-3"
        >
          <ControlledInput
            control={control}
            name="name"
            type="text"
            label="Nome"
            placeholder="Digite o nome da disciplina"
          />
          <ControlledInput
            control={control}
            name="code"
            type="text"
            label="Código"
            placeholder="Digite o código da disciplina"
          />
          <ControlledSelect 
            control={control}
            name="isOptative"
            label="Tipo"
            placeholder="Selecione um tipo"
            options={[
              {
                label: "Obrigatória",
                value: false
              },
              {
                label: "Optativa",
                value: true
              },
            ]}
          />
          <ControlledSelect
            control={control}
            name="courseId"
            label="Curso"
            placeholder="Selecione um curso"
            options={[
              {
                label: "Análise e Desenvolvimento de Sistemas",
                value: "1",
              },
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
        </Modal>
      )}
      <section className="my-3 flex flex-row justify-end">
        <Button
          onClick={() => toggleCreateDisciplineModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar nova disciplina</span>
        </Button>
      </section>
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
              <TActions
                showList={false}
                onEditClick={() => 
                  handleEditDiscipline({
                    id: "1",
                    name: "Sistemas operacionais",
                    code: "TEC.12233",
                    courseId: "1",
                    referencePeriod: 3,
                    isOptative: true
                  })
                }
                onRemoveClick={() => handleDeleteDiscipline("1")}
              />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Disciplines;
