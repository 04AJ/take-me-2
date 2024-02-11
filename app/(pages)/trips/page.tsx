"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Trips() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("USER").select('*');
      setNotes(data);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Test</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
