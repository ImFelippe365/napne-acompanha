import React from "react";
import Heading from "../components/Heading";
import Table from "../components/Table";
import THeader from "../components/THeader";
import TRow from "../components/TRow";
import TCell from "../components/TCell";
import TActions from "../components/TActions";
import { Select } from "../components/Select";

// import the core library.
import ReactECharts from "echarts-for-react";
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import {
  // LineChart,
  BarChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from "echarts/charts";
// import components, all suffixed with Component
import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  DatasetComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

const StudentGrades: React.FC = () => {
  const handleEditGrade = () => {};

  const onChartClick = () => {
    // alguma coisa
  };

  const showToltip = (event) => console.log("teste", event);

  const onEvents = {
    click: onChartClick,
    mouseover: showToltip,
  };

  return (
    <>
      <Heading title="Boletim"></Heading>
      <section className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Notas do período</h2>
        <Select label="" options={[]} />
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
        <h2 className="text-lg font-semibold text-black">Gráfico de evolução</h2>
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
          graphic: {

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
