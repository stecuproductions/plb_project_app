import { useEffect, useState } from "react";
import { Linking, Text, View } from "react-native";
import { getFactOfTheDay } from "../../scripts/factsProvider";
import { Button } from "../ui/Buttons";

export function FactOfTheDay() {
  const [fact, setFact] = useState(null);

  useEffect(() => {
    async function loadFact() {
      const fetchedFact = await getFactOfTheDay();
      setFact(fetchedFact);
    }

    loadFact();
  }, []);

  const handleSourcePress = () => {
    if (fact?.link) {
      Linking.openURL(fact.link);
    }
  };

  if (!fact) {
    return (
      <View className="bg-surface rounded-xl shadow-md p-4 mb-4 h-36 items-center justify-center">
        <Text className="text-primary-600 text-lg font-medium">
          Loading today's fact...
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-surface rounded-xl shadow-md p-4 mb-4">
      <Text className="text-xl font-semibold text-primary-800 mb-2">
        Fact of the Day
      </Text>
      <Text className="text-lg font-medium text-primary-700 mb-2">
        {fact.title}
      </Text>
      <Text className="text-neutral-700 mb-4">{fact.description}</Text>
      <View className="flex-row items-center flex-wrap justify-between">
        <Text className="text-neutral-500 text-xs">Source: {fact.source}</Text>
        <Button
          variant="primary"
          size="sm"
          label="Go to source"
          rightIcon="arrow-forward"
          onPress={handleSourcePress}
        />
      </View>
    </View>
  );
}
