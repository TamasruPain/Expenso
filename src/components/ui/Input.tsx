import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  icon,
  ...props
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.primarySurface,
            borderColor: error ? colors.danger : "transparent",
          },
          inputStyle,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { color: colors.text }]}
          {...props}
        />
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "600",
    marginBottom: Theme.spacing.xs,
    marginLeft: Theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    height: 56,
    paddingHorizontal: Theme.spacing.md,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: Theme.typography.size.md,
    fontWeight: "500",
  },
  iconContainer: {
    marginRight: Theme.spacing.sm,
  },
  error: {
    fontSize: Theme.typography.size.xs,
    marginTop: Theme.spacing.xs,
    marginLeft: Theme.spacing.xs,
  },
});
