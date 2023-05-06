import axios from "axios";
import { IATAResponseType } from "../types/IATAResponseType";

export const getCityToIATA = async (city: string) => {
  try {
    const { data: response } = await axios.get<IATAResponseType>(
      "https://flight-price-api.up.railway.app/api/v1/flights/iataCode",
      {
        params: { city },
      }
    );
    return response.data.iataCode;
  } catch (err) {
    console.log(err);
  }
};
