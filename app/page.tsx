import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { GiAirplaneArrival } from "react-icons/gi";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center text-9xl bg-gradient-to-b from-orange-600 to-blue-800 h-32">
      <Header />
      <div className="flex flex-row gap-5">
        TAKE ME 2
        <GiAirplaneArrival />
      </div>

      <SearchForm />
    </div>
  );
}
