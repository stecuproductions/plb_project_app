import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button, FloatingActionButton, IconButton, PillButton, SocialButton } from './Buttons';

export default function ButtonDemo() {
  const [selectedPill, setSelectedPill] = useState('All');

  const handlePress = (buttonName) => {
    Alert.alert('Button Pressed', `You pressed the ${buttonName} button`);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-6">
      <Text className="text-2xl font-bold text-indigo-900 mb-8">Interactive Buttons Demo</Text>
      
      {/* Standard Buttons Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-indigo-800 mb-4">Standard Buttons</Text>
        
        <View className="space-y-4">
          <Button 
            variant="primary" 
            label="Primary Button" 
            onPress={() => handlePress('Primary')} 
          />
          
          <Button 
            variant="secondary" 
            label="Secondary Button" 
            onPress={() => handlePress('Secondary')} 
          />
          
          <Button 
            variant="outline" 
            label="Outline Button" 
            onPress={() => handlePress('Outline')} 
          />
          
          <Button 
            variant="text" 
            label="Text Button" 
            onPress={() => handlePress('Text')} 
          />
          
          <Button 
            variant="danger" 
            label="Danger Button" 
            onPress={() => handlePress('Danger')} 
          />
        </View>
      </View>
      
      {/* Button Sizes Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-indigo-800 mb-4">Button Sizes</Text>
        
        <View className="space-y-4">
          <Button 
            size="sm" 
            label="Small Button" 
            onPress={() => handlePress('Small')} 
          />
          
          <Button 
            size="md" 
            label="Medium Button" 
            onPress={() => handlePress('Medium')} 
          />
          
          <Button 
            size="lg" 
            label="Large Button" 
            onPress={() => handlePress('Large')} 
          />
        </View>
      </View>
      
      {/* Buttons with Icons */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-indigo-800 mb-4">Buttons with Icons</Text>
        
        <View className="space-y-4">
          <Button 
            label="Left Icon" 
            leftIcon="arrow-back"
            onPress={() => handlePress('Left Icon')} 
          />
          
          <Button 
            label="Right Icon" 
            rightIcon="arrow-forward"
            onPress={() => handlePress('Right Icon')} 
          />
          
          <Button 
            variant="secondary"
            label="Both Icons" 
            leftIcon="star"
            rightIcon="chevron-down"
            onPress={() => handlePress('Both Icons')} 
          />
        </View>
      </View>
      
      {/* Button States */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-indigo-800 mb-4">Button States</Text>
        
        <View className="space-y-4">
          <Button 
            label="Loading Button" 
            isLoading={true}
            onPress={() => {}} 
          />
          
          <Button 
            label="Disabled Button" 
            disabled={true}
            onPress={() => {}} 
          />
          
          <Button 
            label="Full Width Button" 
            fullWidth={true}
            onPress={() => handlePress('Full Width')} 
          />
        </View>
      </View>
      
      {/* Icon Buttons */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-indigo-800 mb-4">Icon Buttons</Text>
        
        <View className="flex-row justify-around mb-4">
          <IconButton 
            icon="heart" 
            onPress={() => handlePress('Heart Icon')} 
          />
          
          <IconButton 
            icon="add" 
            variant="secondary"
            onPress={() => handlePress('Add Icon')} 
          />
          
          <IconButton 
            icon="trash" 
            variant="danger"
            onPress={() => handlePress('Trash Icon')} 
          />
          
          <IconButton 
            icon="settings" 
            variant="outline"
            onPress={() => handlePress('Settings Icon')} 
          />
        </View>
        
        <View className="flex-row justify-around">
          <IconButton 
            icon="notifications" 
            size="sm"
            onPress={() => handlePress('Small Icon')} 
          />
          
          <IconButton 
            icon="notifications" 
            size="md"
            onPress={() => handlePress('Medium Icon')} 
          />
          
          <IconButton 
            icon="notifications" 
            size="lg"
            onPress={() => handlePress('Large Icon')} 
          />
        </View>
      </View>
      
      {/* Social Buttons */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-indigo-800 mb-4">Social Buttons</Text>
        
        <View className="space-y-4">
          <SocialButton 
            provider="google" 
            onPress={() => handlePress('Google')} 
          />
          
          <SocialButton 
            provider="facebook" 
            onPress={() => handlePress('Facebook')} 
          />
          
          <SocialButton 
            provider="apple" 
            onPress={() => handlePress('Apple')} 
          />
          
          <SocialButton 
            provider="twitter" 
            onPress={() => handlePress('Twitter')} 
          />
        </View>
      </View>
      
      {/* Pill Buttons */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-indigo-800 mb-4">Pill Buttons</Text>
        
        <View className="flex-row flex-wrap gap-2">
          {['All', 'Food', 'Exercise', 'Sleep', 'Mood'].map((pill) => (
            <PillButton
              key={pill}
              label={pill}
              selected={selectedPill === pill}
              onPress={() => setSelectedPill(pill)}
            />
          ))}
        </View>
      </View>
      
      {/* Space for FAB visibility */}
      <View className="h-20" />
      
      {/* Floating Action Button */}
      <FloatingActionButton 
        icon="add" 
        onPress={() => handlePress('FAB')} 
      />
    </ScrollView>
  );
}