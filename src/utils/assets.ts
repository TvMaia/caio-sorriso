/**
 * Returns a URL-safe path prefixed with the Astro base URL.
 * Works in both dev (base = '/') and production (base = '/caio-sorriso').
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path}`;
}
