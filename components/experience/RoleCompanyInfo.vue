<script setup>
defineProps({
  duration: String,
  link: String,
  role: String,
  company: String,
  roleDescription: Object,
  relatedLinks: Array,
  skills: { type: Array, default: () => [] },
});
</script>

<template>
  <li>
    <p class="text-sm text-slate-500 dark:text-slate-400">{{ duration }}</p>
    <h3 class="text-base font-semibold mt-1">
      <a
        :href="link"
        target="_blank"
        rel="noreferrer noopener"
        class="hover:underline"
        :aria-label="`${role} at ${company} (opens in new tab)`"
      >
        <span class="text-slate-900 dark:text-slate-100">{{ role }}</span>
        <span class="text-slate-400 dark:text-slate-500 mx-1" aria-hidden="true">·</span>
        <span class="text-purple-600 dark:text-purple-400">{{ company }}</span>
      </a>
    </h3>
    <div class="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
      <ContentRenderer :value="roleDescription" :excerpt="true">
        {{ roleDescription }}
      </ContentRenderer>
    </div>
    <ul v-if="skills?.length" class="mt-3 mb-3 flex flex-wrap gap-2" aria-label="Skills">
      <li
        v-for="(skill, i) in skills"
        :key="i"
        class="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-sm text-slate-600 dark:text-slate-300"
      >
        {{ skill }}
      </li>
    </ul>
  </li>
</template>
