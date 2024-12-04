import { createContext, useState, useContext, useEffect } from 'react';

// Create context for authentication
const AuthContext = createContext();

// Provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // Initialize auth state with token from localStorage
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'), // Convert token to boolean (true if exists)
  });

 
  const login = (token) => {
    localStorage.setItem('token', token); // Store token in localStorage
    setAuth({ token, isAuthenticated: true }); // Update auth state
  };

  /**
   * Logout function to remove token and clear authentication state
   */
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setAuth({ token: null, isAuthenticated: false }); // Update auth state to reflect logout
  };

  // Effect to handle the initialization of auth state (e.g., when the token in localStorage changes)
  useEffect(() => {
    // Optional: Sync auth state with localStorage when page reloads or context is initialized
    const storedToken = localStorage.getItem('token');
    setAuth({
      token: storedToken,
      isAuthenticated: !!storedToken, // Check if token exists to set authentication state
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context values
export const useAuth = () => useContext(AuthContext);
