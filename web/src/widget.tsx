import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingView } from './widgets/pickRandomMeal/LoadingView';
import { CyclerView } from './widgets/pickRandomMeal/CyclerView';
import { ChosenView } from './widgets/pickRandomMeal/ChosenView';
import { RecipesView } from './widgets/pickRandomMeal/RecipesView';
import { RestaurantsView } from './widgets/pickRandomMeal/RestaurantsView';

function WidgetRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingView />} />
        <Route path="/cycler" element={<CyclerView />} />
        <Route path="/chosen" element={<ChosenView />} />
        <Route path="/recipes" element={<RecipesView />} />
        <Route path="/restaurants" element={<RestaurantsView />} />
      </Routes>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes indeterminate {
          0% { left: -35%; width: 33%; }
          60% { left: 100%; width: 33%; }
          100% { left: 100%; width: 33%; }
        }
        @keyframes pulsate {
          0% { opacity: 0.6; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(0.98); }
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg-color: #212121;
            --accent: #0084FF;
            --accent2: #40C977;
            --warn: #FF9E60;
            --text-main: #FFFFFF;
            --text-muted: #CDCDCD;
            --bg-muted: #2A2A2A;
            --card-bg: #2A2A2A;
            --border: #404040;
          }
        }
      ` }} />
    </BrowserRouter>
  );
}

// Mount the React app
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<WidgetRouter />);
} else {
  console.error('Root element not found for widget');
}
