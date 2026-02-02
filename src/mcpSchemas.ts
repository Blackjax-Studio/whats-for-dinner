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
