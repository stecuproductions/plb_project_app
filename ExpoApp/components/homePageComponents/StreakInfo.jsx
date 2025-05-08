import React from "react";
import { Text, View } from "react-native";
import { loadStreak } from "../../scripts/streakStorage";
export function StreakInfo() {
    const streak = loadStreak();
    
    return (
        <View className="rounded-xl shadow-md p-4 py-6 bg-surface backdrop-blur-3xl">
            <View className="flex-row items-center">
                <View>
                    <Text className="text-base text-xl text-primary-900">🍎 Current Streak </Text>
                    <Text className="text-primary-900 text-2xl font-bold">{streak} days</Text>
                </View>
            </View>
            <View className="bg-surface/20 rounded-lg mt-2">
                <Text className="text-primary-900 text-xs">Keep coming back daily to increase your streak!</Text>
            </View>
        </View>
    );
}
