/**
 * Returns a URL-safe path prefixed with the Astro base URL.
 * Works with base = '/' in both dev and production.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path}`;
}
