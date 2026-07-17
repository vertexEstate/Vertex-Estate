/** Pakistani mobile: 03XXXXXXXXX or +92 3XX XXXXXXX */
export function isValidPakistaniPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  if (/^03\d{9}$/.test(digits)) return true;
  if (/^923\d{9}$/.test(digits)) return true;
  return false;
}

export function normalizePakistaniPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (/^03\d{9}$/.test(digits)) return `+92${digits.slice(1)}`;
  if (/^923\d{9}$/.test(digits)) return `+${digits}`;
  return raw.trim();
}

export function isNonEmptyName(value: string): boolean {
  return value.trim().length >= 2;
}
