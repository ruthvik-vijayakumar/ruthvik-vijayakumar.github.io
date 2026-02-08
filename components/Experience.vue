<script setup lang="ts">
import RoleCompanyInfo from "~/components/experience/RoleCompanyInfo.vue";

const { data: experienceRaw } = await useAsyncData("experience", () =>
  queryCollection("experience").all(),
);
type ExperienceItem = {
  start_date?: string;
  startDate?: string;
  end_date?: string;
  endDate?: string;
  company?: string;
  role?: string;
  link?: string;
  description?: unknown;
  /** Markdown body (page content below frontmatter); Nuxt Content v3 page collections put it here */
  body?: unknown;
  external_links?: unknown[];
  skills?: string[];
  meta?: Record<string, unknown>;
  path?: string;
  [key: string]: unknown;
};

/** Get a value from item, checking top-level and meta (Nuxt Content v3 may put frontmatter in meta) */
function getItemField<T>(item: ExperienceItem, key: string, altKey?: string): T | undefined {
  const val = item[key] ?? item[altKey ?? ""] ?? (item.meta as Record<string, unknown>)?.[key] ?? (item.meta as Record<string, unknown>)?.[altKey ?? ""];
  return val as T | undefined;
}

const experience = computed(() => {
  const items = (Array.isArray(experienceRaw.value) ? experienceRaw.value : []) as ExperienceItem[];
  return items.sort((a, b) => {
    const sa = getItemField<string>(a, "start_date", "startDate") ?? "";
    const sb = getItemField<string>(b, "start_date", "startDate") ?? "";
    const ta = new Date(sa).getTime();
    const tb = new Date(sb).getTime();
    return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
  });
});

function getDate(item: ExperienceItem, key: "start_date" | "end_date") {
  const alt = key === "start_date" ? "startDate" : "endDate";
  const val = getItemField<string>(item, key, alt);
  if (val == null || val === "") return null;
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? null : d;
}

const duration = (item: ExperienceItem) => {
  const start = getDate(item, "start_date");
  const end = getDate(item, "end_date");
  if (!start || !end) return "–";
  return `${start.toLocaleString("default", { month: "short" })} ${start.getFullYear()} – ${end.toLocaleString("default", { month: "short" })} ${end.getFullYear()}`;
};
</script>

<template>
  <section id="experience" class="mb-20 scroll-mt-16" aria-label="Experience">
    <h2 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">Experience</h2>
    <ol class="space-y-8">
      <RoleCompanyInfo
        v-for="data in experience"
        :key="(getItemField(data, 'company') ?? '') + (getItemField(data, 'role') ?? '') + (data.path ?? '')"
        :duration="duration(data)"
        :company="getItemField(data, 'company') ?? ''"
        :link="getItemField(data, 'link') ?? ''"
        :related-links="(getItemField(data, 'external_links') ?? data['external_links']) ?? []"
        :role="getItemField(data, 'role') ?? ''"
        :role-description="data"
        :skills="(getItemField(data, 'skills') ?? data['skills']) ?? []"
      />
    </ol>
  </section>
</template>
