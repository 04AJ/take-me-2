import { NextRequest } from "next/server";
import amadeus from "@/utils/getAmadeusInstance";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const originLocationCode = searchParams.get("originLocationCode");
  const destinationLocationCode = searchParams.get("originLocationCode");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const adults = searchParams.get("departureDate");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  const travelClass = searchParams.get("travelClass");
  const max = searchParams.get("max");

  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: "JFK",
    destinationLocationCode: "LHR",
    departureDate: "2024-06-01",
    returnDate: "2024-07-01",
    adults: "2",
    children: "1",
    infants: "1",
    travelClass: "ECONOMY",
    max: "5",
    nonStop: "true",
  });

  return new Response(JSON.stringify(response.data));
}
