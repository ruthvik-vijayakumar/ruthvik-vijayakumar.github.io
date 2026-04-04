const SITE_TITLE = "Ruthvik Vijayakumar - Your Product Guy";

/**
 * Sets document title: `segment | ${SITE_TITLE}`, or just the site title when segment is empty.
 * Uses the `useHead` callback form so reactive segments (e.g. blog post title) update the tab title.
 */
export function useSiteTitle(segment?: MaybeRefOrGetter<string | null | undefined>) {
  useHead(() => {
    const raw = segment != null ? toValue(segment) : undefined;
    const t = typeof raw === "string" ? raw.trim() : "";
    return {
      title: t ? `${t} | ${SITE_TITLE}` : SITE_TITLE,
    };
  });
}

export { SITE_TITLE };
