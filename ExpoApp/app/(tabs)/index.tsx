import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { FactOfTheDay } from '@/components/homePageComponents/FactOfTheDay';
import { NavigationCard } from '@/components/homePageComponents/NavigationCard';
import { StreakInfo } from '@/components/homePageComponents/StreakInfo';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-4">
        {/* Header Section */}
        <View className="mt-16 mb-8">
          <Text className="text-3xl font-bold text-primary-900 mb-2">WELCOME TO NONAME</Text>
          <Text className="text-xl text-primary-700">Learn dieting in a fun way</Text>
        </View>
        
        
        {/* Fact of the Day */}
        <FactOfTheDay />
        
        {/* Streak Info */}
        <View className="my-4">
          <StreakInfo />
        </View>
        
        {/* Navigation Cards */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-primary-800 mb-4">Quick Links</Text>
          <View className="flex-row flex-wrap justify-between">
            <NavigationCard 
              title="FoodFacts" 
              description="Learn about food" 
              customClassName="w-[48%] mb-4" 
            />
            <NavigationCard 
              title="Quizzes" 
              description="Discover new content" 
              customClassName="w-[48%] mb-4" 
            />
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
