import { describe, it, expect, vi, beforeEach } from "vitest";
import { pickRandomMealWidget } from "../src/widgets/pickRandomMealWidget.js";
import { aboutAppWidget } from "../src/widgets/aboutAppWidget.js";
import { googleMapsLinkWidget } from "../src/widgets/googleMapsLinkWidget.js";
import { pickRandomRecipeWidget } from "../src/widgets/pickRandomRecipeWidget.js";
import { pickRandomRestaurantWidget } from "../src/widgets/pickRandomRestaurantWidget.js";
import { recipesWidget } from "../src/widgets/recipesWidget.js";
import { restaurantsWidget } from "../src/widgets/restaurantsWidget.js";
import { readFileSync } from "node:fs";

// Mock fs
vi.mock("node:fs", () => ({
    readFileSync: vi.fn().mockReturnValue("console.log('mock bundle')"),
}));

describe("Widgets", () => {
    describe("pickRandomMealWidget", () => {
        it("should have correct metadata", () => {
            expect(pickRandomMealWidget.name).toBe("pick-random-meal-widget");
            expect(pickRandomMealWidget.uri).toBe("ui://widget/pickRandomMeal.html");
        });

        it("should render and return correct content structure", async () => {
            const result = await pickRandomMealWidget.handler();

            expect(result.contents).toHaveLength(1);
            expect(result.contents[0]).toMatchObject({
                uri: "ui://widget/pickRandomMeal.html",
                mimeType: "text/html",
            });
            expect(result.contents[0].text).toContain("console.log('mock bundle')");
            expect(result.contents[0].text).toContain("<div id=\"root\"></div>");
            expect(result.contents[0]._meta).toBeDefined();
        });
    });

    describe("aboutAppWidget", () => {
        it("should have correct metadata", () => {
            expect(aboutAppWidget.name).toBe("about-app-widget");
            expect(aboutAppWidget.uri).toBe("ui://widget/aboutApp.html");
        });

        it("should render correctly", async () => {
            const result = await aboutAppWidget.handler();
            expect(result.contents[0].uri).toBe("ui://widget/aboutApp.html");
            expect(result.contents[0].text).toContain("About What's for Dinner");
        });
    });

    describe("googleMapsLinkWidget", () => {
        it("should have correct metadata", () => {
            expect(googleMapsLinkWidget.name).toBe("google-maps-link-widget");
            expect(googleMapsLinkWidget.uri).toBe("ui://widget/google-maps-link.html");
        });

        it("should render correctly", async () => {
            const result = await googleMapsLinkWidget.handler();
            expect(result.contents[0].uri).toBe("ui://widget/google-maps-link.html");
        });
    });

    describe("pickRandomRecipeWidget", () => {
        it("should have correct metadata", () => {
            expect(pickRandomRecipeWidget.name).toBe("pick-random-recipe-widget");
            expect(pickRandomRecipeWidget.uri).toBe("ui://widget/pickRandomRecipe.html");
        });

        it("should render correctly", async () => {
            const result = await pickRandomRecipeWidget.handler();
            expect(result.contents[0].uri).toBe("ui://widget/pickRandomRecipe.html");
        });
    });

    describe("pickRandomRestaurantWidget", () => {
        it("should have correct metadata", () => {
            expect(pickRandomRestaurantWidget.name).toBe("pick-random-restaurant-widget");
            expect(pickRandomRestaurantWidget.uri).toBe("ui://widget/pickRandomRestaurant.html");
        });

        it("should render correctly", async () => {
            const result = await pickRandomRestaurantWidget.handler();
            expect(result.contents[0].uri).toBe("ui://widget/pickRandomRestaurant.html");
        });
    });

    describe("recipesWidget", () => {
        it("should have correct metadata", () => {
            expect(recipesWidget.name).toBe("recipes-widget");
            expect(recipesWidget.uri).toBe("ui://widget/recipes.html");
        });

        it("should render correctly", async () => {
            const result = await recipesWidget.handler();
            expect(result.contents[0].uri).toBe("ui://widget/recipes.html");
        });
    });

    describe("restaurantsWidget", () => {
        it("should have correct metadata", () => {
            expect(restaurantsWidget.name).toBe("restaurants-widget");
            expect(restaurantsWidget.uri).toBe("ui://widget/restaurants.html");
        });

        it("should render correctly", async () => {
            const result = await restaurantsWidget.handler();
            expect(result.contents[0].uri).toBe("ui://widget/restaurants.html");
        });
    });
});
