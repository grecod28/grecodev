export function toSlug(name: string): string {
  return name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
}
