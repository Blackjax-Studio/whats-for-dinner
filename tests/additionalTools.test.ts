import { describe, it, expect, vi } from 'vitest';
import { aboutAppTool } from '../src/tools/aboutAppTool.js';
import { showGoogleMapsLinkTool } from '../src/tools/showGoogleMapsLinkTool.js';
import { pickRandomRecipeTool } from '../src/tools/pickRandomRecipeTool.js';
import { showRecipesWidgetTool } from '../src/tools/showRecipesWidgetTool.js';
import { showRestaurantsWidgetTool } from '../src/tools/showRestaurantsWidgetTool.js';
import { pickRandomRestaurantTool } from '../src/tools/pickRandomRestaurantTool.js';

describe('Additional Tools', () => {
  const mockLogger = {
    info: vi.fn(),
    debug: vi.fn(),
  };
  const extra = { request: { logger: mockLogger } };

  describe('aboutAppTool', () => {
    it('should return app information', async () => {
      const result = await aboutAppTool.handler({}, extra);
      expect(mockLogger.info).toHaveBeenCalledWith('Tool called: about_the_app');
      expect(result.content[0].type).toBe('text');
      const appInfo = JSON.parse((result.content[0] as any).text);
      expect(appInfo.name).toBe("What's for Dinner");
      expect(result.structuredContent).toBeDefined();
      expect((result.structuredContent as any).appInfo).toEqual(appInfo);
    });
  });

  describe('showGoogleMapsLinkTool', () => {
    it('should return structured content with map details', async () => {
      const args = { poiName: 'Pizza Place', address: '123 Main St', zipCode: '12345' };
      const result = await showGoogleMapsLinkTool.handler(args, extra);
      expect(mockLogger.info).toHaveBeenCalledWith(args, 'Tool called: show_google_maps_link');
      expect(result.content).toEqual([]);
      expect(result.structuredContent).toMatchObject(args);
    });
  });

  describe('pickRandomRecipeTool', () => {
    it('should shuffle and return up to 70 recipes', async () => {
      const recipes = Array.from({ length: 80 }, (_, i) => ({ title: `Recipe ${i}`, description: `Desc ${i}` }));
      const result = await pickRandomRecipeTool.handler({ recipes }, extra);
      expect(mockLogger.info).toHaveBeenCalledWith({ count: 80 }, 'Tool called: pick_random_recipe');
      const options = (result.structuredContent as any).options;
      expect(options.length).toBe(70);
      expect(options[0]).toHaveProperty('name');
      expect(options[0]).toHaveProperty('title');
    });
  });

  describe('showRecipesWidgetTool', () => {
    it('should return recipes in structured content', async () => {
      const args = { dishName: 'Pasta', recipes: [{ title: 'Pasta 1', description: 'Desc 1' }] };
      const result = await showRecipesWidgetTool.handler(args, extra);
      expect(mockLogger.info).toHaveBeenCalledWith({ dishName: 'Pasta', count: 1 }, 'Tool called: show_recipes_widget');
      expect(result.structuredContent).toMatchObject({
        dishName: 'Pasta',
        options: args.recipes
      });
    });
  });

  describe('showRestaurantsWidgetTool', () => {
    it('should return restaurants with titles', async () => {
      const restaurants = [{ name: 'Resto 1', address: 'Addr 1' }];
      const result = await showRestaurantsWidgetTool.handler({ dishName: 'Pizza', restaurants }, extra);
      expect(mockLogger.info).toHaveBeenCalledWith({ dishName: 'Pizza', count: 1 }, 'Tool called: show_restaurants_widget');
      const options = (result.structuredContent as any).options;
      expect(options[0].title).toBe('Resto 1');
      expect(options[0].name).toBe('Resto 1');
    });
  });

  describe('pickRandomRestaurantTool', () => {
    it('should shuffle and return up to 70 restaurants', async () => {
      const restaurants = Array.from({ length: 10 }, (_, i) => ({ name: `Resto ${i}` }));
      const result = await pickRandomRestaurantTool.handler({ restaurants }, extra);
      expect(mockLogger.info).toHaveBeenCalledWith({ count: 10 }, 'Tool called: pick_random_restaurant');
      const options = (result.structuredContent as any).options;
      expect(options.length).toBe(10);
      expect(options[0]).toHaveProperty('title');
    });
  });
});
