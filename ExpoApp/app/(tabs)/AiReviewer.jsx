import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View, Alert } from "react-native";
import axios from "axios";

import { DietInputForm } from "../../components/aiReviewerComponents/DietInputForm";
import { ReviewResult } from "../../components/aiReviewerComponents/ReviewResult";
import { ReviewTips } from "../../components/aiReviewerComponents/ReviewTips";
import { Button } from "../../components/ui/Buttons";
import { API_URL } from "../_layout";

export default function AiReviewer() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const handleSubmitDiet = async () => {
    const description = inputText.trim();

    if (description.length < 20) {
      Alert.alert("Too short", "Please describe your meals in more detail (at least 20 characters).");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/ai/getDietReview`, { description });

      const data = response.data;
      if (!data || Object.keys(data).length === 0) {
        alert( "The AI could not analyze your diet, describe it more precisely or please try again.");
        setIsLoading(false);
        setInputText("");
        setReviewData(null);
        return;
      }

      setReviewData(data);

    } catch (error) {

      if (error.response?.status === 500) {
        Alert.alert("Server Error", "Something went wrong on the server. Please try again later.");
      } else if (error.response) {
        Alert.alert(`Error ${error.response.status}`, error.response.data?.message || "Unexpected error.");
      } else if (error.request) {
        Alert.alert("Connection Issue", "Could not reach the server. Check your internet connection.");
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
      setInputText("");
    }
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
          <Text className="text-neutral-700 mb-2 ">
            Enter what you&apos;ve eaten today to get personalized feedback and recommendations.
          </Text>
          
          <Text className="text-xs text-neutral-500 italic mb-8">
            Note: AI-generated advice should not replace professional nutritional guidance. Results may vary in accuracy.
          </Text>

          {!reviewData && (
            <DietInputForm
              inputText={inputText}
              setInputText={setInputText}
              onSubmit={handleSubmitDiet}
              isLoading={isLoading}
            />
          )}

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
