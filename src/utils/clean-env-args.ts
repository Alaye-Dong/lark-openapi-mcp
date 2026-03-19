const TRUTHY_VALUES = ['true', '1', 'yes', 'on'];

export function cleanEnvArgs(args: Record<string, string | undefined>) {
  const result = {} as Record<string, string>;
  for (const [key, value] of Object.entries(args)) {
    if (value) {
      result[key as keyof typeof args] = value;
    }
  }
  return result;
}

export function parseBooleanEnv(value: string | undefined): boolean {
  if (!value) return false;
  return TRUTHY_VALUES.includes(value.toLowerCase());
}

export function parseArrayEnv(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  const items = value
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}
