import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function NavigationCard({ title, description, icon, customClassName = "", onPress = () => {} }) {
  // Default icons based on title if not provided
  const getDefaultIcon = () => {
    switch (title) {
      case "FoodFacts": return "📚";
      case "Quizzes": return "🎯";
      case "Ai diet reviewer": return "🤖";
      case "Dashboard": return "📊";
      case "Explore": return "🔍";
      default: return "📱";
    }
  };

  return (
    <TouchableOpacity 
      className={`bg-surface rounded-xl shadow-md p-4 ${customClassName}`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-primary-800">{title}</Text>
        <Text className="text-2xl">{icon || getDefaultIcon()}</Text>
      </View>
      <Text className="text-neutral-700">{description}</Text>
    </TouchableOpacity>
  );
}