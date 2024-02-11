"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Flights() {
  const [flights, setFlights] = useState<any[] | null>(null);

  useEffect(() => {
    axios
      .get<any[] | null>(`/api/flight`)
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
      <h1 className="text-5xl">Flights from SYD to BKK</h1>
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
