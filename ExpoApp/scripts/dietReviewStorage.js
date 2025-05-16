import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for diet reviews
const DIET_REVIEWS_KEY = 'diet_reviews';

/**
 * Store a new diet review in AsyncStorage
 * @param {Object} reviewData - The review data from the AI analysis
 * @returns {Promise<Array>} - Updated array of reviews
 */
export const saveDietReview = async (reviewData) => {
  try {
    if (!reviewData || typeof reviewData !== 'object') {
      console.error('Invalid review data format');
      return [];
    }
    
    // Add timestamp to the review data
    const reviewWithTimestamp = {
      ...reviewData,
      timestamp: new Date().toISOString(),
      id: new Date().getTime().toString()
    };
    
    // Get existing reviews
    const existingReviews = await loadDietReviews();
    
    // Add new review to the beginning of the array (most recent first)
    const updatedReviews = [reviewWithTimestamp, ...existingReviews];
    
    // Limit to maximum 10 stored reviews to avoid excessive storage use
    const limitedReviews = updatedReviews.slice(0, 10);
    
    // Save to AsyncStorage
    await AsyncStorage.setItem(DIET_REVIEWS_KEY, JSON.stringify(limitedReviews));
    
    return limitedReviews;
  } catch (error) {
    console.error('Failed to save diet review:', error);
    return [];
  }
};

/**
 * Load all stored diet reviews from AsyncStorage
 * @returns {Promise<Array>} - Array of stored reviews
 */
export const loadDietReviews = async () => {
  try {
    const storedReviews = await AsyncStorage.getItem(DIET_REVIEWS_KEY);
    if (storedReviews) {
      return JSON.parse(storedReviews);
    }
    return [];
  } catch (error) {
    console.error('Failed to load diet reviews:', error);
    return [];
  }
};

/**
 * Get stats summary from all reviews
 * @returns {Promise<Object>} - Stats summary object
 */
export const getDietReviewStats = async () => {
  try {
    const reviews = await loadDietReviews();
    
    if (reviews.length === 0) {
      return {
        reviewCount: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        improvementTrend: 0,
        lastReviewDate: null
      };
    }
    
    // Calculate statistics
    const scores = reviews.map(review => {
      const score = parseFloat(review.overallScore);
      return isNaN(score) ? 0 : score;
    });
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    
    // Calculate improvement trend (positive = improving, negative = declining)
    let improvementTrend = 0;
    if (reviews.length >= 2) {
      const latestScore = scores[0];
      const previousScore = scores[1];
      improvementTrend = latestScore - previousScore;
    }
    
    return {
      reviewCount: reviews.length,
      averageScore: averageScore.toFixed(1),
      highestScore: highestScore.toFixed(1),
      lowestScore: lowestScore.toFixed(1),
      improvementTrend: improvementTrend.toFixed(1),
      lastReviewDate: reviews[0]?.timestamp || null
    };
  } catch (error) {
    console.error('Failed to calculate diet review stats:', error);
    return {
      reviewCount: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      improvementTrend: 0,
      lastReviewDate: null
    };
  }
};

/**
 * Get a specific diet review by ID
 * @param {string} reviewId - The ID of the review to get
 * @returns {Promise<Object|null>} - The review object or null if not found
 */
export const getReviewById = async (reviewId) => {
  try {
    const reviews = await loadDietReviews();
    return reviews.find(review => review.id === reviewId) || null;
  } catch (error) {
    console.error('Failed to get review by ID:', error);
    return null;
  }
};

/**
 * Delete all stored diet reviews
 * @returns {Promise<boolean>} - Success status
 */
export const clearDietReviews = async () => {
  try {
    await AsyncStorage.removeItem(DIET_REVIEWS_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear diet reviews:', error);
    return false;
  }
};
