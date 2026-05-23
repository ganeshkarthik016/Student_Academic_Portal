import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    // Hits your newly updated backend route
    fetch(`http://localhost:5000/api/student/${currentUser}`)
      .then(res => res.json())
      .then(data => {
        setStudentData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setIsLoading(false);
      });
  }, [currentUser]);

  return (
    <div className="p-8">
      <div className="flex items-center text-sm font-medium mb-6">
        <span className="text-slate-900">Home</span>
        <ChevronRight size={16} className="mx-2 text-slate-400" />
        <span className="text-slate-900">Registered Courses</span>
      </div>

      <div className="flex items-center border-b border-slate-200 mb-8">
        <button className="px-5 py-3 text-[14px] font-medium text-blue-500 border-b-2 border-blue-500 bg-blue-50/50">Profile</button>
        <button className="px-5 py-3 text-[14px] font-medium text-slate-600 hover:text-slate-900">Skills & Technologies</button>
        <button className="px-5 py-3 text-[14px] font-medium text-slate-600 hover:text-slate-900">Education & Courses</button>
      </div>

      {isLoading ? (
        <div className="text-blue-500 font-bold animate-pulse">Loading Profile Data...</div>
      ) : (
        <div className="flex gap-6 items-start">
          
          {/* Left Column Data */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-md">
              <div className="px-5 py-3 border-b border-slate-200 bg-[#FAFAFA] font-bold text-[15px]">About Me</div>
              <div className="px-5 py-4 flex justify-between items-center text-[14px]">
                <span>NA</span>
                <button className="bg-[#FF4F4F] text-white px-4 py-1.5 rounded text-sm hover:bg-red-600">Edit</button>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-md">
              <div className="px-5 py-3 border-b border-slate-200 bg-[#FAFAFA] font-bold text-[15px]">Details</div>
              <div className="flex border-b border-slate-100">
                <div className="w-1/3 px-5 py-3 text-[14px] font-semibold bg-[#FAFAFA]">College Email</div>
                <div className="w-2/3 px-5 py-3 text-[14px] text-blue-600 lowercase">{currentUser}@iiitdmj.ac.in</div>
              </div>
              <div className="flex">
                <div className="w-1/3 px-5 py-3 text-[14px] font-semibold bg-[#FAFAFA]">Address</div>
                <div className="w-2/3 px-5 py-3 text-[14px]">Jabalpur, Madhya Pradesh 482005</div>
              </div>
            </div>
          </div>

          {/* Right Column ID Card */}
          <div className="w-[300px] bg-white border border-slate-200 rounded-md overflow-hidden shrink-0 shadow-sm">
            <div className="h-[280px] bg-[#78959F]">
               <img src="/profile.jpg" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="p-6">
              <h2 className="text-[16px] font-bold uppercase tracking-wide text-slate-800">
                {studentData?.first_name} {studentData?.last_name}
              </h2>
              <p className="text-slate-500 text-[13px] mb-4 font-medium">{studentData?.roll_number}</p>
              <div className="text-[13px] space-y-1">
                <p className="font-semibold text-slate-800">{studentData?.branch_code} - B.Tech</p>
                <p className="text-slate-700">Sem - {studentData?.current_semester}</p>
                <p className="text-slate-400 mt-2">Student</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}