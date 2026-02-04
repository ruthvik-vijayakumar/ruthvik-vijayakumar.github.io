<script setup>
defineProps({
  title: String,
  link: String,
  description: Object,
  tools_tech: Array,
});
</script>

<template>
  <li>
    <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
      <a
        :href="link"
        target="_blank"
        rel="noreferrer noopener"
        class="hover:underline"
        :aria-label="`${title} (opens in new tab)`"
      >
        {{ title }}
      </a>
    </h3>
    <p class="mt-1 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
      <ContentRenderer :value="description" :excerpt="true">
        {{ description }}
      </ContentRenderer>
    </p>
    <p v-if="tools_tech?.length" class="mt-2 text-sm text-slate-500 dark:text-slate-500">
      {{ tools_tech.join(", ") }}
    </p>
  </li>
</template>
