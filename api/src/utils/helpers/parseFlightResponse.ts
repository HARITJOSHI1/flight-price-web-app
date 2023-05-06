import {
  Carriers,
  FlightOfferResponse,
} from "../../types/res/AmadeusResponses";

interface Output {
  [key: string]: string[];
}

export default function parseResponse(res: FlightOfferResponse) {
  const { carriers } = res.dictionaries; // list of airlines with their codes 
  const airlinePriceRec: Record<string, string[]> = {};
  const output: Output = {};

  res.data.forEach((d) => {
    d.itineraries.forEach((it) => {
      it.segments.forEach((seg) => {
        // if the airline code doesn't exist then create an array associate with it
        if (
          !Object.prototype.hasOwnProperty.call(
            airlinePriceRec,
            seg.carrierCode
          )
        )
          airlinePriceRec[seg.carrierCode] = [];
      });

      //   Push the prices of different airlines
      Object.keys(carriers).forEach((val) =>
        airlinePriceRec[val]?.push(`₹${(+d.price.grandTotal).toFixed()}`)
      );
    });
  });

  //   Map the airline value as key from the carriers with the value of the prices array we got from the value of airLinePricesRec
  Object.keys(airlinePriceRec).forEach(
    (k) => (output[carriers[k].toLowerCase()] = airlinePriceRec[k])
  );

  return output;
}
