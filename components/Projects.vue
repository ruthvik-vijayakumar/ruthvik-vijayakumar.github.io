<script setup lang="ts">
import ProjectItem from "~/components/project/ProjectItem.vue";

const projects = await useAsyncData("projects", () =>
  queryContent("projects").sort({ start_date: -1 }).find(),
);
</script>

<template>
  <section id="projects" class="mb-20 scroll-mt-16" aria-label="Projects">
    <h2 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">Projects</h2>
    <ul class="space-y-10">
      <ProjectItem
        v-for="(project, index) in projects.data.value"
        :key="index"
        :title="project['title']"
        :link="project['link']"
        :description="project['description']"
        :tools_tech="project['tools_tech']"
      />
    </ul>
  </section>
</template>
