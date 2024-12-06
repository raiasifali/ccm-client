<!-- App.vue -->
<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from './store/index';
const store = useAppStore();
onMounted(() => {
    const organization = localStorage.getItem('organization');
  
    if (organization) {
      const parsedOrganization = JSON.parse(organization);
      store.organization = { ...parsedOrganization };
    }
})
</script>
