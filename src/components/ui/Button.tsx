import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const isDark = false; // Mock for now
  const colors = isDark ? Colors.dark : Colors.light;

  const handlePress = () => {
    if (!disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const getContainerStyles = (): ViewStyle[] => {
    const baseStyle: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Theme.radius.xl,
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: { backgroundColor: colors.black },
      secondary: { backgroundColor: colors.primary },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.border,
      },
      ghost: { backgroundColor: "transparent" },
    };

    const sizeStyles: Record<string, ViewStyle> = {
      sm: { paddingVertical: 8, paddingHorizontal: 16 },
      md: { paddingVertical: 14, paddingHorizontal: 24 },
      lg: { paddingVertical: 18, paddingHorizontal: 32 },
    };

    return [
      baseStyle,
      variantStyles[variant],
      sizeStyles[size],
      style || {},
      disabled ? { opacity: 0.5 } : {},
    ];
  };

  const getTextStyles = (): TextStyle[] => {
    const baseStyle: TextStyle = {
      fontWeight: "600",
      textAlign: "center",
    };

    const variantStyles: Record<string, TextStyle> = {
      primary: { color: colors.white },
      secondary: { color: colors.white },
      outline: { color: colors.text },
      ghost: { color: colors.primary },
    };

    const sizeStyles: Record<string, TextStyle> = {
      sm: { fontSize: Theme.typography.size.sm },
      md: { fontSize: Theme.typography.size.md },
      lg: { fontSize: Theme.typography.size.lg },
    };

    return [
      baseStyle,
      variantStyles[variant],
      sizeStyles[size],
      textStyle || {},
    ];
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled || loading}
      style={getContainerStyles()}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? colors.primary : colors.white}
        />
      ) : (
        <>
          {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
          <Text style={getTextStyles()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
