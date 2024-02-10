"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";

export default function Trips() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("USER").select();
      setNotes(data);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Connect with Supa Base and Ammadeus</h1>
      <div>This is my first page!</div>
      <Button />
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
