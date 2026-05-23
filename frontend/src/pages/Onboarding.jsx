import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    branchCode: 'CSE',
    currentSemester: '4'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Call our new super-route to create the profile AND fill default C+ grades
    await fetch('http://localhost:5000/api/onboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rollNumber: currentUser,
        ...formData
      })
    });

    // Refresh to enter the dashboard
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to FUSION!</h2>
        <p className="text-slate-500 mb-6">Let's set up your profile, {currentUser}.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-bold text-slate-700">First Name</label>
              <input required type="text" className="w-full border p-2 rounded mt-1" 
                onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div className="flex-1">
              <label className="text-sm font-bold text-slate-700">Last Name</label>
              <input required type="text" className="w-full border p-2 rounded mt-1" 
                onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-bold text-slate-700">Branch</label>
              <select className="w-full border p-2 rounded mt-1" onChange={e => setFormData({...formData, branchCode: e.target.value})}>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="DS">Design</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-bold text-slate-700">Current Semester</label>
              <select className="w-full border p-2 rounded mt-1" onChange={e => setFormData({...formData, currentSemester: e.target.value})}>
                {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
          </div>
          
          <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 mt-6 disabled:bg-blue-400 transition-colors">
            {isSubmitting ? 'Generating Academic Records...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}