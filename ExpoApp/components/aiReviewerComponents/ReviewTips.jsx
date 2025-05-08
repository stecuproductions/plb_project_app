import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";

/**
 * Component for displaying diet recommendations and tips
 * @param {Object} reviewData - The review data from the AI analysis
 */
export function ReviewTips({ reviewData }) {
  const { recommendations, suggestedFoods } = reviewData;
  
  const renderRecommendation = ({ item, index }) => (
    <View className="flex-row items-start mb-3">
      <View className="bg-primary-100 rounded-full p-1 mr-3 mt-1">
        <Ionicons name="checkmark-circle" size={18} color="#4f46e5" />
      </View>
      <Text className="text-neutral-700 flex-1">{item}</Text>
    </View>
  );
  
  const renderFoodTag = ({ item }) => (
    <View className="bg-secondary-500/20 px-3 py-1.5 rounded-full mr-2 mb-2">
      <Text className="text-secondary-600 font-medium">{item}</Text>
    </View>
  );

  return (
    <View className="bg-surface rounded-xl shadow-md p-4">
      <Text className="text-xl font-semibold text-primary-800 mb-4">
        Recommendations
      </Text>
      
      <FlatList
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={(item, index) => `rec-${index}`}
        scrollEnabled={false}
      />
      
      <View className="mt-4 pt-4 border-t border-neutral-100">
        <Text className="text-lg font-semibold text-primary-800 mb-3">
          Foods to Add to Your Diet
        </Text>
        
        <View className="flex-row flex-wrap">
          {suggestedFoods.map((food, index) => (
            <View key={`food-${index}`} className="bg-secondary-500/20 px-3 py-1.5 rounded-full mr-2 mb-2">
              <Text className="text-secondary-600 font-medium">{food}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}