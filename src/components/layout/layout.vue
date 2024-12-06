<!-- Layout.vue -->
<script setup lang="ts">
import Header from '../Header.vue';
import SideBar from '../SideBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();  // This will allow us to react to route changes
</script>

<template>
  <div class="grid grid-rows-[auto,1fr] grid-cols-12 min-h-screen">
    <!-- Sidebar -->
    <aside class="col-span-2 lg:col-span-2 bg-gray-100">
      <SideBar />
    </aside>

    <!-- Main Content -->
    <main class="col-span-10 lg:col-span-10">
      <!-- Header -->
      <header class="col-span-12">
        <Header />
      </header>

      <!-- Dynamic Content -->
      <div class="col-span-12 m-10">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
