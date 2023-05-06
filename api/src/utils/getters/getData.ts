import axios from "axios";
import ExternalErrorHandler from "../../Errors/ExternalError";
import { DetailError, SystemError } from "../../types/res/AmadeusErrorTypes";
import ExternalError from "../../Errors/ExternalError";

export const isOfTypeAmadeusDetailError = (
  response: unknown
): response is DetailError => {
  if (
    response &&
    typeof response === "object" &&
    "errors" in response &&
    Array.isArray(response.errors) &&
    response.errors.length > 0 &&
    typeof response.errors[0] === "object" &&
    Object.keys(response.errors[0]).length === 3 &&
    response.errors[0].status in response["errors"][0] &&
    response.errors[0].code in response["errors"][0] &&
    response.errors[0].title in response["errors"][0] &&
    response.errors[0].details in response["errors"][0]
  )
    return true;
  return false;
};

export const isOfTypeAmadeusSystemError = (
  response: unknown
): response is SystemError => {
  if (
    response &&
    typeof response === "object" &&
    "errors" in response &&
    Array.isArray(response.errors) &&
    response.errors.length > 0 &&
    typeof response.errors[0] === "object" &&
    Object.keys(response.errors[0]).length === 3 &&
    response.errors[0].status in response["errors"][0] &&
    response.errors[0].code in response["errors"][0] &&
    response.errors[0].title in response["errors"][0]
  )
    return true;
  return false;
};

export default async function getData<T>(url: string, token: string) {
  const { data: response } = await axios.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (isOfTypeAmadeusSystemError(response))
    throw new ExternalError(response.errors[0]);
  else if (isOfTypeAmadeusDetailError(response))
    throw new ExternalError(response);
    
  return response;
}
