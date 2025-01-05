import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to home page if user is not authenticated
    return <Navigate to="/" replace />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default ProtectedRoute;