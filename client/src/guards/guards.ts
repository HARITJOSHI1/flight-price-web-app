import { AmadeusError } from "../types/ErrorTypes";

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isAmadeusError(response: unknown): response is AmadeusError {
  if (
    response &&
    typeof response === "object" &&
    "errors" in response &&
    Array.isArray(response.errors) &&
    response.errors.length > 0 &&
    typeof response.errors[0] === "object" &&
    Object.keys(response.errors[0]).length > 3
  )
    return true;
  return false;
}
