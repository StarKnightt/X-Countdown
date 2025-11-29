export function getPayoutDates(year: number): Date[] {
  const dates: Date[] = [];
  let current = new Date(Date.UTC(year, 0, 3)); // Start: Jan 3 of the year

  // Keep adding every 14 days (bi-weekly)
  while (current.getUTCFullYear() === year) {
    // Make sure it's a Friday (all real payouts are on Fridays)
    const day = current.getUTCDay(); // 0=Sun, 5=Fri, 6=Sat
    if (day === 6) {
      current.setUTCDate(current.getUTCDate() - 1); // Sat → Fri
    } else if (day === 0) {
      current.setUTCDate(current.getUTCDate() - 2); // Sun → Fri
    }

    // Only add if still in the same year
    if (current.getUTCFullYear() === year) {
      dates.push(new Date(current)); // clone
    }

    // Next payout: exactly 14 days later
    current = new Date(current.getTime() + 14 * 24 * 60 * 60 * 1000);
  }

  return dates;
}

// Get all future payout dates (current year + next year)
const currentYear = new Date().getUTCFullYear();
const PAYOUT_DATES = [
  ...getPayoutDates(currentYear),
  ...getPayoutDates(currentYear + 1),
].sort((a, b) => a.getTime() - b.getTime());

// Find the next upcoming payout
export function getNextPayoutDate(fromDate: Date = new Date()): Date | null {
  const now = fromDate.getTime();
  return PAYOUT_DATES.find((date) => date.getTime() > now) || null;
}

// Get next few payouts
export function getUpcomingPayoutDates(
  count = 3,
  fromDate = new Date(),
): Date[] {
  const now = fromDate.getTime();
  return PAYOUT_DATES.filter((date) => date.getTime() > now).slice(0, count);
}

console.log("Next payout:", getNextPayoutDate()?.toISOString().slice(0, 10));

console.log("Next 3 payouts:");
getUpcomingPayoutDates(3).forEach((d) =>
  console.log(d.toISOString().slice(0, 10)),
);
