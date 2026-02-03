import { Recipe } from './types';

export let recipes: Recipe[] = [];
export let sharedLandedRecipe: Recipe | null = null;
export let recipesLoaded: boolean = false;
export let isFetchingRecipes: boolean = false;
export let sharedOptions: Recipe[] = [];
export let cycleTargetRoute: string = '/recipe-detail';

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setRecipes(r: Recipe[]) {
  recipes = r;
  notify();
}

export function setSharedLandedRecipe(recipe: Recipe | null) {
  sharedLandedRecipe = recipe;
  notify();
}

export function setRecipesLoaded(loaded: boolean) {
  recipesLoaded = loaded;
  notify();
}

export function setIsFetchingRecipes(fetching: boolean) {
  isFetchingRecipes = fetching;
  notify();
}

export function setSharedOptions(options: Recipe[]) {
  sharedOptions = options;
  notify();
}

export function setCycleTargetRoute(route: string) {
  cycleTargetRoute = route;
  notify();
}

export function clearRecipes() {
  recipes = [];
  recipesLoaded = false;
  isFetchingRecipes = false;
  notify();
}
