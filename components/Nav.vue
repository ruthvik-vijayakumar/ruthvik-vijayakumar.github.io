<script setup>
const { isDark, toggle } = useDarkMode();
const { gtag } = useGtag();

function onResumeClick() {
  gtag("event", "resume_click", {
    event_category: "nav",
    event_label: "Resume",
  });
}
</script>

<template>
  <header class="mb-16">
    <div class="flex flex-nowrap items-start justify-between gap-4">
      <div class="min-w-0">
        <img
          src="/profile.png"
          alt="Ruthvik Vijayakumar"
          class="mb-4 h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200/50 dark:ring-slate-600/50"
        />
        <h1 class="text-xl font-semibold tracking-tight text-slate-800 dark:text-slate-100 ">
          Hi, I'm <a href="/" class="hover:opacity-80">Ruthvik Vijayakumar</a>
        </h1>
        <p class="mt-1 text-base text-slate-600 dark:text-slate-400">
          Technical Product Manager & Full Stack Product Engineer
        </p>
      </div>
      <button
        type="button"
        aria-label="Toggle night mode"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
        @click="toggle"
      >
        <span v-if="isDark" class="sr-only">Switch to light mode</span>
        <span v-else class="sr-only">Switch to night mode</span>
        <!-- Sun (show in dark mode to switch to light) -->
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-5 w-5 shrink-0"
          aria-hidden="true"
        >
          <path
            d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
          />
        </svg>
        <!-- Moon (show in light mode to switch to dark) -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-5 w-5 shrink-0"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <nav class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-base font-bold">
        <NuxtLink
          to="/"
          class="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/portfolio"
          class="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Portfolio
        </NuxtLink>
        <NuxtLink
          to="/experience"
          class="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Experience
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Blog
        </NuxtLink>
        <a
          href="https://gwu.box.com/shared/static/rs84yv3bhrudy2bggn51g9i3rfg15eqb.pdf"
          target="_blank"
          rel="noreferrer noopener"
          class="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          @click="onResumeClick"
        >
          Resume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-3 w-3 shrink-0 text-purple-600 dark:text-purple-400"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
    </nav>
  </header>
</template>
