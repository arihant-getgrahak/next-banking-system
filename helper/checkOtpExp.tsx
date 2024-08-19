// utils/dateUtils.js

import { isBefore } from "date-fns";

export function isDateExpired(expiryDate: Date): Boolean {
  const currentDate = new Date();
  const targetDate = new Date(expiryDate);

  return isBefore(targetDate, currentDate);
}
