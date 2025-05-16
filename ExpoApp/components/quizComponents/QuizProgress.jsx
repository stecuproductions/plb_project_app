import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export function QuizProgress({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <View className="bg-surface rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="stats-chart" size={18} color="#4f46e5" />
          <Text className="font-bold text-neutral-800 ml-2">Your Progress</Text>
        </View>
        <Text className="text-primary-600 font-medium">{percentage}%</Text>
      </View>
      
      <View className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <View 
          className="h-full bg-primary-600 rounded-full" 
          style={{ width: `${percentage}%` }} 
        />
      </View>
      
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-neutral-500 text-xs">
          {completed} of {total} quizzes completed
        </Text>
        {percentage === 100 && (
          <View className="flex-row items-center">
            <Ionicons name="trophy" size={14} color="#059669" />
            <Text className="text-green-600 font-medium text-xs ml-1">
              All complete!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
