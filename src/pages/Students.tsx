import React, { useState } from "react";
import TRow from "../components/TRow";
import TCell from "../components/TCell";
import Table from "../components/Table";
import THeader from "../components/THeader";
import Heading from "../components/Heading";
import Modal from "../components/Modal";
import { ControlledInput } from "../components/Input";
import { ControlledSelect } from "../components/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import TActions from "../components/TActions";
import { useNavigate } from "react-router-dom";

interface StudentData {
  id: string;
  name: string;
  registration: string;
  dateOfBirth: string;
  picture: string | undefined;
  classId: string;
  course?: string | undefined;
  shift?: string | undefined;
}

interface CreateStudentData {
  name: string;
  registration: string;
  dateOfBirth: string;
  picture?: string | undefined;
  classId: string;
}

const Students: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    registration: yup.string().required("Campo obrigatório"),
    dateOfBirth: yup.string().required("Campo obrigatório"),
    picture: yup.string(),
    course: yup.string(),
    shift: yup.string(),
    classId: yup.string().required("Campo obrigatório"),
  });

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);

  const [studentToRemove, setStudentToRemove] = useState("");

  const toggleCreateStudentModal = () => {
    reset({});
    setShowCreateStudentModal((visible) => !visible);
  };

  const toggleDeleteStudentModal = () =>
    setShowDeleteStudentModal((visible) => !visible);

  const handleEditStudent = (student: StudentData) => {
    // Só dá para setar o input de datetime com este formato: 2017-06-01T08:30
    reset(student);
    setShowCreateStudentModal(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudentToRemove(studentId);
    toggleDeleteStudentModal();
  };

  const handleViewStudent = () => {
    navigate("/discentes/1/dados-pessoais");
  };

  const onSubmitStudent = (data: CreateStudentData) => {
    console.log("result", data);
    toggleCreateStudentModal();
  };

  const onDeleteStudent = () => {
    console.log("estudante para remover", studentToRemove);
    toggleDeleteStudentModal();
  };

  return (
    <>
      {showDeleteStudentModal && (
        <Modal
          title="Tem certeza?"
          description="Deseja excluir este aluno e TODOS os seus dados permanentemente?"
          onClose={() => toggleDeleteStudentModal()}
          onConfirm={() => onDeleteStudent()}
        />
      )}
      {showCreateStudentModal && (
        <Modal
          title="Cadastrar novo estudante"
          description="Preencha os dados para criar um novo estudante"
          onClose={() => toggleCreateStudentModal()}
          onConfirm={handleSubmit(onSubmitStudent)}
          contentClassName="flex flex-col gap-3"
        >
          <ControlledInput
            control={control}
            name="name"
            type="text"
            label="Nome"
            placeholder="Nome do discente"
          />
          <ControlledInput
            control={control}
            name="registration"
            type="text"
            label="Matrícula"
            placeholder="Matrícula do SUAP"
          />
          <ControlledInput
            control={control}
            name="dateOfBirth"
            type="text"
            label="Data de nascimento"
            placeholder="XX/XX/XXXX"
          />
          <ControlledInput
            control={control}
            name="picture"
            type="file"
            label="Foto de perfil"
            placeholder="XX/XX/XXXX"
          />
          <ControlledSelect
            control={control}
            name="course"
            label="Curso"
            placeholder="XX/XX/XXXX"
            options={[
              {
                label: "Análise e Desenvolvimento de Sistemas",
                value: "1",
              },
            ]}
          />
          <ControlledSelect
            control={control}
            name="shift"
            label="Turno"
            disabled={!watch("course")}
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
          <ControlledSelect
            control={control}
            name="classId"
            label="Turma"
            disabled={!watch("shift")}
            options={[
              {
                label: "1° período",
                value: "1",
              },
            ]}
          />
        </Modal>
      )}

      <Heading
        title="Lista de estudantes"
        description="Gerencie os estudantes com necessidades específicas"
      >
        <Button
          onClick={() => toggleCreateStudentModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar novo estudante</span>
        </Button>
      </Heading>

      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Nome</THeader>
            <THeader>Matrícula</THeader>
            <THeader>Idade</THeader>
            <THeader>Curso</THeader>
            <THeader>Ano/Período</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          <TRow>
            <TCell>
              <div className="flex flex-row items-center gap-3">
                <image href="" className="w-8 h-8 bg-black rounded-full" />
                <span>Felippe Rian de Oliveira</span>
              </div>
            </TCell>
            <TCell>20211094040028</TCell>
            <TCell>20</TCell>
            <TCell>Análise e Desenvolvimento de Sistemas</TCell>
            <TCell>7 período</TCell>
            <TCell>
              <TActions
                onListClick={() => handleViewStudent()}
                onEditClick={() =>
                  handleEditStudent({
                    id: "1",
                    name: "felps",
                    classId: "1",
                    dateOfBirth: "03/06/2003",
                    picture: "",
                    course: "1",
                    shift: "1",

                    registration: "20211094040028",
                  })
                }
                onRemoveClick={() => handleDeleteStudent("1")}
              />
            </TCell>
          </TRow>
        </tbody>
      </Table>
    </>
  );
};

export default Students;
