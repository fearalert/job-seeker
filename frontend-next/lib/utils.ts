import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string to a desired format.
 * 
 * @param dateStr - The ISO date string to format.
 * @param dateFormat - The desired format (default is "yyyy-MM-dd").
 * @returns Formatted date string or a fallback message for invalid dates.
 */
export const formatDate = (dateStr: string | null | undefined, dateFormat = "MMM dd, yyyy") => {
  try {
    if (!dateStr) {
      throw new Error("Date string is null or undefined");
    }

    const parsedDate = new Date(dateStr);

    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }

    return format(parsedDate, dateFormat);
  } catch (error) {
    console.error("Invalid date string:", dateStr, error);
    return "Invalid Date";
  }
};

export const checkJobValidity = (jobValidThrough: string) => {
  const currentDate = new Date();
  const validThroughDate = new Date(jobValidThrough);

  if (isNaN(validThroughDate.getTime())) {
    return { isExpired: true, daysLeft: null }; // Invalid date case
  }

  const isExpired = validThroughDate < currentDate;

  let daysLeft = null;
  if (!isExpired) {
    const timeDifference = validThroughDate.getTime() - currentDate.getTime();
    daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  }

  return { isExpired, daysLeft };
};
