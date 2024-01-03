import React, { useEffect, useState } from "react"
import TCell from "../components/TCell"
import THeader from "../components/THeader"
import TRow from "../components/TRow"
import Table from "../components/Table"
import TActions from "../components/TActions"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"
import * as yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Modal from "../components/Modal"
import { ControlledInput } from "../components/Input"
import { ControlledSelect } from "../components/Select"
import { CourseData, CreateCourseData } from "../interfaces/Course"
import { api } from "../services/api"
import axios from "axios"
import Loading from "../components/Loading"
import { useAcademicManagement } from "../hooks/AcademicManegementContext"
import { useQuickToast } from "../hooks/QuickToastContext"

const Courses: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    byname: yup.string().required("Campo obrigatório"),
    periodsQuantity: yup.number().required("Campo obrigatório"),
    degree: yup.string().required("Campo obrigatório"),
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);

  const [courseToRemove, setCourseToRemove] = useState("");
  const [courseToEdit, setCourseToEdit] = useState<CourseData>();
  const [enabledFields, setEnabledFields] = useState(true);

  const [editing, setEditing] = useState(false);

  const {
    courses,
    isLoadingCourses,
    getAllCourses,
  } = useAcademicManagement();

  const { handleShowToast } = useQuickToast();

  const toggleCreateCourseModal = () => {
    reset({});
    setEditing(false)
    setShowCreateCourseModal((visible) => !visible);

    if (!enabledFields) setEnabledFields(true);
  };

  const toggleDeleteCourseModal = () => setShowDeleteCourseModal((visible) => !visible);

  const handleEditCourse = async (course: CourseData) => {
    reset(course);
    setEditing(true);
    setCourseToEdit(course);
    setShowCreateCourseModal(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourseToRemove(courseId);
    toggleDeleteCourseModal();
  };

  const onSubmitCourse = async (data: CreateCourseData) => {
    try {
      if (!editing) {
        const response = await api.post(
          `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/courses/create`, data
        )

        if (response.status === 201) {
          getAllCourses();
          toggleCreateCourseModal();
          reset({});
          handleShowToast("success", "Curso criada com sucesso!");
        }
      } else {
        const response = await api.put(
          `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/courses/${courseToEdit?.id}/modify`, data
        )

        if (response.status === 200) {
          getAllCourses();
          toggleCreateCourseModal();
          reset({});
          setEditing(false)
          handleShowToast("success", "Curso editada com sucesso!");
        }
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  const onDeleteCourse = async () => {
    try {
      const response = await api.delete(
        `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/courses/remove?id=${courseToRemove}`
      )

      if (response.status === 204) {
        toggleDeleteCourseModal();
        getAllCourses();
        setCourseToRemove("");
        handleShowToast("success", "Curso excluído com sucesso!");
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  useEffect(() => {
    getAllCourses();
  }, [])

  return (
    <>
      {showDeleteCourseModal && (
        <Modal
          title="Tem certeza?"
          description="Deseja excluir este curso permanentemente?"
          onClose={() => toggleDeleteCourseModal()}
          onConfirm={() => onDeleteCourse()}
        />
      )}
      {showCreateCourseModal && (
        <Modal
          title={`${!editing ? "Criar novo" : "Editar"} curso`}
          description="Preencha os dados para criar um novo curso"
          onClose={() => toggleCreateCourseModal()}
          onConfirm={handleSubmit(onSubmitCourse)}
          contentClassName="flex flex-col gap-4"
          isLoading={isSubmitting}
        >
          <ControlledInput
            control={control}
            name="name"
            type="text"
            label="Nome"
            placeholder="Nome do curso"
            disabled={!enabledFields}
          />
          <ControlledSelect
            control={control}
            name="degree"
            label="Grau"
            placeholder=""
            options={[
              {
                label: "Ensino técnico",
                value: "Ensino técnico"
              },
              {
                label: "Ensino superior",
                value: "Ensino superior"
              },
            ]}
          />
          <ControlledInput
            control={control}
            name="periodsQuantity"
            label="Quantidade de periodos"
            type="number"
            placeholder="Quantidade máxima de períodos do curso"
            disabled={!enabledFields}
          />
          <ControlledInput
            control={control}
            name="byname"
            label="Apelido"
            type="string"
            placeholder="Ex.: ADS"
            disabled={!enabledFields}
          />
        </Modal>
      )}
      <section className="my-3 flex flex-row justify-end">
        <Button
          onClick={() => toggleCreateCourseModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar novo curso</span>
        </Button>
      </section>
      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Nome</THeader>
            <THeader>Apelido</THeader>
            <THeader>Grau</THeader>
            <THeader>Quantidade de períodos</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          {isLoadingCourses && <Loading />}
          {courses?.map(({ id, name, degree, byname, periodsQuantity }) => (
            <TRow key={id}>
              <TCell contrast>{name}</TCell>
              <TCell>{byname}</TCell>
              <TCell>{degree}</TCell>
              <TCell>{periodsQuantity}</TCell>
              <TCell className={"text-primary"}>
                <TActions
                  showList={false}
                  onEditClick={() =>
                    handleEditCourse({
                      id: id,
                      name: name,
                      byname: byname,
                      degree: degree,
                      periodsQuantity: periodsQuantity,
                    })
                  }
                  onRemoveClick={() => handleDeleteCourse(id)}
                />
              </TCell>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Courses