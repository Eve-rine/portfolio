// import './App.css';
// import Navbar from './components/layout/Navbar';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './config/firebase';
// import Footer from './components/layout/Footer';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         {/* Only show Navbar when not on login page */}
//         {window.location.pathname !== '/login' && <Navbar user={user} />}
        
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/login"
//             element={user ? <Navigate to="/dashboard" replace /> : <Login />}
//           />
//           <Route
//             path="/dashboard"
//             element={user ? <Dashboard /> : <Navigate to="/login" replace />}
//           />
//         </Routes>
//       </div>
//       {window.location.pathname !== '/login' && <Footer />}
//     </Router>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// Layout wrapper component to handle conditional rendering of Navbar and Footer
const Layout = ({ user, children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isLoginPage && <Navbar user={user} />}
      <main className="flex-grow">
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

// Protected Route component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />

          {/* Login route - redirects to dashboard if already authenticated */}
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            } 
          />

          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route - redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;