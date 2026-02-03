export type Restaurant = {
  id: string;
  name: string;
  location: string;
  address?: string;
  description?: string;
  title?: string; // for spinner
};

export let sharedOptions: Restaurant[] = [];
export let restaurantOptions: Restaurant[] = [];
export let sharedLandedRestaurant: Restaurant | null = null;
export let cycleTargetRoute: string = '/chosen';

const listeners = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach(l => l());
}

export function setSharedOptions(options: Restaurant[]) {
  sharedOptions = options;
  notify();
}

export function setRestaurantOptions(options: Restaurant[]) {
  restaurantOptions = options;
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
