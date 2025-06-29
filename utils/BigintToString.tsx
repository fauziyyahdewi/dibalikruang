export function convertBigIntToString(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }

  if (obj instanceof Date) {
    return obj; // ⛔ Jangan ubah Date jadi object!
  }

  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertBigIntToString(value),
      ])
    );
  }

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  return obj;
}
