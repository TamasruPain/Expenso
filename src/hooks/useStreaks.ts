import { useGamificationStore } from "@/stores/useGamificationStore";
import { useEffect } from "react";

/**
 * Hook to manage and monitor user streaks.
 * Automatically checks for streak expiration on mount.
 */
export const useStreaks = () => {
  const { streakCount, checkStreak, incrementStreak } = useGamificationStore();

  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  const recordActivity = () => {
    const lastActive = useGamificationStore.getState().lastActiveDate;
    const today = new Date().toISOString().split("T")[0];

    if (lastActive !== today) {
      incrementStreak();
    }
  };

  return {
    streakCount,
    recordActivity,
  };
};
