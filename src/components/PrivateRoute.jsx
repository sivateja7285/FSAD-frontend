import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Protect routes that require authentication
export const PrivateRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, userRole } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Redirect to appropriate dashboard if wrong role
    const redirectPath =
      userRole === 'student' ? '/student/dashboard' : '/admin/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Redirect authenticated users away from login
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAppContext();

  if (isAuthenticated) {
    const redirectPath =
      userRole === 'student' ? '/student/dashboard' : '/admin/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
