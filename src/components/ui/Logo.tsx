
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo: React.FC<LogoProps> = ({ size = "md" }) => {

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/expenso_logo.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 100,
  },
  logo: {
    width: 200,
    height: 100,
  },
});
