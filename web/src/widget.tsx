import ReactDOM from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LoadingView } from './widgets/pickRandomMeal/LoadingView';
import { StartSpinView } from './widgets/pickRandomMeal/StartSpinView';
import { CyclerView } from './widgets/pickRandomMeal/CyclerView';
import { ChosenView } from './widgets/pickRandomMeal/ChosenView';

function WidgetRouter() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<LoadingView />} />
        <Route path="/start-spin" element={<StartSpinView />} />
        <Route path="/cycler" element={<CyclerView />} />
        <Route path="/chosen" element={<ChosenView />} />
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
        :root {
          --text-neutral: #666666;
          --text-title: #000000;
          --rating-color: #B8860B;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg-color: #212121;
            --accent: #0084FF;
            --accent2: #40C977;
            --warn: #FF9E60;
            --text-main: #FFFFFF;
            --text-muted: #CDCDCD;
            --text-neutral: #AAAAAA;
            --text-title: #FFFFFF;
            --rating-color: #FFD700;
            --bg-muted: #2A2A2A;
            --card-bg: #2A2A2A;
            --border: #404040;
          }
        }
        button {
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        button:focus {
          outline: none;
        }
      ` }} />
    </MemoryRouter>
  );
}

// Mount the React app
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<WidgetRouter />);
} else {
  console.error('Root element not found for widget');
}
