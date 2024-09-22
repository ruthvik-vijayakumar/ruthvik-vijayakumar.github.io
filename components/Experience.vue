<script setup lang="ts">
import RoleCompanyInfo from "~/components/experience/RoleCompanyInfo.vue";

const experience = await useAsyncData("experience", () =>
  queryContent("experience").sort({ start_date: -1 }).find(),
);

const duration = (
  start_date: string | number | Date,
  end_date: string | number | Date,
) => {
  let start = new Date(start_date);
  let end = new Date(end_date);
  return `${start.toLocaleString("default", { month: "short" })} ${start.getFullYear()} - ${end.toLocaleString("default", { month: "short" })} ${end.getFullYear()}`;
};
</script>

<template>
  <section
    id="experience"
    class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    aria-label="Work experience"
  >
    <div
      class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
    >
      <h2
        class="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only"
      >
        Experience
      </h2>
    </div>
    <div>
      <ol class="group/list">
        <RoleCompanyInfo
          v-for="data in experience.data.value"
          :duration="duration(data['start_date'], data['end_date'])"
          :company="data['company']"
          :link="data['link']"
          :related-links="data['external_links']"
          :role="data['role']"
          :role-description="data"
          :skills="data['skills']"
        />
      </ol>
      <div class="mt-12">
        <a
          class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold text-slate-200 group/link text-base"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View Full Résumé (opens in a new tab)"
          ><span
            >View Full
            <span class="inline-block"
              >Résumé<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clip-rule="evenodd"
                ></path></svg></span></span
        ></a>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
