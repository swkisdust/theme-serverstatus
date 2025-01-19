<template>
  <div class="flex mt-6 mx-6 items-center mb-2 justify-center">
    <ServerTable
      :data="servers"
      class="p-[20px] border-[1px] rounded-[3px] w-full"
    >
    </ServerTable>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import ServerTable from "@/components/ServerTable.vue";
import type { StreamServer, StreamServerData } from "@/components/types";

const servers: Ref<StreamServer[]> = ref([]);

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
