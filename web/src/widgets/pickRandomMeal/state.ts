import { MealOption } from './types';

// Shared state for meal options across routes
export let sharedOptions: MealOption[] = [];
export let sharedLandedMeal: MealOption | null = null;

export function setSharedOptions(options: MealOption[]) {
  sharedOptions = options;
}

export function setSharedLandedMeal(meal: MealOption | null) {
  sharedLandedMeal = meal;
}
