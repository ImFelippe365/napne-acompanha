import React, { useEffect, useState } from "react";
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
import { ClassData, CreateClassData } from "../interfaces/Class";
import { api } from "../services/api";
import Loading from "../components/Loading";
import { useAcademicManagement } from "../hooks/AcademicManegementContext";
import { useQuickToast } from "../hooks/QuickToastContext";

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

  const [classes, setClasses] = useState<ClassData[]>([]);

  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showDeleteClassModal, setShowDeleteClassModal] = useState(false);

  const [classToRemove, setClassToRemove] = useState("");
  const [classToEdit, setClassToEdit] = useState<ClassData>();
  const [loadingClasses, setLoadingClasses] = useState(true);

  const [editing, setEditing] = useState(false);

  const {
    courses,
    diaries,
    getAllDiaries,
    getAllCourses,
  } = useAcademicManagement();

  const { handleShowToast } = useQuickToast();

  const courseOptionsSelect = courses.map((course) => ({
    label: course.name,
    value: course.id,
  }));
  
  const diaryOptionsSelect = diaries.map((diary) => ({
    label: `${diary.referenceYear}.${diary.referencePeriod}`,
    value: diary.id,
  }));

  const filterCourseReferencePeriodSelectOption = (courseId: string) => {
    const course = courses.find(({ id }) => {
      return id == courseId
    })

    if (course) {
      const periodsSelectOptions = [];

      for (let i = 1; i <= course?.periodsQuantity; i++) {
        periodsSelectOptions.push({
          label: i,
          value: i
        })
      }

      return periodsSelectOptions;
    }
    return;
  }

  const getAllClasses = async () => {
    const { data } = await api.get(`${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/classes/all`);
    setClasses(data);
    setLoadingClasses(false);
  }

  const toggleCreateClassModal = () => {
    reset({});
    setEditing(false)
    setShowCreateClassModal((visible) => !visible);
  };

  const toggleDeleteClassModal = () =>
    setShowDeleteClassModal((visible) => !visible);

  const handleEditClass = async (schoolClass: ClassData) => {
    reset(schoolClass);
    setEditing(true);
    setClassToEdit(schoolClass);
    setShowCreateClassModal(true);
  };

  const handleDeleteClass = (classId: string) => {
    setClassToRemove(classId);
    toggleDeleteClassModal();
  };

  const onSubmitClass = async (data: CreateClassData) => {
    try {
      if (!editing) {
        const response = await api.post(
          `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/classes/create`, data
        )

        if (response.status === 201) {
          getAllClasses();
          toggleCreateClassModal();
          reset({});
          handleShowToast("success", "Turma criada com sucesso!");
        }
      } else {
        const response = await api.put(
          `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/classes/${classToEdit?.id}/modify`, data
        )

        if (response.status === 200) {
          getAllClasses();
          toggleCreateClassModal();
          reset({});
          setEditing(false)
          handleShowToast("success", "Turma editada com sucesso!");
        }
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  const onDeleteClass = async () => {
    try {
      const response = await api.delete(
        `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/classes/remove?id=${classToRemove}`
      )

      if (response.status === 204) {
        getAllClasses();
        toggleDeleteClassModal();
        setClassToRemove("");
        handleShowToast("success", "Turma excluída com sucesso!");
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  useEffect(() => {
    getAllClasses();
    getAllCourses();
    getAllDiaries();
  }, [])

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
          title={`${!editing ? "Criar nova" : "Editar"} turma`}
          description="Preencha todos os dados para criar uma nova turma"
          onClose={() => toggleCreateClassModal()}
          onConfirm={handleSubmit(onSubmitClass)}
          contentClassName="flex flex-col gap-3"
        >
          <ControlledSelect
            control={control}
            name="courseId"
            label="Curso"
            placeholder="Selecione um curso"
            options={courseOptionsSelect}
          />
          <ControlledSelect
            control={control}
            name="diaryId"
            label="Período letivo"
            placeholder="Selecione um período letivo"
            options={diaryOptionsSelect}
          />
          <ControlledSelect
            control={control}
            name="referencePeriod"
            label="Período de referência"
            placeholder="Selecione um período de referência"
            disabled={!watch("courseId")}
            options={filterCourseReferencePeriodSelectOption(watch("courseId"))}
          />
          <ControlledSelect
            control={control}
            name="shift"
            label="Turno"
            disabled={!watch("courseId")}
            options={[
              {
                label: "Manhã",
                value: "Manhã",
              },
              {
                label: "Tarde",
                value: "Tarde",
              },
              {
                label: "Noite",
                value: "Noite",
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
            <THeader>Período de referência</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          {loadingClasses && <Loading />}
          {classes.map(({ id, referencePeriod, shift, courseId, course, diaryId, diary }) => (
            <TRow key={id}>
              <TCell contrast>{course.byname}{referencePeriod}{shift === "Manhã" ? "M" : shift === "Tarde" ? "V" : "N"}</TCell>
              <TCell>{course.name}</TCell>
              <TCell>{shift}</TCell>
              <TCell>{diary.referenceYear}.{diary.referencePeriod}</TCell>
              <TCell>{referencePeriod}</TCell>
              <TCell className={"text-primary"}>
                <TActions
                  showList={false}
                  onEditClick={() => handleEditClass({
                    id: id,
                    referencePeriod: referencePeriod,
                    shift: shift,
                    diaryId: diaryId,
                    courseId: courseId
                  })}
                  onRemoveClick={() => handleDeleteClass(id)}
                />
              </TCell>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Classes;
