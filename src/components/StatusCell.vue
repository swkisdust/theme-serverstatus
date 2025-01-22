<template>
  <div
    :class="`inline-block w-[18px] h-[18px] rounded-[3px] shadow-cell ${bgClass}`"
    ref="status-cell"
    @mouseenter="isShow = !isShow"
    @mouseleave="isShow = !isShow"
  ></div>
  <Transition name="fade">
    <div
      ref="tooltip"
      v-if="isShow"
      class="bg-black py-[3px] px-2 text-xs rounded-[4px] text-white"
      :style="floatingStyles"
    >
      {{ statusText || "No Data" }}
      <div
        ref="floatingArrow"
        :style="{
          position: 'absolute',
          left:
            middlewareData.arrow?.x != null
              ? `${middlewareData.arrow.x}px`
              : '',
          bottom: '-0.2rem',
        }"
        class="h-[6px] w-[6px] rotate-45 bg-black"
      ></div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { ref, useTemplateRef, computed } from "vue";
import { arrow, offset, useFloating, autoUpdate } from "@floating-ui/vue";

const props = defineProps<{ statusText?: string; avail: number }>();
const bgClass = computed(() => {
  if (props.avail > 80 && props.avail < 95) {
    return "bg-warning";
  } else if (props.avail <= 80) {
    return "bg-error";
  }
  return "bg-success";
});

const isShow = ref(false);

const reference = useTemplateRef("status-cell");
const floating = useTemplateRef("tooltip");
const floatingArrow = useTemplateRef("floatingArrow");

const { floatingStyles, middlewareData } = useFloating(reference, floating, {
  placement: "top",
  whileElementsMounted: autoUpdate,
  middleware: [arrow({ element: floatingArrow }), offset({ mainAxis: 6 })],
});
</script>
