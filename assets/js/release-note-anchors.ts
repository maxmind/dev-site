/**
 * Sends a reader who followed an old year-page link to the note it named.
 *
 * The server never sees the fragment, so the year-page redirect lands on the
 * listing page and the browser reattaches the fragment. This script resolves it
 * against anchors.json and moves the reader to the note's page.
 */

export interface AnchorEntry {
  anchor: string;
  year: string;
  date: string;
  url: string;
}

/**
 * The map is newest first, so the first match for an anchor used by more than
 * one note is the one a browser would have scrolled to when both ids sat on the
 * same year page.
 *
 * The year narrows the search when it is known. If no note in that year has
 * the anchor, the newest note with it is the best guess.
 */
export function resolveAnchor(
  entries: AnchorEntry[],
  anchor: string,
  year: string | null
): string | null {
  const matching = entries.filter((entry) => entry.anchor === anchor);
  if (matching.length === 0) return null;
  if (year !== null) {
    const inYear = matching.find((entry) => entry.year === year);
    if (inYear !== undefined) return inYear.url;
  }
  return matching[0].url;
}

async function redirectToNote(): Promise<void> {
  const anchor = window.location.hash.replace(/^#/, '');
  if (anchor === '') return;

  const listing = window.location.pathname.replace(/(?:page\/\d+\/)?$/, '');
  const year = new URLSearchParams(window.location.search).get('year');

  let entries: AnchorEntry[];
  try {
    const response = await fetch(`${listing}anchors.json`);
    if (!response.ok) return;
    entries = (await response.json()) as AnchorEntry[];
  } catch {
    // The listing page is a reasonable place to stop if the map cannot load.
    return;
  }

  const target = resolveAnchor(entries, anchor, year);
  // No match: the fragment may name a heading on this page.
  if (target !== null && target !== window.location.pathname) {
    window.location.replace(target);
  }
}

if (typeof window !== 'undefined') {
  const listing = document.querySelector('[data-release-note-listing]');
  if (listing !== null) void redirectToNote();
}
