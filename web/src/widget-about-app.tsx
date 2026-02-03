import ReactDOM from 'react-dom/client';
import { AboutAppView } from './widgets/aboutApp/AboutAppView';

function AboutAppWidget() {
  return (
    <>
      <AboutAppView />
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --text-neutral: #666666;
          --text-title: #000000;
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
            --bg-muted: #2A2A2A;
            --card-bg: #2A2A2A;
            --border: #404040;
          }
        }
        button, a {
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
      ` }} />
    </>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<AboutAppWidget />);
}
