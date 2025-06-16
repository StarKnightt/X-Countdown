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
  
  export function getNextPayoutDate(currentDate = new Date()) {
    return PAYOUT_DATES.find((date) => date > currentDate) || PAYOUT_DATES[0];
  }

