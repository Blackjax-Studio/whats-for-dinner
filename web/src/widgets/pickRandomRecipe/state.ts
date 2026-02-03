export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients?: string[];
  instructions?: string[];
  name?: string; // for compatibility
};

export let sharedOptions: Recipe[] = [];
export let recipeOptions: Recipe[] = [];
export let sharedLandedRecipe: Recipe | null = null;
export let cycleTargetRoute: string = '/chosen';

const listeners = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach(l => l());
}

export function setSharedOptions(options: Recipe[]) {
  sharedOptions = options;
  notify();
}

export function setRecipeOptions(options: Recipe[]) {
  recipeOptions = options;
  notify();
}

export function setSharedLandedRecipe(recipe: Recipe | null) {
  sharedLandedRecipe = recipe;
  notify();
}

export function setCycleTargetRoute(route: string) {
  cycleTargetRoute = route;
  notify();
}
