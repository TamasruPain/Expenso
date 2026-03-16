import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { useDatabase } from "@/hooks/useDatabase";
import { useAuthStore } from "@/stores/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CategoryGrid } from "./CategoryGrid";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
}) => {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addTransaction } = useDatabase();
  const { user } = useAuthStore();
  const colors = Colors.light;

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await addTransaction({
        amount: parseFloat(amount),
        type,
        categoryId: selectedCategory,
        note,
        date: new Date().toISOString(),
      });

      if (success) {
        setAmount("");
        setNote("");
        onClose();
      } else {
        Alert.alert("Error", "Failed to save transaction. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View
            style={[styles.modalContent, { backgroundColor: colors.white }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Add Transaction
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Type Switcher */}
              <View
                style={[
                  styles.typeSwitcher,
                  { backgroundColor: colors.primarySurface },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === "expense" && {
                      backgroundColor: colors.white,
                      elevation: 2,
                    },
                  ]}
                  onPress={() => setType("expense")}
                >
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color:
                          type === "expense"
                            ? colors.primary
                            : colors.textSecondary,
                      },
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === "income" && {
                      backgroundColor: colors.white,
                      elevation: 2,
                    },
                  ]}
                  onPress={() => setType("income")}
                >
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color:
                          type === "income"
                            ? colors.primary
                            : colors.textSecondary,
                      },
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Amount Input Shell */}
              <View
                style={[
                  styles.amountContainer,
                  { backgroundColor: colors.primarySurface },
                ]}
              >
                <Text
                  style={[
                    styles.currencyLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  {user?.currency_symbol || "₹"}
                </Text>
                <TextInput
                  style={[styles.amountInput, { color: colors.text }]}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="0.00"
                  autoFocus={true}
                />
              </View>

              {/* Category Selection */}
              <Text style={[styles.label, { color: colors.text }]}>
                Category
              </Text>
              <CategoryGrid
                type={type}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
              />

              {/* Note Input */}
              <Input
                label="Add a Note:"
                placeholder="What was this for?"
                value={note}
                onChangeText={setNote}
                multiline
                inputStyle={{
                  height: 80,
                  alignItems: "flex-start",
                  paddingTop: 12,
                }}
              />

              <Button
                title={isSubmitting ? "Adding..." : "Add Transaction"}
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={styles.submitButton}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    width: "100%",
  },
  modalContent: {
    borderTopLeftRadius: Theme.radius.xl,
    borderTopRightRadius: Theme.radius.xl,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Platform.OS === "ios" ? 40 : Theme.spacing.xl,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  modalTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
  },
  closeButton: {
    padding: 4,
  },
  typeSwitcher: {
    flexDirection: "row",
    padding: 4,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.xl,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: Theme.radius.sm,
  },
  typeText: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "700",
  },
  amountContainer: {
    height: 70,
    borderRadius: Theme.radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  currencyLabel: {
    fontSize: 24,
    fontWeight: "600",
    marginRight: 4,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: "700",
    minWidth: 100,
    textAlign: "center",
  },
  label: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "700",
    marginBottom: Theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.sm,
  },
  submitButton: {
    marginTop: Theme.spacing.lg,
    width: "100%",
  },
});
