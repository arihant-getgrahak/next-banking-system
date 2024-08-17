import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export default function getUserInfo() {
  try {
    const authCookie = Cookies.get("authCookie");

    if (!authCookie) {
      return {
        error: "No auth cookie found",
      };
    }

    const secretKey =
      process.env.JWT_SECRET! ||
      "MIIBOgIBAAJBAIkOAiH9QSDo4Zu7sd7NvDFVAyT0NUhdQepKA5r3/zZ0vHdGvEXhqx5ZJ5v6karghyBVQC25UncmnR45d9tI4A8CAwEAAQJAf8abnmyqR7BhgabcgmFJskHQXCcLHclePTAH76OJYmauUTL0jI3N6JjvMZpoPEJA0hUwH6j0a2f5YFwH+VIQIhAMA9euBYLcHxmkjUbw+V5PlqMdsEgpxzjs3SVrvJz2dAioLmuGKAhj93sJXYmBjE93gZaNGLh26R/In0iFOpsIHjR6zyQKp29+Dg553Pc5qPgMgxr4obH8eqLm8HYpyNAiEAnH4NWtiLT/9r7Q4Ab8Wx4R9adzEh9qpkuvXWEyUgDUCIEjXxQ+pRBBT6oOG32PaK6kAamCAa479PmW0egEvPjSR";

    const decoded = jwt.verify(authCookie.toString(), secretKey);
    if (!decoded) {
      return {
        error: "Failed to decode token",
      };
    }
    return decoded;
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    } else {
      return {
        error: "An unknown error occurred",
      };
    }
  }
}
