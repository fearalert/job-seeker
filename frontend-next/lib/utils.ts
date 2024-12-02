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
