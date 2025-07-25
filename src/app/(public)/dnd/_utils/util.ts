export function moveObjectEntry<T extends { [key: string]: any }>(
  obj: T,
  from: number,
  to: number,
) {
  const entries = Object.entries(obj);
  const [moved] = entries.splice(from, 1); // ambil dari index `from`
  entries.splice(to, 0, moved); // sisipkan di index `to`
  return Object.fromEntries(entries);
}
