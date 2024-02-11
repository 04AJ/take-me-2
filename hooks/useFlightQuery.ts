import { create } from "zustand";

interface FlightQuery {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  setOriginLocationCode: (originCode: string) => void;
  setDestinationLocationCode: (destinationCode: string) => void;
  setDepartureDate: (date: string) => void;
  setReturnDate: (date: string) => void;
}

export const useFlightQuery = create<FlightQuery>((set) => ({
  originLocationCode: "",
  destinationLocationCode: "",
  departureDate: "",
  returnDate: "",
  setOriginLocationCode: (originCode: string) =>
    set({ originLocationCode: originCode }),
  setDestinationLocationCode: (destinationCode: string) =>
    set({ destinationLocationCode: destinationCode }),
  setDepartureDate: (date: string) => set({ departureDate: date }),
  setReturnDate: (date: string) => set({ returnDate: date }),
}));
