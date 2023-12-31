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

const Courses: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    byname: yup.string().required("Campo obrigatório"),
    periodsQuantity: yup.number().required("Campo obrigatório"),
    degree: yup.string().required("Campo obrigatório"),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const [courses, setCourses] = useState<CourseData[]>([]);

  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);

  const [courseToRemove, setCourseToRemove] = useState("");
  const [enabledFields, setEnabledFields] = useState(true);

  const getAllCourses = async () => {
    const { data } = await api.get('napne/academic/courses/all');
    setCourses(data);
  };

  const toggleCreateCourseModal = () => {
    reset({});
    setShowCreateCourseModal((visible) => !visible);

    if (!enabledFields) setEnabledFields(true);
  };

  const toggleDeleteCourseModal = () => setShowDeleteCourseModal((visible) => !visible);

  const handleEditCourse = (course: CourseData) => {
    reset(course);
    setShowCreateCourseModal(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourseToRemove(courseId);
    toggleDeleteCourseModal();
  };

  const onSubmitCourse = async (data: CreateCourseData) => {
    console.log("Formulário: ", data);
    toggleCreateCourseModal();
  };

  const onDeleteCourse = async () => {
    console.log("Remover este evento", courseToRemove);
    toggleDeleteCourseModal();
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
          title="Criar novo curso"
          description="Preencha os dados para criar um novo curso"
          onClose={() => toggleCreateCourseModal()}
          onConfirm={handleSubmit(onSubmitCourse)}
          contentClassName="flex flex-col gap-4"
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
          {courses.map(({ id, name, degree, byname, periodsQuantity }) => (
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