import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar({ state, descriptors, navigation }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const animatedValues = React.useRef(state.routes.map(() => new Animated.Value(0))).current;
  
  useEffect(() => {
    Animated.timing(animatedValues[state.index], {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    

    state.routes.forEach((_, i) => {
      if (i !== state.index) {
        animatedValues[i].setValue(0);
      }
    });
  }, [state.index, animatedValues]);
  
  const visibleRoutes = state.routes.filter(route => route.name !== 'ButtonsDemo');

  return (
    <View style={[
      styles.container, 
      { paddingBottom: Math.max(insets.bottom, 5) }
    ]}>
      {visibleRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        
        // Adjust index to account for filtered routes
        const actualIndex = state.routes.findIndex(r => r.key === route.key);
        const isFocused = state.index === actualIndex;
        
        // Define icons based on route name
        let iconName;
        switch (route.name) {
          case 'index':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          case 'FoodFacts':
            iconName = isFocused ? 'nutrition' : 'nutrition-outline';
            break;
          case 'AiReviewer':
            iconName = isFocused ? 'analytics' : 'analytics-outline';
            break;
          case 'QuizPage':
            iconName = isFocused ? 'help-circle' : 'help-circle-outline';
            break;
          default:
            iconName = isFocused ? 'apps' : 'apps-outline';
        }
        
        const animatedScale = animatedValues[actualIndex].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.15],
        });
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          
          if (!isFocused && !event.defaultPrevented) {
            router.replace(`/(tabs)/${route.name === 'index' ? '' : route.name}`);
          }
        };
        
        const activeColor = '#4f46e5'; // primary-600
        const inactiveColor = '#737373'; // neutral-500
        
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            {isFocused && (
              <View style={styles.activeTabBackground} />
            )}
            
            <Animated.View 
              style={[
                styles.tabContent,
                { transform: [{ scale: animatedScale }] }
              ]}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? activeColor : inactiveColor}
              />
              <Text style={[
                styles.tabLabel, 
                { color: isFocused ? activeColor : inactiveColor }
              ]}>
                {label === 'index' ? 'Home' : label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabBackground: {
    position: 'absolute',
    top: 6,
    left: '15%',
    right: '15%',
    bottom: 6,
    backgroundColor: 'rgba(79, 70, 229, 0.08)', 
    borderRadius: 8,
  },
});