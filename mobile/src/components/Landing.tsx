// client/components/landing.tsx
import React from "react";
import * as Haptics from "expo-haptics";
import { Image, StyleSheet, View, useColorScheme } from "react-native";
import { Text } from "./Themed";
import { BodyScrollView } from "./ui/BodyScrollView";
import Button from "./ui/Button";
//import { IconSymbol } from "./ui/IconSymbol";

type LandingProps = {
  onGoogleSignIn: () => void;
  onEmailSignIn: () => void;
  onPrivacyPolicy: () => void;
};

export default function Landing({
  onGoogleSignIn,
  onEmailSignIn,
  onPrivacyPolicy,
}: LandingProps) {
  const theme = useColorScheme();

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        {/* <Image
          source={require("../assets/images/icon.png")}
          style={styles.appIcon}
          resizeMode="contain"
        /> */}
        <Text /* type="title" */ style={styles.welcomeText}>
          Welcome back!
        </Text>
        <Text style={styles.subtitleText}>
          Local-first shopping list app powered by Expo & TinyBase
        </Text>
      </View>

      <View style={styles.actionSection}>
        <Button
          onPress={onGoogleSignIn}
          variant="outline"
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            {/* <Image
              source={require("../assets/images/google-icon.png")}
              style={styles.buttonIcon}
            /> */}
            <Text style={styles.buttonText}>
              Continue with Google
            </Text>
          </View>
        </Button>

        <Button onPress={onEmailSignIn} variant="outline" style={styles.button}>
          <View style={styles.buttonContent}>
            {/* <IconSymbol
              name="envelope"
              color={theme === "dark" ? "white" : "black"}
              style={styles.buttonIcon}
            /> */}
            <Text style={styles.buttonText}>
              Continue with Email
            </Text>
          </View>
        </Button>
      </View>

      <View style={styles.footer}>
        <Button
          onPress={onPrivacyPolicy}
          variant="ghost"
          textStyle={styles.privacyPolicyText}
        >
          Privacy Policy
        </Button>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 32,
  },
  heroSection: {
    alignItems: "center",
    gap: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 32,
    textAlign: "center",
  },
  subtitleText: {
    textAlign: "center",
    color: "gray",
    paddingHorizontal: 24,
  },
  actionSection: {
    gap: 16,
  },
  button: {
    marginBottom: 8,
  },
  buttonContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  buttonText: {
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
  },
  privacyPolicyText: {
    fontSize: 14,
    color: "gray",
  },
});