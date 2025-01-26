<template>
  <div v-for="gs in groupedServers" class="flex mt-6 mx-6 items-center mb-2 justify-center">
    <ServerTable :data="gs.data" :group="gs.group" class="p-[20px] border-[1px] rounded-[3px] w-full">
    </ServerTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, type Ref, onUnmounted, provide } from "vue";
import useSWRV from "swrv";
import { swrFetcher } from "@/lib/fetch";
import ServerTable from "@/components/ServerTable.vue";
import type {
  StreamServer,
  StreamServerData,
  ModelServerGroupResponseItem,
} from "@/components/types";

const servers: Ref<StreamServer[]> = ref([]);
provide("streamServers", servers);
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

const wsRef = ref<WebSocket | null>(null);
const isConnecting = ref<boolean>(false);
const reconnectTimeout = ref<number | undefined>(undefined);
const maxReconnectAttempts = 30;
let reconnectAttempts = 0;

// https://github.com/hamster1963/nezha-dash-v1/blob/main/src/context/websocket-provider.tsx
const connect = () => {
  if (isConnecting.value) {
    return;
  }

  isConnecting.value = true;

  wsRef.value = new WebSocket("/api/v1/ws/server");
  wsRef.value.onopen = () => {
    console.log("Websocket connected");
    isConnecting.value = false;
  };
  wsRef.value.onclose = (e) => {
    console.log("WebSocket connection closed:", e);
    isConnecting.value = false;
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectTimeout.value = setTimeout(() => {
        reconnectAttempts++;
        connect();
      }, 3000);
    }
  };
  wsRef.value.onerror = (e) => {
    console.error(e);
    isConnecting.value = false;
  };
  wsRef.value.onmessage = (e: MessageEvent<string>) => {
    if (e.data) {
      const s: StreamServerData = JSON.parse(e.data);
      servers.value = s.servers;
    }
  };
};

onMounted(connect);
onUnmounted(() => {
  if (wsRef.value) {
    wsRef.value.onopen = null;
    wsRef.value.onclose = null;
    wsRef.value.onerror = null;
    wsRef.value.onmessage = null;

    if (
      wsRef.value.readyState === WebSocket.OPEN ||
      wsRef.value.readyState === WebSocket.CONNECTING
    )
      wsRef.value.close();

    wsRef.value = null;
  }

  if (reconnectTimeout.value) {
    clearTimeout(reconnectTimeout.value);
    reconnectTimeout.value = undefined;
  }

  isConnecting.value = false;
});
</script>
