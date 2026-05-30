import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Onboarding() {
  const { currentUser } = useAuth();
  const cleanRollNumber = currentUser ? currentUser.split('@')[0].toUpperCase() : '';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentSemester: '1' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('http://localhost:5000/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNumber: cleanRollNumber,
          ...formData
        })
      });

      // If the backend throws an error, catch it and alert the user!
      if (!res.ok) {
        const errorData = await res.json();
        alert("Database Error: " + errorData.error);
        setIsSubmitting(false);
        return; 
      }

      // Only redirect if everything was 100% successful
      window.location.href = '/dashboard'; 
      
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to connect to the server.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to FUSION!</h2>
        <p className="text-slate-500 mb-6">Let's set up your profile, {cleanRollNumber}.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-bold text-slate-700">First Name</label>
              <input required type="text" className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div className="flex-1">
              <label className="text-sm font-bold text-slate-700">Last Name</label>
              <input required type="text" className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-bold text-slate-700">Current Semester</label>
            <select className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
              onChange={e => setFormData({...formData, currentSemester: e.target.value})}>
              {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>Semester {num}</option>)}
            </select>
          </div>
          
          <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 mt-6 disabled:bg-blue-400 transition-colors">
            {isSubmitting ? 'Generating Academic Records...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}