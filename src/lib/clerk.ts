import { TokenCache } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

/**
 * Secure token storage for Clerk sessions.
 * Uses expo-secure-store to persist auth tokens securely on device.
 */
export const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStore save item error: ", error);
    }
  },
};
