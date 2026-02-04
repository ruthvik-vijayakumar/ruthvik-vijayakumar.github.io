const STORAGE_KEY = "portfolio-dark-mode";

let isDarkRef: ReturnType<typeof ref<boolean>> | null = null;

function apply(isDarkMode: boolean) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const body = document.body;
  if (isDarkMode) {
    html.classList.add("dark");
    body.classList.add("dark");
  } else {
    html.classList.remove("dark");
    body.classList.remove("dark");
  }
}

export function useDarkMode() {
  if (!isDarkRef) {
    isDarkRef = ref(false);
  }
  const isDark = isDarkRef;

  function toggle() {
    isDark.value = !isDark.value;
    try {
      localStorage.setItem(STORAGE_KEY, isDark.value ? "1" : "0");
    } catch (_) {}
    apply(isDark.value);
  }

  onMounted(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      isDark.value = stored === "1"; // default light when not "1"
    } catch (_) {
      isDark.value = false;
    }
    apply(isDark.value);
  });

  return { isDark, toggle };
}
