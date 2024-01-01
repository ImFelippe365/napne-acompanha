import React, { useEffect } from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { ControlledInputArea } from "../components/InputArea";
import { ControlledInput } from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useStudent } from "../hooks/StudentContext";
import { CreateStudentNote } from "../interfaces/Student";
import { api } from "../services/api";
import { useQuickToast } from "../hooks/QuickToastContext";
import { useAuth } from "../hooks/AuthContext";
import { formatUserDepartment } from "../utils/formatUserDepartment";
import Loading from "../components/Loading";
import { formatNoteDate } from "../utils/formatNoteDate";

const StudentNotes: React.FC = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useAuth();
  const { getStudentNotes, notes, isLoadingNotes, student } = useStudent();
  const { handleShowToast } = useQuickToast();

  const onSubmitNote = async (data: CreateStudentNote) => {
    const response = await api.post(
      `${process.env.VITE_MS_STUDENT_URL}/notes/create`,
      {
        ...data,
        studentId: student?.id,
        createdBy: user?.id,
      }
    );
    handleShowToast("success", "Nota adicionada!");
    getStudentNotes();
    reset({});
    return response;
  };

  // useEffect(() => {
  //   getStudentNotes();
  // }, []);

  return (
    <>
      <Heading title="Anotações" />

      <form className="flex flex-col gap-3 mt-2">
        <ControlledInput
          control={control}
          name="title"
          type="text"
          label="Título"
          placeholder="Insira um título para a anotação"
        />

        <ControlledInputArea
          control={control}
          name="description"
          type="text"
          label="Descrição"
          placeholder="Insira uma descrição"
        />

        <section className="flex flex-row justify-end mt-1">
          <Button
            onClick={handleSubmit(onSubmitNote)}
            className="flex flex-row items-center gap-2 py-3"
            isLoading={isSubmitting}
          >
            <IoMdAdd className="text-xl  text-white" />
            <span>Adicionar nota</span>
          </Button>
        </section>
      </form>

      <hr className="text-light-gray my-8" />
      {isLoadingNotes && (
        <Loading message="Carregando anotações do estudante..." />
      )}

      {notes.map((note) => (
        <section key={note.id} className="mb-8">
          <div className="flex flex-row items-center gap-3 mb-2">
            <img
              src={`${process.env.VITE_SUAP_URL}${note.user.picture}`}
              className="w-8 h-8 bg-black rounded-full object-cover"
            />
            <div>
              <span className="text-black font-semibold">
                {note.user.name + " "}
                <span className="text-gray text-xs font-normal">
                  {formatNoteDate(note.createdAt)}
                </span>
              </span>
              <p className="text-xs font-semibold text-gray">
                {formatUserDepartment(note.user.department)}
              </p>
            </div>
          </div>

          <article className="text-black font-normal text-sm ml-11">
            {note.description}
          </article>
        </section>
      ))}
    </>
  );
};

export default StudentNotes;
