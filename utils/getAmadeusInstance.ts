// utils/getAmadeusInstance.ts

const { CLIENT_ID, CLIENT_SECRET } = process.env;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET are required");
}
var Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

export default amadeus;
