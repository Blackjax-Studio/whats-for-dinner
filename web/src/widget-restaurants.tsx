import ReactDOM from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RestaurantsView } from './widgets/restaurants/RestaurantsView';
import { RestaurantDetailView } from './widgets/restaurants/RestaurantDetailView';
import { CyclerView } from './widgets/restaurants/CyclerView';

function RestaurantsWidgetRouter() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<RestaurantsView />} />
        <Route path="/restaurant-detail" element={<RestaurantDetailView />} />
        <Route path="/cycler" element={<CyclerView />} />
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

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<RestaurantsWidgetRouter />);
}
