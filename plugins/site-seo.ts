export default defineNuxtPlugin(() => {
  const route = useRoute();
  const config = useRuntimeConfig();

  const siteUrl = computed(() =>
    String(config.public.siteUrl ?? "").replace(/\/$/, ""),
  );
  const toAbsolute = (path: string) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${siteUrl.value}${p}`;
  };

  const canonicalUrl = computed(() => `${siteUrl.value}${route.path}`);

  const defaultImage = computed(() =>
    toAbsolute(String(config.public.defaultOgImage || "/profile.png")),
  );

  const description = String(config.public.siteDescription ?? "");
  const siteName = String(config.public.siteName ?? "");
  const twitter = config.public.twitterSite
    ? `@${String(config.public.twitterSite).replace(/^@/, "")}`
    : undefined;

  useSeoMeta({
    description,
    ogType: "website",
    ogSiteName: siteName,
    ogLocale: "en_US",
    ogUrl: canonicalUrl,
    ogImage: defaultImage,
    ogImageAlt: siteName,
    twitterCard: "summary_large_image",
    twitterSite: twitter,
    twitterCreator: twitter,
  });

  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
  });
});
