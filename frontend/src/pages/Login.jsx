import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 1. THE BOUNCER: Check for the official domain
    if (!email.toLowerCase().endsWith('@iiitdmj.ac.in')) {
      setError("Access Denied: You must use a valid @iiitdmj.ac.in email address.");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Log in existing user
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Register a brand new user
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // 2. EXTRACT THE ROLL NUMBER
      // e.g., "24bcs054@iiitdmj.ac.in" -> splits at '@' -> "24bcs054" -> UPPERCASE
      const rollNumber = email.split('@')[0].toUpperCase();

      // 3. SAVE TO THE BRAIN
      login(rollNumber);

    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError("Invalid email or password.");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("An account with this email already exists.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-900 px-6 py-8 text-center">
          <img src="/logo.png" alt="IIIT Logo" className="w-16 h-16 mx-auto mb-3 bg-white rounded-full p-1" />
          <h2 className="text-2xl font-bold text-white tracking-wide">FUSION</h2>
          <p className="text-blue-200 text-sm mt-1">IIITDMJ ERP Portal</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
            {isLogin ? 'Sign in to your account' : 'Register for FUSION'}
          </h3>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">College Email ID</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                placeholder="@iiitdmj.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors flex justify-center items-center"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isLogin ? "Don't have an account? Register here" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}