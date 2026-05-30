import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, CheckCircle, Search, Lock } from 'lucide-react';

export default function EnrollmentPage() {
  const { currentUser } = useAuth();
  const cleanRollNumber = currentUser ? currentUser.split('@')[0].toUpperCase() : '';
  
  const [activeTab, setActiveTab] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Course Data
  const [coreCourses, setCoreCourses] = useState([]);
  const [globalElectives, setGlobalElectives] = useState([]);
  const [enrolledCourseCodes, setEnrolledCourseCodes] = useState([]); // To filter out already chosen courses
  
  // Selections
  const [selectedCore, setSelectedCore] = useState([]);
  const [selectedElectives, setSelectedElectives] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Global Electives and Student History on Mount
  useEffect(() => {
    if (!cleanRollNumber) return;
    
    // Fetch History to know what to hide
    fetch(`http://localhost:5000/api/results/${cleanRollNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data.allCourses) {
          setEnrolledCourseCodes(data.allCourses.map(c => c.code));
        }
      });

    // Fetch Global Elective Pool
    fetch(`http://localhost:5000/api/all-electives/${cleanRollNumber}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGlobalElectives(data);
      });
  }, [cleanRollNumber]);

  // 2. Fetch Data for Active Tab
  useEffect(() => {
    if (!cleanRollNumber) return;
    
    setSelectedCore([]);
    setSelectedElectives([]);
    setSearchTerm('');

    // Check Lock
    fetch(`http://localhost:5000/api/check-enrollment/${cleanRollNumber}/${activeTab}`)
      .then(res => res.json())
      .then(data => setIsLocked(data.isEnrolled));

    // Fetch Core Courses for this Tab
    fetch(`http://localhost:5000/api/enrollment-options/${cleanRollNumber}/${activeTab}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            setCoreCourses(data.filter(c => c.course_type === 'Core'));
        }
      });
  }, [cleanRollNumber, activeTab]);

  // Filter out electives already chosen in previous semesters
  const availableElectives = globalElectives.filter(c => !enrolledCourseCodes.includes(c.course_code));
  
  // Apply Search Bar Filter
  const displayedElectives = availableElectives.filter(c => 
    c.course_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.course_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCore = (code) => {
    if (isLocked) return;
    setSelectedCore(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  };

  const toggleElective = (code) => {
    if (isLocked) return;
    setSelectedElectives(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  };

  const handleEnroll = async () => {
    if (selectedCore.length === 0 && selectedElectives.length === 0) {
        alert("Please select at least one course to enroll.");
        return;
    }

    setIsSubmitting(true);
    const finalCourseList = [...selectedCore, ...selectedElectives];

    await fetch('http://localhost:5000/api/submit-enrollment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rollNumber: cleanRollNumber,
        semester: activeTab,
        selectedCourses: finalCourseList
      })
    });
    
    // Add these to history so they disappear from elective lists in future tabs
    setEnrolledCourseCodes(prev => [...prev, ...finalCourseList]);
    
    setIsSubmitting(false);
    setIsLocked(true);
    alert(`Semester ${activeTab} courses successfully locked!`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6 text-slate-800">
        <BookOpen className="text-blue-600" /> Course Registration Gateway
      </h1>

      {/* SEMESTER TABS */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex overflow-x-auto mb-8">
        {[1,2,3,4,5,6,7,8].map(sem => (
          <button 
            key={sem} 
            onClick={() => setActiveTab(sem)}
            className={`flex-1 px-4 py-4 font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === sem ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
          >
            Sem {sem}
          </button>
        ))}
      </div>

      {isLocked ? (
        <div className="bg-green-50 border-2 border-green-200 text-green-800 p-12 rounded-xl shadow-sm text-center">
          <Lock size={64} className="mx-auto mb-6 text-green-600" />
          <h2 className="text-2xl font-bold mb-2">Semester {activeTab} Locked</h2>
          <p>You have already submitted course registration for this semester.</p>
        </div>
      ) : (
        <>
          {/* CORE COURSES (Must Check to Enroll) */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Mandatory Core Courses</h2>
            <div className="grid gap-3">
              {coreCourses.length === 0 ? <p className="text-slate-500 text-sm italic">No core courses required.</p> : null}
              {coreCourses.map(course => (
                <label key={course.course_code} className={`flex items-center gap-4 p-3 border rounded cursor-pointer transition-colors ${selectedCore.includes(course.course_code) ? 'bg-blue-50 border-blue-300' : 'hover:bg-slate-50'}`}>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" checked={selectedCore.includes(course.course_code)} onChange={() => toggleCore(course.course_code)} />
                  <div><span className="font-bold">{course.course_code}</span> - {course.course_name}</div>
                </label>
              ))}
            </div>
          </div>

          {/* GLOBAL ELECTIVES WITH SEARCH */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-end border-b pb-4 mb-4">
              <h2 className="text-lg font-bold">Add Electives (Global Pool)</h2>
              <div className="relative w-72">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by code or name..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-md pl-10 pr-4 py-2 outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid gap-3 max-h-80 overflow-y-auto pr-2">
              {displayedElectives.length === 0 ? <p className="text-slate-500 text-sm italic">No available electives match your search.</p> : null}
              {displayedElectives.map(course => (
                <label key={course.course_code} className={`flex items-center gap-4 p-3 border rounded cursor-pointer transition-colors ${selectedElectives.includes(course.course_code) ? 'bg-blue-50 border-blue-300' : 'hover:bg-slate-50'}`}>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" checked={selectedElectives.includes(course.course_code)} onChange={() => toggleElective(course.course_code)} />
                  <div><span className="font-bold">{course.course_code}</span> - {course.course_name}</div>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={handleEnroll} 
            disabled={isSubmitting || (selectedCore.length === 0 && selectedElectives.length === 0)}
            className="w-full bg-slate-800 text-white font-bold py-4 rounded-lg shadow hover:bg-slate-900 disabled:bg-slate-300 transition-colors flex justify-center items-center gap-2"
          >
            <CheckCircle size={20} /> {isSubmitting ? 'Saving...' : `Save & Lock Semester ${activeTab} Enrollment`}
          </button>
        </>
      )}
    </div>
  );
}