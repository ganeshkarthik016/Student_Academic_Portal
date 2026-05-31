// src/pages/HomePage.jsx
import { ChevronRight, Search } from 'lucide-react';
import { API_URL } from '../config';

export default function HomePage() {
  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm font-medium mb-6">
        <span className="text-slate-900">Home</span>
        <ChevronRight size={16} className="mx-2 text-slate-400" />
        <span className="text-slate-900">Registered Courses</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-16">
        <button className="px-6 py-2 text-sm font-medium text-blue-500 border-b-2 border-blue-500 bg-blue-50/50">
          Notifications
        </button>
        <button className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
          Announcements
        </button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
          <Search size={120} className="text-blue-600 z-10" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-medium text-slate-800 mb-2">No new notifications found!</h2>
        <p className="text-slate-500 text-sm">There is no new notification available. Please check back later.</p>
      </div>
    </div>
  );
}