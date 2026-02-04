export type Platform = 'web' | 'ios' | 'android';

export const platformOptions: Platform[] = ['web', 'ios', 'android'];

export const howItWorksVideos = {
  'pick-restaurant': {
    label: 'Pick a restaurant',
    platforms: {
      web: '/videos/spin_restaurants.mp4',
    },
  },
  'pick-meal': {
    label: 'Pick a meal',
    platforms: {
      web: '/videos/i_cant_decide.mp4',
      ios: '/videos/i_cant_decide_ios.mp4',
    },
  },
  'pick-recipe': {
    label: 'Pick a recipe',
    platforms: {
      web: '/videos/spin_recipes.mp4',
      ios: '/videos/recipe_ios.mp4',
    },
  },
  'meal-then-restaurant': {
    label: 'Pick a meal then find a restaurant',
    platforms: {
      web: '/videos/pick_meal_then_restaurant.mp4',
    },
  },
  'meal-then-recipe': {
    label: 'Pick a meal then find a recipe',
    platforms: {
      web: '/videos/pick_meal_then_recipe.mp4',
    },
  },
  'restaurant-then-recipe': {
    label: 'Pick a restaurant then find recipes',
    platforms: {
      web: '/videos/pick_restaurant_then_recipe.mp4',
    },
  },
  'recipe-then-restaurant': {
    label: 'Pick a recipe then find a restaurant',
    platforms: {
      web: '/videos/pick_recipe_then_restaurant.mp4',
      ios: '/videos/recipe_then_restaurant_ios.mp4',
    },
  },
} as const;

export type ActionKey = keyof typeof howItWorksVideos;
