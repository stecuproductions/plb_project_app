import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function QuizQuestion({ question, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };
  
  return (
    <View className="p-4">
      <Text className="text-xl font-bold text-neutral-800 mb-6">
        {question.question}
      </Text>
      
      <View className="mb-6">
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`p-4 border rounded-lg mb-3 ${
              selectedOption === option
                ? selectedOption === question.correctAnswer
                  ? 'bg-green-100 border-green-400'
                  : 'bg-red-100 border-red-400'
                : 'border-neutral-300'
            }`}
            onPress={() => handleOptionSelect(option)}
            disabled={selectedOption !== null}
          >
            <Text 
              className={`${
                selectedOption === option
                  ? selectedOption === question.correctAnswer
                    ? 'text-green-800'
                    : 'text-red-800'
                  : 'text-neutral-800'
              }`}
            >
              {option}
            </Text>
            
            {selectedOption === option && selectedOption !== question.correctAnswer && (
              <View className="flex-row items-center mt-2">
                <Ionicons name="close-circle" size={16} color="#dc2626" />
                <Text className="text-red-600 ml-1">Incorrect</Text>
              </View>
            )}
            
            {selectedOption === option && selectedOption === question.correctAnswer && (
              <View className="flex-row items-center mt-2">
                <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
                <Text className="text-green-600 ml-1">Correct</Text>
              </View>
            )}
            
            {selectedOption !== null && option === question.correctAnswer && (
              <View className="flex-row items-center mt-2">
                <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
                <Text className="text-green-600 ml-1">Correct Answer</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {selectedOption && (
        <View className="mb-6">
          <TouchableOpacity 
            className="flex-row items-center mb-2"
            onPress={() => setShowExplanation(!showExplanation)}
          >
            <Text className="font-medium text-primary-600">
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </Text>
            <Ionicons 
              name={showExplanation ? 'chevron-up' : 'chevron-down'} 
              size={16} 
              color="#4f46e5" 
            />
          </TouchableOpacity>
          
          {showExplanation && (
            <View className="bg-primary-50 p-3 rounded-lg">
              <Text className="text-neutral-700">{question.explanation}</Text>
              
              {question.source && (
                <Text className="text-xs text-primary-600 mt-2">
                  Source: {question.source}
                </Text>
              )}
            </View>
          )}
        </View>
      )}
      
      <TouchableOpacity
        className={`py-3 px-4 rounded-lg items-center ${
          selectedOption ? 'bg-primary-600' : 'bg-neutral-300'
        }`}
        disabled={!selectedOption}
        onPress={handleNextQuestion}
      >
        <Text className={`font-bold ${selectedOption ? 'text-surface' : 'text-neutral-500'}`}>
          Next Question
        </Text>
      </TouchableOpacity>
    </View>
  );
}
