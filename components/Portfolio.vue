<script setup lang="ts">
import ProjectItem from "~/components/project/ProjectItem.vue";

/** Portfolio item from content collection (frontmatter + path) */
interface PortfolioItem {
  path?: string;
  _path?: string;
  title?: string;
  link?: string;
  date?: string | Date;
  tools_tech?: string[];
  attachments?: Array<{ url: string; label?: string; icon?: string }>;
  type?: string;
  visible?: boolean;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

/** Get field from item (top-level or meta; Nuxt Content v3 may put frontmatter in meta) */
function getProjectField<T>(item: PortfolioItem, key: string): T | undefined {
  const val = item[key] ?? (item.meta as Record<string, unknown>)?.[key];
  return val as T | undefined;
}

const portfolio = await useAsyncData("portfolio", () =>
  queryCollection("portfolio").all().then((r) => (r as unknown) as PortfolioItem[]),
);

const activeFilter = ref<"all" | "project" | "case_study">("all");

const filteredPortfolio = computed(() => {
  const raw = (portfolio.data.value ?? []) as PortfolioItem[];
  const items = raw
    .filter((item) => getProjectField<boolean>(item, "visible") !== false)
    .sort((a, b) => {
      const da = getProjectField<string | Date>(a, "date");
      const db = getProjectField<string | Date>(b, "date");
      const ta = da ? new Date(da).getTime() : 0;
      const tb = db ? new Date(db).getTime() : 0;
      return tb - ta;
    });
  if (activeFilter.value === "all") return items;
  return items.filter((item) => (getProjectField<string>(item, "type") ?? "project") === activeFilter.value);
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
        :key="project.path ?? project._path ?? index"
        :title="getProjectField(project, 'title') ?? ''"
        :link="getProjectField(project, 'link') ?? ''"
        :date="getProjectField<string | Date>(project, 'date')"
        :doc="project"
        :tools_tech="(getProjectField(project, 'tools_tech') ?? project.tools_tech) ?? []"
        :attachments="(getProjectField(project, 'attachments') ?? project.attachments) ?? []"
        :item-type="getProjectField(project, 'type') ?? 'project'"
      />
    </ul>
  </section>
</template>
