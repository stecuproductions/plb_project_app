import React, { useState } from "react";
import { Text, View } from "react-native";
import { loadStreak, saveStreak } from "../../scripts/streakStorage";
import { Button } from "../ui/Buttons";

export function StreakInfo() {
    const [currentStreak, setCurrentStreak] = useState(loadStreak());
    
    const handleExtendStreak = () => {
        const newStreak = currentStreak + 1;
        saveStreak(newStreak);
        setCurrentStreak(newStreak);
    };
    
    return (
        <View className="rounded-xl shadow-md p-4 py-6 bg-surface backdrop-blur-3xl">
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-base text-xl text-primary-900">🍎 Current Streak </Text>
                    <Text className="text-primary-900 text-2xl font-bold">{currentStreak} days</Text>
                </View>
                <Button 
                    variant="primary"
                    label="Extend streak"
                    size="sm"
                    onPress={handleExtendStreak}
                />
            </View>
            <View className="bg-surface/20 rounded-lg mt-2 ">
                <Text className="text-primary-900 text-xs">Keep coming back daily to increase your streak!</Text>
            </View>
        </View>
    );
}
