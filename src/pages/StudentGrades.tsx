import React, { useEffect, useState } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import ReactECharts from "echarts-for-react";
import { CanvasRenderer } from "echarts/renderers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useStudent } from "../hooks/StudentContext";
import { useAcademicManagement } from "../hooks/AcademicManegementContext";
import Modal from "../components/Modal";
import Table from "../components/Table";
import TRow from "../components/TRow";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import Loading from "../components/Loading";
import { ControlledInput } from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { IoMdAdd } from "react-icons/io";
import { Select } from "../components/Select";
import TActions from "../components/TActions";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

interface GradeData {
  score: number;
  bimester: number;
  disciplineId: string;
  attributedBy: string;
  studentId: string;
  diaryId: string;
}

const StudentGrades: React.FC = () => {
  const schema = yup.object().shape({
    score: yup.number().required("Campo obrigatório"),
    bimester: yup.number().required("Campo obrigatório"),
    disciplineId: yup.string().required("Campo obrigatório"),
    attributedBy: yup.string().required("Campo obrigatório"),
    studentId: yup.string().required("Campo obrigatório"),
    diaryId: yup.string().required("Campo obrigatório"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { diaries, getAllDiaries } = useAcademicManagement();

  const {
    student,
    grades,
    isLoadingGrades,
    selectedDiaryToGrades,
    setSelectedDiaryToGrades,
    selectedDiaryToGraph,
    setSelectedDiaryToGraph,
  } = useStudent();

  // const [diaries, setDiaries] = useState<DiaryData[]>([]);

  // const getAllDiaries = async () => {
  //   const response = await api.get(
  //     `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/diaries/all`
  //   );

  //   setDiaries(response?.data ?? []);
  // };

  const diariesOptionsSelect = diaries.map((diary) => ({
    label: `${diary.referenceYear}.${diary.referencePeriod}`,
    value: diary.id,
  }));

  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const handleEditGrade = () => {};

  const onChartClick = () => {
    // alguma coisa
  };

  const showToltip = (event) => console.log("teste", event);

  const onEvents = {
    click: onChartClick,
    mouseover: showToltip,
  };

  const toggleAddGrade = () => {
    setShowAddGradeModal((visible) => !visible);
  };

  const onSubmitGrade = async (data: GradeData) => {
    console.log("form", data);

    return toggleAddGrade();
  };

  useEffect(() => {
    getAllDiaries();
  }, []);

  return (
    <>
      {showAddGradeModal && (
        <Modal
          title="Cadastrar notas"
          description="Preencha os dados para alterar as notas deste estudante"
          onClose={() => toggleAddGrade()}
          onConfirm={handleSubmit(onSubmitGrade)}
          contentClassName="flex flex-col gap-4"
        >
          <Table className="mt-2 min-w-[600px]">
            <thead>
              <TRow>
                <THeader>Disciplina</THeader>
                <THeader>1° Nota</THeader>
                <THeader>2° Nota</THeader>
                <THeader>3° Nota</THeader>
                <THeader>4° Nota</THeader>
              </TRow>
            </thead>
            <tbody>
              {isLoadingGrades && <Loading message="Carregando notas..." />}
              {/* {!isLoadingGrades && grades.length === 0 && (
                <div>Nenhuma nota cadastrada</div>
              )} */}
              {grades.map((disciplineGrades) => (
                <TRow key={disciplineGrades.id}>
                  <TCell contrast>{disciplineGrades.name}</TCell>
                  {/* {disciplineGrades.grades.map((grade) => (
                    <TCell key={grade.gradeId}>{grade.score}</TCell>
                  ))} */}
                  <TCell>
                    <ControlledInput
                      control={control}
                      name="bimester.1"
                      label=""
                      maxLength={3}
                      defaultValue={
                        disciplineGrades.grades.find(
                          (grade) => grade.bimester === 1
                        )?.score ?? ""
                      }
                      containerClassName="w-[60px]"
                      className="text-center"
                      placeholder="-"
                    />
                  </TCell>
                  <TCell>
                    <ControlledInput
                      control={control}
                      name="bimester.2"
                      label=""
                      maxLength={3}
                      defaultValue={
                        disciplineGrades.grades.find(
                          (grade) => grade.bimester === 2
                        )?.score ?? ""
                      }
                      containerClassName="w-[60px]"
                      className="text-center"
                      placeholder="-"
                    />
                  </TCell>
                  <TCell>
                    <ControlledInput
                      control={control}
                      name="bimester.3"
                      label=""
                      maxLength={3}
                      defaultValue={
                        disciplineGrades.grades.find(
                          (grade) => grade.bimester === 3
                        )?.score ?? ""
                      }
                      containerClassName="w-[60px]"
                      className="text-center"
                      placeholder="-"
                    />
                  </TCell>
                  <TCell>
                    <ControlledInput
                      control={control}
                      name="bimester.4"
                      label=""
                      maxLength={3}
                      defaultValue={
                        disciplineGrades.grades.find(
                          (grade) => grade.bimester === 4
                        )?.score ?? ""
                      }
                      containerClassName="w-[60px]"
                      className="text-center"
                      placeholder="-"
                    />
                  </TCell>
                </TRow>
              ))}
            </tbody>
          </Table>
          {/* <section className="flex flex-row items-center gap-4">
            <ControlledInput
              control={control}
              name="score"
              type="number"
              label="Valor da nota"
              maxLength={3}
              placeholder="0 - 100"
            />

            <ControlledInput
              control={control}
              name="score"
              type="number"
              label="Valor da nota"
              maxLength={3}
              placeholder="0 - 100"
            />
          </section> */}
        </Modal>
      )}
      <Heading title="Boletim">
        <Button
          disabled={grades.length === 0}
          onClick={() => toggleAddGrade()}
          className={`flex flex-row items-center gap-2 py-2 `}
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar nota</span>
        </Button>
      </Heading>
      <section className="flex flex-row items-center justify-between mt-4">
        <h2 className="text-lg font-semibold text-black">Notas do período</h2>
        <Select
          className="w-56"
          label=""
          options={diariesOptionsSelect}
          value={selectedDiaryToGrades}
          onChange={(diary) => setSelectedDiaryToGrades(diary.target.value)}
        />
      </section>

      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader>Disciplina</THeader>
            <THeader>1° Nota</THeader>
            <THeader>2° Nota</THeader>
            <THeader>3° Nota</THeader>
            <THeader>4° Nota</THeader>
            <THeader>Ações</THeader>
          </TRow>
        </thead>
        <tbody>
          {grades.map((disciplineGrades) => (
            <TRow key={disciplineGrades.id}>
              <TCell contrast>{disciplineGrades.name}</TCell>
              {disciplineGrades.grades.map((grade) => (
                <TCell key={grade.gradeId}>{grade.score}</TCell>
              ))}

              <TCell>
                <TActions
                  showList={false}
                  showRemove={false}
                  onEditClick={() => handleEditGrade()}
                />
              </TCell>
            </TRow>
          ))}
        </tbody>
      </Table>

      <section className="flex flex-row items-center justify-between mt-4">
        <h2 className="text-lg font-semibold text-black">
          Gráfico de evolução
        </h2>
        <Select
          className="w-56"
          label=""
          options={diariesOptionsSelect}
          value={selectedDiaryToGraph}
          onChange={(diary) => setSelectedDiaryToGraph(diary.target.value)}
        />
      </section>

      <ReactECharts
        className="w-full flex flex-1 h-screen"
        option={{
          xAxis: {
            data: ["2020.1", "2020.2", "2021.1", "2021.2", "2022.1"],
          },
          yAxis: {},
          legend: {
            data: ["Desenvolvimento de Sistemas", "Teste de software"],
          },
          toltip: {
            triggerOn: "none",
            formatter: function (params) {
              return (
                "X: " +
                params.data[0].toFixed(2) +
                "<br>Y: " +
                params.data[1].toFixed(2)
              );
            },
          },
          series: [
            {
              name: "Desenvolvimento de Sistemas",
              data: [10, 22, 28, 43, 49],
              type: "line",
              stack: "x",
              smooth: true,
            },
            {
              name: "Teste de software",
              data: [5, 4, 3, 5, 10],
              type: "line",
              stack: "x",
              smooth: true,
            },
          ],
        }}
        style={{
          height: "400px",
        }}
        notMerge={true}
        lazyUpdate={true}
        // showLoading
        // theme={"theme_name"}
        onEvents={onEvents}
        opts={{ renderer: "svg" }}
      />
    </>
  );
};

export default StudentGrades;
