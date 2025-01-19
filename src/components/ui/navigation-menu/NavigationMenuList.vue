<template>
  <ul
    :class="
      cn(
        'group flex flex-1 list-none items-center justify-center space-x-1',
        $attrs.class as string,
      )
    "
    v-bind="$attrs"
  >
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>
