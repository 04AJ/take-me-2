interface Departure {
  iataCode: string;
  terminal: string;
  at: string;
}

interface Arrival {
  iataCode: string;
  terminal: string;
  at: string;
}

interface Segment {
  departure: Departure;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  duration: string;
}

interface Itinerary {
  duration: string;
  segments: Segment[];
}

interface Fee {
  amount: string;
  type: string;
}

interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

interface Amenity {
  description: string;
  isChargeable: boolean;
  amenityType: string;
  amenityProvider: {
    name: string;
  };
}

interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  brandedFareLabel: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
  amenities: Amenity[];
}

interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FlightOffer {
  type: string;
  id: number;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
  // Other properties...
}

export interface Airlines {
  airline_code: string;
  name: string;
  logo_url: string;
}
