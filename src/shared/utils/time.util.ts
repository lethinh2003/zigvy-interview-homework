/**
 * Converts a time string to milliseconds
 * @param timeString - Time string in format like "24h", "30m", "7d", etc.
 * @returns Time in milliseconds
 */
function parseTimeString(timeString: string): number {
  const match = timeString.match(/^(\d+)([smhdwy])$/);
  if (!match) {
    throw new Error(
      `Invalid time string format: ${timeString}. Expected format like "24h", "30m", "7d"`
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1000, // seconds
    m: 60 * 1000, // minutes
    h: 60 * 60 * 1000, // hours
    d: 24 * 60 * 60 * 1000, // days
    w: 7 * 24 * 60 * 60 * 1000, // weeks
    y: 365 * 24 * 60 * 60 * 1000, // years
  };

  return value * multipliers[unit];
}

export { parseTimeString };
