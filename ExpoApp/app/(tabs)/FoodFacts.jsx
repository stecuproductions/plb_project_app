import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FoodFactCard } from "../../components/ui/FoodFactCard";
import { getFacts } from "../../scripts/factsProvider";

export default function FoodFacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedFactId, setExpandedFactId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [foodFacts, setFoodFacts] = useState([]);
  
  useEffect(() => {
    const facts = getFacts();
    const factsWithId = facts.map((fact, index) => ({
      ...fact,
      id: index.toString()
    }));
    
    setFoodFacts(factsWithId);
    
    const uniqueCategories = [...new Set(facts.map(fact => fact.category).filter(Boolean))];
    setCategories(uniqueCategories);
  }, []);

  const filteredFacts = foodFacts.filter(fact => {
    const matchesSearch = searchQuery === "" || 
      fact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      fact.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCardPress = (factId) => {
    setExpandedFactId(expandedFactId === factId ? null : factId);
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // Render a category filter pill
  const renderCategoryPill = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategorySelect(item)}
      className={`px-4 mt py-2 rounded-full mr-3 ${
        selectedCategory === item ? 'bg-primary-600' : 'bg-neutral-100'
      }`}
    >
      <Text 
        className={`font-medium ${
          selectedCategory === item ? 'text-surface' : 'text-neutral-800'
        }`}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <StatusBar style="dark" hidden={true} />
      
      <View className="bg-surface p-4 shadow-sm z-10">
        <Text className="text-2xl font-bold text-primary-900 mb-4">Food Facts</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-neutral-50 rounded-lg px-3 py-2 mb-4">
          <Ionicons name="search" size={20} color="#737373" />
          <TextInput
            className="flex-1 ml-2 text-neutral-800"
            placeholder="Search food facts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <Ionicons
              name="close-circle"
              size={20}
              color="#737373"
              onPress={() => setSearchQuery("")}
            />
          )}
        </View>
        
        {/* Category Filter */}
        {categories.length > 0 && (
          <View className="mb-2">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={renderCategoryPill}
              keyExtractor={item => item}
              className="py-2"
              ListHeaderComponent={
                <TouchableOpacity
                  onPress={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    selectedCategory === null ? 'bg-primary-600' : 'bg-neutral-100'
                  }`}
                >
                  <Text 
                    className={`font-medium ${
                      selectedCategory === null ? 'text-surface' : 'text-neutral-800'
                    }`}
                  >
                    All
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
        )}
      </View>
      
      <ScrollView className="flex-1 px-4 pt-2">
        {filteredFacts.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-neutral-500 text-lg">No food facts found</Text>
          </View>
        ) : (
          filteredFacts.map((fact) => (
            <FoodFactCard
              key={fact.id}
              title={fact.title}
              description={fact.description}
              imageUrl={fact.imageUrl}
              category={fact.category}
              tags={fact.tags}
              source={fact.source}
              link={fact.link}
              onPress={() => handleCardPress(fact.id)}
              expanded={expandedFactId === fact.id}
            />
          ))
        )}
        
      </ScrollView>
      
      
    </SafeAreaView>
  );
}