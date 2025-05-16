import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { getDietReviewStats, clearDietReviews } from '../../scripts/dietReviewStorage';

export function ReviewStats({ forceRefresh }) {
  const [stats, setStats] = useState({
    reviewCount: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    improvementTrend: 0,
    lastReviewDate: null
  });
  
  useEffect(() => {
    loadStats();
  }, [forceRefresh]); // Refresh when forceRefresh changes
  
  const loadStats = async () => {
    const reviewStats = await getDietReviewStats();
    setStats(reviewStats);
  };
  
  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all your diet review history?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearDietReviews();
            loadStats();
          }
        }
      ]
    );
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Don't show the stats card if there are no reviews yet
  if (stats.reviewCount === 0) {
    return null;
  }
  
  return (
    <View className="bg-surface rounded-xl shadow-md p-4 mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <Ionicons name="bar-chart" size={20} color="#4f46e5" />
          <Text className="text-lg font-semibold text-primary-800 ml-2">
            Your Diet Progress
          </Text>
        </View>
        <TouchableOpacity 
          onPress={handleClearHistory}
          className="p-2"
        >
          <Ionicons name="trash-outline" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row flex-wrap justify-between mb-2">
        <View className="w-[48%] mb-3">
          <Text className="text-neutral-500 text-xs">Reviews Completed</Text>
          <Text className="text-lg font-semibold text-neutral-800">{stats.reviewCount}</Text>
        </View>
        
        <View className="w-[48%] mb-3">
          <Text className="text-neutral-500 text-xs">Average Score</Text>
          <Text className="text-lg font-semibold text-neutral-800">{stats.averageScore}/10</Text>
        </View>
        
        <View className="w-[48%] mb-3">
          <Text className="text-neutral-500 text-xs">Highest Score</Text>
          <Text className="text-lg font-semibold text-neutral-800">{stats.highestScore}/10</Text>
        </View>
        
        <View className="w-[48%] mb-3">
          <Text className="text-neutral-500 text-xs">Latest Trend</Text>
          <View className="flex-row items-center">
            {parseFloat(stats.improvementTrend) > 0 ? (
              <>
                <Ionicons name="arrow-up" size={16} color="#16a34a" />
                <Text className="text-lg font-semibold text-green-600">{Math.abs(stats.improvementTrend)}</Text>
              </>
            ) : parseFloat(stats.improvementTrend) < 0 ? (
              <>
                <Ionicons name="arrow-down" size={16} color="#dc2626" />
                <Text className="text-lg font-semibold text-red-600">{Math.abs(stats.improvementTrend)}</Text>
              </>
            ) : (
              <Text className="text-lg font-semibold text-neutral-800">No change</Text>
            )}
          </View>
        </View>
      </View>
      
      <View className="border-t border-neutral-100 pt-2 mt-1">
        <Text className="text-neutral-500 text-xs">Last Review: {formatDate(stats.lastReviewDate)}</Text>
      </View>
    </View>
  );
}
