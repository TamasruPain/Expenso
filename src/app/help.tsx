import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type FAQ = {
  question: string;
  answer: string;
};

const FAQS: FAQ[] = [
  {
    question: "How is my budget calculated?",
    answer:
      "Your budget progress is calculated based on the total limits you set minus any expenses logged in the current month for those specific categories. Unbudgeted expenses are tracked but won't count against category budgets.",
  },
  {
    question: "What happens if I break my streak?",
    answer:
      "Your current streak resets to 0 if you fail to log at least one transaction on a given day, but your 'Best Streak' will always be preserved in your profile.",
  },
  {
    question: "Can I use multiple currencies?",
    answer:
      "Currently, Expenso supports setting one primary currency during onboarding. We are working on multi-currency support for future updates.",
  },
  {
    question: "How do I edit a transaction?",
    answer:
      "Navigate to the Transactions tab, tap on any existing transaction in the list, and the edit modal will appear allowing you to change the amount, category, or note.",
  },
];

export default function HelpSupportScreen() {
  const { colors, isDark } = useAppTheme();
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleEmailSupport = () => {
    Linking.openURL("mailto:tamasrupain02@gmail.com?subject=Support Request");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Help & Support
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Contact Support Card */}
        <View style={[styles.contactCard, { backgroundColor: colors.primary }]}>
          <View style={styles.contactContent}>
            <Text style={styles.contactTitle}>Need more help?</Text>
            <Text style={styles.contactSubtitle}>
              Our support team is always ready to assist you.
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleEmailSupport}
            >
              <Ionicons name="mail" size={18} color={colors.primary} />
              <Text
                style={[styles.contactButtonText, { color: colors.primary }]}
              >
                Email Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          FREQUENTLY ASKED QUESTIONS
        </Text>

        <View
          style={[
            styles.faqContainer,
            {
              backgroundColor: colors.card,
              shadowColor: isDark ? "#000" : "#7C5CFC",
            },
          ]}
        >
          {FAQS.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            const isLast = index === FAQS.length - 1;

            return (
              <View
                key={index}
                style={[
                  styles.faqItem,
                  !isLast && {
                    borderBottomWidth: 1,
                    borderBottomColor: isDark
                      ? "rgba(255,255,255,0.06)"
                      : colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.faqHeader}
                  activeOpacity={0.7}
                  onPress={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <Text style={[styles.questionText, { color: colors.text }]}>
                    {faq.question}
                  </Text>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <Animated.View
                    entering={FadeInUp.duration(200)}
                    layout={Layout.springify()}
                    style={styles.answerContainer}
                  >
                    <Text
                      style={[
                        styles.answerText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {faq.answer}
                    </Text>
                  </Animated.View>
                )}
              </View>
            );
          })}
        </View>

        {/* Legal Links */}
        <View style={styles.legalSection}>
          <TouchableOpacity style={styles.legalLink}>
            <Text style={[styles.legalText, { color: colors.textSecondary }]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <View
            style={[styles.dot, { backgroundColor: colors.textSecondary }]}
          />
          <TouchableOpacity style={styles.legalLink}>
            <Text style={[styles.legalText, { color: colors.textSecondary }]}>
              Terms of Service
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    padding: Theme.spacing.lg,
    paddingBottom: 40,
  },
  contactCard: {
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  contactContent: {
    alignItems: "flex-start",
  },
  contactTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  contactSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: Theme.spacing.lg,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  contactButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: Theme.spacing.md,
    marginLeft: Theme.spacing.sm,
  },
  faqContainer: {
    borderRadius: Theme.radius.xl,
    overflow: "hidden",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: Theme.spacing.xl,
  },
  faqItem: {
    paddingHorizontal: Theme.spacing.md,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Theme.spacing.lg,
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    paddingRight: 16,
  },
  answerContainer: {
    paddingBottom: Theme.spacing.lg,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 22,
  },
  legalSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: Theme.spacing.xl,
  },
  legalLink: {
    padding: 4,
  },
  legalText: {
    fontSize: 13,
    fontWeight: "500",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
