<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="../../assets/favico.png" alt="logo"> CCM
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register Your Organization
          </h1>

          <!-- Step 1 - Personal Info -->
          <div v-if="activeStep === 1">
            <form @submit.prevent="nextStep">
              <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*First Name</label>
                <InputText v-model="organization.first_name" id="first_name" type="text" placeholder="First Name" required class="input-element" />
              </div>

              <div>
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Last Name</label>
                <InputText v-model="organization.last_name" id="last_name" type="text" placeholder="Last Name" required class="input-element" />
              </div>

              <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Phone</label>
                <InputText v-model="organization.phone" id="phone" type="text" placeholder="Phone Number" required class="input-element" />
              </div>

              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Email</label>
                <InputText v-model="organization.email" id="email" type="email" placeholder="admin@example.com" required class="input-element" />
              </div>

              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Password</label>
                <InputText v-model="organization.password" id="password" type="password" placeholder="*******" required class="input-element" />
              </div>

              <div>
                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Confirm Password</label>
                <InputText v-model="organization.confirm_password" id="confirm_password" type="password" placeholder="*******" required class="input-element" />
              </div>

              <Button label="Next" type="submit" class="btn-primary mt-3" />
            </form>
          </div>

          <!-- Step 2 - Organization Info -->
          <div v-if="activeStep === 2">
            <form @submit.prevent="nextStep">
              <div>
                <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Organization Details</label>
              </div>

              <div>
                <label for="organization_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Name</label>
                <InputText v-model="organization.organization_name" id="organization_name" type="text" placeholder="Enter name" required class="input-element" />
              </div>

              <div>
                <label for="organization_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Address</label>
                <InputText v-model="organization.organization_address" id="organization_address" type="text" placeholder="Enter Address" required class="input-element" />
              </div>

              <div>
                <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Practice Details</label>
              </div>

              <div>
                <label for="practice_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Name</label>
                <InputText v-model="organization.practice_name" id="practice_name" type="text" placeholder="Enter name" required class="input-element" />
              </div>

              <div>
                <label for="practice_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Address</label>
                <InputText v-model="organization.practice_address" id="practice_address" type="text" placeholder="Enter Address" required class="input-element" />
              </div>

              <div class="flex justify-between mt-3">
                <Button label="Back" type="button" @click="previousStep" class="btn-secondary" />
                <Button label="Next" type="submit" class="btn-primary" />
              </div>
            </form>
          </div>

          <!-- Step 3 - OTP Verification -->
          <div v-if="activeStep === 3">
            <form @submit.prevent="onSubmit">
              <div>
                <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*OTP</label>
                <InputText v-model="organization.otp" id="otp" type="text" placeholder="Enter OTP" required class="input-element" />
              </div>

              <Button label="Verify OTP" type="submit" class="btn-primary w-full mt-2" :class="{ loading: loading }" />

              <div class="flex justify-between mt-4">
                <Button label="Back" type="button" @click="previousStep" class="btn-secondary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '../../router';
import {tokenMixin} from '../../mixins/TokinMixin';
import { useAppStore } from '../../store/index';

const { generateToken, saveToLocalStorageToken } = tokenMixin.methods;
const appStore = useAppStore();
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

const activeStep = ref(1);
const loading = ref(false);

const nextStep = () => {
  activeStep.value++;
};

const previousStep = () => {
  activeStep.value--;
};

const onSubmit = async () => {
  loading.value = true;
  const token = generateToken();
  saveToLocalStorageToken(token);

  appStore.organization = { ...organization.value };

  localStorage.setItem('organization', JSON.stringify(organization.value));

  setTimeout(() => {
    router.push('/home');
    loading.value = false;
  }, 1000);
};

onMounted(() => {
  const savedData = localStorage.getItem('organization');
  if (savedData) {
    organization.value = JSON.parse(savedData);
  }
});
</script>

<style scoped>
.input-element {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  background-color: #1d4ed8;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

.loading {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
