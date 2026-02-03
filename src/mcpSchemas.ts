import { z } from "zod";

export const pickRandomMealInputSchema = {
  providedOptions: z.boolean().optional().describe("Whether to use a model provided list of options"),
  options: z.array(z.object({
    type: z.enum(["dish", "restaurant"]).describe("Type of the option"),
    title: z.string().describe("Name of the dish or restaurant"),
    cuisine: z.string().optional().describe("Cuisine of the dish or restaurant"),
    description: z.string().describe("Brief description"),
    phone: z.string().optional().describe("Phone number (for restaurants)"),
    address: z.string().optional().describe("Physical address (for restaurants)"),
  })).optional().describe("List of options to choose from if providedOptions is true"),
};

export const showRecipesInputSchema = {
  dishName: z.string().describe("The name of the dish to get recipes for"),
  recipes: z.array(z.object({
    title: z.string().describe("Title of the recipe"),
    description: z.string().describe("Brief description of the recipe"),
  })).describe("List of recipes to display"),
};

export const showRestaurantsInputSchema = {
  dishName: z.string().describe("The name of the dish to find restaurants for"),
  restaurants: z.array(z.object({
    name: z.string().describe("Name of the restaurant"),
    location: z.string().optional().describe("Physical address or general location"),
    address: z.string().optional().describe("Full physical address if possible"),
    phone: z.string().optional().describe("Phone number if possible"),
    description: z.string().optional().describe("Brief description of the restaurant"),
    rating: z.string().optional().describe("Rating (e.g., '4.5') if possible"),
  })).describe("List of restaurants to display"),
};

export const showGoogleMapsLinkInputSchema = {
  poiName: z.string().optional().describe("The name of the point of interest (e.g., restaurant name)"),
  address: z.string().optional().describe("The full address of the restaurant"),
  zipCode: z.string().describe("The zip code of the restaurant"),
};

export const pickRandomRestaurantInputSchema = {
  restaurants: z.array(z.object({
    name: z.string().describe("Name of the restaurant"),
    location: z.string().optional().describe("Physical address or general location"),
    address: z.string().optional().describe("Full physical address if possible"),
    phone: z.string().optional().describe("Phone number if possible"),
    description: z.string().optional().describe("Brief description of the restaurant"),
    rating: z.string().optional().describe("Rating (e.g., '4.5') if possible"),
  })).min(10).describe("List of restaurants to choose from (minimum 10)"),
};

export const pickRandomRecipeInputSchema = {
  recipes: z.array(z.object({
    title: z.string().describe("Title of the recipe"),
    description: z.string().describe("Brief description of the recipe"),
    ingredients: z.array(z.string()).optional().describe("List of ingredients"),
    instructions: z.array(z.string()).optional().describe("List of instructions"),
  })).min(10).describe("List of recipes to choose from (minimum 10)"),
};

export const aboutAppInputSchema = {};

export const generalInquiryInputSchema = {
  query: z.string().describe("The general inquiry or question from the user"),
};
