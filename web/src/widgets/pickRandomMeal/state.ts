import { MealOption, Recipe, Restaurant } from './types';

// Shared state for meal options across routes
export let sharedOptions: (MealOption | Recipe | Restaurant)[] = [];
export let mealOptions: MealOption[] = [];
export let sharedLandedMeal: MealOption | null = null;
export let sharedLandedRecipe: Recipe | null = null;
export let sharedLandedRestaurant: Restaurant | null = null;
export let cycleTargetRoute: string = '/chosen';
export let recipesLoaded: boolean = false;
export let restaurantsLoaded: boolean = false;

export function setSharedOptions(options: (MealOption | Recipe | Restaurant)[]) {
  sharedOptions = options;
}

export function setMealOptions(options: MealOption[]) {
  mealOptions = options;
}

export function setSharedLandedMeal(meal: MealOption | null) {
  sharedLandedMeal = meal;
}

export function setSharedLandedRecipe(recipe: Recipe | null) {
  sharedLandedRecipe = recipe;
}

export function setSharedLandedRestaurant(restaurant: Restaurant | null) {
  sharedLandedRestaurant = restaurant;
}

export function setCycleTargetRoute(route: string) {
  cycleTargetRoute = route;
}

export function setRecipesLoaded(loaded: boolean) {
  recipesLoaded = loaded;
}

export function setRestaurantsLoaded(loaded: boolean) {
  restaurantsLoaded = loaded;
}
