import axios from "axios";
import catchAsync from "../utils/catchAsync";
import parseResponse from "../utils/helpers/parseFlightResponse";
import getAuthToken from "../utils/getters/getAuthToken";
import getFlightOffersData from "../utils/getters/getFlightOffers";

export const getPrice = catchAsync(async (req, res) => {
  const { src, dest, date, passengers } = req.query;

  // 1. Get the auth token for authentication
  const data = await getAuthToken(
    "https://test.api.amadeus.com/v1/security/oauth2/token"
  );

  // 2. Get the flight details
  const response = await getFlightOffersData(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${src}&destinationLocationCode=${dest}&departureDate=${date}&adults=${passengers}&nonStop=true&max=3&currencyCode=INR`,
    data.access_token
  );

  // 3. Parse the output to desired format
  const output = parseResponse(response);

  // 4. Send the response
  res.json(output);
});
