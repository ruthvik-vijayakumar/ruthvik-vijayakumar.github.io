const SITE_TITLE = "Ruthvik Vijayakumar - Your Product Guy";

/**
 * Sets document `<title>` via `useSeoMeta` (same head layer as other SEO) so later `useSeoMeta`
 * calls without `title` do not wipe it. Reactive segments (e.g. blog post title) stay in sync.
 */
export function useSiteTitle(segment?: MaybeRefOrGetter<string | null | undefined>) {
  const title = computed(() => {
    const raw = segment != null ? toValue(segment) : undefined;
    const t = typeof raw === "string" ? raw.trim() : "";
    return t ? `${t} | ${SITE_TITLE}` : SITE_TITLE;
  });
  useSeoMeta({ title });
}

export { SITE_TITLE };
