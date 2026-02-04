<template>
  <div class="min-h-screen bg-white text-slate-800 dark:bg-[var(--bg-dark)] dark:text-slate-200">
    <div class="mx-auto max-w-2xl px-6 py-16">
      <Nav />
      <main id="content">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>
