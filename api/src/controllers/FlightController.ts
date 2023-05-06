import tryCatch from "../utils/tryCatch";
import parseResponse from "../utils/helpers/parseFlightResponse";
import getAuthToken from "../utils/getters/getAuthToken";
import getData from "../utils/getters/getData";
import { ApiError } from "../Errors/ApiError";
import {
  FlightOfferResponse,
  IATAResponse,
} from "../types/res/AmadeusResponseTypes";

const URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
export const getIataCode = tryCatch(async (req, res) => {
  const { city } = req.query;

  // 1. Get auth token
  const data = await getAuthToken(URL);

  // 2. Get IATA code of the specified city
  const response = await getData<IATAResponse>(
    `https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${(
      city as string
    ).toUpperCase()}&max=1`,
    data.access_token
  );

  // 3. return the response
  if (response.data.length === 0)
    throw new ApiError(404, "No Flights available");
  res.json({ data: response.data[0] });
});

export const getPrice = tryCatch(async (req, res) => {
  const { src, dest, date, passengers } = req.query;

  // 1. Get the auth token for authentication
  const data = await getAuthToken(URL);

  // 2. Get the flight details
  const response = await getData<FlightOfferResponse>(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${src}&destinationLocationCode=${dest}&departureDate=${date}&adults=${passengers}&max=3&currencyCode=INR`,
    data.access_token
  );
  
  // 3. Parse the output to desired format
  if (response.data.length === 0)
    throw new ApiError(404, "No Flights available");
  const output = parseResponse(response);

  // 4. Send the response
  res.json(output);
});
