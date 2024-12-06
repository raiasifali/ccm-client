<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <!-- Logo Section -->
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="../../assets/favico.png" alt="logo" />
        CCM
      </a>

      <!-- Form Container -->
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8" v-if="!resetPasswordForm">
          <!-- Login Form Title -->
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>

          <!-- Login Form -->
          <form @submit.prevent="onSubmit" class="space-y-4 md:space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <InputText
                id="email"
                v-model="formData.email"
                placeholder="Email Address"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :class="{'border-red-500': emailError}"
              />
              <p v-if="emailError" class="text-sm text-red-500">Please enter a valid email.</p>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <InputText
                id="password"
                type="password"
                v-model="formData.password"
                placeholder="Password"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :class="{'border-red-500': passwordError}"
              />
              <p v-if="passwordError" class="text-sm text-red-500">Password is required.</p>
            </div>

            <!-- Remember Me and Forgot Password -->
            <div class="flex items-center justify-between">
              <!-- Remember Me Checkbox -->
              <div class="flex items-start">
                <Checkbox
                  inputId="remember"
                  v-model="formData.remember"
                  class="w-4 h-4 border rounded-md"
                />
                <label for="remember" class="ml-2 text-sm text-gray-500 dark:text-gray-300">Remember me</label>
              </div>

              <!-- Forgot Password Link -->
              <a @click="forgotPassword" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                Forgot password?
              </a>
            </div>

            <!-- Sign In Button -->
            <Button
              label="Sign in"
              type="submit"
              :class="['w-full p-2 mt-4 text-white bg-blue-500 rounded-md', 'hover:bg-blue-600 focus:ring-2 focus:ring-blue-500']"
              :loading="loading"
            />
            <button class="w-full p-2 mt-4 text-white bg-blue-500 rounded-md" @click="SignUp">Sign-up</button>
          </form>
        </div>

        <!-- Password Reset Form -->
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8" v-else>
          <!-- Reset Password Title -->
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change your password
          </h1>

          <!-- Reset Password Form -->
          <form @submit.prevent="submitResetPassword" class="space-y-4 md:space-y-6">
            <!-- New Password Field -->
            <div>
              <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <InputText
                id="new-password"
                type="password"
                v-model="changePassword.password"
                placeholder="New Password"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :class="{'border-red-500': newPasswordError}"
              />
              <p v-if="newPasswordError" class="text-sm text-red-500">Password is required.</p>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
              <InputText
                id="password_confirmation"
                type="password"
                v-model="changePassword.password_confirmation"
                placeholder="Confirm Password"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :class="{'border-red-500': confirmPasswordError}"
              />
              <p v-if="confirmPasswordError" class="text-sm text-red-500">Please confirm your password.</p>
            </div>

            <!-- Change Password Button -->
            <Button
              label="Change Password"
              type="submit"
              :class="['w-full p-2 mt-4 text-white bg-blue-500 rounded-md', 'hover:bg-blue-600 focus:ring-2 focus:ring-blue-500']"
              :loading="loading"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import appRouter from '../../router'

const formData = ref({
  email: '',
  password: '',
  remember: false
});

const changePassword = ref({
  password: '',
  password_confirmation: ''
});

const SignUp = () =>{
    appRouter.push('/sign-up')
}

const loading = ref(false);
const resetPasswordForm = ref(false);

const emailError = ref(false);
const passwordError = ref(false);
const newPasswordError = ref(false);
const confirmPasswordError = ref(false);

const onSubmit = () => {
  // Basic form validation
  emailError.value = !formData.value.email || !validateEmail(formData.value.email);
  passwordError.value = !formData.value.password;

  appRouter.push('home')

  if (!emailError.value && !passwordError.value) {
    loading.value = true;
    // Simulate form submission
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
};

const submitResetPassword = () => {
  // Basic form validation for password reset
  newPasswordError.value = !changePassword.value.password;
  confirmPasswordError.value = changePassword.value.password !== changePassword.value.password_confirmation;

  if (!newPasswordError.value && !confirmPasswordError.value) {
    loading.value = true;
    // Simulate password change
    setTimeout(() => {
      loading.value = false;
      alert('Password changed successfully!');
    }, 2000);
  }
};

const forgotPassword = () => {
  resetPasswordForm.value = true;
};

const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,4}$/;
  return regex.test(email);
};
</script>

<style scoped>
/* Custom styles for the login page */
</style>
