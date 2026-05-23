import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Settings, Database, User } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [allCourses, setAllCourses] = useState([]);
  
  // State for editing grades
  const [editGrades, setEditGrades] = useState({});
  // State for editing student profile
  const [studentProfile, setStudentProfile] = useState({
    firstName: '', lastName: '', branchCode: '', currentSemester: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    
    // We can fetch everything from our existing results route!
    fetch(`http://localhost:5000/api/results/${currentUser}`)
      .then(res => res.json())
      .then(data => {
        setAllCourses(data.allCourses || []);
        
        // 1. Set Grades Data
        const currentGrades = {};
        (data.allCourses || []).forEach(c => {
          currentGrades[c.code] = c.grade;
        });
        setEditGrades(currentGrades);

        // 2. Set Profile Data
        if (data.student) {
          const names = data.student.name.split(' ');
          setStudentProfile({
            firstName: names[0] || '',
            lastName: names.slice(1).join(' ') || '',
            branchCode: data.student.branch || 'CSE',
            currentSemester: data.student.current_semester || '1'
          });
        }
      });
  }, [currentUser]);

  const handleSaveAll = async () => {
    setIsSaving(true);
    
    // 1. Save Profile Updates
    await fetch('http://localhost:5000/api/update-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rollNumber: currentUser,
        ...studentProfile
      })
    });

    // 2. Save Grade Updates
    for (const course of allCourses) {
      if (editGrades[course.code] !== course.grade) {
        await fetch('http://localhost:5000/api/save-grade', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rollNumber: currentUser,
            courseCode: course.code,
            semester: course.semester_execution,
            grade: editGrades[course.code]
          })
        });
      }
    }
    
    setIsSaving(false);
    alert("Profile and Grades updated successfully!");
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            <Settings className="text-blue-600" /> Data Management Portal
          </h1>
          <p className="text-slate-500">Update your profile data and past academic records here.</p>
        </div>
        
        <button 
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
        >
          <Save size={20} /> {isSaving ? 'Committing Changes...' : 'Save All Changes'}
        </button>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl">
        
        {/* ================= STUDENT PROFILE CARD ================= */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h2 className="font-bold flex items-center gap-2 text-slate-700">
              <User size={18} /> Edit Personal Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">First Name</label>
              <input 
                type="text" 
                value={studentProfile.firstName}
                onChange={e => setStudentProfile({...studentProfile, firstName: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Last Name</label>
              <input 
                type="text" 
                value={studentProfile.lastName}
                onChange={e => setStudentProfile({...studentProfile, lastName: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Branch</label>
              <select 
                value={studentProfile.branchCode}
                onChange={e => setStudentProfile({...studentProfile, branchCode: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="DS">Design</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Current Semester</label>
              <select 
                value={studentProfile.currentSemester}
                onChange={e => setStudentProfile({...studentProfile, currentSemester: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ================= ACADEMIC RECORDS CARD ================= */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h2 className="font-bold flex items-center gap-2 text-slate-700">
              <Database size={18} /> Edit Past Grades
            </h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-6 border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r">
              These are your auto-generated grades. Update them to match your real Marksheet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allCourses.length === 0 ? (
                <p className="text-slate-500 italic">No past courses found.</p>
              ) : allCourses.map(course => (
                <div key={course.code} className="flex items-center justify-between border border-slate-200 rounded p-3">
                  <div className="min-w-0 pr-4">
                    <p className="font-bold text-sm text-slate-800">{course.code} <span className="text-slate-400 font-normal">(Sem {course.semester_execution})</span></p>
                    <p className="text-xs text-slate-500 truncate">{course.title}</p>
                  </div>
                  <select 
                    value={editGrades[course.code] || ''}
                    onChange={(e) => setEditGrades(prev => ({ ...prev, [course.code]: e.target.value }))}
                    className="border border-slate-300 rounded p-1.5 text-sm font-bold bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
                  >
                    {['O', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'S'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
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