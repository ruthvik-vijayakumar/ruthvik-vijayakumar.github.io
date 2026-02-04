<template>
  <div class="bg-flares min-h-screen bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200">
    <div class="relative z-10 mx-auto max-w-2xl px-6 py-16">
      <Nav />
      <main id="content">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>
