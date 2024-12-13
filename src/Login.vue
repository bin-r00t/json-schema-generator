<script setup>
import { ref } from "vue";

const auth = ref({
  email: "",
  password: "",
});
</script>

<template>
  <div
    class="login-page h-screen form-container flex flex-col justify-center relative"
  >
    <div class="m-10 flex flex-col gap-6">
      <h1 class="text-center font-bold">Some LOGO here..</h1>
      <form action="#" class="flex flex-col gap-3">
        <div class="form-item mb-6">
          <label
            for="username"
            class="block text-sm/6 font-semibold text-gray-900"
            >Email address</label
          >
          <input
            type="email"
            class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-xs sm:text-sm focus:outline-hidden placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
            v-model="auth.email"
          />
        </div>
        <div class="form-item mb-6">
          <label
            for="password"
            class="block text-sm/6 font-semibold text-gray-900"
            >Password</label
          >
          <input
            type="password"
            class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-xs sm:text-sm focus:outline-hidden placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
            v-model="auth.password"
          />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
        >
          <span>Sign in to account</span>
        </button>
        <p class="mt-8 text-center">
          <a href="/password/reset" class="text-sm hover:underline"
            >Forgot password?</a
          >
        </p>
      </form>
    </div>
  </div>
  <footer class="fixed bottom-12 w-full">
    <div
      class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4"
    >
      <p class="text-center sm:text-left">Don't have an account?</p>
      <a
        href="/all-access"
        class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
      >
        <span>Get access <span aria-hidden="true">→</span></span>
      </a>
    </div>
  </footer>
</template>
