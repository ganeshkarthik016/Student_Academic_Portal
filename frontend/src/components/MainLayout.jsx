// src/components/MainLayout.jsx
import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Home, BookOpen, Calendar, FileText, User, Settings, 
  HelpCircle, Bell, Search, LogOut, ChevronRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function MainLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // NEW: State to hold your formatted full name
  const [studentFullName, setStudentFullName] = useState('');
  const cleanRollNumber = currentUser ? currentUser.split('@')[0].toUpperCase() : '';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NEW: Fetch your actual name from the database for the dropdown
  useEffect(() => {
    if (cleanRollNumber) {
      fetch(`http://localhost:5000/api/student/${cleanRollNumber}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.first_name) {
            // Formats it exactly like your screenshot: BHANUPANTHULA_GANESH...
            setStudentFullName(`${data.last_name || ''}_${data.first_name || ''}`.toUpperCase());
          }
        })
        .catch(err => console.error("Could not fetch name for sidebar", err));
    }
  }, [cleanRollNumber]);

  const handleLogout = async () => {
    await signOut(auth);
    logout();
  };

  const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        flex items-center gap-4 px-6 py-3 font-medium transition-colors border-l-4
        ${isActive 
          ? 'bg-blue-50 text-blue-600 border-blue-600' 
          : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'}
      `}
    >
      <Icon size={20} className="shrink-0" />
      <span className="text-[14px]">{label}</span>
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-[#FAFAFA] font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col z-20 shrink-0">
        <div className="h-[64px] flex items-center px-6 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-blue-900 text-[17px] leading-tight">IIITDM</span>
              <span className="font-bold text-blue-500 text-[9px] uppercase tracking-widest">Jabalpur</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <SidebarLink to="/dashboard" icon={Home} label="Home" />
            <SidebarLink to="/dashboard/enrollment" icon={BookOpen} label="Course Enrollment" />
            <SidebarLink to="/dashboard/examination" icon={FileText} label="Examination" />
          </div>

          <div className="mt-8">
            <div className="px-6 flex items-center mb-2">
               <div className="h-px bg-slate-200 flex-1"></div>
               <span className="px-3 text-[11px] text-slate-400 uppercase tracking-wider font-medium">Miscellaneous</span>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            <div className="flex flex-col gap-1">
              <SidebarLink to="/dashboard/profile" icon={User} label="Profile" />
              <SidebarLink to="/dashboard/settings" icon={Settings} label="Settings" />
              <SidebarLink to="/dashboard/help" icon={HelpCircle} label="Help" />
            </div>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="h-[64px] bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
          <h1 className="text-[16px] text-slate-800 font-medium">
            FUSION - IIITDMJ's ERP Portal
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="bg-[#EBF4FE] border border-[#D1E4FA] px-3 py-1.5 rounded flex items-center w-48">
              <span className="text-sm text-slate-700 flex-1">student</span>
            </div>

            <button className="text-amber-500 relative">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border border-white"></span>
            </button>

            {/* PROFILE DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 focus:outline-none"
              >
                <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-[320px] bg-white rounded-lg shadow-lg border border-slate-100 p-4 flex gap-4">
                  <img src="/profile.jpg" className="w-16 h-16 rounded-full object-cover shrink-0" />
                  <div className="flex flex-col justify-center min-w-0">
                    
                    {/* 👇 THIS IS THE TRUNCATED NAME FIX 👇 */}
                    <div className="font-black text-slate-900 text-[15px] truncate max-w-[180px] uppercase mb-3" title={studentFullName || currentUser}>
                      {studentFullName || currentUser || "STUDENT"}
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { navigate('/dashboard/profile'); setIsProfileOpen(false); }}
                        className="flex-1 py-1.5 text-blue-600 bg-blue-50 rounded border border-blue-100 text-xs font-bold hover:bg-blue-100 flex justify-center items-center gap-1"
                      >
                        Profile <User size={14} />
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex-1 py-1.5 text-red-600 bg-red-50 rounded border border-red-100 text-xs font-bold hover:bg-red-100 flex justify-center items-center gap-1"
                      >
                        Log out <LogOut size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}