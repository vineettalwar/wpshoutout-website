const BASE = import.meta.env.BASE_URL;

export function pub(path: string): string {
  return BASE + path.replace(/^\//, "");
}
