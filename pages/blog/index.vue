<script setup lang="ts">
type BlogPost = {
  path?: string;
  _path?: string;
  title?: string;
  date?: string;
  description?: string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
};

/** Get field from post (top-level or meta; Nuxt Content v3 may put frontmatter in meta) */
function getPostField(post: BlogPost, key: string): unknown {
  return post[key] ?? (post.meta as Record<string, unknown>)?.[key];
}

const route = useRoute();
// Route-specific key so client-side navigation to /blog uses this page's prerendered payload
const { data: postsList } = await useAsyncData(`blog-list-${route.path}`, () =>
  queryCollection("blog").all(),
);
const posts = computed(() => {
  const items = (Array.isArray(postsList.value) ? postsList.value : []) as unknown as BlogPost[];
  return items.sort((a, b) => {
    const da = (getPostField(a, "date") as string) ?? "";
    const db = (getPostField(b, "date") as string) ?? "";
    return new Date(db).getTime() - new Date(da).getTime();
  });
});

function formatPostDate(post: BlogPost) {
  const d = getPostField(post, "date");
  if (d == null || d === "") return null;
  const date = new Date(d as string);
  return Number.isNaN(date.getTime()) ? null : date;
}
</script>

<template>
  <section class="mb-20" aria-label="Blog">
    <h2 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">
      Blog
    </h2>
    <ul class="space-y-8">
      <li
        v-for="post in posts"
        :key="post.path ?? post._path"
        class="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-0 last:pb-0"
      >
        <NuxtLink
          :to="post.path ?? post._path"
          class="group block"
          :aria-label="`Read ${post.title}`"
        >
          <h3
            class="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400"
          >
            {{ getPostField(post, 'title') }}
          </h3>
          <p
            v-if="formatPostDate(post)"
            class="mt-1 text-sm text-slate-500 dark:text-slate-400"
          >
            {{ formatPostDate(post)?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }}
          </p>
          <p
            v-if="getPostField(post, 'description')"
            class="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {{ getPostField(post, 'description') }}
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
