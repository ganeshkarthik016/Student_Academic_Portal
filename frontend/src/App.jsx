import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ResultPage from './pages/ResultPage';
import SettingsPage from './pages/SettingsPage';
import Onboarding from './pages/Onboarding';
import EnrollmentPage from './pages/EnrollmentPage'; // <-- NEW IMPORT

function AppRoutes() {
  const { currentUser } = useAuth();
  
  const [isChecking, setIsChecking] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setIsChecking(false);
      return;
    }

    const cleanRollNumber = currentUser.split('@')[0].toUpperCase();

    fetch(`http://localhost:5000/api/student/${cleanRollNumber}`)
      .then(res => {
        if (res.status === 404) setNeedsOnboarding(true);
        else setNeedsOnboarding(false);
        setIsChecking(false);
      })
      .catch(err => {
        console.error("Database check failed:", err);
        setIsChecking(false);
      });
  }, [currentUser]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl font-bold text-blue-600 animate-pulse">Verifying Database Records...</div>
      </div>
    );
  }

  if (!currentUser) return <Login />;

  if (needsOnboarding) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<HomePage />} /> 
        <Route path="profile" element={<ProfilePage />} />
        <Route path="examination" element={<ResultPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="enrollment" element={<EnrollmentPage />} /> {/* <-- NEW ROUTE */}
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}