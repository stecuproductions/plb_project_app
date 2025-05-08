import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Buttons";

/**
 * Food Fact Card component to display food information
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the food fact
 * @param {string} props.description - Description of the food fact
 * @param {string} [props.imageUrl] - Optional URL for the food image
 * @param {string} props.category - Category of the food
 * @param {Array} [props.tags=[]] - Array of tags related to the food
 * @param {string} props.source - Source of the information
 * @param {string} props.link - Link to the source
 * @param {Function} props.onPress - Function to call when card is pressed
 * @param {boolean} [props.expanded=false] - Whether to show the expanded view
 */

export function FoodFactCard({
  title,
  description,
  imageUrl,
  category,
  tags = [],
  source,
  link,
  onPress,
  expanded = false,
  className = "",
}) {
  const handleSourcePress = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  const renderTags = () => {
    if (!tags || tags.length === 0) return null;

    return (
      <View className="flex-row flex-wrap mb-3">
        {tags.slice(0, 3).map((tag, index) => (
          <View
            key={index}
            className="bg-primary-50 px-2 py-1 rounded-full mr-2 mb-1"
          >
            <Text className="text-primary-600 text-xs font-medium">{tag}</Text>
          </View>
        ))}
        {tags.length > 3 && (
          <Text className="text-primary-600 text-xs font-medium self-center">
            +{tags.length - 3} more
          </Text>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`bg-surface rounded-xl shadow-md overflow-hidden mb-4 ${className}`}
    >
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-1">
          {category && (
            <View className="bg-secondary-500 px-2 py-0.5 rounded">
              <Text className="text-surface text-xs font-medium">
                {category}
              </Text>
            </View>
          )}
        </View>

        <Text className="text-primary-900 text-lg font-semibold mb-1">
          {title}
        </Text>
        <Text
          className="text-neutral-700 mb-3"
          numberOfLines={expanded ? undefined : 2}
        >
          {description}
        </Text>

        {renderTags()}

        <View className="flex-row items-center justify-between">
          <Text className="text-neutral-500 text-xs">Source: {source}</Text>

          <Button
            variant="text"
            label={expanded ? "Show less" : "Learn more"}
            size="sm"
            rightIcon={
              expanded ? "chevron-up-outline" : "chevron-forward-outline"
            }
            onPress={onPress}
          />
        </View>

        {expanded && link && (
          <View className="mt-3 pt-3 border-t border-neutral-100">
            <Button
              variant="primary"
              size="sm"
              label="Go to source"
              rightIcon="open-outline"
              onPress={handleSourcePress}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}