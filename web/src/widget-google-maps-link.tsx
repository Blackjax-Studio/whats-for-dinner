import ReactDOM from 'react-dom/client';
import { GoogleMapsLinkView } from './widgets/googleMapsLink/GoogleMapsLinkView';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<GoogleMapsLinkView />);
}
