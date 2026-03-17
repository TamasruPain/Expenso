import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SecurityState {
  isBiometricsEnabled: boolean;
  isAuthenticated: boolean;
  setBiometricsEnabled: (enabled: boolean) => void;
  authenticate: () => Promise<boolean>;
  resetAuth: () => void;
}

export const useSecurityStore = create<SecurityState>()(
  persist(
    (set, get) => ({
      isBiometricsEnabled: false,
      isAuthenticated: false,

      setBiometricsEnabled: (enabled) => {
        set({ isBiometricsEnabled: enabled });
      },

      authenticate: async () => {
        const { isBiometricsEnabled } = get();

        // If they haven't enabled it in settings, we consider them authenticated instantly
        if (!isBiometricsEnabled) {
          set({ isAuthenticated: true });
          return true;
        }

        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !isEnrolled) {
          console.warn(
            "Biometrics not available or not set up on this device.",
          );
          set({ isAuthenticated: true }); // Fallback if hardware fails/isn't set up
          return true;
        }

        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Unlock Expenso",
          fallbackLabel: "Use Passcode",
          disableDeviceFallback: false,
        });

        if (result.success) {
          set({ isAuthenticated: true });
          return true;
        }

        set({ isAuthenticated: false });
        return false;
      },

      resetAuth: () => set({ isAuthenticated: false }),
    }),
    {
      name: "security-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isBiometricsEnabled: state.isBiometricsEnabled,
      }), // Only persist the setting, not the auth status
    },
  ),
);
