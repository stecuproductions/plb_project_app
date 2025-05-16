import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function QuizResult({ score, totalQuestions, categoryName, onRetry }) {
  const router = useRouter();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine result message and icon based on score
  const getResultInfo = () => {
    if (percentage >= 80) {
      return {
        icon: 'trophy',
        title: 'Excellent!',
        message: 'You have a great understanding of this topic!',
        color: '#16a34a', // green-600
        bgColor: 'rgba(22, 163, 74, 0.1)'
      };
    } else if (percentage >= 60) {
      return {
        icon: 'thumbs-up',
        title: 'Good job!',
        message: 'You know your stuff, but there\'s room for improvement.',
        color: '#4f46e5', // primary-600
        bgColor: 'rgba(79, 70, 229, 0.1)'
      };
    } else {
      return {
        icon: 'book',
        title: 'Keep learning!',
        message: 'There\'s more to learn about this topic.',
        color: '#f59e0b', // amber-500
        bgColor: 'rgba(245, 158, 11, 0.1)'
      };
    }
  };
  
  const resultInfo = getResultInfo();
  
  return (
    <View className="flex-1 p-6">
      <View className="items-center mb-8">
        <View 
          className="w-24 h-24 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: resultInfo.bgColor }}
        >
          <Ionicons name={resultInfo.icon} size={48} color={resultInfo.color} />
        </View>
        
        <Text className="text-2xl font-bold text-neutral-900 mb-2">
          {resultInfo.title}
        </Text>
        
        <Text className="text-neutral-600 text-center mb-4">
          {resultInfo.message}
        </Text>
        
        <View className="items-center">
          <Text className="text-3xl font-bold text-primary-800 mb-1">
            {score} / {totalQuestions}
          </Text>
          <Text className="text-lg text-neutral-500">
            {percentage}% Score
          </Text>
        </View>
      </View>
      
      <View className="flex-row mb-8">
        <View className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
          <View 
            className="h-full bg-primary-600 rounded-full" 
            style={{ width: `${percentage}%` }} 
          />
        </View>
      </View>
      
      <TouchableOpacity
        className="bg-primary-600 py-3 px-4 rounded-lg items-center mb-4"
        onPress={onRetry}
      >
        <Text className="text-surface font-bold text-lg">
          Try Again
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="py-3 px-4 rounded-lg items-center border border-neutral-300"
        onPress={() => router.push(`/(tabs)/QuizPage`)}
      >
        <Text className="font-medium text-neutral-700">
          Back to All Quizzes
        </Text>
      </TouchableOpacity>
    </View>
  );
}
