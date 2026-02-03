import ReactDOM from 'react-dom/client';
import { GoogleMapsLinkView } from './widgets/googleMapsLink/GoogleMapsLinkView';

function GoogleMapsLinkWidgetWrapper() {
  return (
    <>
      <GoogleMapsLinkView />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes indeterminate {
          0% { left: -35%; width: 33%; }
          60% { left: 100%; width: 33%; }
          100% { left: 100%; width: 33%; }
        }
        :root {
          --text-neutral: #666666;
          --text-title: #000000;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg-color: #212121;
            --accent: #0084FF;
            --text-main: #FFFFFF;
            --text-muted: #CDCDCD;
            --bg-muted: #2A2A2A;
            --border: #404040;
          }
        }
      ` }} />
    </>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<GoogleMapsLinkWidgetWrapper />);
}
