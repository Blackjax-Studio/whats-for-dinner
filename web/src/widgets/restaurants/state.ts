import { Restaurant } from './types';

export let restaurants: Restaurant[] = [];
export let sharedLandedRestaurant: Restaurant | null = null;
export let restaurantsLoaded: boolean = false;
export let isFetchingRestaurants: boolean = false;
export let sharedOptions: Restaurant[] = [];
export let cycleTargetRoute: string = '/restaurant-detail';

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setRestaurants(r: Restaurant[]) {
  restaurants = r;
  notify();
}

export function setSharedLandedRestaurant(restaurant: Restaurant | null) {
  sharedLandedRestaurant = restaurant;
  notify();
}

export function setRestaurantsLoaded(loaded: boolean) {
  restaurantsLoaded = loaded;
  notify();
}

export function setIsFetchingRestaurants(fetching: boolean) {
  isFetchingRestaurants = fetching;
  notify();
}

export function setSharedOptions(options: Restaurant[]) {
  sharedOptions = options;
  notify();
}

export function setCycleTargetRoute(route: string) {
  cycleTargetRoute = route;
  notify();
}

export function clearRestaurants() {
  restaurants = [];
  restaurantsLoaded = false;
  isFetchingRestaurants = false;
  notify();
}
