<template>
  <div class="flex items-center justify-center">
    <div
      v-if="state == State.Success"
      class="w-[12px] h-[12px] rounded-md bg-success"
    ></div>
    <div
      v-else-if="state == State.Warning"
      class="w-[12px] h-[12px] rounded-md bg-warning"
    ></div>
    <div v-else class="w-[12px] h-[12px] rounded-md bg-error"></div>
  </div>
</template>

<script setup lang="ts">
import { State } from "./types";

defineProps<{ state?: number }>();
</script>
