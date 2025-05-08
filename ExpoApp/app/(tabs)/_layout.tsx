import { Tabs } from 'expo-router';
import React from 'react';
import { CustomTabBar } from '../../components/ui/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="FoodFacts"
        options={{
          title: 'Food Facts',
        }}
      />
      <Tabs.Screen
        name="AiReviewer"
        options={{
          title: 'Diet Reviewer',
        }}
      />
    </Tabs>
  );
}
