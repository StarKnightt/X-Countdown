function getSecondAndFourthSaturdays(year: number) {
  const dates: Date[] = [];

  // For each month (0-11)
  for (let month = 0; month < 12; month++) {
    let saturdays = 0;
    let currentDate = new Date(year, month, 1);

    // Find all Saturdays in the month
    while (currentDate.getMonth() === month) {
      if (currentDate.getDay() === 6) { // 6 is Saturday
        saturdays++;
        // If it's the 2nd or 4th Saturday, add it
        if (saturdays === 2 || saturdays === 4) {
          dates.push(new Date(currentDate));
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return dates;
}

// Get payout dates for current and next year to ensure we always have future dates
const currentYear = new Date().getFullYear();
export const PAYOUT_DATES = [
  ...getSecondAndFourthSaturdays(currentYear),
  ...getSecondAndFourthSaturdays(currentYear + 1)
];

export function getNextPayoutDate(): Date {
  // X (Twitter) typically pays out on specific dates
  // This is a mock implementation - adjust based on actual payout schedule
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // Assume payouts happen on the 15th of each month
  let nextPayout = new Date(currentYear, currentMonth, 15, 12, 0, 0) // 12 PM on 15th

  // If we've passed this month's payout, move to next month
  if (now > nextPayout) {
    nextPayout = new Date(currentYear, currentMonth + 1, 15, 12, 0, 0)
  }

  return nextPayout
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getTimeUntilPayout(targetDate: Date) {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

