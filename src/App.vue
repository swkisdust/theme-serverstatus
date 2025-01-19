<template>
  <div>
    <Menu></Menu>
  </div>
  <router-view></router-view>
  <footer class="text-xs text-center">
    <p>Nezha | Theme ServerStatus | Powered by Nezha Monitoring</p>
  </footer>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";
</script>
