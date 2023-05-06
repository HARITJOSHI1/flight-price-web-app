import React, { useState } from "react";
import "./styles.css";

interface FlightDetails {
  source: { val: string; err?: string };
  destination: { val: string; err?: string };
  date: { val: string; err?: string };
  passengers: { val: string; err?: string };
}

function FlightPrice(): JSX.Element {
  const [details, setDetails] = useState<FlightDetails>({
    source: { val: "" },
    destination: { val: "" },
    date: { val: "" },
    passengers: { val: "" },
  });

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
        setDetails({...details});
      }
    });

    if (isError) return;
  };

  return (
    <form
      className="flight-price-form"
      onSubmit={async (e) => await handleSubmit(e)}
    >
      <div className="form-group">
        <label className="form-label" htmlFor="source-input">
          Source:
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
          Destination:
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
        Search Flights
      </button>
    </form>
  );
}

export default FlightPrice;
