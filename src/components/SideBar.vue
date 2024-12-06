<template>
  <div>
    <!-- Mobile Sidebar Toggle Button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden p-2 text-gray-900 dark:text-white"
      aria-label="Toggle Sidebar"
    >
      <i class="pi pi-bars text-3xl"></i> <!-- Increased icon size -->
    </button>

    <!-- Sidebar -->
    <div
      :class="[
        'flex flex-col transition-all duration-75 min-h-screen',
        isSidebarOpen ? 'lg:flex' : 'lg:hidden',
        'z-20',
        'bg-[#1F2937] text-white dark:bg-gray-800'
      ]"
      aria-label="Sidebar"
    >
      <div class="overflow-y-auto py-5 px-3 h-full">
        <!-- Navigation Links -->
        <ul class="space-y-2">
          <!-- CCM Logo and Text -->
          <li class="pb-10">
            <a href="#/home" class="flex ml-2 md:mr-24">
              <img class="mr-3 h-12 bg-white rounded p-1 dark:bg-gray-400" alt="CCM" src="../assets/favico.png" /> <!-- Increased logo size -->
              <span class="self-center text-3xl font-semibold sm:text-4xl whitespace-nowrap dark:text-white">CCM</span>
            </a>
          </li>

          <!-- Users Link -->
          <li>
            <a
              href="#/users"
              class="flex items-center p-2 mr-3 font-medium rounded-lg dark:text-white group"
            >
              <i class="pi pi-users text-lg text-white-500 dark:text-gray-400 group-hover dark:group-hover:text-white" style="font-size: 1.5rem;"></i> <!-- Increased icon size -->
              <span class="ml-3 text-lg">Users</span>
            </a>
          </li>
          <!-- Patients Link -->
          
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const isSidebarOpen = ref(true); // Reactive property to track sidebar visibility on mobile

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value; // Toggle the sidebar
    };

    return {
      isSidebarOpen,
      toggleSidebar,
    };
  },
};
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
