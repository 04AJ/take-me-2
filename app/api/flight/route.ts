import { NextRequest } from "next/server";
import amadeus from "@/utils/getAmadeusInstance";

export async function GET(req: NextRequest) {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: "SYD",
    destinationLocationCode: "BKK",
    departureDate: "2024-06-01",
    adults: "2",
  });

  return new Response(JSON.stringify(response.data));
}
