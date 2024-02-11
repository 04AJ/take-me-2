import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

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
    <div className="flex-1 w-full flex flex-col gap-20 items-center text-9xl">
      <Header />
      TAKE ME 2
      <SearchForm />
    </div>
  );
}
