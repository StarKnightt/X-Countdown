export const PAYOUT_DATES_2025 = [
    new Date(2025, 0, 3), // Jan 3
    new Date(2025, 0, 17),
    new Date(2025, 0, 31),
    new Date(2025, 1, 14), // Feb 14
    new Date(2025, 1, 28),
    new Date(2025, 2, 14), // Mar 14
    new Date(2025, 2, 28),
    new Date(2025, 3, 11), // Apr 11
    new Date(2025, 3, 25),
    new Date(2025, 4, 9), // May 9
    new Date(2025, 4, 23),
    new Date(2025, 5, 6), // Jun 6
    new Date(2025, 5, 20),
    new Date(2025, 6, 4), // Jul 4
    new Date(2025, 6, 18),
    new Date(2025, 7, 1), // Aug 1
    new Date(2025, 7, 15),
    new Date(2025, 7, 29),
    new Date(2025, 8, 12), // Sep 12
    new Date(2025, 8, 26),
    new Date(2025, 9, 10), // Oct 10
    new Date(2025, 9, 24),
    new Date(2025, 9, 31),
    new Date(2025, 10, 7), // Nov 7
    new Date(2025, 10, 21),
    new Date(2025, 11, 5), // Dec 5
    new Date(2025, 11, 19),
  ]
  
  export function getNextPayoutDate(currentDate = new Date()) {
    return PAYOUT_DATES_2025.find((date) => date > currentDate) || PAYOUT_DATES_2025[0]
  }
  
  