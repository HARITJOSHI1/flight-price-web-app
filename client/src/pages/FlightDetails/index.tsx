import React from "react";
import FlightPrice from "../../components/FlightPrice";
import NavBar from "../../components/NavBar";

export default function FlightDetailsPage() {
  return (
    <section>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <FlightPrice />
      </div>
    </section>
  );
}
