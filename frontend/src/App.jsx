// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ResultPage from './pages/ResultPage';
import SettingsPage from './pages/SettingsPage';

function AppRoutes() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Routes>
      {/* All Dashboard routes go inside the MainLayout Shell */}
      <Route path="/dashboard" element={<MainLayout />}>
        {/* /dashboard goes to Home */}
        <Route index element={<HomePage />} /> 
        {/* /dashboard/profile goes to Profile */}
        <Route path="profile" element={<ProfilePage />} />
        {/* /dashboard/examination goes to Results */}
        <Route path="examination" element={<ResultPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Catch-all redirect */}
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