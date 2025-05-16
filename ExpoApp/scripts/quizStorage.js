import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for completed quizzes
const COMPLETED_QUIZZES_KEY = 'completed_quizzes';

// Load completed quizzes from storage
export const loadCompletedQuizzes = async () => {
  try {
    const storedCompletedQuizIds = await AsyncStorage.getItem(COMPLETED_QUIZZES_KEY);
    if (storedCompletedQuizIds) {
      return JSON.parse(storedCompletedQuizIds);
    }
    return [];
  } catch (error) {
    console.error('Failed to load completed quizzes', error);
    return [];
  }
};

// Save completed quiz
export const markQuizAsCompleted = async (completedQuizIds, quizId) => {
  try {
    if (!completedQuizIds.includes(quizId)) {
      const updatedCompletedQuizIds = [...completedQuizIds, quizId];
      await AsyncStorage.setItem(COMPLETED_QUIZZES_KEY, JSON.stringify(updatedCompletedQuizIds));
      return updatedCompletedQuizIds;
    }
    return completedQuizIds;
  } catch (error) {
    console.error('Failed to mark quiz as completed', error);
    return completedQuizIds;
  }
};

// Remove completed quiz
export const markQuizAsNotCompleted = async (completedQuizIds, quizId) => {
  try {
    const updatedCompletedQuizIds = completedQuizIds.filter(id => id !== quizId);
    await AsyncStorage.setItem(COMPLETED_QUIZZES_KEY, JSON.stringify(updatedCompletedQuizIds));
    return updatedCompletedQuizIds;
  } catch (error) {
    console.error('Failed to mark quiz as not completed', error);
    return completedQuizIds;
  }
};

// Toggle quiz completion status
export const toggleQuizCompletion = async (completedQuizIds, quizId) => {
  if (completedQuizIds.includes(quizId)) {
    return await markQuizAsNotCompleted(completedQuizIds, quizId);
  } else {
    return await markQuizAsCompleted(completedQuizIds, quizId);
  }
};

// Add completed quiz without checking (used from QuizGameplay)
export const addCompletedQuiz = async (quizId) => {
  try {
    const completedQuizIds = await loadCompletedQuizzes();
    if (!completedQuizIds.includes(quizId)) {
      const updatedCompletedQuizIds = [...completedQuizIds, quizId];
      await AsyncStorage.setItem(COMPLETED_QUIZZES_KEY, JSON.stringify(updatedCompletedQuizIds));
      console.log(`Quiz ${quizId} marked as completed`);
      return updatedCompletedQuizIds;
    }
    return completedQuizIds;
  } catch (error) {
    console.error('Failed to add completed quiz', error);
    return [];
  }
};
