import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ResultPage() {
  const { currentUser } = useAuth();
  const cleanRollNumber = currentUser ? currentUser.split('@')[0].toUpperCase() : '';
  
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [allCourses, setAllCourses] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);

  const gradePoints = { 'O': 10, 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D+': 4, 'D': 3, 'F': 0, 'S': 0 };

  useEffect(() => {
    if (!cleanRollNumber) return;
    setIsLoading(true);
    
    fetch(`http://localhost:5000/api/results/${cleanRollNumber}`)
      .then(res => res.json())
      .then(data => {
        setStudentInfo(data.student);
        setAllCourses(data.allCourses || []);
        if (data.student && data.student.current_semester) {
            setSelectedSemester(data.student.current_semester.toString());
        }
        setIsLoading(false);
      })
      .catch(() => {
        setAllCourses([]); 
        setIsLoading(false);
      });
  }, [cleanRollNumber]);

  const calculateStats = () => {
    const semesterCourses = allCourses.filter(c => c.semester_execution.toString() === selectedSemester.toString());
    const cumulativeCourses = allCourses.filter(c => parseInt(c.semester_execution) <= parseInt(selectedSemester));

    let semEarned = 0, semGraded = 0, semPoints = 0;
    semesterCourses.forEach(c => {
      if (c.grade !== 'Pending') {
        if (c.grade !== 'F') semEarned += c.credits; 
        if (c.grade !== 'S') { semGraded += c.credits; semPoints += (c.credits * (gradePoints[c.grade] || 0)); }
      }
    });
    const spi = semGraded === 0 ? "0.0" : (semPoints / semGraded).toFixed(1);

    let cumGraded = 0, cumPoints = 0;
    cumulativeCourses.forEach(c => {
      if (c.grade !== 'Pending') {
        if (c.grade !== 'S') { cumGraded += c.credits; cumPoints += (c.credits * (gradePoints[c.grade] || 0)); }
      }
    });
    const cpi = cumGraded === 0 ? "0.0" : (cumPoints / cumGraded).toFixed(1);

    return { semesterCourses, semEarned, spi, cpi };
  };

  const { semesterCourses, semEarned, spi, cpi } = calculateStats();
  const availableSemesters = Array.from({ length: studentInfo?.current_semester || 1 }, (_, i) => i + 1);

  // THE ACADEMIC YEAR LOGIC
  const getAcademicYear = (roll, sem) => {
    if (!roll || roll.length < 2) return "N/A";
    
    // Grab the first two digits (e.g., '24') and add 2000 to get 2024
    const joinYear = 2000 + parseInt(roll.substring(0, 2));
    
    // Sem 1 & 2 add 0 years. Sem 3 & 4 add 1 year. Sem 5 & 6 add 2 years.
    const yearOffset = Math.floor((parseInt(sem) - 1) / 2);
    
    const startYear = joinYear + yearOffset;
    return `${startYear}-${startYear + 1}`;
  };

  return (
    <div className="p-8">
      <div className="flex items-center text-sm font-medium mb-6">
        <span className="text-slate-900">Home</span><ChevronRight size={16} className="mx-2 text-slate-400" />
        <span className="text-slate-900">Examination</span><ChevronRight size={16} className="mx-2 text-slate-400" />
        <span className="text-slate-900">Result</span>
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-4">Check Result</h2>
        
        <div className="mb-6 max-w-md">
          <label className="text-sm text-slate-600 mb-1 block">Semester <span className="text-red-500">*</span></label>
          <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500">
            {availableSemesters.map(num => <option key={num} value={num}>Semester {num}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-blue-600 font-bold animate-pulse">Loading grades...</div>
        ) : semesterCourses.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-medium border-2 border-dashed rounded">No grades found for Semester {selectedSemester}.</div>
        ) : (
          <div className="border-2 border-slate-800 p-8 mt-8 text-center max-w-5xl mx-auto bg-white">
            <div className="flex items-center justify-center gap-6 mb-6">
              <img src="/logo.png" className="w-16 h-16" alt="Logo" />
              <div>
                <h3 className="font-bold text-lg">PDPM Indian Institute of Information Technology, Design & Manufacturing, Jabalpur</h3>
                <p className="text-sm underline font-bold mt-2">Semester Grade Report / Marksheet</p>
              </div>
            </div>

            {/* UPDATED HEADER GRID: Added Academic Year and Semester No */}
            <div className="border-t-2 border-b-2 border-slate-800 py-4 flex flex-wrap text-left text-sm font-bold gap-y-4 uppercase">
               <div className="w-1/2">Name of Student: {studentInfo?.name}</div>
               <div className="w-1/2">Roll No.: {cleanRollNumber}</div>
               <div className="w-1/2">Programme: B.Tech</div>
               <div className="w-1/2">Branch: {studentInfo?.branch}</div>
               <div className="w-1/2 ">Academic Year: {getAcademicYear(cleanRollNumber, selectedSemester)}</div>
               <div className="w-1/2 ">Semester No: {selectedSemester}</div>
            </div>

            <table className="w-full border-collapse border border-slate-800 mt-4 text-sm text-left">
              <thead>
                <tr className="bg-blue-50/50">
                  <th className="border border-slate-800 p-2 text-center w-16">S.No.</th>
                  <th className="border border-slate-800 p-2 w-32">Course Code</th>
                  <th className="border border-slate-800 p-2">Course Title</th>
                  <th className="border border-slate-800 p-2 text-center w-24">Credits</th>
                  <th className="border border-slate-800 p-2 text-center w-24">Grade</th>
                </tr>
              </thead>
              <tbody>
                {semesterCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="border border-slate-800 p-2 text-center">{index + 1}</td>
                    <td className="border border-slate-800 p-2 font-bold uppercase">{course.code}</td>
                    <td className="border border-slate-800 p-2">{course.title}</td>
                    <td className="border border-slate-800 p-2 text-center">{course.credits}</td>
                    <td className="border border-slate-800 p-2 text-center font-bold">
                      {course.grade === 'Pending' ? <span className="text-orange-500">Pending</span> : course.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 mb-4 text-sm font-bold flex justify-between px-2">
              <span>Total Credits Earned: {semEarned}</span>
              <span>SPI: {spi} | CPI: {cpi}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}