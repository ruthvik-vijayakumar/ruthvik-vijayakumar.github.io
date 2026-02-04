<script setup lang="ts">
import RoleCompanyInfo from "~/components/experience/RoleCompanyInfo.vue";

const experience = await useAsyncData("experience", () =>
  queryContent("experience").sort({ start_date: -1 }).find(),
);

const duration = (
  start_date: string | number | Date,
  end_date: string | number | Date,
) => {
  const start = new Date(start_date);
  const end = new Date(end_date);
  return `${start.toLocaleString("default", { month: "short" })} ${start.getFullYear()} – ${end.toLocaleString("default", { month: "short" })} ${end.getFullYear()}`;
};
</script>

<template>
  <section id="experience" class="mb-20 scroll-mt-16" aria-label="Experience">
    <h2 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">Experience</h2>
    <ol class="space-y-8">
      <RoleCompanyInfo
        v-for="data in experience.data.value"
        :key="data.company + data.role"
        :duration="duration(data['start_date'], data['end_date'])"
        :company="data['company']"
        :link="data['link']"
        :related-links="data['external_links'] ?? []"
        :role="data['role']"
        :role-description="data['description']"
        :skills="data['skills'] ?? []"
      />
    </ol>
  </section>
</template>
