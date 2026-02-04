<script setup>
defineProps({
  title: String,
  link: String,
  doc: Object,
  tools_tech: Array,
  attachments: Array,
});

function fileType(url) {
  if (!url) return "file";
  const u = url.toLowerCase();
  if (u.endsWith(".pdf")) return "pdf";
  if (u.endsWith(".pptx") || u.endsWith(".ppt")) return "presentation";
  if (u.endsWith(".docx") || u.endsWith(".doc")) return "document";
  if (u.endsWith(".xlsx") || u.endsWith(".xls")) return "spreadsheet";
  return "file";
}

</script>

<template>
  <li>
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
    <div class="mt-1 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
      <ContentRenderer v-if="doc" :value="doc" />
    </div>
    <p v-if="tools_tech?.length" class="mt-2 text-sm text-slate-500 dark:text-slate-500">
      {{ tools_tech.join(", ") }}
    </p>
    <div v-if="attachments?.length" class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
      <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Attachments</p>
      <ul class="flex flex-wrap gap-3">
        <li v-for="(att, i) in attachments" :key="i">
          <a
            :href="att.url"
            target="_blank"
            rel="noreferrer noopener"
            class="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:underline inline-flex items-center gap-2"
          >
            <!-- PDF text badge -->
            <span v-if="fileType(att.url) === 'pdf'" class="inline-flex shrink-0 items-center rounded border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-1 py-px text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">PDF</span>
            <!-- Presentation (PPT) -->
            <svg v-else-if="fileType(att.url) === 'presentation'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 shrink-0 text-orange-500" aria-hidden="true">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM10.5 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-3.75ZM10.5 9a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 10.5 9Z" />
            </svg>
            <!-- Word/Document -->
            <svg v-else-if="fileType(att.url) === 'document'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 shrink-0 text-blue-500" aria-hidden="true">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM12 10.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 12 10.5ZM12 9a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9.75A.75.75 0 0 0 12 9Z" />
            </svg>
            <!-- Spreadsheet -->
            <svg v-else-if="fileType(att.url) === 'spreadsheet'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 shrink-0 text-green-600" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM9 15a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 9 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
            </svg>
            <!-- Generic file -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true">
              <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z" />
            </svg>
            {{ att.label }}
          </a>
        </li>
      </ul>
    </div>
  </li>
</template>
