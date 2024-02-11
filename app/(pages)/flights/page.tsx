"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Flights() {
  const [flights, setFlights] = useState<any[] | null>(null);
  const originLocationCode = "JFK";
  const destinationLocationCode = "LHR";
  const departureDate = "2024-06-01";
  const returnDate = "2024-07-01";
  useEffect(() => {
    axios
      .get<any[] | null>(
        `/api/flight?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}`
      )
      .then((response) => {
        if (response.data) {
          setFlights(response.data);
        }
      })
      .catch((error) => {
        console.log("error fetching data");
      });
  }, []);

  return (
    <div>
      <h1 className="text-5xl">Flights from JKF to LHR</h1>
      {flights ? (
        // <ul>
        //   {flights.map((flight, index) => (
        //     <li key={index}>{flights.source}</li>
        //   ))}
        // </ul>
        <pre className="text-xs">{JSON.stringify(flights, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
