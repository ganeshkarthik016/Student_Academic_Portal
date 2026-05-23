import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ResultPage() {
  const { currentUser } = useAuth();
  
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [allCourses, setAllCourses] = useState([]); // Holds EVERY grade
  const [isLoading, setIsLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);

  const gradePoints = {
    'O': 10, 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 
    'C+': 6, 'C': 5, 'D+': 4, 'D': 3, 'F': 0, 'S': 0
  };

  // FETCH ALL RESULTS ONCE
  useEffect(() => {
    if (!currentUser) return;
    
    setIsLoading(true);
    // Ping the new backend route that gets ALL semesters
    fetch(`http://localhost:5000/api/results/${currentUser}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setStudentInfo(data.student);
        setAllCourses(data.allCourses);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setAllCourses([]); 
        setIsLoading(false);
      });
  }, [currentUser]);

  // MATH ENGINE: Calculate SPI and CPI dynamically
  const calculateStats = () => {
    // 1. Filter for just the selected semester (Table & SPI)
    const semesterCourses = allCourses.filter(c => c.semester_execution.toString() === selectedSemester.toString());
    
    // 2. Filter for all courses UP TO the selected semester (CPI)
    const cumulativeCourses = allCourses.filter(c => parseInt(c.semester_execution) <= parseInt(selectedSemester));

    // Calculate SPI (Semester)
    let semEarned = 0, semGraded = 0, semPoints = 0;
    semesterCourses.forEach(c => {
      semEarned += c.credits;
      if (c.grade !== 'S') {
        semGraded += c.credits;
        semPoints += (c.credits * (gradePoints[c.grade] || 0));
      }
    });
    const spi = semGraded === 0 ? "0.0" : (semPoints / semGraded).toFixed(1);

    // Calculate CPI (Cumulative)
    let cumGraded = 0, cumPoints = 0;
    cumulativeCourses.forEach(c => {
      if (c.grade !== 'S') {
        cumGraded += c.credits;
        cumPoints += (c.credits * (gradePoints[c.grade] || 0));
      }
    });
    const cpi = cumGraded === 0 ? "0.0" : (cumPoints / cumGraded).toFixed(1);

    return { semesterCourses, semEarned, spi, cpi };
  };

  const { semesterCourses, semEarned, spi, cpi } = calculateStats();

  return (
    <div className="p-8">
      <div className="flex items-center text-sm font-medium mb-6">
        <span className="text-slate-900">Home</span>
        <ChevronRight size={16} className="mx-2 text-slate-400" />
        <span className="text-slate-900">Examination</span>
        <ChevronRight size={16} className="mx-2 text-slate-400" />
        <span className="text-slate-900">Result</span>
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-4">Check Result</h2>
        
        <div className="mb-6 max-w-md">
          <label className="text-sm text-slate-600 mb-1 block">Semester <span className="text-red-500">*</span></label>
          <select 
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>Semester {num}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-blue-600 font-bold animate-pulse">
            Fetching grades from database...
          </div>
        ) : semesterCourses.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-medium border-2 border-dashed border-slate-200 rounded">
            No grades found for Semester {selectedSemester}.
          </div>
        ) : (
          <div className="border-2 border-slate-800 p-8 mt-8 text-center max-w-5xl mx-auto bg-white">
            <div className="flex items-center justify-center gap-6 mb-6">
              <img src="/logo.png" className="w-16 h-16" alt="IIITDMJ Logo" />
              <div>
                <h3 className="font-bold text-lg">PDPM Indian Institute of Information Technology, Design & Manufacturing, Jabalpur</h3>
                <p className="text-sm font-medium mt-1">(An Institute of National Importance under MoE, Govt. of India)</p>
                <p className="text-sm underline font-bold mt-2">Semester Grade Report / Marksheet</p>
              </div>
            </div>

            <div className="border-t-2 border-b-2 border-slate-800 py-4 flex flex-wrap text-left text-sm font-bold gap-y-4 uppercase">
               <div className="w-1/2">Name of Student: {studentInfo?.name || "LOADING..."}</div>
               <div className="w-1/2">Roll No.: {currentUser}</div>
               <div className="w-1/2">Programme: B.Tech</div>
               <div className="w-1/2">Branch: {studentInfo?.branch || "LOADING..."}</div>
               <div className="w-1/2">Semester: {selectedSemester}</div>
               <div className="w-1/2">Academic Year: 2024-25</div>
            </div>

            <table className="w-full border-collapse border border-slate-800 mt-4 text-sm text-left">
              <thead>
                <tr className="bg-blue-50/50">
                  <th className="border border-slate-800 p-2 text-center w-16">S.No.</th>
                  <th className="border border-slate-800 p-2 w-32">Course Code</th>
                  <th className="border border-slate-800 p-2">Course Title</th>
                  <th className="border border-slate-800 p-2 text-center w-24">Credits</th>
                  <th className="border border-slate-800 p-2 text-center w-24">Grade</th>
                  <th className="border border-slate-800 p-2 text-center w-24">Grade Points</th>
                </tr>
              </thead>
              <tbody>
                {semesterCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-800 p-2 text-center">{index + 1}</td>
                    <td className="border border-slate-800 p-2 font-bold uppercase">{course.code}</td>
                    <td className="border border-slate-800 p-2">{course.title}</td>
                    <td className="border border-slate-800 p-2 text-center">{course.credits}</td>
                    <td className="border border-slate-800 p-2 text-center font-bold">{course.grade}</td>
                    <td className="border border-slate-800 p-2 text-center text-slate-600">
                      {(gradePoints[course.grade] || 0).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 mb-4 text-sm font-bold flex justify-between px-2">
              <span>Total Credits Earned: {semEarned}</span>
              {/* SPI AND CPI SEPARATED! */}
              <span>SPI: {spi} | CPI: {cpi}</span>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}