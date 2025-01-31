import { createClient } from "@supabase/supabase-js";
import { env } from "../env";

// Create a single supabase client for interacting with your database
const supabase = createClient(env.SUPABASE_PROJECT_URL, env.SUPABASE_API_KEY);

export { supabase };
