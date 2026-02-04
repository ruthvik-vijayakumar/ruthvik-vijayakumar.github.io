<script setup lang="ts">
const { data: postsList } = await useAsyncData("blog-list", () =>
  queryContent("/blog").sort({ date: -1 }).find(),
);
const posts = computed(() => (Array.isArray(postsList.value) ? postsList.value : []));
</script>

<template>
  <section class="mb-20" aria-label="Blog">
    <h2 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">
      Blog
    </h2>
    <ul class="space-y-8">
      <li
        v-for="post in posts"
        :key="post._path"
        class="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-0 last:pb-0"
      >
        <NuxtLink
          :to="post._path"
          class="group block"
          :aria-label="`Read ${post.title}`"
        >
          <h3
            class="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400"
          >
            {{ post.title }}
          </h3>
          <p
            v-if="post.date"
            class="mt-1 text-sm text-slate-500 dark:text-slate-400"
          >
            {{ new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }}
          </p>
          <p
            v-if="post.description"
            class="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {{ post.description }}
          </p>
        </NuxtLink>
      </li>
      <li
        v-if="!posts.length"
        class="text-slate-500 dark:text-slate-400 text-base"
      >
        No posts yet.
      </li>
    </ul>
  </section>
</template>
