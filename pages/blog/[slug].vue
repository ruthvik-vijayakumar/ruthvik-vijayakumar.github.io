<script setup lang="ts">
const route = useRoute();
const { data: doc } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection("blog").path(route.path).first(),
);

/** Get field from doc (top-level or meta; Nuxt Content v3 may put frontmatter in meta) */
function getDocField(key: string): unknown {
  const d = doc.value;
  if (!d) return undefined;
  return (d as Record<string, unknown>)[key] ?? (d as { meta?: Record<string, unknown> }).meta?.[key];
}

const docTitle = computed(() => (getDocField("title") as string) ?? "");
const docDate = computed(() => {
  const val = getDocField("date");
  if (val == null || val === "") return null;
  const date = new Date(val as string);
  return Number.isNaN(date.getTime()) ? null : date;
});

useHead({
  title: docTitle.value ? `${docTitle.value} | Blog` : "Blog",
});
</script>

<template>
  <article v-if="doc" class="mb-20">
    <header class="mb-8">
      <NuxtLink
        to="/blog"
        class="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-4 inline-block"
      >
        ← Back to blog
      </NuxtLink>
      <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-2">
        {{ docTitle }}
      </h1>
      <p
        v-if="docDate"
        class="mt-2 text-sm text-slate-500 dark:text-slate-400"
      >
        {{ docDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }}
      </p>
    </header>
    <div
      class="blog-prose text-slate-700 dark:text-slate-300 leading-relaxed"
    >
      <ContentRenderer :value="doc" />
    </div>
  </article>
  <div v-else class="mb-20">
    <NuxtLink
      to="/blog"
      class="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-4 inline-block"
    >
      ← Back to blog
    </NuxtLink>
    <p class="text-slate-600 dark:text-slate-400">Post not found.</p>
  </div>
</template>
