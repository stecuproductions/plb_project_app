import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { loadCompletedQuizzes, toggleQuizCompletion } from '../scripts/quizStorage';

export default function QuizDetailPage() {
    
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quizRound, setQuizRound] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedQuizIds, setCompletedQuizIds] = useState([]);
  
  useEffect(() => {
    const loadQuizData = async () => {
      if (!id) return;
      
      try {
        // Load the quiz data for this specific round
        const quizData = require('../assets/data/quiz.json');
        const selectedRound = quizData.quiz.rounds.find(
          round => (round.id || round.name) === decodeURIComponent(id)
        );
        
        if (selectedRound) {
          setQuizRound(selectedRound);
        }
        
        // Load completed quiz status
        const completed = await loadCompletedQuizzes();
        setCompletedQuizIds(completed);
        setIsCompleted(completed.includes(decodeURIComponent(id)));
      } catch (error) {
        console.error('Failed to load quiz data', error);
      }
    };
    
    loadQuizData();
  }, [id]);
  
  if (!quizRound) {
    return (
      <SafeAreaView className="flex-1 bg-primary-50 items-center justify-center">
        <Text className="text-neutral-500">Loading quiz...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1 p-4 pt-2">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="p-2 -m-2 mr-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-primary-900">
            {quizRound.name} Quiz
          </Text>
        </View>
        
        <View className="bg-surface rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-start">
            <View 
              className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center mr-3"
            >
              <Ionicons 
                name={quizRound.imageKey || 'help-circle'} 
                size={24} 
                color="#4f46e5" 
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-neutral-800 mb-2">
                About this Quiz
              </Text>
              <Text className="text-neutral-600 mb-3">
                {quizRound.description || `This quiz contains ${quizRound.questions.length} questions about ${quizRound.name.toLowerCase()}. Test your knowledge and learn new facts!`}
              </Text>
            </View>
          </View>
          
          <View className="flex-row flex-wrap mt-2">
            <View className="flex-row items-center mr-4 mb-2">
              <Ionicons name="time-outline" size={16} color="#737373" />
              <Text className="text-sm text-neutral-500 ml-1">
                ~{quizRound.questions.length} min
              </Text>
            </View>
            
            {quizRound.difficulty && (
              <View className="flex-row items-center mr-4 mb-2">
                <Ionicons name="barbell-outline" size={16} color="#737373" />
                <Text className="text-sm text-neutral-500 ml-1 capitalize">
                  {quizRound.difficulty} difficulty
                </Text>
              </View>
            )}
            
            <View className="flex-row items-center mb-2">
              <Ionicons name="help-circle-outline" size={16} color="#737373" />
              <Text className="text-sm text-neutral-500 ml-1">
                {quizRound.questions.length} questions
              </Text>
            </View>
            
            {isCompleted && (
              <View className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle" size={16} color="#059669" />
                <Text className="text-sm text-green-600 ml-1">Completed</Text>
              </View>
            )}
          </View>
        </View>
        
        <TouchableOpacity
          className="bg-primary-600 py-3 px-4 rounded-lg items-center mb-4"
          onPress={() => {
            // Navigate to the gameplay screen with id param
            const quizId = quizRound.id || quizRound.name;
            console.log('Starting quiz with ID:', quizId);
            router.push(`/QuizGameplay?id=${encodeURIComponent(quizId)}`);
          }}
        >
          <Text className="text-surface font-bold text-lg">
            {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
          </Text>
        </TouchableOpacity>
        
        {/* Question Preview Section */}
        <View className="bg-surface rounded-xl p-4 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-neutral-800 mb-3">
            Questions Preview
          </Text>
          
          {quizRound.questions.slice(0, 2).map((question, index) => (
            <View key={index} className="mb-3 pb-3 border-b border-neutral-100">
              <Text className="text-neutral-800 font-medium mb-1">
                {index + 1}. {question.question}
              </Text>
              <Text className="text-xs text-neutral-500">
                {question.options.length} possible answers
              </Text>
            </View>
          ))}
          
          {quizRound.questions.length > 2 && (
            <Text className="text-primary-600 text-sm mt-1">
              +{quizRound.questions.length - 2} more questions
            </Text>
          )}
        </View>
        
        {/* For demo purposes - toggle completion status */}
        <TouchableOpacity
          className="py-3 px-4 rounded-lg items-center border border-neutral-300"
          onPress={async () => {
            const quizId = quizRound.id || quizRound.name;
            const updated = await toggleQuizCompletion(completedQuizIds, quizId);
            setCompletedQuizIds(updated);
            setIsCompleted(updated.includes(quizId));
          }}
        >
          <Text className="font-medium text-neutral-700">
            {isCompleted ? 'Mark as Not Completed' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
