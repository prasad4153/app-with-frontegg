import "./App.css";
import { useEffect } from "react";

import { ContextHolder } from "@frontegg/rest-api";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";

// Admin Potal
import { AdminPortal } from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  // Admin Portal
  const handleClick = () => {
    AdminPortal.show();
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="card">
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div className="detail">
            <span className="heading">Name: {user?.name}</span>
            <span className="heading">Email: {user?.email}</span>
          </div>

          <div>
            <button className="button" onClick={() => logout()}>
              Click to logout
            </button>
            <button className="button" onClick={handleClick}>
              View Full Profile
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button className="button" onClick={() => loginWithRedirect()}>
            Click me to login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
