
<template>
    <div class="pb-4">
        <h1 class="text-2xl font-bold">{{organization.practice_name}}</h1>
    </div>
  <Table/>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { useAppStore } from '../../store/index';
    import Table from '../../components/Table.vue';

    const store = useAppStore();
    const organization = ref(store.organization)
</script>
