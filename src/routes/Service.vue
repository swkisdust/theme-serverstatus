<template>
    <div class="flex mt-6 mx-6 items-center mb-2 justify-center">
        <ServiceTable :data="Object.values(data?.services || {})" class="p-[20px] border-[1px] rounded-[3px] w-full">
        </ServiceTable>
    </div>
    <div class="flex mt-6 mx-6 items-center mb-2 justify-center">
        <TransferTable :data="data?.cycle_transfer_stats || {}" class="p-[20px] border-[1px] rounded-[3px] w-full">
        </TransferTable>
    </div>
</template>

<script setup lang="ts">
import ServiceTable from '@/components/ServiceTable.vue';
import TransferTable from '@/components/TransferTable.vue';
import useSWRV from "swrv";
import { swrFetcher } from '@/lib/fetch';
import type {
    ModelServiceResponse,
} from '@/components/types';

const { data } = useSWRV<ModelServiceResponse>(
    "/api/v1/service",
    swrFetcher,
);

</script>
