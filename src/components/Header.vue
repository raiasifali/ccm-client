<template>
  <div class="bg-white p-4 border-b">
    <Menubar class="borderStyle">
      <template #end>
        <div class="relative">
          <img
            src="https://imgcdn.stablediffusionweb.com/2024/9/7/193e0b2c-a87a-4fbb-9a50-b4d92f6cf7c9.jpg"
            class="rounded-full cursor-pointer"
            style="width: 2rem"
            @click="toggleDropdown"
          />
          <div v-if="dropdownVisible" class="absolute right-0 mt-2 p-2 shadow-lg rounded-md border-0">
           
           
            <div class="py-1" role="none">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 truncate" role="menuitem" tabindex="-1" id="menu-item-6">{{organization.email}}</a>
                <a @click="logout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-6">logout</a>
            </div>
          </div>
        </div>
      </template>
      
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store';
import appRouter from '../router/index'

const dropdownVisible = ref(false);
const store = useAppStore();
const organization = store.organization

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const logout = () => {
    store.logout()
    appRouter.push('/login')
};
</script>



<style scoped>
/* Custom styles for dropdown */
.relative {
  position: relative;
}

.borderStyle{
    border: 0px !important;
    background: none !important;
}

.relative img {
  cursor: pointer;
}

.relative .absolute {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 100;
  /* Remove border from dropdown */
  border: none;
}

.relative ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.relative li {
  padding: 10px 15px;
}

.relative li:hover {
  background-color: #f3f4f6;
}
</style>
