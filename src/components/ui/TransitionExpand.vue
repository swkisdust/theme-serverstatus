<!--
  SPDX-License-Identifier: ISC

  ISC License
  Copyright (c) 2023, Limonische limonische@gmail.com

  Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  -->
<script setup lang="ts">
import { computed, Transition, TransitionGroup } from "vue";

export interface TransitionExpandProps {
  tag?: keyof HTMLElementTagNameMap;
  direction?: "vertical" | "horizontal";
  duration?: number;
}

const props = withDefaults(defineProps<TransitionExpandProps>(), {
  direction: "vertical",
  duration: 300,
});

const component = computed(() => (props.tag ? TransitionGroup : Transition));
const property = computed(() =>
  props.direction === "vertical" ? "height" : "width",
);
const inverseProperty = computed(() =>
  props.direction !== "vertical" ? "height" : "width",
);
const durationInMs = computed(() => `${props.duration}ms`);

const transitionProps = computed(() => ({
  name: `expand--${props.direction}`,
  ...(props.tag && { tag: props.tag }),
}));

const enter = (element: HTMLElement) => {
  element.style.transition = "none";

  element.style[inverseProperty.value] =
    getComputedStyle(element)[inverseProperty.value];
  element.style.position = "absolute";
  element.style.visibility = "hidden";

  element.classList.remove(`expand--${props.direction}-enter-from`);

  const style = (({ width, height }) => ({ width, height }))(
    getComputedStyle(element),
  );

  element.classList.add(`expand--${props.direction}-enter-from`);

  element.style[inverseProperty.value] = "";
  element.style["position"] = "";
  element.style["visibility"] = "";

  getComputedStyle(element)[property.value];

  element.style["transition"] = "";

  requestAnimationFrame(() => {
    element.style[property.value] = style[property.value];
  });
};

const leave = (element: HTMLElement) => {
  const style = getComputedStyle(element);

  element.style[property.value] = style[property.value];

  getComputedStyle(element)[property.value];

  requestAnimationFrame(() => {
    element.style[property.value] = "0";
  });
};

const after = (element: HTMLElement) => {
  element.style[property.value] = "";
};
</script>

<template>
  <Component
    :is="component"
    v-bind="transitionProps"
    @enter="enter"
    @after-enter="after"
    @leave="leave"
    @after-leave="after"
  >
    <slot></slot>
  </Component>
</template>

<style lang="scss">
.expand {
  &--vertical,
  &--horizontal {
    &-enter-active,
    &-leave-active {
      transition-duration: v-bind(durationInMs);
      transition-timing-function: linear;
      overflow: hidden;
    }
  }

  &--vertical {
    &-enter-active,
    &-leave-active {
      transition-property: height, padding, margin;
    }

    &-enter-from,
    &-leave-to {
      height: 0;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  }

  &--horizontal {
    &-enter-active,
    &-leave-active {
      transition-property: width, padding, margin;
    }

    &-enter-from,
    &-leave-to {
      width: 0;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
* {
  will-change: width, height, padding, margin;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
