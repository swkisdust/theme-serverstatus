<template>
  <div class="relative overflow-auto w-full">
    <h1 class="text-xl font-bold mb-2 overflow-hidden">服务监控</h1>
    <table class="w-full caption-bottom leading-[20px] text-[14px]">
      <thead>
        <tr
          v-for="headerGroups in table.getHeaderGroups()"
          :key="headerGroups.id"
          class="border-t"
        >
          <th
            v-for="header in headerGroups.headers"
            :key="header.id"
            :colspan="header.colSpan"
            class="relative text-center align-middle p-[5px] font-semibold"
            :style="{ width: `${header.getSize()}px` }"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody class="text-[14px]">
        <template v-for="row in table.getRowModel().rows" :key="row.id">
          <tr
            :class="`border-t ${row.index % 2 === 0 ? `bg-[#ffffff]` : `bg-[#f9f9f9]`} hover:bg-[#e6e6e6]`"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="text-center align-middle p-[5px]"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { h, toValue, computed } from "vue";
import {
  type ColumnDef,
  useVueTable,
  getCoreRowModel,
  FlexRender,
  getExpandedRowModel,
} from "@tanstack/vue-table";
import { type ModelServiceResponseItem, State } from "./types";
import StatusIcon from "./StatusIcon.vue";
import Progress from "./ui/Progress.vue";
import StatusCell from "./StatusCell.vue";
import { nezhaUtils } from "@/lib/utils";

const props = defineProps<{ data: ModelServiceResponseItem[] }>();
const services = computed(() => props.data);

const columns: ColumnDef<ModelServiceResponseItem>[] = [
  {
    id: "state",
    header: "状态",
    cell: ({ row }) => {
      const s = row.original;
      const state = nezhaUtils.serviceState(
        nezhaUtils.formatUsage(s.total_up, s.total_down),
      );
      return h("div", { class: "flex justify-center items-center gap-1" }, [
        h(StatusIcon, { state }),
        h(
          "span",
          (() => {
            switch (state) {
              case State.Success: {
                return "可用";
              }
              case State.Warning: {
                return "低可用";
              }
              default: {
                return "故障";
              }
            }
          })(),
        ),
      ]);
    },
    minSize: 60,
    maxSize: 60,
  },
  {
    id: "name",
    header: "名称",
    accessorKey: "serviceName",
    accessorFn: (row) => row.service_name,
    cell: ({ row }) => {
      const s = row.original;
      return s.service_name;
    },
    minSize: 80,
    maxSize: 80,
  },
  {
    id: "details",
    header: "详情",
    cell: ({ row }) => {
      const s = row.original;
      const states = s.up.map((up, i) => {
        let per = nezhaUtils.getPercent(up, s.down[i]);
        if (per < 0) per = 0;
        const available = "可用性";
        const averageLatency = "平均响应时间";
        const statusText = `${nezhaUtils.beforeDay(s.up.length - i - 1)}, ${available}: ${per.toFixed(3)}%, ${averageLatency}: ${s.delay[i].toFixed(3)}ms`;
        return { statusText, per };
      });
      return h("div", { class: "flex gap-1 justify-center items-center" }, [
        states.map((state) =>
          h(StatusCell, { statusText: state.statusText, avail: state.per }),
        ),
      ]);
    },
  },
  {
    id: "avg_delay",
    header: "平均响应时间",
    accessorKey: "avgDelay",
    accessorFn: (row) => {
      const { sum, count } = row.delay.reduce(
        (acc, value) => {
          if (value !== 0) {
            acc.sum += value;
            acc.count += 1;
          }
          return acc;
        },
        { sum: 0, count: 0 },
      );

      const avgDelay = count > 0 ? sum / count : 0;
      return `${Math.round(avgDelay)}ms`;
    },
    minSize: 100,
  },
  {
    id: "availability",
    header: "近30天可用性",
    minSize: 100,
    cell: ({ row }) => {
      const s = row.original;
      const progress = nezhaUtils.getPercent(s.total_up, s.total_down);
      const state = nezhaUtils.serviceState(progress);
      return h(Progress, { progress, state });
    },
  },
];

const table = useVueTable({
  get data() {
    return toValue(services || []);
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    size: 40,
  },
  getExpandedRowModel: getExpandedRowModel(),
});
</script>
