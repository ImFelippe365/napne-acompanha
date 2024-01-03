import React, { useEffect, useState } from "react";
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
import { CreateDisciplineData, DisciplineData } from "../interfaces/Discipline";
import { api } from "../services/api";
import Loading from "../components/Loading";
import { useAcademicManagement } from "../hooks/AcademicManegementContext";
import { useQuickToast } from "../hooks/QuickToastContext";

const Disciplines: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    code: yup.string().required("Campo obrigatório"),
    referencePeriod: yup.number().required("Campo obrigatório"),
    courseId: yup.string().required("Campo obrigatório"),
    isOptative: yup.boolean().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [disciplines, setDisciplines] = useState<DisciplineData[]>([]);

  const [showCreateDisciplineModal, setShowCreateDisciplineModal] = useState(false);
  const [showDeleteDisciplineModal, setShowDeleteDisciplineModal] = useState(false);

  const [disciplineToRemove, setDisciplineToRemove] = useState("");
  const [disciplineToEdit, setDisciplineToEdit] = useState<DisciplineData>();
  const [loadingDisciplines, setLoadingDisciplines] = useState(true);
  const [isDeletingDiscipline, setIsDeletingDiscipline] = useState(false);

  const [editing, setEditing] = useState(false);

  const {
    courses,
    getAllCourses,
  } = useAcademicManagement();

  const { handleShowToast } = useQuickToast();

  const courseOptionsSelect = courses.map((course) => ({
    label: course.name,
    value: course.id,
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

  const getAllDisciplines = async () => {
    const { data } = await api.get(`${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/disciplines/all`)
    setDisciplines(data)
    setLoadingDisciplines(false);
  };

  const toggleCreateDisciplineModal = () => {
    reset({});
    setEditing(false)
    setShowCreateDisciplineModal((visible) => !visible);
  };

  const toggleDeleteDisciplineModal = () =>
    setShowDeleteDisciplineModal((visible) => !visible);

  const handleEditDiscipline = (discipline: DisciplineData) => {
    reset(discipline);
    setEditing(true);
    setDisciplineToEdit(discipline);
    setShowCreateDisciplineModal(true);
  };

  const handleDeleteDiscipline = (disciplineId: string) => {
    setDisciplineToRemove(disciplineId);
    toggleDeleteDisciplineModal();
  };

  const onSubmitDiscipline = async (data: CreateDisciplineData) => {
    try {
      if (!editing) {
        const response = await api.post(
          `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/disciplines/create`, data
        )

        if (response.status === 201) {
          getAllDisciplines();
          toggleCreateDisciplineModal();
          reset({});
          handleShowToast("success", "Disciplina criada com sucesso!");
        }
      } else {
        const response = await api.put(
          `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/disciplines/${disciplineToEdit?.id}/modify`, data
        )

        if (response.status === 200) {
          getAllDisciplines();
          toggleCreateDisciplineModal();
          reset({});
          setEditing(false)
          handleShowToast("success", "Disciplina editada com sucesso!");
        }
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  const onDeleteDiscipline = async () => {
    try {
      setIsDeletingDiscipline(true);
      const response = await api.delete(
        `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/disciplines/remove?id=${disciplineToRemove}`
      )

      if (response.status === 204) {
        toggleDeleteDisciplineModal();
        getAllDisciplines();
        setDisciplineToRemove("");
        setIsDeletingDiscipline(false);
        handleShowToast("success", "Disciplina excluída com sucesso!");
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  useEffect(() => {
    getAllDisciplines();
    getAllCourses();
  }, [])

  return (
    <>
      {showDeleteDisciplineModal && (
        <Modal
          title="Tem certeza"
          description="Deseja excluir esta disciplina permanentemente?"
          onClose={() => toggleDeleteDisciplineModal()}
          onConfirm={() => onDeleteDiscipline()}
          isLoading={isDeletingDiscipline}
        />
      )}
      {showCreateDisciplineModal && (
        <Modal
          title={`${!editing ? "Criar nova" : "Editar"} disciplina`}
          description="Preencha os dados para criar uma nova disciplina"
          onClose={() => toggleCreateDisciplineModal()}
          onConfirm={handleSubmit(onSubmitDiscipline)}
          contentClassName="flex flex-col gap-3"
          isLoading={isSubmitting}
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
            options={courseOptionsSelect}
          />
          {/* {watch("isOptative")} */}
          <ControlledSelect
            control={control}
            name="referencePeriod"
            label="Período de referência"
            placeholder="Selecione um período de referência"
            disabled={!watch("courseId")}
            options={filterCourseReferencePeriodSelectOption(watch("courseId"))}
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
          {loadingDisciplines && <Loading />}
          {disciplines.map(({ id, name, referencePeriod, code, isOptative, courseId, course }) => (
            <TRow key={id}>
              <TCell>{code}</TCell>
              <TCell contrast>{name}</TCell>
              <TCell>{course.name}</TCell>
              <TCell>{referencePeriod}º</TCell>
              <TCell>{isOptative ? "Sim" : "Não"}</TCell>
              <TCell className={"text-primary"}>
                <TActions
                  showList={false}
                  onEditClick={() =>
                    handleEditDiscipline({
                      id: id,
                      name: name,
                      code: code,
                      courseId: courseId,
                      referencePeriod: referencePeriod,
                      isOptative: isOptative
                    })
                  }
                  onRemoveClick={() => handleDeleteDiscipline(id)}
                />
              </TCell>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Disciplines;
