import axios from "axios";
import { FlightOfferResponse } from "../../types/res/AmadeusResponses";
import ExternalErrorHandler from "../../Errors/ExternalErrorHandler";

export default async function getFlightOffersData(url: string, token: string) {
  const { data: response } = await axios.get<FlightOfferResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response?.issue) throw new ExternalErrorHandler(response.issue);
  return response;
}
