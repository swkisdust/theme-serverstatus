<template>
  <div
    v-for="gs in groupedServers"
    class="flex mt-6 mx-6 items-center mb-2 justify-center"
  >
    <ServerTable
      :data="gs.data"
      :group="gs.group"
      class="p-[20px] border-[1px] rounded-[3px] w-full"
    >
    </ServerTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import useSWRV from "swrv";
import { swrFetcher } from "@/lib/fetch";
import ServerTable from "@/components/ServerTable.vue";
import type {
  StreamServer,
  StreamServerData,
  ModelServerGroupResponseItem,
} from "@/components/types";

const servers: Ref<StreamServer[]> = ref([]);
const { data } = useSWRV<ModelServerGroupResponseItem[]>(
  "/api/v1/server-group",
  swrFetcher,
);
const groupedServers = computed(() => {
  if (!data.value) return [{ data: servers.value, group: "Default" }];

  const grouped = data.value
    .map((group) => ({
      group: group.group.name,
      data: servers.value.filter((s) => (group.servers || []).includes(s.id)),
    }))
    .filter((group) => group.data.length > 0);

  const groupedServerIds = new Set(
    data.value.flatMap((group) => group.servers),
  );

  const ungroupedServers = servers.value.filter(
    (server) => !groupedServerIds.has(server.id),
  );

  if (ungroupedServers.length > 0) {
    grouped.push({ data: ungroupedServers, group: "Ungrouped" });
  }

  return grouped;
});

const ws = new WebSocket("/api/v1/ws/server");
ws.onopen = () => {
  console.log("Websocket connected");
};
ws.onclose = (e) => {
  console.log("WebSocket connection closed:", e);
};
ws.onerror = (e) => {
  console.error(e);
};
ws.onmessage = (e: MessageEvent<string>) => {
  if (e.data) {
    const s: StreamServerData = JSON.parse(e.data);
    servers.value = s.servers;
  }
};
</script>
