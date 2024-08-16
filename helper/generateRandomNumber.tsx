import crypto from "crypto";

export function generateUniqueAccountNumber() {
  const length = 12;
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  const random = crypto.randomInt(min, max + 1);
  return random.toString().padStart(length, "0");
}
