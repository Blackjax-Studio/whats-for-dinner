import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWatch = process.argv.includes('--watch');

// Build main website bundle
const mainCtx = await esbuild.context({
  entryPoints: [join(__dirname, 'src/index.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist/bundle.js'),
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.css': 'css',
  },
  logLevel: 'info',
  sourcemap: true,
});

// Build widget bundle (separate from main website)
const widgetCtx = await esbuild.context({
  entryPoints: [join(__dirname, 'src/widget.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist/widget.js'),
  format: 'iife', // IIFE for widget to work in ChatGPT iframe
  platform: 'browser',
  target: 'es2020',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  logLevel: 'info',
  sourcemap: false, // No sourcemap needed for widget
});

// Build recipes widget bundle
const recipesWidgetCtx = await esbuild.context({
  entryPoints: [join(__dirname, 'src/widget-recipes.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist/widget-recipes.js'),
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  logLevel: 'info',
  sourcemap: false,
});

// Build restaurants widget bundle
const restaurantsWidgetCtx = await esbuild.context({
  entryPoints: [join(__dirname, 'src/widget-restaurants.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist/widget-restaurants.js'),
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  logLevel: 'info',
  sourcemap: false,
});

// Build google maps link widget bundle
const googleMapsLinkWidgetCtx = await esbuild.context({
  entryPoints: [join(__dirname, 'src/widget-google-maps-link.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist/widget-google-maps-link.js'),
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  logLevel: 'info',
  sourcemap: false,
});

// Build pick random restaurant widget bundle
const pickRandomRestaurantWidgetCtx = await esbuild.context({
  entryPoints: [join(__dirname, 'src/widget-pick-random-restaurant.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist/widget-pick-random-restaurant.js'),
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  logLevel: 'info',
  sourcemap: false,
});

// Build pick random recipe widget bundle
const pickRandomRecipeWidgetCtx = await esbuild.context({
  entryPoints: [join(__dirname, 'src/widget-pick-random-recipe.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist/widget-pick-random-recipe.js'),
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  logLevel: 'info',
  sourcemap: false,
});

if (isWatch) {
  await mainCtx.watch();
  await widgetCtx.watch();
  await recipesWidgetCtx.watch();
  await restaurantsWidgetCtx.watch();
  await googleMapsLinkWidgetCtx.watch();
  await pickRandomRestaurantWidgetCtx.watch();
  await pickRandomRecipeWidgetCtx.watch();
  console.log('Watching for changes...');
} else {
  await mainCtx.rebuild();
  await widgetCtx.rebuild();
  await recipesWidgetCtx.rebuild();
  await restaurantsWidgetCtx.rebuild();
  await googleMapsLinkWidgetCtx.rebuild();
  await pickRandomRestaurantWidgetCtx.rebuild();
  await pickRandomRecipeWidgetCtx.rebuild();
  await mainCtx.dispose();
  await widgetCtx.dispose();
  await recipesWidgetCtx.dispose();
  await restaurantsWidgetCtx.dispose();
  await googleMapsLinkWidgetCtx.dispose();
  await pickRandomRestaurantWidgetCtx.dispose();
  await pickRandomRecipeWidgetCtx.dispose();
  console.log('Build complete! (website + widgets)');
}
