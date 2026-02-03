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
