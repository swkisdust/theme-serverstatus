<template>
  <div class="flex items-center justify-center">
    <div v-if="online" class="w-[12px] h-[12px] rounded-md bg-green-600"></div>
    <div v-else class="w-[12px] h-[12px] rounded-md bg-red-600"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ online?: boolean }>();
</script>
