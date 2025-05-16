import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loadDietReviews } from '../../scripts/dietReviewStorage';

export function ReviewHistory({ onReviewSelect, forceRefresh }) {
  const [reviewHistory, setReviewHistory] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    loadReviewHistory();
  }, [forceRefresh]);
  
  const loadReviewHistory = async () => {
    const reviews = await loadDietReviews();
    setReviewHistory(reviews);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (reviewHistory.length === 0) {
    return null;
  }
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const renderReviewItem = ({ item }) => {
    // Get diet summary or first part of description
    const reviewSummary = item.dietSummary || item.overallFeedback || 
                          (item.description ? item.description.slice(0, 40) + '...' : 'Review ' + formatDate(item.timestamp));
                          
    return (
      <TouchableOpacity 
        className="flex-row justify-between items-center p-3 border-b border-neutral-100"
        onPress={() => onReviewSelect && onReviewSelect(item)}
      >
        <View className="flex-row items-center flex-1">
          <View className="mr-3 bg-primary-100 rounded-full p-2">
            <Text className="font-semibold text-primary-800">{item.overallScore}/10</Text>
          </View>
          <View className="flex-1">
            <Text numberOfLines={1} className="text-neutral-800 font-medium">
              {reviewSummary}
            </Text>
            <Text className="text-xs text-neutral-500">{formatDate(item.timestamp)}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </TouchableOpacity>
    );
  };
  
  return (
    <View className="bg-surface rounded-xl shadow-md p-4 mb-6">
      <TouchableOpacity 
        onPress={toggleExpanded}
        className="flex-row justify-between items-center mb-3"
      >
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={20} color="#4f46e5" />
          <Text className="text-lg font-semibold text-primary-800 ml-2">
            Review History
          </Text>
        </View>
        <Ionicons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={18} 
          color="#4f46e5" 
        />
      </TouchableOpacity>
      
      {expanded && (
        <FlatList
          data={reviewHistory}
          renderItem={renderReviewItem}
          keyExtractor={item => item.id}
          className="max-h-80"
        />
      )}
    </View>
  );
}