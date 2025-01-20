<template>
  <i
    :class="cn(`fl-${logoClass} w-[14px]`, $attrs.class as string)"
    v-bind="$attrs"
  ></i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{ os?: string }>();

function getFontLogoClass(platform: string): string {
  if (
    [
      "almalinux",
      "alpine",
      "aosc",
      "apple",
      "archlinux",
      "archlabs",
      "artix",
      "budgie",
      "centos",
      "coreos",
      "debian",
      "deepin",
      "devuan",
      "docker",
      "elementary",
      "fedora",
      "ferris",
      "flathub",
      "freebsd",
      "gentoo",
      "gnu-guix",
      "illumos",
      "kali-linux",
      "linuxmint",
      "mageia",
      "mandriva",
      "manjaro",
      "nixos",
      "openbsd",
      "opensuse",
      "pop-os",
      "raspberry-pi",
      "redhat",
      "rocky-linux",
      "sabayon",
      "slackware",
      "snappy",
      "solus",
      "tux",
      "ubuntu",
      "void",
      "zorin",
    ].indexOf(platform) > -1
  ) {
    return platform;
  }
  if (platform == "darwin") {
    return "apple";
  }
  if (["openwrt", "linux", "immortalwrt"].indexOf(platform) > -1) {
    return "tux";
  }
  if (platform == "amazon") {
    return "redhat";
  }
  if (platform == "arch") {
    return "archlinux";
  }
  if (platform.toLowerCase().includes("opensuse")) {
    return "opensuse";
  }
  return "tux";
}

const logoClass = computed(() => getFontLogoClass(props.os || "Linux"));
</script>
