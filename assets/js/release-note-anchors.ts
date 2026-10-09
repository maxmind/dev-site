/**
 * Moves a reader who followed an old link to the right note:
 *
 * - A year-page anchor goes to its note, through anchors.json.
 * - A year link with no known anchor goes to the newest note of that year,
 *   through the year map on the listing.
 * - A saved listing link whose note moved to a later page goes to the note's
 *   own page.
 *
 * The server never sees the fragment, so a year-page redirect lands on the
 * listing with ?year= and the browser keeps the fragment.
 */

export interface AnchorEntry {
  anchor: string;
  year: string;
  date: string;
  url: string;
}

/** Year to the listing URL of that year's newest note. */
export type YearMap = Record<string, string>;

/** A note heading id is its filename, which no legacy anchor matches. */
const NOTE_ID = /^\d{4}-\d{2}-\d{2}-[\w-]+$/;

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

/** An old link, as the listing page received it. */
export interface OldLink {
  anchor: string;
  year: string | null;
  /** The anchor names an element on this page that the link can mean. */
  onPage: boolean;
}

/**
 * A known anchor goes to its note. An anchor on this page stays. Otherwise a
 * year link goes to the newest note of that year.
 */
export function resolveTarget(
  entries: AnchorEntry[],
  years: YearMap,
  link: OldLink
): string | null {
  const note = resolveAnchor(entries, link.anchor, link.year);
  if (note !== null) return note;
  if (link.onPage || link.year === null) return null;
  return Object.hasOwn(years, link.year) ? years[link.year] : null;
}

function decodeHash(hash: string): string {
  const raw = hash.replace(/^#/, '');
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/**
 * An old year page held only that year's notes, so a heading in a note from
 * another year is a different section.
 */
function isOnPage(anchor: string, year: string | null): boolean {
  const element = anchor === '' ? null : document.getElementById(anchor);
  if (element === null) return false;
  if (year === null) return true;
  const title = element
    .closest('.release-note')
    ?.querySelector('.release-note__title');
  return title == null || title.id.startsWith(`${year}-`);
}

function readYears(listing: HTMLElement): YearMap {
  let years: unknown;
  try {
    years = JSON.parse(listing.dataset.releaseNoteYears ?? '');
  } catch (error) {
    console.warn('release note year map is not JSON', error);
    return {};
  }
  if (typeof years === 'object' && years !== null) return years as YearMap;
  console.warn('release note year map is not an object');
  return {};
}

async function readAnchors(listing: string): Promise<AnchorEntry[] | null> {
  try {
    const response = await fetch(`${listing}anchors.json`);
    if (!response.ok) {
      console.warn(`release note anchor map: HTTP ${response.status}`);
      return null;
    }
    const entries: unknown = await response.json();
    if (Array.isArray(entries)) return entries as AnchorEntry[];
    console.warn('release note anchor map is not an array');
  } catch (error) {
    console.warn('release note anchor map did not load', error);
  }
  return null;
}

/**
 * A saved link to a listing page goes stale when newer notes push its note to a
 * later page. The note's own page does not move.
 */
async function movedNote(listing: string, id: string): Promise<string | null> {
  const url = `${listing}${id.toLowerCase()}/`;
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok ? url : null;
  } catch {
    return null;
  }
}

async function findTarget(
  listingElement: HTMLElement,
  anchor: string,
  year: string | null
): Promise<string | null> {
  const listing = window.location.pathname.replace(/(?:page\/\d+\/)?$/, '');
  const onPage = isOnPage(anchor, year);
  let entries: AnchorEntry[] = [];
  if (NOTE_ID.test(anchor)) {
    if (onPage) return null;
    const moved = await movedNote(listing, anchor);
    if (moved !== null) return moved;
  } else if (anchor !== '') {
    const loaded = await readAnchors(listing);
    // Stop with the fragment intact, so a reload can try again.
    if (loaded === null) return null;
    entries = loaded;
  }
  return resolveTarget(entries, readYears(listingElement), {
    anchor,
    year,
    onPage,
  });
}

async function redirect(listingElement: HTMLElement): Promise<void> {
  const anchor = decodeHash(window.location.hash);
  const year = new URLSearchParams(window.location.search).get('year');
  if (anchor === '' && year === null) return;

  const target = await findTarget(listingElement, anchor, year);
  if (target === null) return;
  const url = new URL(target, window.location.href);
  if (url.pathname !== window.location.pathname) {
    window.location.replace(url);
    return;
  }
  // Same page: drop ?year= and scroll, with no reload.
  history.replaceState(null, '', url);
  const id = decodeHash(url.hash);
  if (id !== '') document.getElementById(id)?.scrollIntoView();
}

if (typeof window !== 'undefined') {
  const listing = document.querySelector<HTMLElement>(
    '[data-release-note-listing]'
  );
  if (listing !== null) void redirect(listing);
}
