import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuthStore } from "@/stores/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample currency data
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
];

export default function CurrencySelectionScreen() {
  const router = useRouter();
  const supabase = useSupabase();
  const { user, updateCurrency, updateOnboarding } = useAuthStore();
  const [search, setSearch] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [detectedCurrency, setDetectedCurrency] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = Colors.light;

  useEffect(() => {
    // Mock auto-detection
    const region = Localization.getLocales()[0].regionCode;
    if (region === "IN") {
      setDetectedCurrency("INR");
      setSelectedCurrency("INR");
    } else {
      setDetectedCurrency("USD");
      setSelectedCurrency("USD");
    }
  }, []);

  const handleContinue = async () => {
    if (!user) return;

    setIsSubmitting(true);
    const selected = CURRENCIES.find((c) => c.code === selectedCurrency);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          currency: selectedCurrency,
          currency_symbol: selected?.symbol || "$",
          onboarding_completed: true,
        })
        .eq("clerk_id", user.clerk_id);

      if (error) throw error;

      // Update local state
      updateCurrency(selectedCurrency, selected?.symbol || "$");
      updateOnboarding(true);

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error saving currency:", error);
      Alert.alert("Error", "Failed to save settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCurrencies = CURRENCIES.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: { item: (typeof CURRENCIES)[0] }) => (
    <TouchableOpacity
      style={[
        styles.currencyItem,
        {
          backgroundColor:
            selectedCurrency === item.code
              ? colors.primarySurface
              : "transparent",
          borderColor:
            selectedCurrency === item.code ? colors.primary : colors.border,
          borderWidth: selectedCurrency === item.code ? 1 : 0.5,
        },
      ]}
      onPress={() => setSelectedCurrency(item.code)}
    >
      <View style={styles.currencyInfo}>
        <Text style={styles.flag}>{item.flag}</Text>
        <View>
          <Text style={[styles.currencyCode, { color: colors.text }]}>
            {item.code}
          </Text>
          <Text style={[styles.currencyName, { color: colors.textSecondary }]}>
            {item.name}
          </Text>
        </View>
      </View>
      {selectedCurrency === item.code && (
        <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Select Currency
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Choose your primary currency for tracking expenses
          </Text>
        </View>

        <View
          style={[
            styles.searchContainer,
            { backgroundColor: colors.primarySurface },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search currency..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>

        {detectedCurrency && search === "" && (
          <View style={styles.detectedContainer}>
            <Text
              style={[styles.detectedLabel, { color: colors.textSecondary }]}
            >
              Detected Based on Region
            </Text>
          </View>
        )}

        <FlatList
          data={filteredCurrencies}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.footer}>
          <Button
            title={isSubmitting ? "Saving..." : "Continue"}
            onPress={handleContinue}
            disabled={isSubmitting}
            style={styles.continueButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
  },
  header: {
    paddingTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.size.h1 - 4,
    fontWeight: "700",
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: Theme.typography.size.md,
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.typography.size.md,
    fontWeight: "500",
  },
  detectedContainer: {
    marginBottom: Theme.spacing.sm,
    marginLeft: Theme.spacing.xs,
  },
  detectedLabel: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  listContent: {
    paddingBottom: Theme.spacing.xl,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.sm,
  },
  currencyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: Theme.spacing.md,
  },
  currencyCode: {
    fontSize: Theme.typography.size.md,
    fontWeight: "700",
  },
  currencyName: {
    fontSize: Theme.typography.size.sm,
  },
  footer: {
    paddingVertical: Theme.spacing.md,
    backgroundColor: Colors.light.white,
  },
  continueButton: {
    width: "100%",
  },
});
