<script setup lang="ts">
import ProjectItem from "~/components/project/ProjectItem.vue";

const portfolio = await useAsyncData("portfolio", () =>
  queryContent("portfolio").sort({ date: -1 }).find(),
);

const activeFilter = ref<"all" | "project" | "case_study">("all");

const filteredPortfolio = computed(() => {
  const items = (portfolio.data.value ?? []).filter(
    (item: { visible?: boolean }) => item.visible !== false,
  );
  if (activeFilter.value === "all") return items;
  return items.filter((item: { type?: string }) => (item.type ?? "project") === activeFilter.value);
});

const filters = [
  { value: "all" as const, label: "All" },
  { value: "project" as const, label: "Projects" },
  { value: "case_study" as const, label: "Case Studies" },
];
</script>

<template>
  <section id="portfolio" class="mb-20 scroll-mt-16" aria-label="Portfolio">
    <h2 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">Portfolio</h2>
    <div class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-base" role="tablist" aria-label="Filter portfolio">
      <template v-for="(f, i) in filters" :key="f.value">
        <span v-if="i > 0" class="text-slate-400 dark:text-slate-500" aria-hidden="true">·</span>
        <button
          type="button"
          role="tab"
          :aria-selected="activeFilter === f.value"
          :class="[
            'py-1 transition-colors',
            activeFilter === f.value
              ? 'font-semibold text-purple-600 dark:text-purple-400 underline underline-offset-4 decoration-2'
              : 'text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400',
          ]"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
        </button>
      </template>
    </div>
    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
      <ProjectItem
        v-for="(project, index) in filteredPortfolio"
        :key="project._path ?? index"
        :title="project.title"
        :link="project.link"
        :doc="project"
        :tools_tech="project.tools_tech"
        :attachments="project.attachments"
        :item-type="project.type ?? 'project'"
      />
    </ul>
  </section>
</template>
