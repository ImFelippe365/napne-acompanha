import React, { useEffect, useRef, useState } from "react";
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
import { StudentGrade } from "../interfaces/Student";
import { Grade } from "../interfaces/Grade";
import { useAuth } from "../hooks/AuthContext";
import { api } from "../services/api";
import { useQuickToast } from "../hooks/QuickToastContext";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

interface GradeData {
  score?: number;
  grades: number[];
  disciplineId: string;
}

const StudentGrades: React.FC = () => {
  const schema = yup.object().shape({
    grades: yup.array(
      yup.object({
        score: yup.string().test({
          message: "A nota deve ser igual ou menor que 100",
          test: (value) => {
            if (!value) return true;
            return Number(value) <= 100 && Number(value) >= 0;
          },
        }),
        bimester: yup.number(),
        disciplineId: yup.number(),
      })
    ),
  });

  const echartRef = useRef(null);

  const { user } = useAuth();
  const { handleShowToast } = useQuickToast();
  const { diaries, getAllDiaries } = useAcademicManagement();

  const {
    student,
    grades,
    getStudentGrades,
    isLoadingGrades,
    selectedDiaryToGrades,
    setSelectedDiaryToGrades,
    selectedDiaryToGraph,
    setSelectedDiaryToGraph,
  } = useStudent();

  const { control, handleSubmit, setValue, watch, getValues, reset } = useForm({
    // defaultValues: grades,
    // resolver: yupResolver(schema),
  });
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

  const onSubmitGrade = async (data: any) => {
    console.log("form", data);
    const formattedGrades = data.grades.map(({ grades }: StudentGrade) =>
      grades.map((grade) => ({
        id: grade.gradeId,
        disciplineId: grade.disciplineId,
        bimester: grade.bimester,
        studentId: student?.id,
        diaryId: student?.schoolClass?.diaryId,
        attributedBy: user?.id,
        score: grade?.score ? Number(grade.score) : undefined,
      }))
    );

    console.log(formattedGrades);

    formattedGrades.forEach((grades) => {
      grades.forEach(async (bimester) => {
        await api.put(
          `${process.env.VITE_MS_STUDENT_URL}/grades/${bimester.id}/modify`,
          bimester
        );
      });
    });

    toggleAddGrade();
    getStudentGrades();
    handleShowToast("success", "Notas cadastradas");
    reset({});

    return formattedGrades;
  };

  const [gradesToGraph, setGradesToGraph] = useState([
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
  ]);

  useEffect(() => {
    if (grades.length > 0) {
      setValue("grades", grades);
      const newGrades = grades.map((grade) => {
        const currentGrades = grade.grades.map(({ score }) => score);
        return {
          name: grade.name,
          data: currentGrades,
          type: "line",
          stack: "x",
          smooth: true,
        };
      });
      console.log("ta assim", newGrades[0].data);
      setGradesToGraph(newGrades);
    }
  }, [grades]);

  useEffect(() => {
    getAllDiaries();
  }, []);

  const listedGrades = getValues("grades") as StudentGrade[];

  return (
    <>
      {showAddGradeModal && (
        <Modal
          title="Cadastrar notas"
          description="Preencha os dados para alterar as notas deste estudante"
          onClose={() => toggleAddGrade()}
          onConfirm={handleSubmit(onSubmitGrade, (error) => console.log(error))}
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

              {listedGrades.map((disciplineGrades, index) => (
                <TRow key={disciplineGrades.id}>
                  <TCell contrast>{disciplineGrades.name}</TCell>
                  {disciplineGrades.grades.map((grade, gradeIndex) => (
                    <TCell key={grade.gradeId}>
                      <ControlledInput
                        control={control}
                        name={`grades[${index}].grades[${gradeIndex}].score`}
                        label=""
                        maxLength={3}
                        defaultValue={
                          disciplineGrades.grades.find(
                            (grade) => grade.bimester === gradeIndex + 1
                          )?.score ?? ""
                        }
                        containerClassName="w-[60px]"
                        className="text-center"
                        placeholder="-"
                        // onChange={(value) => {
                        //   setValue("grades[0].score", value);
                        //   setValue(
                        //     "grades[0].disciplineId",
                        //     disciplineGrades.id
                        //   );
                        //   setValue("grades[0].bimester", index + 1);
                        // }}
                        // value={watch("grades[0].score") ?? ""}
                      />
                    </TCell>
                  ))}
                  {/* <TCell>
                    <ControlledInput
                      control={control}
                      name={`${index}.grades[0].score`}
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
                      onChange={(value) => {
                        setValue("grades[0].score", value);
                        setValue("grades[0].disciplineId", disciplineGrades.id);
                        setValue("grades[0].bimester", index + 1);
                      }}
                      value={watch("grades[0].score") ?? ""}
                    />
                  </TCell>
                  <TCell>
                    <ControlledInput
                      control={control}
                      name="grades[1].score"
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
                      name="grades[2].score"
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
                      name="grades[3].score"
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
                  </TCell> */}
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
          <span>Gerenciar notas</span>
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
            {/* <THeader>Ações</THeader> */}
          </TRow>
        </thead>
        <tbody>
          {isLoadingGrades && <Loading message="Carregando notas..." />}
          {!isLoadingGrades &&
            grades.map((disciplineGrades) => (
              <TRow key={disciplineGrades.id}>
                <TCell contrast>{disciplineGrades.name}</TCell>
                {disciplineGrades.grades.map((grade) => (
                  <TCell key={grade.gradeId}>{grade.score}</TCell>
                ))}

                {/* <TCell>
                <TActions
                  showList={false}
                  showRemove={false}
                  onEditClick={() => handleEditGrade()}
                />
              </TCell> */}
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
        ref={echartRef}
        className="w-full flex flex-1 h-screen"
        option={{
          xAxis: {
            data: ["1° bimestre", "2° bimestre", "3° bimestre", "4° bimestre"],
            // data: diaries
            //   .filter((diary) => diary.id === selectedDiaryToGraph)
            //   .map(
            //     (diary) => `${diary.referenceYear}.${diary.referencePeriod}`
            //   ),
          },
          yAxis: {},
          legend: {
            data: grades.map((grade) => grade.name),
          },
          // toltip: {
          //   triggerOn: "none",
          //   formatter: function (params) {
          //     return (
          //       "X: " +
          //       params.data[0].toFixed(2) +
          //       "<br>Y: " +
          //       params.data[1].toFixed(2)
          //     );
          //   },
          // },
          series: gradesToGraph.length === 0 ? [] : gradesToGraph,
        }}
        style={{
          height: "400px",
        }}
        notMerge={true}
        lazyUpdate={true}
        showLoading={isLoadingGrades}
        // theme={"theme_name"}
        onEvents={onEvents}
        opts={{ renderer: "svg" }}
      />
    </>
  );
};

export default StudentGrades;
