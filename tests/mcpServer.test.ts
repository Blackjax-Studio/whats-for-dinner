import { describe, it, expect, vi } from "vitest";
import { createWhatsForDinnerServer } from "../src/mcpServer.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

describe("mcpServer", () => {
  it("should create an McpServer instance", () => {
    const server = createWhatsForDinnerServer();
    expect(server).toBeInstanceOf(McpServer);
  });

  it("should register tools and resources correctly", () => {
    // Spy on McpServer prototype methods before creating the server
    const registerToolSpy = vi.spyOn(McpServer.prototype, "registerTool");
    const registerResourceSpy = vi.spyOn(McpServer.prototype, "registerResource");

    createWhatsForDinnerServer();

    expect(registerToolSpy).toHaveBeenCalledWith(
      "pick_random_meal",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "pick-random-meal-widget",
      "ui://widget/pickRandomMeal.html",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerToolSpy).toHaveBeenCalledWith(
      "show_google_maps_link",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "google-maps-link-widget",
      "ui://widget/google-maps-link.html",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerToolSpy).toHaveBeenCalledWith(
      "pick_random_restaurant",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "pick-random-restaurant-widget",
      "ui://widget/pickRandomRestaurant.html",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerToolSpy).toHaveBeenCalledWith(
      "pick_random_recipe",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "pick-random-recipe-widget",
      "ui://widget/pickRandomRecipe.html",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerToolSpy).toHaveBeenCalledWith(
      "show_recipes_widget",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "recipes-widget",
      "ui://widget/recipes.html",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerToolSpy).toHaveBeenCalledWith(
      "show_restaurants_widget",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "restaurants-widget",
      "ui://widget/restaurants.html",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerToolSpy).toHaveBeenCalledWith(
      "about_the_app",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "about-app-widget",
      "ui://widget/aboutApp.html",
      expect.any(Object),
      expect.any(Function)
    );

    registerToolSpy.mockRestore();
    registerResourceSpy.mockRestore();
  });
});
