import React from "react";
import { Text, View } from "react-native";

/**
 * Component for displaying diet review results
 * @param {Object} reviewData - The review data from the AI analysis
 */
export function ReviewResult({ reviewData }) {
  const { overallScore, nutritionBalance } = reviewData;
  
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-500";
  };
  
  const renderProgressBar = (label, percentage) => {
    const barColor = Number(percentage) >= 80 ? "bg-green-500" : 
                     Number(percentage) >= 60 ? "bg-yellow-500" : 
                     "bg-red-500";
    
    return (
      <View className="mb-3">
        <View className="flex-row justify-between mb-1">
          <Text className="text-neutral-700 font-medium">{label}</Text>
          <Text className={`font-semibold ${getScoreColor(percentage)}`}>
            {percentage}%
          </Text>
        </View>
        <View className="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <View 
            className={`h-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="bg-surface rounded-xl shadow-md p-4 mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-primary-800">
          Your Diet Analysis
        </Text>
        <View className="bg-primary-50 rounded-full p-3">
          <Text className="text-primary-600 text-2xl font-bold">
            {overallScore}/10
          </Text>
        </View>
      </View>
      
      <Text className="text-neutral-700 mb-4">
        Here's a breakdown of your nutritional balance:
      </Text>
      
      <View>
        {renderProgressBar("Protein", nutritionBalance.protein)}
        {renderProgressBar("Carbohydrates", nutritionBalance.carbs)}
        {renderProgressBar("Healthy Fats", nutritionBalance.fats)}
        {renderProgressBar("Fiber", nutritionBalance.fiber)}
      </View>
    </View>
  );
}