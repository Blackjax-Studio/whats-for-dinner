import { describe, it, expect, vi } from "vitest";
import { pickRandomMealWidget } from "../src/widgets/pickRandomMealWidget.js";
import ejs from "ejs";
import { readFileSync } from "node:fs";

// Mock fs and ejs
vi.mock("node:fs", () => ({
    readFileSync: vi.fn().mockReturnValue("<html></html>"),
}));

vi.mock("ejs", () => ({
    default: {
        render: vi.fn().mockReturnValue("<html>https://example.com</html>"),
    },
}));

describe("Widgets", () => {
    describe("pickRandomMealWidget", () => {
        it("should have correct metadata", () => {
            expect(pickRandomMealWidget.name).toBe("pick-random-meal-widget");
            expect(pickRandomMealWidget.uri).toBe("ui://widget/pickRandomMeal.html");
        });

        it("should render and return correct content structure", async () => {
            const result = await pickRandomMealWidget.handler();

            expect(ejs.render).toHaveBeenCalledWith(
                expect.any(String),
                {}
            );

            expect(result.contents).toHaveLength(1);
            expect(result.contents[0]).toMatchObject({
                uri: "ui://widget/pickRandomMeal.html",
                mimeType: "text/html+skybridge",
                text: "<html>https://example.com</html>",
            });
            expect(result.contents[0]._meta).toBeDefined();
        });
    });
});
