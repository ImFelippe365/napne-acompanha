import React, { useEffect, useState } from "react";
import TRow from "../components/TRow";
import TCell from "../components/TCell";
import Table from "../components/Table";
import THeader from "../components/THeader";
import Heading from "../components/Heading";
import Modal from "../components/Modal";
import { ControlledInput, Input } from "../components/Input";
import { ControlledSelect } from "../components/Select";
import { Controller, useForm } from "react-hook-form";
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
import { MAX_FILE_SIZE, isValidFileType } from "../utils/imageValidator";
import Loading from "../components/Loading";
import { useQuickToast } from "../hooks/QuickToastContext";
import { calculeAge } from "../utils/calculeAge";
import { CourseData } from "../interfaces/Course";
import { formatShift } from "../utils/formatShift";
import { shifts } from "../utils/shifts";
import Avatar from "../components/Avatar";
import BindStudentDisciplineModal from "../components/BindStudentDisciplineModal";
import { DisciplineData } from "../interfaces/Discipline";

const Students: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    registration: yup.string().required("Campo obrigatório"),
    dateOfBirth: yup.string().required("Campo obrigatório"),
    picture: yup
      .mixed()
      .nullable()
      .test("is-valid-type", "Faça upload apenas de imagens", (value: any) =>
        value ? isValidFileType(value.name, "image") : true
      )
      .test(
        "is-valid-size",
        "Tamanho de imagem não pode exceder 100KB",
        (value: any) => (value ? value && value?.size <= MAX_FILE_SIZE : true)
      ),
    course: yup.string(),
    shift: yup.string(),
    classId: yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    resetField,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleShowToast } = useQuickToast();
  const navigate = useNavigate();

  const [students, setStudents] = useState<StudentData[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);

  const selectedCourse = watch("course");

  const courseSelectOptions = courses.map((course) => ({
    label: course.name,
    value: course.id,
  }));

  const classSelectOptions = classes
    .map((schoolClass) => ({
      label: `${schoolClass.course.byname} - ${schoolClass.referencePeriod}° ${
        schoolClass.course.periodsQuantity > 4 ? "período" : "ano"
      } (${formatShift(schoolClass.shift)})`,
      value: schoolClass.id,
      courseId: schoolClass.courseId,
    }))
    .filter((schoolClass) => schoolClass.courseId === selectedCourse);

  const shiftSelectOptions = shifts.map((shift) => ({
    label: `${formatShift(shift)}`,
    value: shift,
  }));

  useEffect(() => {
    resetField("classId", { defaultValue: "" });
  }, [selectedCourse]);

  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [showBindStudentToDiscipline, setShowBindStudentToDiscipline] =
    useState(false);

  const [studentToRemove, setStudentToRemove] = useState("");
  const [isDeletingStudent, setIsDeletingStudent] = useState(false);

  const [loadingStudents, setLoadingStudents] = useState(true);

  const [studentToBind, setStudentToBind] = useState<StudentData>();
  const [studentClassDisciplines, setStudentClassDisciplines] = useState<
    DisciplineData[]
  >([]);
  const [studentCourseDisciplines, setStudentCourseDisciplines] = useState<
    DisciplineData[]
  >([]);

  const getAllStudents = async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_STUDENT_URL}/students/all`
    );

    const { data: allClasses } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/classes/all`
    );
    setClasses(allClasses);

    const { data: allCourses } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/courses/all`
    );
    setCourses(allCourses);

    data.forEach((student: StudentData) => {
      const matchingClass = allClasses.find(
        (schoolClass: ClassData) => schoolClass.id === student.classId
      );
      if (matchingClass) {
        student.schoolClass = matchingClass;
      }
    });
    setStudents(data);
    setLoadingStudents(false);
  };

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

  const getClassDisciplines = async (classId: string) => {
    const { data } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/disciplines/by-class/${classId}/all`
    );
    setStudentClassDisciplines(data);
  };

  const getCourseDisciplines = async (courseId: string) => {
    const { data } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/disciplines/by-course/${courseId}/all`
    );
    setStudentCourseDisciplines(data);
  };

  const onSubmitStudent = async (data: CreateStudentData) => {
    const formData = new FormData();
    formData.append("picture", data?.picture as any);
    delete data.picture;

    const [day, month, year] = data.dateOfBirth.split("/").map(Number);
    const dateOfBirth = new Date(year, month, day).toISOString();
    const { data: studentData } = await api.post(
      `${process.env.VITE_MS_STUDENT_URL}/students/create`,
      { ...data, dateOfBirth }
    );

    if (formData.get("picture") !== "undefined") {
      await api.put(
        `${process.env.VITE_MS_STUDENT_URL}/students/${studentData?.id}/picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
    handleShowToast("success", "Estudante criado com sucesso!");
    toggleCreateStudentModal();
    setStudentToBind(studentData);
    getAllStudents();
    console.log("aqui", studentData);
    getClassDisciplines(studentData?.classId);
    getCourseDisciplines(studentData?.schoolClass?.courseId);

    setShowBindStudentToDiscipline(true);

    return studentData;
  };

  const onSubmitStudentDisciplines = async (disciplines: DisciplineData[]) => {
    const response = await api.post(
      `${process.env.VITE_MS_STUDENT_URL}/students/disciplines/create`,
      disciplines.map(({ id }) => ({
        studentId: studentToBind?.id,
        disciplineId: id,
        diaryId: studentToBind?.schoolClass?.diaryId,
      }))
    );

    if (response.status === 201) {
      handleShowToast("success", "Disciplinas vinculadas ao estudante!");
      setShowBindStudentToDiscipline(false);
    } else {
      handleShowToast("error", "Erro ao tentar vincular disciplinas");
    }
  };

  const onDeleteStudent = async () => {
    setIsDeletingStudent(true);
    await api.delete(
      `${process.env.VITE_MS_STUDENT_URL}/students/remove?id=${studentToRemove}`
    );
    getAllStudents();
    toggleDeleteStudentModal();
    setIsDeletingStudent(false);
    handleShowToast("success", "Estudante removido!");
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      {showBindStudentToDiscipline && (
        <BindStudentDisciplineModal
          title="Vincular disciplinas ao estudante"
          description="Selecione as disciplinas que o estudante cursa"
          contentClassName="min-w-[600px]"
          classDisciplines={studentClassDisciplines}
          allCourseDisciplines={studentCourseDisciplines}
          onClose={() => setShowBindStudentToDiscipline(false)}
          onConfirm={() => {}}
          submitDisciplines={(disciplines) =>
            onSubmitStudentDisciplines(disciplines)
          }
        />
      )}
      {showDeleteStudentModal && (
        <Modal
          title="Tem certeza?"
          description="Deseja excluir este aluno e TODOS os seus dados permanentemente?"
          onClose={() => toggleDeleteStudentModal()}
          onConfirm={() => onDeleteStudent()}
          isLoading={isDeletingStudent}
        />
      )}
      {showCreateStudentModal && (
        <Modal
          title="Cadastrar novo estudante"
          description="Preencha os dados para criar um novo estudante"
          onClose={() => toggleCreateStudentModal()}
          onConfirm={handleSubmit(onSubmitStudent)}
          contentClassName="flex flex-col gap-3"
          isLoading={isSubmitting}
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
          <Controller
            name={"picture"}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="file"
                label="Foto de perfil"
                onChange={({ target }) =>
                  target.files &&
                  target?.files?.length > 0 &&
                  field.onChange(target.files[0])
                }
                value={field?.value?.filename}
                error={!!fieldState?.error?.message}
                helperText={fieldState?.error?.message ?? ""}
              />
            )}
          />
          <ControlledSelect
            control={control}
            name="course"
            label="Curso"
            placeholder="XX/XX/XXXX"
            options={courseSelectOptions}
          />
          <ControlledSelect
            control={control}
            name="shift"
            label="Turno"
            disabled={!selectedCourse}
            options={shiftSelectOptions}
          />
          <ControlledSelect
            control={control}
            name="classId"
            label="Turma"
            disabled={!watch("shift")}
            options={classSelectOptions}
          />
        </Modal>
      )}

      <Heading
        title="Lista de estudantes"
        description="Gerencie os estudantes cadastrados no sistema"
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
          {loadingStudents && <Loading />}
          {students.map(
            ({
              id,
              name,
              shift,
              registration,
              schoolClass,
              classId,
              dateOfBirth,
              picture,
            }) => (
              <TRow key={id}>
                <TCell>
                  <div className="flex flex-row items-center gap-3">
                    <Avatar
                      image={`${process.env.VITE_MS_STUDENT_PICTURES}/${picture}`}
                      size={40}
                      className="w-[50px] h-[50px]"
                    />
                    <span>{name}</span>
                  </div>
                </TCell>
                <TCell>{registration}</TCell>
                <TCell>{calculeAge(dateOfBirth)}</TCell>
                <TCell>{schoolClass?.course.name}</TCell>
                <TCell>{schoolClass?.referencePeriod} período</TCell>
                <TCell>
                  <TActions
                    onListClick={() => handleViewStudent(id)}
                    showEdit={false}
                    // onEditClick={() =>
                    //   handleEditStudent({
                    //     id: id,
                    //     name: name,
                    //     classId: classId,
                    //     dateOfBirth: formatForBrazilDateStandard(dateOfBirth),
                    //     picture: picture,
                    //     shift: `${
                    //       shift === "morning"
                    //         ? "Manhã"
                    //         : shift === "afternoon"
                    //         ? "Tarde"
                    //         : "Noite"
                    //     }`,
                    //     registration: registration,
                    //     schoolClass: schoolClass,
                    //   })
                    // }
                    onRemoveClick={() => handleDeleteStudent(id)}
                  />
                </TCell>
              </TRow>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Students;
