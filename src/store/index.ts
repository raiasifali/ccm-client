import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAppStore = defineStore("app", () => {
  // State
  const isAuthenticated = ref(false);
  const _showConfirmModal = ref(false);
  const confirmModalPayload = ref(null as any);

  const theme = ref<"light" | "dark">("light");

  const organization = ref({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    organization_name: '',
    organization_address: '',
    practice_address: '',
    practice_name: '',
    otp: ''
  });
  

  // Getters
  const isDarkMode = computed(() => theme.value === "dark");

  // Full name is computed from first_name and last_name
  const fullName = computed(() => `${organization.value.first_name} ${organization.value.last_name}`);


  // Actions
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  const login = (orgData: typeof organization.value): typeof organization.value | null => {
    localStorage.setItem("organization", JSON.stringify(orgData));
    isAuthenticated.value = true;
    return getOrganization();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    isAuthenticated.value = false;
  };

  // Fetch user data from localStorage
  const fetchUser = () => {
    const userData = getOrganization();
    if (userData) {
      organization.value = userData;
    }
  };

  function getOrganization() {
    let storage = localStorage.getItem("organization");
    if (storage) {
      storage = storage.replaceAll('"', "");
      return JSON.parse(atob(storage));
    } else {
      return null;
    }
  }

  return {
    isAuthenticated,
    organization,
    theme,
    isDarkMode,
    confirmModalPayload,
    _showConfirmModal,
    toggleTheme,
    login,
    logout,
    fullName,
    fetchUser,
  };
});
