<template>
  <div class="relative overflow-auto w-full">
    <h1 class="text-xl font-bold mb-2 overflow-hidden">周期性流量统计</h1>
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
import { type ModelCycleTransferStats } from "./types";
import { nezhaUtils } from "@/lib/utils";
import Progress from "./ui/Progress.vue";

interface _CycleTransferStats {
  id: string;
  from: string;
  max: number;
  min: number;
  name: string;
  next_update: string;
  server_name: string;
  to: string;
  transfer?: number;
}

const props = defineProps<{ data: Record<string, ModelCycleTransferStats> }>();
const services = computed(() => {
  return Object.entries(props).flatMap(([_, transfer]) =>
    Object.entries(transfer).flatMap(([id, s]) =>
      Object.keys(s.transfer || {}).map((sid) => ({
        id,
        from: s.from,
        max: s.max,
        min: s.min,
        name: s.name,
        next_update: s.next_update[sid],
        server_name: s.server_name[sid],
        to: s.to,
        transfer: s.transfer ? s.transfer[sid] : undefined,
      })),
    ),
  );
});

const columns: ColumnDef<_CycleTransferStats>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
    accessorFn: (row) => row.id,
    maxSize: 10,
  },
  {
    id: "name",
    header: "规则",
    accessorKey: "name",
    accessorFn: (row) => row.name,
    minSize: 80,
    maxSize: 80,
  },
  {
    id: "server_name",
    header: "服务器",
    accessorKey: "server_name",
    accessorFn: (row) => row.server_name,
    minSize: 60,
    maxSize: 60,
  },
  {
    id: "from",
    header: "起始",
    accessorKey: "from",
    accessorFn: (row) => new Date(row.from).toLocaleString(),
    minSize: 80,
    maxSize: 80,
  },
  {
    id: "to",
    header: "结束",
    accessorKey: "to",
    accessorFn: (row) => new Date(row.to).toLocaleString(),
    minSize: 80,
    maxSize: 80,
  },
  {
    id: "max",
    header: "MAX",
    accessorKey: "max",
    accessorFn: (row) => nezhaUtils.formatBytes(row.max || 0),
    maxSize: 20,
  },
  {
    id: "min",
    header: "MIN",
    accessorKey: "min",
    accessorFn: (row) => nezhaUtils.formatBytes(row.min || 0),
    maxSize: 20,
  },
  {
    id: "next_update",
    header: "下一次检测",
    accessorKey: "next_update",
    accessorFn: (row) => nezhaUtils.timeUntil(row.next_update),
    maxSize: 40,
  },
  {
    id: "transfer",
    header: "当前用量",
    accessorKey: "transfer",
    accessorFn: (row) => nezhaUtils.formatBytes(row.transfer || 0),
    maxSize: 40,
  },
  {
    id: "remain_traffic",
    header: "剩余流量",
    cell: ({ row }) => {
      const s = row.original;
      const p = nezhaUtils.formatUsage(s.transfer || 0, s.max);
      return h(Progress, {
        progress: 100 - p,
        state: nezhaUtils.transferState(100 - p),
      });
    },
    maxSize: 60,
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
