import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const ProtectedRoute = ({ children }) => {
  // Fetch the authentication status from the context
  const { auth } = useAuth();

  // Log authentication status for debugging (can be removed in production)
  console.log(auth);

  // If the user is authenticated, render the children components. Otherwise, redirect to login page.
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
