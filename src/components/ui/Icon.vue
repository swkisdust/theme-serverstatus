<template>
  <i :class="cn(`${icon} icon`, $attrs.class as string)" v-bind="$attrs"></i>
</template>

<script setup lang="ts">
import "semantic-ui-icon/icon.min.css";
import { cn } from "@/lib/utils";

defineProps<{ icon: string }>();
</script>
