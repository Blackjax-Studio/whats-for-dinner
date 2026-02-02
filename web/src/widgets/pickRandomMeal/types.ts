export interface MealOption {
  title?: string;
  name?: string;
  description?: string;
  type?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating?: string;
}
