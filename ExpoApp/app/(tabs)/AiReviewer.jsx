import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";

// Import our custom components that we'll create next
import { DietInputForm } from "../../components/aiReviewerComponents/DietInputForm";
import { ReviewResult } from "../../components/aiReviewerComponents/ReviewResult";
import { ReviewTips } from "../../components/aiReviewerComponents/ReviewTips";
import { Button } from "../../components/ui/Buttons";

export default function AiReviewer() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const handleSubmitDiet = () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const mockReviewData = {
        overallScore: 7.5,
        nutritionBalance: {
          protein: 80,
          carbs: 60,
          fats: 70,
          fiber: 50
        },
        recommendations: [
          "Consider adding more leafy greens to increase fiber intake",
          "Your protein intake is good, but try to diversify sources",
          "Include more healthy fats like avocados and nuts",
          "Reduce processed food consumption where possible"
        ],
        suggestedFoods: [
          "Spinach",
          "Quinoa",
          "Avocado",
          "Greek yogurt",
          "Walnuts"
        ]
      };
      
      setReviewData(mockReviewData);
      setIsLoading(false);
      setInputText(""); 
    }, 2000);
  };

  const handleNewReview = () => {
    setReviewData(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold text-primary-900 mb-2">
            AI Diet Reviewer
          </Text>
          <Text className="text-neutral-700 mb-6">
            Enter what you've eaten today to get personalized feedback and recommendations.
          </Text>
          
          {!reviewData || isLoading ? (
            <DietInputForm 
              inputText={inputText}
              setInputText={setInputText}
              onSubmit={handleSubmitDiet}
              isLoading={isLoading}
            />
          ) : null}
          
          {isLoading && (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text className="text-primary-600 mt-4 font-medium">
                Analyzing your diet...
              </Text>
            </View>
          )}
          
          {!isLoading && reviewData && (
            <View className="mt-6">
              <ReviewResult reviewData={reviewData} />
              <ReviewTips reviewData={reviewData} />
              
              <View className="mt-6">
                <Button 
                  variant="primary"
                  label="Start New Review"
                  onPress={handleNewReview}
                  fullWidth
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}