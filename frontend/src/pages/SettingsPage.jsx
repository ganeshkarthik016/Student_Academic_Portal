import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Settings, Database, User } from 'lucide-react';
import { API_URL } from '../config';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const cleanRollNumber = currentUser ? currentUser.split('@')[0].toUpperCase() : '';
  
  const [allCourses, setAllCourses] = useState([]);
  const [editGrades, setEditGrades] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  // NEW: Added dob and contactNumber to the state!
  const [studentProfile, setStudentProfile] = useState({ 
    firstName: '', lastName: '', branchCode: '', currentSemester: '1', dob: '', contactNumber: '' 
  });

  const fetchGradesAndProfile = () => {
    fetch(`${API_URL}/api/results/${cleanRollNumber}`)
      .then(res => res.json())
      .then(data => {
        setAllCourses(data.allCourses || []);
        const currentGrades = {};
        (data.allCourses || []).forEach(c => currentGrades[c.code] = c.grade);
        setEditGrades(currentGrades);

        if (data.student) {
          setActiveTab(data.student.current_semester || 1);
          
          // Fetch the full student details to get DOB and Phone
          fetch(`${API_URL}/api/student/${cleanRollNumber}`)
            .then(res => res.json())
            .then(studentData => {
                setStudentProfile({
                  firstName: studentData.first_name || '',
                  lastName: studentData.last_name || '',
                  branchCode: studentData.branch_code || 'CSE',
                  currentSemester: studentData.current_semester || '1',
                  dob: studentData.dob ? studentData.dob.split('T')[0] : '', // Formats date for HTML input
                  contactNumber: studentData.contact_number || ''
                });
            });
        }
      });
  };

  useEffect(() => { if (cleanRollNumber) fetchGradesAndProfile(); }, [cleanRollNumber]);

  const handleSaveAll = async () => {
    setIsSaving(true);
    // This now sends DOB and Contact to the backend!
    await fetch(`${API_URL}/api/update-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rollNumber: cleanRollNumber, ...studentProfile })
    });
    
    for (const course of allCourses) {
      if (editGrades[course.code] !== course.grade) {
        await fetch(`${API_URL}/api/save-grade`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rollNumber: cleanRollNumber,
            courseCode: course.code,
            semester: course.semester_execution,
            grade: editGrades[course.code]
          })
        });
      }
    }
    setIsSaving(false);
    alert("Profile and Grades updated successfully!");
    fetchGradesAndProfile(); 
  };

  const availableSemesters = Array.from({ length: studentProfile.currentSemester }, (_, i) => i + 1);
  const coursesForActiveTab = allCourses.filter(c => c.semester_execution.toString() === activeTab.toString());

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Settings className="text-blue-600" /> Account Settings
        </h1>
        <button onClick={handleSaveAll} disabled={isSaving} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700">
          <Save size={20} /> {isSaving ? 'Committing...' : 'Save All Changes'}
        </button>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl">
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 grid grid-cols-2 gap-6">
          <div><label className="text-sm font-bold block mb-1">First Name</label><input type="text" value={studentProfile.firstName} onChange={e => setStudentProfile({...studentProfile, firstName: e.target.value})} className="w-full border rounded p-2 focus:ring-2 outline-none" /></div>
          <div><label className="text-sm font-bold block mb-1">Last Name</label><input type="text" value={studentProfile.lastName} onChange={e => setStudentProfile({...studentProfile, lastName: e.target.value})} className="w-full border rounded p-2 focus:ring-2 outline-none" /></div>
          
          {/* 👇 THESE ARE THE NEW INPUT BOXES 👇 */}
          <div><label className="text-sm font-bold block mb-1">Date of Birth</label><input type="date" value={studentProfile.dob} onChange={e => setStudentProfile({...studentProfile, dob: e.target.value})} className="w-full border rounded p-2 focus:ring-2 outline-none text-slate-700" /></div>
          <div><label className="text-sm font-bold block mb-1">Contact Number</label><input type="tel" value={studentProfile.contactNumber} onChange={e => setStudentProfile({...studentProfile, contactNumber: e.target.value})} className="w-full border rounded p-2 focus:ring-2 outline-none text-slate-700"  /></div>
          
          <div><label className="text-sm font-bold block mb-1 text-slate-500">Branch</label><input type="text" disabled value={studentProfile.branchCode} className="w-full border rounded p-2 bg-slate-100 font-bold text-slate-500" /></div>
          <div>
            <label className="text-sm font-bold block mb-1 text-blue-600">Current Semester</label>
            <select value={studentProfile.currentSemester} onChange={e => setStudentProfile({...studentProfile, currentSemester: e.target.value})} className="w-full border-2 border-blue-400 rounded p-2 font-bold outline-none">
              {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 flex overflow-x-auto">
            {availableSemesters.map(sem => (
              <button 
                key={sem} 
                onClick={() => setActiveTab(sem)}
                className={`px-6 py-4 font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === sem ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
              >
                Semester {sem}
              </button>
            ))}
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coursesForActiveTab.length === 0 ? (
                <p className="text-slate-500 italic">No courses enrolled for Semester {activeTab}.</p>
              ) : coursesForActiveTab.map(course => (
                <div key={course.code} className="flex items-center justify-between border rounded p-3">
                  <div className="min-w-0 pr-4">
                    <p className="font-bold text-sm">{course.code}</p>
                    <p className="text-xs text-slate-500 truncate">{course.title}</p>
                  </div>
                  <select 
                    value={editGrades[course.code] || ''}
                    onChange={(e) => setEditGrades(prev => ({ ...prev, [course.code]: e.target.value }))}
                    className={`border border-slate-300 rounded p-1.5 text-sm font-bold outline-none ${editGrades[course.code] === 'Pending' ? 'text-orange-600 bg-orange-50' : 'bg-slate-50'}`}
                  >
                    {['Pending', 'O', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'S'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}