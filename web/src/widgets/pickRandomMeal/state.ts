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
export let isFetchingRecipes: boolean = false;
export let isFetchingRestaurants: boolean = false;
export let recipes: Recipe[] = [];
export let restaurants: Restaurant[] = [];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setSharedOptions(options: (MealOption | Recipe | Restaurant)[]) {
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

export function setSharedLandedRecipe(recipe: Recipe | null) {
  sharedLandedRecipe = recipe;
  notify();
}

export function setSharedLandedRestaurant(restaurant: Restaurant | null) {
  sharedLandedRestaurant = restaurant;
  notify();
}

export function setCycleTargetRoute(route: string) {
  cycleTargetRoute = route;
  notify();
}

export function setRecipesLoaded(loaded: boolean) {
  recipesLoaded = loaded;
  notify();
}

export function setRestaurantsLoaded(loaded: boolean) {
  restaurantsLoaded = loaded;
  notify();
}

export function setIsFetchingRecipes(fetching: boolean) {
  isFetchingRecipes = fetching;
  notify();
}

export function setIsFetchingRestaurants(fetching: boolean) {
  isFetchingRestaurants = fetching;
  notify();
}

export function setRecipes(r: Recipe[]) {
  recipes = r;
  notify();
}

export function setRestaurants(r: Restaurant[]) {
  restaurants = r;
  notify();
}

export function clearRecipes() {
  recipes = [];
  recipesLoaded = false;
  isFetchingRecipes = false;
  notify();
}

export function clearRestaurants() {
  restaurants = [];
  restaurantsLoaded = false;
  isFetchingRestaurants = false;
  notify();
}
