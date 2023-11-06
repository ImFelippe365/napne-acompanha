import React, { useState } from "react";
import Heading from "../components/Heading";
import Table from "../components/Table";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import TCell from "../components/TCell";
import TActions from "../components/TActions";
import { Select } from "../components/Select";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";

import { CanvasRenderer } from "echarts/renderers";

import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/Modal";
import { ControlledInput } from "../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  return (
    <>
      {/* {showAddGradeModal && (
        <Modal
          title="Cadastrar novo evento"
          description="Preencha os dados para gerar um novo evento"
          onClose={() => toggleAddGrade()}
          onConfirm={handleSubmit(onSubmitGrade)}
          contentClassName="flex flex-col gap-4"
        >
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

          <ControlledInput
            control={control}
            name="bimester"
            type="number"
            label="Valor da nota"
            placeholder="Nome do evento"
          />
        </Modal>
      )} */}
      <Heading title="Boletim">
        <Button
          onClick={() => toggleAddGrade()}
          className="flex flex-row items-center gap-2 py-2"
        >
          <IoMdAdd className="text-xl  text-white" />
          <span>Adicionar nota</span>
        </Button>
      </Heading>
      <section className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Notas do período</h2>
        <Select className="!bg-white" label="" options={[]} />
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
          <TRow>
            <TCell contrast>Desenvolvimento de Sistemas</TCell>
            <TCell>100</TCell>
            <TCell>80</TCell>
            <TCell>32</TCell>
            <TCell>90</TCell>
            <TCell>
              <TActions
                showList={false}
                showRemove={false}
                onEditClick={() => handleEditGrade()}
              />
            </TCell>
          </TRow>
        </tbody>
      </Table>

      <section className="flex flex-row items-center justify-between mt-4">
        <h2 className="text-lg font-semibold text-black">
          Gráfico de evolução
        </h2>
        <Select label="" options={[]} />
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
