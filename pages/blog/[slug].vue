<script setup lang="ts">
import { SITE_TITLE } from "~/composables/useSiteTitle";

const route = useRoute();
const { data: doc } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection("blog").path(route.path).first(),
);

/** Get field from doc (top-level or meta; Nuxt Content v3 may put frontmatter in meta) */
function getDocField(key: string): unknown {
  const d = doc.value;
  if (!d) return undefined;
  return (d as unknown as Record<string, unknown>)[key] ?? (d as unknown as { meta?: Record<string, unknown> }).meta?.[key];
}

const docTitle = computed(() => (getDocField("title") as string) ?? "");
const docImage = computed(() => {
  const val = getDocField("image");
  return typeof val === "string" && val ? val : null;
});
const docDate = computed(() => {
  const val = getDocField("date");
  if (val == null || val === "") return null;
  const date = new Date(val as string);
  return Number.isNaN(date.getTime()) ? null : date;
});

const docDescription = computed(() => {
  const d = getDocField("description");
  return typeof d === "string" && d.trim() ? d.trim() : "";
});

const config = useRuntimeConfig();

/** Full `<title>`; must live in this `useSeoMeta` so reactive updates don’t wipe a separate `useSiteTitle` call */
const documentTitle = computed(() => {
  if (!doc.value) return `Blog | ${SITE_TITLE}`;
  return docTitle.value ? `${docTitle.value} | ${SITE_TITLE}` : `Blog | ${SITE_TITLE}`;
});

useSeoMeta({
  title: documentTitle,
  description: computed(() => {
    if (!doc.value) return String(config.public.siteDescription ?? "");
    return docDescription.value || String(config.public.siteDescription ?? "");
  }),
  ogType: "article",
  ogTitle: docTitle,
  ogDescription: computed(() => {
    if (!doc.value) return String(config.public.siteDescription ?? "");
    return docDescription.value || String(config.public.siteDescription ?? "");
  }),
  ogImage: computed(() => {
    const base = String(config.public.siteUrl ?? "").replace(/\/$/, "");
    const defaultPath = String(config.public.defaultOgImage || "/profile.png");
    const fallback = `${base}${defaultPath.startsWith("/") ? defaultPath : `/${defaultPath}`}`;
    if (!doc.value) return fallback;
    if (!docImage.value) return fallback;
    const path = docImage.value.startsWith("/") ? docImage.value : `/${docImage.value}`;
    return `${base}${path}`;
  }),
  ogImageAlt: docTitle,
  twitterTitle: docTitle,
  twitterDescription: computed(() => {
    if (!doc.value) return String(config.public.siteDescription ?? "");
    return docDescription.value || String(config.public.siteDescription ?? "");
  }),
  articlePublishedTime: computed(() =>
    docDate.value ? docDate.value.toISOString() : undefined,
  ),
});

// Table of contents: headings from rendered content
const contentRef = ref<HTMLElement | null>(null);
const tocItems = ref<{ id: string; text: string; level: number }[]>([]);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function updateToc() {
  if (!contentRef.value || typeof document === "undefined") return;
  const headings = contentRef.value.querySelectorAll("h2, h3, h4");
  const items: { id: string; text: string; level: number }[] = [];
  headings.forEach((el) => {
    const text = (el as HTMLElement).textContent?.trim() ?? "";
    let id = (el as HTMLElement).id;
    if (!id) {
      id = slugify(text) || `heading-${items.length}`;
      (el as HTMLElement).id = id;
    }
    const level = Number.parseInt((el as HTMLElement).tagName.charAt(1), 10);
    items.push({ id, text, level });
  });
  tocItems.value = items;
}

onMounted(() => {
  nextTick(updateToc);
});
watch(doc, () => {
  nextTick(updateToc);
});
</script>

<template>
  <div v-if="doc" class="mb-20 flex flex-col gap-8 lg:flex-row lg:gap-10">
    <article class="min-w-0 flex-1">
      <header class="mb-8">
        <NuxtLink
          to="/blog"
          class="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-4 inline-block"
        >
          ← Back to blog
        </NuxtLink>
        <img
          v-if="docImage"
          :src="docImage"
          :alt="docTitle"
          class="mb-6 w-full rounded-lg object-cover"
        >
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-2">
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
        ref="contentRef"
        class="blog-prose text-slate-700 dark:text-slate-300 leading-relaxed"
      >
        <ContentRenderer :value="doc" />
      </div>
    </article>
    <!-- Right rail: sticky TOC -->
    <aside
      v-if="tocItems.length"
      class="shrink-0 lg:w-48 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto"
      aria-label="On this page"
    >
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        On this page
      </p>
      <nav class="flex flex-col gap-1">
        <a
          v-for="item in tocItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:underline"
          :class="{
            'pl-0': item.level === 2,
            'pl-3': item.level === 3,
            'pl-5': item.level === 4,
          }"
        >
          {{ item.text }}
        </a>
      </nav>
    </aside>
  </div>
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
