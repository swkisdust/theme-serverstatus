<template>
  <header
    role="navigation"
    class="flex min-h-[40px] items-center px-4 border-b-2"
  >
    <NavigationMenu v-if="isDesktop" class="sm:max-w-full">
      <div class="flex">
        <RouterLink
          to="/"
          class="flex gap-2 items-center ml-2 mr-6 p-2 text-xl"
        >
          <img :src="nezhaLogo" class="h-7" />
          Nezha
        </RouterLink>
      </div>
      <NavigationMenuList class="space-x-6 justify-start text-base">
        <NavigationMenuItem>
          <RouterLink to="/" class="flex">
            <Icon icon="home"></Icon>
            首页
          </RouterLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <RouterLink to="/service" class="flex">
            <Icon icon="rss"></Icon>
            服务
          </RouterLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <RouterLink to="/network" class="flex items-center gap-2">
            <i><img :src="hddNetwork" class="h-4" /></i>
            网络
          </RouterLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div class="flex ml-auto mr-4">
        <a href="/dashboard" rel="noopener noreferrer" class="flex">
          <Icon icon="user"></Icon>
          管理后台
        </a>
      </div>
    </NavigationMenu>
    <div v-else>sd</div>
  </header>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@/hooks/use-media-query";
import { RouterLink } from "vue-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import nezhaLogo from "@/assets/logo.svg";
import hddNetwork from "@/assets/hdd-network.svg";
import Icon from "@/components/ui/Icon.vue";

const isDesktop = useMediaQuery("(min-width: 890px)");
</script>
