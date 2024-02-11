// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import amadeus from "../../../utils/getAmadeusInstance";

export default function Flights() {
  const [flights, setFlights] = useState<any[] | null>(null);

  var Amadeus = require("amadeus");

  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: "SYD",
      destinationLocationCode: "BKK",
      departureDate: "2024-06-01",
      adults: "2",
    })
    .then(function (response: any) {
      console.log(response.result);
    })
    .catch(function (responseError: any) {
      console.log(responseError.code);
    });

  return (
    <div>
      <h1>Flights from SYD to BKK</h1>
      <p>Result is in terminal - console.log</p>
    </div>
  );
}
