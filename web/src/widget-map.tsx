import ReactDOM from 'react-dom/client';
import { MapView } from './widgets/map/MapView';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<MapView />);
}
