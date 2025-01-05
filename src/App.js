import logo from './logo.svg';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Footer from './components/layout/Footer';



// function App() {
  const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  return (
    <Router>
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        </Routes>
        </div>
        <Footer />
        </Router>
  );
}

export default App;
