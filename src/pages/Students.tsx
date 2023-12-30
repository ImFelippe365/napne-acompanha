import React, { useEffect, useState } from "react";
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
import { CreateStudentData, StudentData } from "../interfaces/Student";
import { api } from "../services/api";
import { formatForBrazilDateStandard } from "../utils/formatDatetime";
import { ClassData } from "../interfaces/Class";

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

  const [students, setStudents] = useState<StudentData[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);

  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);

  const [studentToRemove, setStudentToRemove] = useState("");''

  const getAllStudents = async () => {
    const { data } = await api.get('napne/student/students/all')
    
    const { data: allClasses } = await api.get(`napne/academic/classes/all`)
    setClasses(allClasses)
    
    data.forEach((student: StudentData) => {
      const matchingClass = allClasses.find((schoolClass: ClassData) => schoolClass.id === student.classId)
      if (matchingClass) {
        student.schoolClass = matchingClass;
      }
    })
    setStudents(data);
  }

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

  const handleViewStudent = (studentId: string) => {
    navigate(`/discentes/${studentId}/dados-pessoais`);
  };

  const onSubmitStudent = (data: CreateStudentData) => {
    console.log("result", data);
    toggleCreateStudentModal();
  };

  const onDeleteStudent = () => {
    console.log("estudante para remover", studentToRemove);
    toggleDeleteStudentModal();
  };

  useEffect(() => {
    getAllStudents();
  }, [])

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
          {students.map(({ id, name, shift, registration, schoolClass, classId, dateOfBirth, picture }) => (
            <TRow key={id}>
              <TCell>
                <div className="flex flex-row items-center gap-3">
                  <image href="" className="w-8 h-8 bg-black rounded-full" />
                  <span>{name}</span>
                </div>
              </TCell>
              <TCell>{registration}</TCell>
              <TCell>20</TCell>
              <TCell>{schoolClass?.course.name}</TCell>
              <TCell>{schoolClass?.referencePeriod} período</TCell>
              <TCell>
                <TActions
                  onListClick={() => handleViewStudent(id)}
                  onEditClick={() =>
                    handleEditStudent({
                      id: id,
                      name: name,
                      classId: classId,
                      dateOfBirth: formatForBrazilDateStandard(dateOfBirth),
                      picture: picture,
                      shift: `${shift === "morning" ? "Manhã" : shift === "afternoon" ? "Tarde" : "Noite"}`,
                      registration: registration,
                      schoolClass: schoolClass,
                    })
                  }
                  onRemoveClick={() => handleDeleteStudent(id)}
                />
              </TCell>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Students;
