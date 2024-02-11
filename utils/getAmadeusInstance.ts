// utils/getAmadeusInstance.ts

const { NEXT_PUBLIC_CLIENT_ID, NEXT_PUBLIC_CLIENT_SECRET } = process.env;

if (!NEXT_PUBLIC_CLIENT_ID || !NEXT_PUBLIC_CLIENT_SECRET) {
  throw new Error("AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET are required");
}
var Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: NEXT_PUBLIC_CLIENT_ID,
  clientSecret: NEXT_PUBLIC_CLIENT_SECRET,
});

export default amadeus;
