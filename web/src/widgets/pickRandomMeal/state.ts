import { MealOption } from './types';

// Shared state for meal options across routes
export let sharedOptions: MealOption[] = [];
export let mealOptions: MealOption[] = [];
export let sharedLandedMeal: MealOption | null = null;
export let cycleTargetRoute: string = '/chosen';

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setSharedOptions(options: MealOption[]) {
  sharedOptions = options;
  notify();
}

export function setMealOptions(options: MealOption[]) {
  mealOptions = options;
  notify();
}

export function setSharedLandedMeal(meal: MealOption | null) {
  sharedLandedMeal = meal;
  notify();
}

export function setCycleTargetRoute(route: string) {
  cycleTargetRoute = route;
  notify();
}

export function clearRecipes() {
  // Keeping this for compatibility in LoadingView.tsx for now, 
  // but it doesn't do anything since recipes state is gone from here.
  notify();
}

export function clearRestaurants() {
  // Keeping this for compatibility in LoadingView.tsx for now,
  // but it doesn't do anything since restaurants state is gone from here.
  notify();
}

export function setSharedLandedRestaurant(r: any) {
    // Keeping this for compatibility in LoadingView.tsx
    notify();
}
