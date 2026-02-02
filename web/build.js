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

if (isWatch) {
  await mainCtx.watch();
  await widgetCtx.watch();
  console.log('Watching for changes...');
} else {
  await mainCtx.rebuild();
  await widgetCtx.rebuild();
  await mainCtx.dispose();
  await widgetCtx.dispose();
  console.log('Build complete! (website + widget)');
}
