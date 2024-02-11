"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFlightQuery } from "@/hooks/useFlightQuery";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Airlines, FlightOffer } from "@/types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function Flights() {
  const supabase = createClient();

  const dayjs = require("dayjs");
  const router = useRouter();
  const query = useFlightQuery();
  const [flights, setFlights] = useState<FlightOffer[]>();
  const [airlines, setAirlines] = useState<Airlines[]>();

  useEffect(() => {
    const fetchAirlines = async (flights: FlightOffer[]) => {
      try {
        const airlineCodes = flights.map(
          (flight: FlightOffer) => flight.itineraries[0].segments[0].carrierCode
        );

        const airlinePromises = airlineCodes.map(async (code) => {
          const { data, error } = await supabase
            .from("AIRLINE")
            .select()
            .eq("airline_code", code);
          if (data) {
            return data[0]; // Assuming you want to use the first result, adjust if needed
          } else {
            console.error("Error fetching airline data:", error);
            return null;
          }
        });

        const airlineData = await Promise.all(airlinePromises);
        setAirlines(airlineData);
      } catch (error) {
        console.error("Error fetching airline data:", error);
      }
    };
    axios
      .get<FlightOffer[] | null>(
        `/api/flight?originLocationCode=${query.originLocationCode}&destinationLocationCode=${query.destinationLocationCode}&departureDate=${query.departureDate}&returnDate=${query.returnDate}`
      )
      .then((response) => {
        if (response.data) {
          setFlights(response.data);
          fetchAirlines(response.data);
        }
      })
      .catch((error) => {
        console.log("error fetching data");
      });
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-950 to-black text-white w-full h-full">
      <div className="absolute top-5 left-5 text-white font-bold py-2 px-4 transition-transform transform hover:scale-110">
        <IoArrowBackCircleOutline
          style={{ fontSize: "3em" }}
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <h1 className="text-5xl p-3 text-center">
        Round trips from {query.originLocationCode} to{" "}
        {query.destinationLocationCode}
      </h1>
      <h2 className="text-xl p-1 text-center">
        Departure: {new Date(query.departureDate).toDateString()} / Return:{" "}
        {new Date(query.returnDate).toDateString()}
      </h2>
      <div className="border-b border-white ml-20 mr-20 mt-10">
        {flights ? (
          <ol>
            {flights.map((flight) => (
              <div className="border-b border-white mb-3">
                <div className="flex flex-row gap-5">
                  <div>
                    {airlines && airlines[flight.id]
                      ? airlines[flight.id].name
                      : ""}
                  </div>
                  <img
                    src={
                      airlines && airlines[flight.id]
                        ? airlines[flight.id].logo_url
                        : ""
                    }
                    alt={flight.itineraries[0].segments[0].carrierCode}
                    width={100}
                  />
                </div>
                <li key={flight.id} className="flex flex-row gap-5">
                  <div>Depart:</div>
                  <div>
                    {new Date(
                      flight.itineraries[0].segments[0].departure.at
                    ).toLocaleTimeString()}
                    -
                    {new Date(
                      flight.itineraries[0].segments[0].arrival.at
                    ).toLocaleTimeString()}{" "}
                  </div>
                  <div>
                    {flight.itineraries[1].segments[0].duration.substring(2)}{" "}
                  </div>
                </li>
                <li key={flight.id} className="flex flex-row gap-5">
                  <div>Return: </div>
                  <div>
                    {new Date(
                      flight.itineraries[1].segments[0].departure.at
                    ).toLocaleTimeString()}
                    -
                    {new Date(
                      flight.itineraries[1].segments[0].arrival.at
                    ).toLocaleTimeString()}{" "}
                  </div>
                  <div>
                    {flight.itineraries[0].segments[0].duration.substring(2)}{" "}
                  </div>
                  <div>Total Price: ${flight.price.grandTotal} </div>
                </li>
              </div>
            ))}
          </ol>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
