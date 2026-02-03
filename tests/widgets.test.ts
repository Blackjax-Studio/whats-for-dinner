import { describe, it, expect, vi } from "vitest";
import { pickRandomMealWidget } from "../src/widgets/pickRandomMealWidget.js";
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
});
