<script setup lang="ts">
import Projects from "~/components/Projects.vue";
const mouseX = ref(0);
const mouseY = ref(0);

const updateMousePosition = (event: { pageX: number; pageY: number }) => {
  // Use pageX and pageY to account for scrolling
  mouseX.value = event.pageX;
  mouseY.value = event.pageY;
};

onMounted(() => {
  window.addEventListener("mousemove", updateMousePosition);
});
onUnmounted(() => {
  window.removeEventListener("mousemove", updateMousePosition);
});

const divStyle = computed(() => {
  return {
    background: `radial-gradient(
          600px at ${mouseX.value}px ${mouseY.value}px,
          rgba(29, 78, 216, 0.15),
          transparent 80%
        )`,
    minHeight: "100%", // Ensures the div covers the full screen
  };
});
</script>

<template>
  <div class="group/spotlight relative">
    <div
      class="pointer-events-none fixed inset-0 overflow-hidden z-30 transition duration-300 lg:absolute"
      :style="divStyle"
      @mousemove="updateMousePosition"
    />
    <div
      class="mx-auto min-h-screen max-w-screen-2xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-20 lg:py-0"
    >
      <div class="lg:flex lg:justify-between lg:gap-2">
        <Nav />
        <main id="content" class="pt-24 lg:w-7/12 lg:py-24">
          <About />
          <Experience />
          <Publications />
          <Projects />
          <Footer />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
