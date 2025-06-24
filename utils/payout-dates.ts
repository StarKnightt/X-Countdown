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
  
  // Get payout dates for current year and 3 years into the future
  const currentYear = new Date().getFullYear();
  export const PAYOUT_DATES = [
    ...getSecondAndFourthSaturdays(currentYear),
    ...getSecondAndFourthSaturdays(currentYear + 1),
    ...getSecondAndFourthSaturdays(currentYear + 2),
    ...getSecondAndFourthSaturdays(currentYear + 3)
  ].sort((a, b) => a.getTime() - b.getTime());
  
  export function getNextPayoutDate(currentDate = new Date()) {
    return PAYOUT_DATES.find((date) => date > currentDate) || PAYOUT_DATES[0];
  }
  
  // Helper function to get all payout dates for a specific year
  export function getPayoutDatesForYear(year: number) {
    return PAYOUT_DATES.filter(date => date.getFullYear() === year);
  }

