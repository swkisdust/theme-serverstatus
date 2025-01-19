<template>
  <li :class="cn('flex', $attrs.class as string)" v-bind="$attrs">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>
