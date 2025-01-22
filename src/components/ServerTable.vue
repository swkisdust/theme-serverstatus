<template>
  <div class="relative overflow-auto w-full">
    <h1 class="text-xl font-bold mb-2 overflow-hidden">{{ group }}</h1>
    <table class="w-full caption-bottom leading-[20px] text-[14px]">
      <thead>
        <tr v-for="headerGroups in table.getHeaderGroups()" :key="headerGroups.id" class="border-t">
          <th v-for="header in headerGroups.headers" :key="header.id" :colspan="header.colSpan"
            class="relative text-center align-middle p-[5px] font-semibold" :style="{ width: `${header.getSize()}px` }">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in table.getRowModel().rows" :key="row.id">
          <tr
            :class="`border-t cursor-pointer ${row.index % 2 === 0 ? `bg-[#ffffff]` : `bg-[#f9f9f9]`} hover:bg-[#e6e6e6]`"
            @click="() => row.toggleExpanded()">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="text-center align-middle p-[5px]">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
          <tr :class="`${row.index % 2 === 0 ? `bg-[#ffffff]` : `bg-[#f9f9f9]`}`">
            <td :colspan="table.getAllColumns().length" class="p-0">
              <TransitionExpand :duration="150">
                <div v-show="row.getIsExpanded()" class="my-[10px] ml-[18px]">
                  <div class="flex gap-1">
                    <span>系统:</span>
                    <span v-if="row.original.host?.platform">
                      <span>{{ row.original.host.platform }}</span>
                      <span v-if="row.original.host?.platform_version">-{{ row.original.host.platform_version }}</span>
                    </span>
                    <span v-if="row.original.host?.arch">
                      [{{
                        row.original.host.virtualization
                          ? `${row.original.host.virtualization}:`
                          : ""
                      }}{{ row.original.host.arch }}]
                    </span>
                  </div>
                  <div class="flex gap-1">
                    <span>CPU:</span>
                    <template v-if="row.original.host?.cpu">
                      <span>{{
                        (row.original.host?.cpu || []).join(",")
                        }}</span>
                      <span>{{
                        `(${(row.original.state?.cpu || 0).toFixed(2)}%)`
                        }}</span>
                    </template>
                  </div>
                  <div v-if="row.original.host?.gpu" class="flex gap-1">
                    <span>GPU:</span>
                    <template v-if="
                      row.original.state?.gpu &&
                      row.original.state.gpu.length > 1
                    ">
                      <template v-for="(model, index) in row.original.host.gpu">
                        <span>{{ model }}</span>
                        <span>({{ row.original.state.gpu[index] }}%)</span>
                      </template>
                    </template>
                    <template v-else>
                      <span>{{ row.original.host.gpu.join(",") }}</span>
                      <span>({{ (row.original.state?.gpu || [0])[0] }}%)</span>
                    </template>
                  </div>
                  <div class="flex gap-1">
                    <span>硬盘:</span>
                    <span>{{
                      nezhaUtils.formatBytes(row.original.state?.disk_used || 0)
                      }}</span>
                    <span>/</span>
                    <span>{{
                      nezhaUtils.formatBytes(row.original.host?.disk_total || 0)
                      }}</span>
                  </div>
                  <div class="flex gap-1">
                    <span>内存:</span>
                    <span>{{
                      nezhaUtils.formatBytes(row.original.state?.mem_used || 0)
                      }}</span>
                    <span>/</span>
                    <span>{{
                      nezhaUtils.formatBytes(row.original.host?.mem_total || 0)
                      }}</span>
                  </div>
                  <div class="flex gap-1">
                    <span>交换:</span>
                    <template v-if="row.original.host?.swap_total">
                      <span>{{
                        nezhaUtils.formatBytes(
                          row.original.state?.swap_used || 0,
                        )
                      }}</span>
                      <span>/</span>
                      <span>{{
                        nezhaUtils.formatBytes(
                          row.original.host?.swap_total || 0,
                        )
                      }}</span>
                      <span>
                        {{
                          nezhaUtils.formatUsage(
                            row.original.state?.disk_used || 0,
                            row.original.host?.disk_total || 0,
                          )
                        }}
                      </span>
                    </template>
                    <span v-else>OFF</span>
                  </div>
                  <div class="flex gap-1">
                    <span>流量:</span>
                    <span>IN
                      {{
                        nezhaUtils.formatBytes(
                          row.original.state?.net_in_transfer || 0,
                        )
                      }}</span>
                    <span>/</span>
                    <span>OUT
                      {{
                        nezhaUtils.formatBytes(
                          row.original.state?.net_out_transfer || 0,
                        )
                      }}</span>
                  </div>
                  <div class="flex gap-1">
                    <span>负载:</span>
                    <span>{{
                      (row.original.state?.load_1 || 0).toFixed(2)
                      }}</span>
                    <span>/</span>
                    <span>{{
                      (row.original.state?.load_5 || 0).toFixed(2)
                      }}</span>
                    <span>/</span>
                    <span>{{
                      (row.original.state?.load_15 || 0).toFixed(2)
                      }}</span>
                  </div>
                  <div class="flex gap-1">
                    <span>进程数:</span>
                    <span>{{ row.original.state?.process_count || 0 }}</span>
                  </div>
                  <div class="flex gap-1">
                    <span>连接数:</span>
                    <span>TCP {{ row.original.state?.tcp_conn_count || 0 }}</span>
                    <span>/</span>
                    <span>UDP {{ row.original.state?.udp_conn_count || 0 }}</span>
                  </div>
                  <div class="flex gap-1">
                    <span>启动:</span>
                    <span>{{
                      new Date(
                        (row.original.host?.boot_time || 0) * 1000,
                      ).toLocaleString()
                    }}</span>
                  </div>
                  <div class="flex gap-1">
                    <span>活动:</span>
                    <span>{{
                      new Date(row.original.last_active || 0).toLocaleString()
                      }}</span>
                  </div>
                  <div v-if="
                    row.original.state?.temperatures &&
                    nezhaUtils.getTemperature(
                      row.original.state.temperatures,
                    ) > 0
                  " class="flex gap-1">
                    <span>温度:</span>
                    <span v-if="!sensorExpanded" class="flex-1">
                      {{
                        nezhaUtils
                          .getTemperature(row.original.state.temperatures)
                          .toFixed(2)
                      }}°C
                      <i class="bi bi-chevron-double-down cursor-pointer" @click="() => {
                        sensorExpanded
                          = !sensorExpanded;
                      }
                        "></i>
                    </span>
                    <span v-else class="flex-1">
                      <span v-for="temp in row.original.state.temperatures">
                        [ {{ temp.Name }} : {{ temp.Temperature.toFixed(2) }}°C
                        ]
                      </span>
                      <i class="bi bi-chevron-double-up cursor-pointer" @click="() => {
                        sensorExpanded
                          = !sensorExpanded;
                      }
                        "></i>
                    </span>
                  </div>
                  <div v-if="row.original.host?.version" class="flex gap-1">
                    <span>版本:</span>
                    <span>{{ row.original.host.version }}</span>
                  </div>
                </div>
              </TransitionExpand>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { h, ref, toValue, computed } from "vue";
import TransitionExpand from "./ui/TransitionExpand.vue";
import {
  type ColumnDef,
  useVueTable,
  getCoreRowModel,
  FlexRender,
  getExpandedRowModel,
} from "@tanstack/vue-table";
import { type StreamServer, State } from "./types";
import { nezhaUtils } from "@/lib/utils";
import Progress from "./ui/Progress.vue";
import { DistroIcon } from "./ui/icon";
import WindowsIcon from "@/assets/windows.svg";
import StatusIcon from "./StatusIcon.vue";

const props = defineProps<{ data: StreamServer[]; group: string }>();
const servers = computed(() => props.data);
const sensorExpanded = ref(false);

const columns: ColumnDef<StreamServer>[] = [
  {
    id: "state",
    header: "状态",
    cell: ({ row }) => {
      return h(StatusIcon, {
        state: nezhaUtils.isOffline(row.original.last_active) ? State.Error : State.Success,
      });
    },
    maxSize: 20,
  },
  {
    id: "name",
    header: "名称",
    accessorKey: "name",
    accessorFn: (row) => row.name,
    cell: ({ row }) => {
      const s = row.original;
      return s.name;
    },
    minSize: 80,
    maxSize: 80,
  },
  {
    id: "platform",
    header: "系统",
    accessorKey: "platform",
    accessorFn: (row) => row.host?.platform || "Linux",
    cell: ({ row }) => {
      const s = row.original;
      return s.state?.uptime || 0 > 0
        ? h("div", { class: "flex gap-1 items-center justify-center" }, [
          (s.host?.platform || "").toLowerCase() !== "windows"
            ? h(DistroIcon, { os: s.host?.platform })
            : h("img", { src: WindowsIcon, class: "w-[14px]" }),
          h(
            "span",
            { class: "capitalize" },
            nezhaUtils.getPlatformName(s.host?.platform || "Linux"),
          ),
        ])
        : "";
    },
    minSize: 40,
    maxSize: 40,
  },
  {
    id: "country",
    header: "位置",
    accessorKey: "country_code",
    accessorFn: (row) => row.country_code || "UN",
    cell: ({ row }) => {
      const s = row.original;
      return s.state?.uptime || 0 > 0
        ? h("div", { class: "flex gap-1 items-center justify-center" }, [
          h("i", { class: `fi fi-${s.country_code || "un"}` }),
          h("span", { class: "uppercase" }, s.country_code || "UN"),
        ])
        : "";
    },
    minSize: 40,
    maxSize: 40,
  },
  {
    id: "online",
    header: "在线",
    accessorKey: "online",
    accessorFn: (row) => `${nezhaUtils.toDay(row.state?.uptime || 0)} 天`,
    minSize: 30,
    maxSize: 30,
  },
  {
    id: "load",
    header: "负载",
    accessorKey: "load",
    accessorFn: (row) => (row.state?.load_15 || 0).toFixed(2),
    minSize: 30,
    maxSize: 30,
  },
  {
    id: "bandwidth",
    header: "网速↓|↑",
    accessorKey: "bandwidth",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      const s = row.original;
      return `${nezhaUtils.formatBytes(s.state?.net_in_speed || 0)} | ${nezhaUtils.formatBytes(s.state?.net_out_speed || 0)}`;
    },
  },
  {
    id: "nic",
    header: "流量↓|↑",
    accessorKey: "nic",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      const s = row.original;
      return `${nezhaUtils.formatBytes(s.state?.net_in_transfer || 0)} | ${nezhaUtils.formatBytes(s.state?.net_out_transfer || 0)}`;
    },
  },
  {
    id: "cpu",
    header: "核心",
    accessorKey: "cpu",
    maxSize: 80,
    cell: ({ row }) => {
      const s = row.original;
      const progress = s.state?.cpu || 0;
      return h(Progress, {
        progress,
        state: nezhaUtils.isOffline(row.original.last_active) ? 3 :
          nezhaUtils.serverState(progress),
      });
    },
  },
  {
    id: "mem_used",
    header: "内存",
    accessorKey: "mem_used",
    maxSize: 80,
    cell: ({ row }) => {
      const s = row.original;
      const progress = nezhaUtils.formatUsage(
        s.state?.mem_used || 0,
        s.host?.mem_total || 0,
      );
      return h(Progress, {
        progress,
        state: nezhaUtils.isOffline(row.original.last_active) ? 3 :
          nezhaUtils.serverState(progress),
      });
    },
  },
  {
    id: "disk_used",
    header: "硬盘",
    accessorKey: "disk_used",
    maxSize: 80,
    cell: ({ row }) => {
      const s = row.original;
      const progress = nezhaUtils.formatUsage(
        s.state?.disk_used || 0,
        s.host?.disk_total || 0,
      );
      return h(Progress, {
        progress,
        state: nezhaUtils.isOffline(row.original.last_active) ? 3 :
          nezhaUtils.serverState(progress),
      });
    },
  },
];

const table = useVueTable({
  get data() {
    return toValue(servers || []);
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    size: 40,
  },
  getExpandedRowModel: getExpandedRowModel(),
});

</script>
