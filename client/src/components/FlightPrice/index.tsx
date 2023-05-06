import React, { useState } from 'react';
import './styles.css';

function FlightPrice(): JSX.Element {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState<number>(1);

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSource(event.target.value);
  };

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDestination(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(event.target.value);
  };

  const handlePassengersChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassengers(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const response = await fetch(`https://example.com/flights?source=${source}&destination=${destination}&date=${date}&passengers=${passengers}`);
    const data = await response.json();
    console.log(data); // do something with the response data
  };

  return (
    <form className="flight-price-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="source-input">
          Source:
        </label>
        <input
          id="source-input"
          className="form-input"
          type="text"
          value={source}
          onChange={handleSourceChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="destination-input">
          Destination:
        </label>
        <input
          id="destination-input"
          className="form-input"
          type="text"
          value={destination}
          onChange={handleDestinationChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="date-input">
          Date:
        </label>
        <input
          id="date-input"
          className="form-input"
          type="date"
          value={date}
          onChange={handleDateChange}
        />
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
          value={passengers}
          onChange={handlePassengersChange}
        />
      </div>
      <button className="submit-button" type="submit">
        Search Flights
      </button>
    </form>
  );
}

export default FlightPrice;
