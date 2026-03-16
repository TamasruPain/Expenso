import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Static Supabase client instance.
 * Note: Use the 'useSupabase' hook for authenticated requests.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
