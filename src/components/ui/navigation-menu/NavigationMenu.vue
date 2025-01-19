<template>
  <div
    :class="
      cn(
        'relative z-10 flex max-w-max flex-1 items-center justify-center',
        $attrs.class as string,
      )
    "
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>
