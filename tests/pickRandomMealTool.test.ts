import { describe, it, expect, vi } from 'vitest';
import { pickRandomMealTool } from '../src/tools/pickRandomMealTool.js';

describe('pickRandomMealTool', () => {
  it('should return a list of meal options', async () => {
    const result = await pickRandomMealTool.handler({}, {});

    expect(result.content).toEqual([]);

    expect(result.structuredContent).toBeDefined();
    const options = (result.structuredContent as any).options;
    expect(options).toBeInstanceOf(Array);
    expect(options.length).toBeGreaterThan(0);
    expect(options.length).toBeLessThanOrEqual(70);
  });

  it('should use the logger from extra if provided', async () => {
    const mockLogger = {
      info: vi.fn(),
      debug: vi.fn(),
    };

    await pickRandomMealTool.handler({ providedOptions: false }, { request: { logger: mockLogger } });

    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({ providedOptions: false }),
      expect.stringContaining('Tool called: pick_random_meal')
    );
  });

  it('should use provided options when providedOptions is true', async () => {
    const customOptions = [
      { type: 'dish', title: 'Test Dish', description: 'Test Description' },
      { type: 'restaurant', title: 'Test Restaurant', description: 'Test Description', phone: '123-4567' }
    ];

    const result = await pickRandomMealTool.handler({
      providedOptions: true,
      options: customOptions
    }, {});

    const options = (result.structuredContent as any).options;
    expect(options).toHaveLength(customOptions.length);
    
    // Check that each option has the expected properties plus the mapped 'name' property
    options.forEach((opt: any) => {
      const original = customOptions.find(c => c.title === opt.title);
      expect(original).toBeDefined();
      expect(opt.name).toBe(original!.title);
      expect(opt.type).toBe(original!.type);
      expect(opt.description).toBe(original!.description);
    });
  });
});
