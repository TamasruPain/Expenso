import { useAuthStore } from "@/stores/useAuthStore";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useSupabase } from "./useSupabase";

/**
 * Hook to sync Clerk user with Supabase profile.
 * Ensures the profile exists and the local store is updated.
 */
export function useAuthSync() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const supabase = useSupabase();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (!clerkLoaded || !clerkUser) return;

    const syncProfile = async () => {
      // Check if profile exists
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_id", clerkUser.id)
        .single();

      if (error && error.code === "PGRST116") {
        // Profile doesn't exist, create it
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              clerk_id: clerkUser.id,
              email: clerkUser.primaryEmailAddress?.emailAddress,
              name: clerkUser.fullName,
              avatar_url: clerkUser.imageUrl,
            },
          ])
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          return;
        }

        // Seed default categories for new user
        const { error: seedError } = await supabase.rpc(
          "seed_default_categories",
          {
            p_user_id: clerkUser.id,
          },
        );

        if (seedError) console.error("Error seeding categories:", seedError);

        if (newProfile) {
          setUser({
            ...newProfile,
            fullName: newProfile.name, // Map DB 'name' to type 'fullName'
          });
        }
      } else if (profile) {
        setUser({
          ...profile,
          fullName: profile.name, // Map DB 'name' to type 'fullName'
        });
      }
    };

    syncProfile();
  }, [clerkLoaded, clerkUser, supabase, setUser]);
}
