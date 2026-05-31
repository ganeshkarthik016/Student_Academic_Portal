import { createContext, useState, useContext } from 'react';
import { API_URL } from '../config';

// 1. Create the empty brain
const AuthContext = createContext();

// 2. Create a provider (this wraps around our app so everything can read the brain)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to log in
  const login = (rollNumber) => {
    setCurrentUser(rollNumber);
  };

  // Function to log out
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. A custom hook so our pages can easily talk to the brain
export const useAuth = () => {
  return useContext(AuthContext);
};