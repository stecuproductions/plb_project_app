import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function QuizCard({ quizRound, onPress, isCompleted }) {
  const router = useRouter();
  
  // Function to determine the appropriate icon for each quiz category
  const getCategoryIcon = (quizRound) => {
    // If imageKey is provided, use it
    if (quizRound.imageKey) {
      return quizRound.imageKey;
    }
    
    // Fallback to name-based logic
    switch(quizRound.name.toLowerCase()) {
      case 'nutrition':
        return 'nutrition';
      case 'exercise':
        return 'fitness';
      case 'healthy habits':
        return 'leaf';
      case 'mental health':
        return 'brain';
      case 'sleep':
        return 'bed';
      case 'hydration':
        return 'water';
      default:
        return 'help-circle';
    }
  };
  
  // Function to get difficulty icon
  const getDifficultyIcon = (difficulty) => {
    if (!difficulty) return null;
    
    switch(difficulty.toLowerCase()) {
      case 'easy':
        return 'sunny-outline';
      case 'medium':
        return 'golf-outline';
      case 'hard':
        return 'barbell-outline';
      default:
        return 'help-circle-outline';
    }
  };
  
  // Function to get estimated completion time
  const getEstimatedTime = (questionCount) => {
    // Assume average of 30 seconds per question
    const minutes = Math.max(1, Math.ceil(questionCount * 0.5));
    return `~${minutes} min`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4"
      activeOpacity={0.9}
    >
      <View 
        className="bg-surface rounded-xl overflow-hidden shadow"
        style={{ 
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4, 
          elevation: 3 
        }}
      >
        <View className="p-4 flex-row items-center">
          {/* Left - Icon */}
          <View 
            className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center mr-4"
          >
            <Ionicons 
              name={getCategoryIcon(quizRound)} 
              size={24} 
              color="#4f46e5" // primary-600
            />
          </View>
          
          {/* Middle - Content */}
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-lg font-bold text-black">
                {quizRound.name}
              </Text>
              {isCompleted && (
                <View className="bg-green-100 rounded-full p-1 ml-2">
                  <Ionicons name="checkmark-circle" size={18} color="#059669" />
                </View>
              )}
            </View>
            
            <Text className="text-neutral-600 text-sm mt-1">
              {quizRound.description || `Test your knowledge with ${quizRound.questions.length} questions`}
            </Text>
            
            <View className="flex-row items-center mt-2">
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#737373" />
                <Text className="text-xs text-neutral-500 ml-1">
                  {getEstimatedTime(quizRound.questions.length)}
                </Text>
              </View>
              
              {quizRound.difficulty && (
                <View className="flex-row items-center ml-3">
                  <Ionicons name={getDifficultyIcon(quizRound.difficulty)} size={14} color="#737373" />
                  <Text className="text-xs text-neutral-500 ml-1 capitalize">
                    {quizRound.difficulty}
                  </Text>
                </View>
              )}
              
              {isCompleted && (
                <View className="flex-row items-center ml-3">
                  <Ionicons name="trophy-outline" size={14} color="#059669" />
                  <Text className="text-xs text-green-600 ml-1">
                    Completed
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Right - Button */}
          <TouchableOpacity 
            className="bg-primary-600 rounded-full h-10 w-10 items-center justify-center ml-2"
            activeOpacity={0.8}
            onPress={() => {
            router.push(`/QuizDetailPage?id=${encodeURIComponent(quizRound.id || quizRound.name)}`);
            }}
          >
            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
