import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const APP_NAME = "What's for Dinner";

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="wrap">
      <div className="topbar">
        <button onClick={() => navigate('/')} className="brand">
          <div className="brandtext">
            <strong>{APP_NAME}</strong>
          </div>
        </button>
        <div className="nav-buttons">
          <button onClick={() => navigate('/how-it-works')} className="nav-btn">
            How it works
          </button>
          <button onClick={() => navigate('/see-it-work')} className="nav-btn">
            See it in action
          </button>
        </div>
      </div>

      {children}

      <div className="footer">
        <div className="footerLinks">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/how-it-works')}>How it works</button>
          <button onClick={() => navigate('/see-it-work')}>See it work</button>
          <button onClick={() => navigate('/privacy')}>Privacy Policy</button>
          <button onClick={() => navigate('/terms')}>Terms of Service</button>
          <button onClick={() => navigate('/support')}>Support</button>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved (except as provided by the open-source license).
        </div>
      </div>
    </div>
  );
}
