import { NextRequest } from "next/server";
import amadeus from "@/utils/getAmadeusInstance";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const originLocationCode = searchParams.get("originLocationCode");
  const destinationLocationCode = searchParams.get("destinationLocationCode");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  //   const adults = searchParams.get("departureDate");
  //   const children = searchParams.get("children");
  //   const infants = searchParams.get("infants");
  //   const travelClass = searchParams.get("travelClass");
  //   const max = searchParams.get("max");

  if (returnDate) {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: `${originLocationCode}`,
      destinationLocationCode: `${destinationLocationCode}`,
      departureDate: `${departureDate}`,
      returnDate: `${returnDate}`,
      adults: "1",
      children: "0",
      infants: "0",
      travelClass: "ECONOMY",
      max: "7",
      nonStop: "true",
    });
    return new Response(JSON.stringify(response.data));
  } else {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: `${originLocationCode}`,
      destinationLocationCode: `${destinationLocationCode}`,
      departureDate: `${departureDate}`,
      adults: "1",
      children: "0",
      infants: "0",
      travelClass: "ECONOMY",
      max: "40",
      nonStop: "true",
    });
    return new Response(JSON.stringify(response.data));
  }
}
