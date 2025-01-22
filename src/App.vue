<template>
  <Menu></Menu>
  <section>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component v-if="$route.meta.keepAlive" :is="Component" />
      </keep-alive>
      <component v-if="!$route.meta.keepAlive" :is="Component" />
    </router-view>
  </section>
  <footer class="text-xs text-center">
    <p>Nezha | Theme ServerStatus-v1 | Powered by Nezha Monitoring</p>
  </footer>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";
</script>
