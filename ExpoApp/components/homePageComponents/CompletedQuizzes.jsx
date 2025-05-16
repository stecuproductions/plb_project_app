import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { loadCompletedQuizzes } from "../../scripts/quizStorage";
import { Button } from "../ui/Buttons";
import { useRouter } from "expo-router";

export function CompletedQuizzes() {
    const [completedQuizCount, setCompletedQuizCount] = useState(0);
    const router = useRouter();
    
    useEffect(() => {
        const loadCompletedQuizzesData = async () => {
            try {
                const completedQuizzes = await loadCompletedQuizzes();
                setCompletedQuizCount(completedQuizzes.length);
            } catch (error) {
                console.error("Failed to load completed quizzes", error);
            }
        };
        
        loadCompletedQuizzesData();
    }, []);
    
    const handleViewQuizzes = () => {
        router.push("/(tabs)/QuizPage");
    };
    
    return (
        <View className="rounded-xl shadow-md p-4 py-6 bg-surface backdrop-blur-3xl">
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-base text-xl text-primary-900">🏆 Completed Quizzes </Text>
                    <Text className="text-primary-900 text-2xl font-bold">{completedQuizCount} quizzes</Text>
                </View>
                <Button 
                    variant="primary"
                    label="View Quizzes"
                    size="sm"
                    onPress={handleViewQuizzes}
                />
            </View>
            <View className="bg-surface/20 rounded-lg mt-2 ">
                <Text className="text-primary-900 text-xs">Complete more quizzes to track your learning progress!</Text>
            </View>
        </View>
    );
}
