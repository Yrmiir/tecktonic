import { Tabs } from "expo-router";
import React from "react";
import { Stack } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Главная",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="lessons"
                options={{
                    title: "Уроки",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="book.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="music"
                options={{
                    title: "Музыка",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="music.note" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="lesson/[id]"
                options={{
                    title: "Детали урока",
                    href: null,
                    tabBarStyle: { display: "none" },
                }}
            />
        </Tabs>
    );
}
