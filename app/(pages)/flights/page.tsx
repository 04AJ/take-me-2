"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFlightQuery } from "@/hooks/useFlightQuery";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Flights() {
  const router = useRouter();
  const query = useFlightQuery();
  const [flights, setFlights] = useState<any[] | null>(null);

  useEffect(() => {
    axios
      .get<any[] | null>(
        `/api/flight?originLocationCode=${query.originLocationCode}&destinationLocationCode=${query.destinationLocationCode}&departureDate=${query.departureDate}&returnDate=${query.returnDate}`
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
      <div className="absolute top-5 left-5 text-white font-bold py-2 px-4 transition-transform transform hover:scale-110">
        <IoArrowBackCircleOutline
          style={{ fontSize: "3em" }}
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <h1 className="text-5xl p-3">
        Flights from {query.originLocationCode} to{" "}
        {query.destinationLocationCode}
      </h1>

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
