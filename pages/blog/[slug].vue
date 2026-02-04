<script setup lang="ts">
useHead({
  title: "Blog",
});
</script>

<template>
  <ContentDoc>
    <template #default="{ doc }">
      <article v-if="doc" class="mb-20">
        <header class="mb-8">
          <NuxtLink
            to="/blog"
            class="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-4 inline-block"
          >
            ← Back to blog
          </NuxtLink>
          <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-2">
            {{ doc.title }}
          </h1>
          <p
            v-if="doc.date"
            class="mt-2 text-sm text-slate-500 dark:text-slate-400"
          >
            {{ new Date(doc.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }}
          </p>
        </header>
        <div
          class="blog-prose text-slate-700 dark:text-slate-300 leading-relaxed"
        >
          <ContentRenderer :value="doc" />
        </div>
      </article>
    </template>
    <template #not-found>
      <div class="mb-20">
        <NuxtLink
          to="/blog"
          class="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-4 inline-block"
        >
          ← Back to blog
        </NuxtLink>
        <p class="text-slate-600 dark:text-slate-400">Post not found.</p>
      </div>
    </template>
  </ContentDoc>
</template>
