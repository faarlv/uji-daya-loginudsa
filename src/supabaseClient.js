// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oogfgzlaagbokekdrmez.supabase.co"; // ganti dengan URL proyek Supabase Anda
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2ZnemxhYWdib2tla2RybWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzQ5OTcsImV4cCI6MjAzNzIxMDk5N30.3B8NqAsNhoTZn0_ZDY-X8CjL1YDhK8gG3xcE1paLZhc"; // ganti dengan kunci anon Anda

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
