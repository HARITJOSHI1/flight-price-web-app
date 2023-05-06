import React, { useState } from "react";
import FlightPrice from "../../components/FlightPrice";
import NavBar from "../../components/NavBar";

export interface FlightPriceSetters {
  setPrice: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] } | undefined>
  >;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function FlightDetailsPage() {
  const [price, setPrice] = useState<{
    [key: string]: string[];
  }>();

  const [err, setError] = useState<string>();
  return (
    <section>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <FlightPrice
          setters={{
            setPrice,
            setError,
          }}
        />

        {price && (
          <div
            style={{
              width: "40%",
              textAlign: "center",
              borderRadius: "3px",
              border: "1px solid grey",
              backgroundColor: "#f7f7f7",
              marginTop: "2rem",
              padding: "2rem 0",
              fontSize: "1.2rem",
            }}
          >
            {JSON.stringify(price)}
          </div>
        )}

        {err && (
          <div
            style={{
              width: "40%",
              textAlign: "center",
              borderRadius: "3px",
              backgroundColor: "#340d0d",
              marginTop: "2rem",
              padding: "2rem 0",
              fontSize: "1.2rem",
              color: "#de3737",
            }}
          >
            {err}
          </div>
        )}
      </div>
    </section>
  );
}
