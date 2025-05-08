import React from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "../ui/Buttons";

/**
 * Component for diet input and submission
 * @param {string} inputText - Current input text
 * @param {function} setInputText - Function to update input text
 * @param {function} onSubmit - Function to handle form submission
 * @param {boolean} isLoading - Whether the form is in a loading state
 */
export function DietInputForm({ inputText, setInputText, onSubmit, isLoading }) {
  return (
    <View className="bg-surface rounded-xl shadow-md p-4">
      <Text className="text-primary-800 font-semibold mb-2">
        What did you eat today?
      </Text>
      
      <TextInput
        className="bg-neutral-50 rounded-lg p-3 min-h-[120px] text-neutral-800 mb-4"
        placeholder="For breakfast I had oatmeal with berries and honey. For lunch..."
        placeholderTextColor="#9ca3af"
        multiline
        textAlignVertical="top"
        value={inputText}
        onChangeText={setInputText}
        editable={!isLoading}
      />
      
      <View className="flex-row">
        <View className="flex-1 mr-2">
          <Button
            variant="outline"
            label="Clear"
            onPress={() => setInputText("")}
            disabled={isLoading || !inputText.trim()}
            fullWidth
          />
        </View>
        <View className="flex-1 ml-2">
          <Button
            variant="primary"
            label="Analyze"
            rightIcon="analytics-outline"
            onPress={onSubmit}
            isLoading={isLoading}
            disabled={isLoading || !inputText.trim()}
            fullWidth
          />
        </View>
      </View>
      
      <Text className="text-neutral-500 text-xs mt-3 text-center">
        For best results, provide as much detail as possible about your meals.
      </Text>
    </View>
  );
}