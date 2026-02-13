<script setup>
const props = defineProps({
  title: String,
  link: String,
  doc: Object,
  tools_tech: Array,
  attachments: Array,
  itemType: String,
});

const { gtag } = useGtag();
const expanded = ref(false);

function fileType(url) {
  if (!url) return "file";
  const u = url.toLowerCase();
  if (u.endsWith(".pdf")) return "pdf";
  if (u.endsWith(".pptx") || u.endsWith(".ppt")) return "presentation";
  if (u.endsWith(".docx") || u.endsWith(".doc")) return "document";
  if (u.endsWith(".xlsx") || u.endsWith(".xls")) return "spreadsheet";
  return "file";
}

function onReadMoreClick() {
  expanded.value = !expanded.value;
  gtag("event", expanded.value ? "portfolio_read_more" : "portfolio_read_less", {
    event_category: "portfolio",
    event_label: props.title,
    item_title: props.title,
    item_link: props.link ?? "",
    item_type: props.itemType ?? "project",
  });
}
</script>

<template>
  <li
    class="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
  >
    <div class="flex min-h-0 flex-1 flex-col">
      <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
        <a
          :href="link"
          target="_blank"
          rel="noreferrer noopener"
          class="hover:underline"
          :aria-label="`${title} (opens in new tab)`"
        >
          {{ title }}
        </a>
      </h3>
      <div class="relative mt-1">
        <div
          class="text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          :class="expanded ? '' : 'max-h-[7.5em] overflow-hidden'"
        >
          <ContentRenderer v-if="doc" :value="doc" />
        </div>
        <button
          type="button"
          class="mt-1 text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
          @click="onReadMoreClick"
        >
          {{ expanded ? "Read less" : "Read more" }}
        </button>
      </div>
      <p v-if="tools_tech?.length" class="mt-2 mb-3 text-sm text-slate-500 dark:text-slate-500">
        {{ tools_tech.join(", ") }}
      </p>
    </div>
    <div v-if="attachments?.length" class="mt-auto border-t border-slate-200 pt-3 dark:border-slate-700">
      <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Attachments</p>
      <ul class="flex flex-wrap gap-3">
        <li v-for="(att, i) in attachments" :key="i">
          <a
            :href="att.url"
            target="_blank"
            rel="noreferrer noopener"
            class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-700/50"
          >
            <!-- PDF icon -->
            <svg v-if="fileType(att.url) === 'pdf'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="h-3 w-3 shrink-0" fill="none" aria-hidden="true">
              <path fill="none" stroke="#D5D7DA" stroke-width="1.5" d="M7.75 4A3.25 3.25 0 0 1 11 .75h16c.121 0 .238.048.323.134l10.793 10.793a.46.46 0 0 1 .134.323v24A3.25 3.25 0 0 1 35 39.25H11A3.25 3.25 0 0 1 7.75 36z" />
              <path fill="none" stroke="#D5D7DA" stroke-width="1.5" d="M27 .5V8a4 4 0 0 0 4 4h7.5" />
              <rect width="26" height="16" x="1" y="18" fill="#D92D20" rx="2" />
              <path fill="#fff" d="M4.832 30v-7.273h2.87q.826 0 1.41.316.582.314.887.87.31.555.31 1.279t-.313 1.278q-.313.555-.906.863-.59.309-1.427.309h-1.83V26.41h1.581q.444 0 .732-.153.29-.156.433-.43.145-.276.145-.635 0-.363-.145-.632a.97.97 0 0 0-.433-.423q-.291-.153-.74-.153H6.37V30zm9.053 0h-2.578v-7.273h2.6q1.095 0 1.889.437.791.433 1.218 1.246.43.814.43 1.947 0 1.136-.43 1.953a2.95 2.95 0 0 1-1.226 1.253q-.795.437-1.903.437m-1.04-1.317h.976q.682 0 1.147-.242.47-.244.703-.756.238-.516.238-1.328 0-.807-.238-1.318a1.54 1.54 0 0 0-.7-.753q-.465-.24-1.146-.241h-.98zM18.582 30v-7.273h4.816v1.268H20.12v1.733h2.958v1.268H20.12V30z" />
            </svg>
            <!-- Presentation (PPT) -->
            <svg v-else-if="fileType(att.url) === 'presentation'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM10.5 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-3.75ZM10.5 9a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 10.5 9Z" />
            </svg>
            <!-- Word/Document -->
            <svg v-else-if="fileType(att.url) === 'document'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM12 10.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 12 10.5ZM12 9a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9.75A.75.75 0 0 0 12 9Z" />
            </svg>
            <!-- Spreadsheet -->
            <svg v-else-if="fileType(att.url) === 'spreadsheet'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 shrink-0 text-green-600" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM9 15a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 9 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
            </svg>
            <!-- Link (icon: link) -->
            <svg v-else-if="att.icon === 'link'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-slate-600 dark:text-slate-300" aria-hidden="true">
              <path d="M9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H9M15 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H15M7 12L17 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <!-- Generic file -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true">
              <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z" />
            </svg>
            {{ att.label }}
          </a>
        </li>
      </ul>
    </div>
  </li>
</template>
