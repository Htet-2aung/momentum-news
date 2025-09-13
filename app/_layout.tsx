import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "../provider/AuthProvider";

function TabsLayout() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: { borderTopColor: "#E5E7EB" },
        tabBarIcon: ({ color, size }) => {
          let name: any = "home-outline";
          if (route.name === "index") name = "home-outline";
          else if (route.name === "popular") name = "flame-outline";
          else if (route.name === "profile") name = "person-outline";
          return <Ionicons name={name} size={size} color={color} />;
        },
        tabBarLabel: () => null,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="popular" options={{ title: "Popular" }} />

      <Tabs.Screen
        name="profile"
        options={{ title: "Profile" }}
        listeners={{
          tabPress: (e) => {
            if (!user) {
              e.preventDefault(); // ✅ only block if not logged in
              router.push("/Login");
            }
          },
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TabsLayout />
    </AuthProvider>
  );
}
