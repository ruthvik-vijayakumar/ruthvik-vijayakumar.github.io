const STORAGE_KEY = "portfolio-dark-mode";

function applyDark(isDark: boolean) {
  const html = document.documentElement;
  const body = document.body;
  if (isDark) {
    html.classList.add("dark");
    body.classList.add("dark");
  } else {
    html.classList.remove("dark");
    body.classList.remove("dark");
  }
}

export default defineNuxtPlugin(() => {
  applyDark(false); // default to light so first paint is always light
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "1") applyDark(true);
  } catch (_) {}
});
