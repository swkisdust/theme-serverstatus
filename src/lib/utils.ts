import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import type { SensorTemperature } from "@/components/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nezhaUtils = {
  isOffline: (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();

    const state = (now.getTime() - date.getTime()) / 1000 > 30 ? true : false;
    return state;
  },
  formatBytes: (bytes: number) => {
    if (bytes === 0 || isNaN(bytes)) return "0B";
    const k = 1024;
    const sizes = ["B", "K", "M", "G", "T", "P", "E", "Z", "Y"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
  },
  formatUsage: (used: number, total: number) => {
    const result = (used / total) * 100;
    return isNaN(result) ? "0" : result.toFixed(2);
  },
  toDay: (sec: number) => {
    const secondsInADay = 24 * 60 * 60;
    const days = sec / secondsInADay;
    return Math.floor(days);
  },
  getTemperature: (temperatureList: SensorTemperature[]) => {
    // 将 sensorList 中的所有项转换为小写
    const lowerCaseSensorList = sensorList.map((sensor) =>
      sensor.toLowerCase()
    );

    // 合并过滤逻辑：过滤出 Temperature 不为 0 且 Name 在 sensorList 中的元素（忽略大小写）
    const filtered = temperatureList.filter(
      (item) =>
        item.Temperature !== 0 &&
        lowerCaseSensorList.includes(item.Name.toLowerCase())
    );

    // 如果有匹配的元素，则计算这些元素的 Temperature 的最大值
    if (filtered.length > 0) {
      return filtered.reduce((max, current) => {
        return current.Temperature > max ? current.Temperature : max;
      }, filtered[0].Temperature);
    }

    // 如果没有匹配的元素，则计算 temperatureList 中所有 Temperature 不为 0 的元素的最大值
    const nonZeroTemps = temperatureList.filter(
      (item) => item.Temperature !== 0
    );

    if (nonZeroTemps.length > 0) {
      return nonZeroTemps.reduce((max, current) => {
        return current.Temperature > max ? current.Temperature : max;
      }, nonZeroTemps[0].Temperature);
    }

    return 0;
  },
};

const sensorList = [
  "TC0D", //CPU Die 温度，代表 CPU 内部的温度
  "TC0H", //CPU Heatsink 温度，代表 CPU 散热器的温度
  "TC0P", //CPU Proximity 温度，代表 CPU 附近的温度
  "k10temp", //AMD K10（Phenom、Athlon、Sempron 等）系列处理器的温度监测
  "k10temp_tctl", //AMD K10 (Athlon II、Phenom II 等）系列处理器的温度监测
  "coretemp_package_id_0", //整个封装处理器温度
  "cpu_thermal_zone", //全志
  "cpu-thermal", //树莓派(博通)
  "soc_thermal", //新瑞芯微
  "cpu_thermal", //老瑞芯微
  "ACPI\\ThermalZone\\TZ0__0", //Windows
  "ACPI\\ThermalZone\\CPUZ_0", //Windows
  "ACPI\\ThermalZone\\TZ00_0", //Windows
  "ACPI\\ThermalZone\\TZ001_0", //Windows
  "ACPI\\ThermalZone\\THM0_0", //Windows
];
