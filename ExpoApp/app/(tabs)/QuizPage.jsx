import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { QuizCard } from '../../components/quizComponents/QuizCard';
import { QuizProgress } from '../../components/quizComponents/QuizProgress';
import { loadCompletedQuizzes } from '../../scripts/quizStorage';

export default function QuizPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [quizRounds, setQuizRounds] = useState([]);
  const [completedQuizIds, setCompletedQuizIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  
  // Load quiz data from json file
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const quizData = require('../../assets/data/quiz.json');
        setQuizRounds(quizData.quiz.rounds);
        
        // Extract unique categories and difficulties
        const uniqueCategories = [...new Set(quizData.quiz.rounds
          .map(round => round.category)
          .filter(Boolean))];
        setCategories(uniqueCategories);
        
        const uniqueDifficulties = [...new Set(quizData.quiz.rounds
          .map(round => round.difficulty)
          .filter(Boolean))];
        setDifficulties(uniqueDifficulties);
        
        // Load completed quizzes
        const completed = await loadCompletedQuizzes();
        setCompletedQuizIds(completed);
      } catch (error) {
        console.error('Failed to load quiz data', error);
      }
    };
    
    loadQuizData();
  }, []);
  

  const filteredQuizRounds = quizRounds.filter(round => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      round.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (round.category && round.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (round.description && round.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === null || 
      round.category === selectedCategory;
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === null || 
      round.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  // Handle quiz selection
  const handleQuizSelect = (round) => {
    router.push(`/QuizDetailPage?id=${encodeURIComponent(round.id || round.name)}`);
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  // Handle difficulty selection
  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <StatusBar style="dark" />
      
      <View className="bg-surface p-4 shadow-sm z-10">
        <Text className="text-2xl font-bold text-primary-900 mb-2">Knowledge Quiz</Text>
        <Text className="text-neutral-600 mb-3">Test your health knowledge with these interactive quizzes</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-neutral-50 rounded-lg px-3 py-2 mb-3">
          <Ionicons name="search" size={20} color="#737373" />
          <TextInput
            className="flex-1 ml-2 text-neutral-800"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#737373" />
            </TouchableOpacity>
          )}
        </View>
        
        <View className="flex-row items-center justify-between mb-1 mt-1">
          <Text className="text-sm font-medium text-neutral-800">Categories</Text>
          {selectedCategory && (
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text className="text-xs text-primary-600">Clear</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {categories.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-3 -mx-1"
          >
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              className={`px-3 py-1 mx-1 rounded-full ${
                selectedCategory === null ? 'bg-primary-600' : 'bg-neutral-100'
              }`}
            >
              <Text 
                className={`font-medium ${
                  selectedCategory === null ? 'text-white' : 'text-neutral-700'
                }`}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(category)}
                className={`px-3 py-1 mx-1 rounded-full ${
                  selectedCategory === category ? 'bg-primary-600' : 'bg-neutral-100'
                }`}
              >
                <Text 
                  className={`font-medium ${
                    selectedCategory === category ? 'text-white' : 'text-neutral-700'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        
        {/* Difficulty Label */}
        {difficulties.length > 0 && (
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-sm font-medium text-neutral-800">Difficulty</Text>
            {selectedDifficulty && (
              <TouchableOpacity onPress={() => setSelectedDifficulty(null)}>
                <Text className="text-xs text-primary-600">Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {/* Difficulty Filter */}
        {difficulties.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-2 -mx-1"
          >
            <TouchableOpacity
              onPress={() => setSelectedDifficulty(null)}
              className={`px-3 py-1 mx-1 rounded-full ${
                selectedDifficulty === null ? 'bg-primary-600' : 'bg-neutral-100'
              }`}
            >
              <Text 
                className={`font-medium ${
                  selectedDifficulty === null ? 'text-white' : 'text-neutral-700'
                }`}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {difficulties.map(difficulty => (
              <TouchableOpacity
                key={difficulty}
                onPress={() => handleDifficultySelect(difficulty)}
                className={`px-3 py-1 mx-1 rounded-full ${
                  selectedDifficulty === difficulty ? 'bg-primary-600' : 'bg-neutral-100'
                }`}
              >
                <Text 
                  className={`font-medium capitalize ${
                    selectedDifficulty === difficulty ? 'text-white' : 'text-neutral-700'
                  }`}
                >
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      
      <FlatList
        className="flex-1 px-4 pt-3"
        data={filteredQuizRounds}
        keyExtractor={(item) => item.id || item.name}
        ListHeaderComponent={
          <>
            <QuizProgress 
              completed={completedQuizIds.length} 
              total={quizRounds.length} 
            />
            <View className="mb-4 p-4 bg-primary-100 rounded-xl">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-primary-900">Ready to test your knowledge?</Text>
                  <Text className="text-primary-700 mt-1">Complete quizzes to track your learning progress</Text>
                </View>
                <View className="w-12 h-12 bg-primary-200 rounded-full items-center justify-center">
                  <Ionicons name="trophy" size={24} color="#4f46e5" />
                </View>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <QuizCard
            quizRound={item}
            onPress={() => handleQuizSelect(item)}
            isCompleted={completedQuizIds.includes(item.id || item.name)}
          />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-8">
            <Ionicons name="help-buoy-outline" size={48} color="#737373" />
            <Text className="text-neutral-500 text-lg mt-2">
              {searchQuery ? 'No quizzes found' : 'Loading quizzes...'}
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </SafeAreaView>
  );
}
