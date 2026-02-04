<template>
  <div
    class="font-sans bg-white leading-relaxed text-slate-700 antialiased selection:bg-purple-100 selection:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:selection:bg-purple-900/60 dark:selection:text-slate-100 min-h-screen"
  >
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
