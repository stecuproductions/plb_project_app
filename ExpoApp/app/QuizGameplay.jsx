import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { QuizQuestion } from '../components/quizComponents/QuizQuestion';
import { QuizResult } from '../components/quizComponents/QuizResult';
import { addCompletedQuiz } from '../scripts/quizStorage';

export default function QuizGameplay() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quizRound, setQuizRound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Load quiz data based on ID
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        // Check if we have an ID
        if (!id) {
          console.error('No quiz ID provided');
          router.back();
          return;
        }
        
        const decodedId = decodeURIComponent(id);
        console.log('Loading quiz with ID:', decodedId);
        
        // Load quiz data
        const quizData = require('../assets/data/quiz.json');
        
        // Log all available quiz IDs for debugging
        console.log('Available quiz IDs:', quizData.quiz.rounds.map(r => r.id || r.name));
        
        const round = quizData.quiz.rounds.find(
          (r) => (r.id && r.id === decodedId) || r.name === decodedId
        );
        
        if (!round) {
          console.error(`No quiz found with ID: ${id}`);
          router.back();
          return;
        }
        
        setQuizRound(round);
      } catch (error) {
        console.error('Failed to load quiz data', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadQuizData();
  }, [id, router]);
  
  // Handle user selecting an answer
  const handleAnswer = (selectedOption) => {
    const currentQuestion = quizRound.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Record the answer
    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        selectedOption,
        correctOption: currentQuestion.correctAnswer,
        isCorrect
      }
    ]);
    
    // Update score if answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < quizRound.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };
  
  // Complete the quiz and save results
  const completeQuiz = async () => {
    // Mark quiz as completed in storage
    if (quizRound?.id) {
      await addCompletedQuiz(quizRound.id);
    } else if (quizRound?.name) {
      await addCompletedQuiz(quizRound.name);
    }
    
    // Display results
    setQuizComplete(true);
  };
  
  // Retry the quiz
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
  };
  
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <StatusBar style="dark" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text className="mt-4 text-neutral-600">Loading quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (!quizRound) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <StatusBar style="dark" />
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-xl font-bold text-neutral-800 mb-2">Quiz Not Found</Text>
          <Text className="text-neutral-600 text-center mb-6">
            We couldn't find the quiz you're looking for.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (quizComplete) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <StatusBar style="dark" />
        <QuizResult
          score={score}
          totalQuestions={quizRound.questions.length}
          categoryName={quizRound.category || quizRound.name}
          onRetry={handleRetry}
        />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar style="dark" />
      
      <View className="px-4 py-3 flex-row justify-between items-center border-b border-neutral-100">
        <Text className="font-bold text-neutral-800">
          {quizRound.name}
        </Text>
        <View className="bg-primary-50 px-3 py-1 rounded-full">
          <Text className="text-primary-700 font-medium">
            {currentQuestionIndex + 1} / {quizRound.questions.length}
          </Text>
        </View>
      </View>
      
      <QuizQuestion
        question={quizRound.questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </SafeAreaView>
  );
}
