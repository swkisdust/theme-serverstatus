export interface StreamServer {
  id: number;
  name: string;
  public_note?: string;
  display_index?: number;
  host?: Host;
  state?: HostState;
  country_code?: string;
  last_active: string;
}

export interface StreamServerData {
  now: string;
  online: number;
  servers: StreamServer[];
}

export interface Host {
  arch: string;
  boot_time: number;
  cpu: string[];
  disk_total: number;
  gpu: string[];
  mem_total: number;
  platform: string;
  platform_version: string;
  swap_total: number;
  version: string;
  virtualization: string;
}

export interface HostState {
  cpu: number;
  disk_used: number;
  gpu: number[];
  load_1?: number;
  load_15?: number;
  load_5?: number;
  mem_used: number;
  net_in_speed: number;
  net_in_transfer: number;
  net_out_speed: number;
  net_out_transfer: number;
  process_count: number;
  swap_used: number;
  tcp_conn_count: number;
  temperatures: SensorTemperature[];
  udp_conn_count: number;
  uptime: number;
}

export interface SensorTemperature {
  Name: string;
  Temperature: number;
}
