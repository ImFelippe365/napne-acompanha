import React, { useEffect, useState } from "react";
import TCell from "../components/TCell";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import Table from "../components/Table";
import TActions from "../components/TActions";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/Modal";
import { ControlledInput } from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateDiaryData, DiaryData } from "../interfaces/Diary";
import { api } from "../services/api";
import { formatDatetime } from "../utils/formatDatetime";
import Loading from "../components/Loading";
import { useAcademicManagement } from "../hooks/AcademicManegementContext";
import { useQuickToast } from "../hooks/QuickToastContext";

const Diaries: React.FC = () => {
  const schema = yup.object().shape({
    referencePeriod: yup.number().required("Campo obrigatório"),
    referenceYear: yup.number().required("Campo obrigatório").min(2000, "Adicione um ano válido"),
    startDate: yup.string().required("Campo obrigatório"),
    endDate: yup.string().required("Campo obrigatório")
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [showCreateDiaryModal, setShowCreateDiaryModal] = useState(false);
  const [showDeleteDiaryModal, setShowDeleteDiaryModal] = useState(false);

  const [diaryToRemove, setDiaryToRemove] = useState("");
  const [diaryToEdit, setDiaryToEdit] = useState<DiaryData>();


  const {
    diaries,
    isLoadingDiaries,
    getAllDiaries
  } = useAcademicManagement();

  const { handleShowToast } = useQuickToast();

  const toggleCreateDiaryModal = () => {
    reset({});
    setShowCreateDiaryModal((visible) => !visible);
  };

  const toggleDeleteDiaryModal = () =>
    setShowDeleteDiaryModal((visible) => !visible);

  const handleDeleteDiary = (diaryId: string) => {
    setDiaryToRemove(diaryId);
    toggleDeleteDiaryModal();
  };

  const onSubmitDiary = async (data: CreateDiaryData) => {
    data.startDate = new Date(data.startDate)
    data.endDate = new Date(data.endDate)
    try {
      const response = await api.post(
        `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/diaries/create`, data
      )

      if (response.status === 201) {
        getAllDiaries();
        toggleCreateDiaryModal();
        reset({});
        handleShowToast("success", "Diário criado com sucesso!");
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  const onDeleteDiary = async () => {
    try {
      const response = await api.delete(
        `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/diaries/remove?id=${diaryToRemove}`
      )

      if (response.status === 204) {
        toggleDeleteDiaryModal();
        getAllDiaries();
        setDiaryToRemove("");
        handleShowToast("success", "Diário excluída com sucesso!");
      }
    } catch (err) {
      console.log("Ocorreu um erro inesperado");
    }
  };

  useEffect(() => {
    getAllDiaries();
  }, [])

  return (
    <>
      {showDeleteDiaryModal && (
        <Modal
          title="Tem certeza?"
          description="Deseja excluir este diário permanentemente?"
          onClose={() => toggleDeleteDiaryModal()}
          onConfirm={() => onDeleteDiary()}
        />
      )}

      {showCreateDiaryModal && (
        <Modal
          title="Criar novo diário"
          description="Preencha os dados para gerar um novo diário"
          onClose={() => toggleCreateDiaryModal()}
          onConfirm={handleSubmit(onSubmitDiary)}
          contentClassName="flex flex-col gap-3"
        >
          <ControlledInput
            control={control}
            name="referenceYear"
            type="number"
            label="Ano letivo"
            placeholder="Ano em que ocorre as aulas"
          />
          <ControlledInput
            control={control}
            name="referencePeriod"
            type="number"
            label="Período letivo"
            placeholder="Período correspondente ao semestre do ano"
          />

          <section className="flex flex-row items-center gap-6">
            <ControlledInput
              control={control}
              name="startDate"
              type="date"
              label="Data de início"
              placeholder="Digite"
            />

            <ControlledInput
              control={control}
              name="endDate"
              type="date"
              label="Data de fim"
              placeholder="Digite"
            />
          </section>
        </Modal>
      )}

      <section className="my-3 flex flex-row justify-end">
        <Button
          onClick={() => toggleCreateDiaryModal()}
          className="flex flex-row items-center gap-2 py-3"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar novo diário</span>
        </Button>
      </section>
      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Ano e período letivo</THeader>
            <THeader>Início</THeader>
            <THeader>Fim</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          {isLoadingDiaries && <Loading />}
          {diaries?.map(({ id, referenceYear, referencePeriod, startDate, endDate }) => (
            <TRow key={id}>
              <TCell contrast>{referenceYear}.{referencePeriod}</TCell>
              <TCell>{formatDatetime(startDate)}</TCell>
              <TCell>{formatDatetime(endDate)}</TCell>
              <TCell className={"text-primary"}>
                <TActions
                  showList={false}
                  showEdit={false}
                  onRemoveClick={() => handleDeleteDiary(id)}
                />
              </TCell>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Diaries;
