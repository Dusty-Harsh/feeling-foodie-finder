import { moodMealDataset, MoodSample } from "@/data/dataset";

export interface UserInputs {
  mood: string;
  hunger: string;
  craving: string;
  time: string;
  diet: string;
  restrictions: string;
  budget: string;
  weather: string;
  activity: string;
}

export interface RecommendationResult {
  meal: string;
  category: string;
  reason: string;
  matchScore: number;
}

// Calculate match score between user inputs and a dataset entry
function calculateMatchScore(inputs: UserInputs, sample: MoodSample): number {
  let score = 0;
  const weights = {
    mood: 5,
    craving: 4,
    hunger: 3,
    time: 3,
    diet: 4,
    restrictions: 4,
    weather: 1,
    activity: 2,
    budget: 2
  };

  if (inputs.mood === sample.mood) score += weights.mood;
  if (inputs.craving === sample.craving) score += weights.craving;
  if (inputs.hunger === sample.hunger) score += weights.hunger;
  if (inputs.time === sample.time) score += weights.time;
  if (inputs.diet === sample.diet) score += weights.diet;
  if (inputs.restrictions === sample.restrictions) score += weights.restrictions;
  if (inputs.weather === sample.weather) score += weights.weather;
  if (inputs.activity === sample.activity) score += weights.activity;
  if (inputs.budget === sample.budget) score += weights.budget;

  return score;
}

export function getRecommendation(inputs: UserInputs): RecommendationResult {
  let bestMatch: MoodSample | null = null;
  let highestScore = 0;

  // Find the best matching meal from the dataset
  for (const sample of moodMealDataset) {
    const score = calculateMatchScore(inputs, sample);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = sample;
    }
  }

  // Fallback to a random meal from matching mood if no good match
  if (!bestMatch || highestScore < 5) {
    const moodMatches = moodMealDataset.filter(s => s.mood === inputs.mood);
    if (moodMatches.length > 0) {
      bestMatch = moodMatches[Math.floor(Math.random() * moodMatches.length)];
      highestScore = 5;
    } else {
      // Ultimate fallback - random meal
      bestMatch = moodMealDataset[Math.floor(Math.random() * moodMealDataset.length)];
      highestScore = 1;
    }
  }

  return {
    meal: bestMatch.meal,
    category: bestMatch.category,
    reason: bestMatch.reason,
    matchScore: highestScore
  };
}
