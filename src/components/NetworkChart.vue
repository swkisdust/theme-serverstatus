<template>
  <div class="relative overflow-auto w-full">
    <VChart ref="chart" class="chart" :option="option" />
  </div>
</template>

<style scoped>
.chart {
  height: 400px;
}
</style>

<script setup lang="ts">
import { provide, useTemplateRef, onMounted, onUnmounted } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
  GridComponentOption,
  DataZoomComponentOption
} from 'echarts/components'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer
])

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | DataZoomComponentOption
  | LineSeriesOption
>
import VChart, { THEME_KEY } from "vue-echarts";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer
])

provide(THEME_KEY, "light");

const chart = useTemplateRef("chart");
const fontColor = "#000000";
const gridLeft = 42;
const gridRight = 20;
const gripTop = 80;
const gridBottom = 90;
const fontSize = 14;
const legendLeft = 'center';
const legendTop = 5;
const legendPadding = [5, 0, 5, 0];
const itemWidth = 25;
const itemHeight = 14;

const option: EChartsOption = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    icon: "",
    textStyle: {
      fontSize,
      color: fontColor,
    },
    top: legendTop,
    bottom: 0,
    left: legendLeft,
    padding: legendPadding,
    itemWidth,
    itemHeight,
  },
  grid: {
    top: gripTop,
    left: gridLeft,
    right: gridRight,
    bottom: gridBottom,
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'time',
    axisLabel: {
      fontSize,
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize,
    },
    splitLine: {
      lineStyle: {
        width: 1,
      },
    },
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ],
  dataZoom: [
    {
      type: 'slider',
      start: 0,
      end: 100,
    }
  ],
}

const resizeChart = () => { chart.value?.resize() };
onMounted(() => {
  resizeChart();
  window.addEventListener("resize", resizeChart);
})
onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
})

</script>