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
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div>
            <span className="heading">Logged in as: {user?.name}</span>
          </div>
          <div>
            <button className="button" onClick={() => alert(user.accessToken)}>
              What is my access token?
            </button>
          </div>
          <div>
            <button className="button" onClick={() => logout()}>
              Click to logout
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
      <button className="button" onClick={handleClick}>
        View Full Profile
      </button>
    </div>
  );
}

export default App;
