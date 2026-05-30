import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const cleanRollNumber = currentUser ? currentUser.split('@')[0].toUpperCase() : '';
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    dob: 'NA',
    contactNumber: 'NA',
    email: cleanRollNumber ? `${cleanRollNumber.toLowerCase()}@iiitdmj.ac.in` : 'NA',
    address: 'Jabalpur, Madhya Pradesh 482005' // Hardcoded to match your screenshot layout
  });

  const [studentInfo, setStudentInfo] = useState({
    lastName: 'STUDENT',
    firstName: '',
    branch: 'CSE',
    currentSemester: '1'
  });

  useEffect(() => {
    if (!cleanRollNumber) return;
    fetch(`http://localhost:5000/api/student/${cleanRollNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProfileData(prev => ({
            ...prev,
            dob: data.dob ? data.dob.split('T')[0] : 'NA',
            contactNumber: data.contact_number || 'NA'
          }));
          setStudentInfo({
            lastName: data.last_name || 'STUDENT',
            firstName: data.first_name || '',
            branch: data.branch_code || 'CSE',
            currentSemester: data.current_semester || '1'
          });
        }
      });
  }, [cleanRollNumber]);

  // Dynamically calculate joining year (e.g., '24BCS054' -> 2024)
  const joinYear = cleanRollNumber.length >= 2 ? `20${cleanRollNumber.substring(0, 2)}` : '2024';

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      
      {/* LEFT COLUMN: Data Cards */}
      <div className="flex-1 w-full flex flex-col gap-6">
        
        {/* ABOUT ME CARD */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-md shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">About Me</h2>
          </div>
          <div className="p-4 flex justify-between items-center">
            <p className="text-slate-800">NA</p>
            <button 
              onClick={() => navigate('/dashboard/settings')}
              className="bg-[#F3505B] text-white px-6 py-2 rounded font-medium hover:bg-red-500 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-md shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Details</h2>
          </div>
          <div className="flex border-b border-slate-200 bg-white">
            <div className="w-[30%] p-4 font-bold text-[14px] text-slate-800 border-r border-slate-200">Date of Birth</div>
            <div className="w-[70%] p-4 text-[14px] text-slate-800">{profileData.dob}</div>
          </div>
          <div className="flex bg-white rounded-b-md">
            <div className="w-[30%] p-4 font-bold text-[14px] text-slate-800 border-r border-slate-200">Address</div>
            <div className="w-[70%] p-4 text-[14px] text-slate-800">{profileData.address}</div>
          </div>
        </div>

        {/* CONTACT DETAILS CARD */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-md shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Contact Details</h2>
          </div>
          <div className="flex border-b border-slate-200 bg-white">
            <div className="w-[30%] p-4 font-bold text-[14px] text-slate-800 border-r border-slate-200">Contact Number</div>
            <div className="w-[70%] p-4 text-[14px] text-slate-800">{profileData.contactNumber}</div>
          </div>
          <div className="flex bg-white rounded-b-md">
            <div className="w-[30%] p-4 font-bold text-[14px] text-slate-800 border-r border-slate-200">Mail ID</div>
            <div className="w-[70%] p-4 text-[14px] text-slate-800">{profileData.email}</div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Identity Card */}
      <div className="w-full md:w-[320px] shrink-0">
        <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
          {/* Avatar Area */}
          <div className="h-[300px] bg-[#89A4B1] w-full">
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Info Area */}
          <div className="p-6">
            <h2 className="font-bold text-[16px] text-slate-900 mb-1 truncate uppercase">
              {studentInfo.lastName}
            </h2>
            <p className="text-[14px] text-slate-500 mb-6">
              {cleanRollNumber}
            </p>

            <div className="flex flex-col gap-1.5 mb-6">
              <p className="font-bold text-[14px] text-slate-800">
                {studentInfo.branch} - {joinYear}
              </p>
              <p className="font-bold text-[14px] text-slate-800">
                Sem - {studentInfo.currentSemester}
              </p>
            </div>

            <p className="text-[14px] text-slate-400">
              Student
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}