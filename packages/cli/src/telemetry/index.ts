const TELEMETRY_DISABLED =
  process.env.SUPERSPEC_TELEMETRY === '0' ||
  process.env.DO_NOT_TRACK === '1' ||
  process.env.CI !== undefined;

export function trackCommand(_command: string): void {
  if (TELEMETRY_DISABLED) return;
  // placeholder
}
