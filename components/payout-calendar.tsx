"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar, X } from "lucide-react";
import { getUpcomingPayoutDates } from "@/utils/payout-dates";

function CalendarModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [payoutDates, setPayoutDates] = useState<Date[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPayoutDates(getUpcomingPayoutDates(8));
  }, []);

  if (!mounted || !isOpen) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const modalContent = (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        style={{ zIndex: 999999 }}
      />

      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-6xl max-h-[90vh] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
        style={{ zIndex: 1000000 }}
      >
        <div className="bg-background/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Upcoming Payouts</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Next {payoutDates.length} payout dates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Close calendar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar Grid - Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {payoutDates.map((date, index) => {
              const isNext = index === 0;
              const cardClasses = isNext
                ? "bg-primary/10 border-primary shadow-lg shadow-primary/20"
                : "bg-card border-border hover:border-primary/50 hover:shadow-md";
              const badgeClasses = isNext
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground";

              return (
                <div
                  key={date.toISOString()}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${cardClasses}`}
                >
                  {isNext && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 animate-pulse" />
                  )}

                  <div className="relative p-3 sm:p-4">
                    <div
                      className={`flex flex-col items-center justify-center w-full h-16 sm:h-20 rounded-lg mb-2 sm:mb-3 ${badgeClasses}`}
                    >
                      <span className="text-xs font-medium uppercase">
                        {date.toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold">
                        {date.getDate()}
                      </span>
                      <span className="text-xs font-medium">
                        {date.getFullYear()}
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm font-semibold mb-1">
                        {date.toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Payout #{index + 1}
                      </p>
                    </div>

                    {isNext && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                        Next
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              💡 Payouts occur every 2 weeks on Fridays. Dates may vary based on
              X&apos;s schedule.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}

export function PayoutCalendar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-lg bg-secondary px-2 sm:px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        aria-label="View payout calendar"
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline ml-2">Calendar</span>
      </button>

      <CalendarModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
