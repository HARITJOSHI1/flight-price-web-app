import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import "./styles.css";
import { getCityToIATA } from "../../utils/getCityToIata";
import { FlightPriceSetters } from "../../pages/FlightDetails";
import { FlightApiError } from "../../types/ErrorTypes";
import { isAmadeusError, isString } from "../../guards/guards";

interface FlightDetails {
  source: { val: string; err?: string };
  destination: { val: string; err?: string };
  date: { val: string; err?: string };
  passengers: { val: string; err?: string };
}

interface Props {
  setters: FlightPriceSetters;
}

function FlightPrice(props: Props): JSX.Element {
  const [details, setDetails] = useState<FlightDetails>({
    source: { val: "" },
    destination: { val: "" },
    date: { val: "" },
    passengers: { val: "" },
  });

  const [isLoading, setIsLoading] = useState(false);

  const findErr = (details: FlightDetails, id: keyof FlightDetails) =>
    details[id].err;

  const handleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    const id = e.target.id.split("-")[0] as keyof FlightDetails;
    setDetails({
      ...details,
      [id]: { val: value },
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    let isError = false;

    Object.keys(details).forEach((key) => {
      if (!details[key as keyof FlightDetails].val) {
        isError = true;
        details[key as keyof FlightDetails].err = "empty field not accepted";
        setDetails({ ...details });
      }
    });

    if (isError) return;

    try {
      setIsLoading(true);
      props.setters.setError("");
      props.setters.setPrice(undefined);

      const { source, destination, date, passengers } = details;

      const src = await getCityToIATA(source.val.toLowerCase());
      const dest = await getCityToIATA(destination.val.toLowerCase());

      const { data } = await axios.get<{ [key: string]: string[] }>(
        `https://flight-price-api.up.railway.app/api/v1/flights/prices`,
        {
          params: {
            src,
            dest,
            date: date.val,
            passengers: passengers.val,
          },
        }
      );

      setIsLoading(false);
      props.setters.setPrice(data);
    } catch (err) {
      const error = err as AxiosError<FlightApiError>;
      setIsLoading(false);

      const message = error.response?.data;
      if (isString(message?.error)) props.setters.setError(message?.error);
      else if (isAmadeusError(message?.error)) {
        props.setters.setError(
          message?.error.errors[0]?.detail || message?.error.errors[0].title
        );
      }
    }
  };

  return (
    <form
      className="flight-price-form"
      onSubmit={async (e) => await handleSubmit(e)}
    >
      <div className="form-group">
        <label className="form-label" htmlFor="source-input">
          Source airport:
        </label>
        <input
          id="source-input"
          className="form-input"
          type="text"
          value={details.source.val}
          onChange={handleDetailsChange}
        />

        {findErr(details, "source") && (
          <label
            style={{ display: "inline-block", fontSize: ".9rem", color: "red" }}
          >
            {findErr(details, "source")}
          </label>
        )}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="destination-input">
          Destinaton airport:
        </label>
        <input
          id="destination-input"
          className="form-input"
          type="text"
          value={details.destination.val}
          onChange={handleDetailsChange}
        />

        {findErr(details, "destination") && (
          <label
            style={{ display: "inline-block", fontSize: ".9rem", color: "red" }}
          >
            {findErr(details, "destination")}
          </label>
        )}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="date-input">
          Date:
        </label>
        <input
          id="date-input"
          className="form-input"
          type="date"
          value={details.date.val}
          onChange={handleDetailsChange}
        />

        {findErr(details, "date") && (
          <label
            style={{ display: "inline-block", fontSize: ".9rem", color: "red" }}
          >
            {findErr(details, "date")}
          </label>
        )}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="passengers-input">
          Passengers:
        </label>
        <input
          id="passengers-input"
          className="form-input"
          type="number"
          min="1"
          max="10"
          value={details.passengers.val}
          onChange={handleDetailsChange}
        />

        {findErr(details, "passengers") && (
          <label
            style={{ display: "inline-block", fontSize: ".9rem", color: "red" }}
          >
            {findErr(details, "passengers")}
          </label>
        )}
      </div>
      <button className="submit-button" type="submit">
        {isLoading ? (
          <span> Hang tight... </span>
        ) : (
          <span> Search Flights </span>
        )}
      </button>
    </form>
  );
}

export default FlightPrice;
