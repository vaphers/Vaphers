// 'use client';

// import React, { useState } from 'react';
// import { Calendar } from 'lucide-react';
// import TrafficSources from './TrafficSources'; // Ensure this path is correct

// // Define your top-level tabs here
// const MAIN_TABS = ['Traffic sources', 'Audience', 'Pages', 'Conversions'];

// export default function AnalyticsDashboard() {
//   // State to track which top-level tab is active
//   const [activeMainTab, setActiveMainTab] = useState('Traffic sources');

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-4 md:p-6">
      
//       {/* --- TOP HEADER & GLOBAL CONTROLS --- */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-slate-200 pb-4">
//         <div className="flex gap-4">
//           <div className="border border-slate-200 bg-white rounded-md p-2 flex items-center gap-2 text-sm shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
//             <Calendar className="w-4 h-4 text-indigo-600" />
//             <span className="font-medium">Last 30 Days</span>
//           </div>
//           <div className="border border-slate-200 bg-white rounded-md p-2 flex items-center gap-2 text-sm shadow-sm opacity-70">
//             <span className="text-slate-500">Compare to:</span>
//             <span className="font-medium">Previous Period</span>
//           </div>
//         </div>
//       </div>

//       {/* --- DYNAMIC MAIN TABS --- */}
//       <div className="flex gap-6 border-b border-slate-200 mb-6 text-sm font-medium overflow-x-auto ">
//         {MAIN_TABS.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveMainTab(tab)}
//             className={`pb-3 whitespace-nowrap transition-colors ${
//               activeMainTab === tab
//                 ? 'border-b-2 border-indigo-600 text-indigo-900'
//                 : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent cursor-pointer'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* --- TAB CONTENT ROUTER --- */}
//       <div className="w-full">
//         {activeMainTab === 'Traffic sources' && <TrafficSources />}
        
//         {activeMainTab === 'Audience' && (
//           <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-slate-50/50">
//             Audience Component Coming Soon
//           </div>
//         )}
        
//         {activeMainTab === 'Pages' && (
//           <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-slate-50/50">
//             Pages Component Coming Soon
//           </div>
//         )}
        
//         {activeMainTab === 'Conversions' && (
//           <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-slate-50/50">
//             Conversions Component Coming Soon
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }






// app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import TrafficSources from './TrafficSources'; // Ensure this path is correct

const MAIN_TABS = ['Traffic sources', 'Audience', 'Pages', 'Conversions'];

export default function AnalyticsDashboard() {
  const [activeMainTab, setActiveMainTab] = useState('Traffic sources');
  
  // NEW: State to hold our global date range
  const [dateRange, setDateRange] = useState({ start: '30daysAgo', end: 'today' });

  // Handle dropdown changes and map them to GA4 relative date strings
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'today') setDateRange({ start: 'today', end: 'today' });
    else if (val === '7daysAgo') setDateRange({ start: '7daysAgo', end: 'today' });
    else if (val === '30daysAgo') setDateRange({ start: '30daysAgo', end: 'today' });
    else if (val === '90daysAgo') setDateRange({ start: '90daysAgo', end: 'today' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-4 md:p-6">
      
      {/* --- TOP HEADER & GLOBAL CONTROLS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-slate-200 pb-4">
        <div className="flex gap-4">
          
          {/* FUNCTIONAL CALENDAR DROPDOWN */}
          <div className="border border-slate-200 bg-white rounded-md px-3 py-2 flex items-center gap-2 text-sm shadow-sm hover:bg-slate-50 transition-colors focus-within:border-indigo-500">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <select 
              className="bg-transparent font-medium outline-none cursor-pointer appearance-none text-slate-700"
              value={dateRange.start}
              onChange={handleDateChange}
            >
              <option value="today">Today</option>
              <option value="7daysAgo">Last 7 Days</option>
              <option value="30daysAgo">Last 30 Days</option>
              <option value="90daysAgo">Last 90 Days</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 -ml-1 pointer-events-none" />
          </div>

          <div className="border border-slate-200 bg-white rounded-md p-2 flex items-center gap-2 text-sm shadow-sm opacity-70">
            <span className="text-slate-500">Compare to:</span>
            <span className="font-medium">Previous Period</span>
          </div>
        </div>
      </div>

      {/* --- DYNAMIC MAIN TABS --- */}
      <div className="flex gap-6 border-b border-slate-200 mb-6 text-sm font-medium overflow-x-auto ">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveMainTab(tab)}
            className={`pb-3 whitespace-nowrap transition-colors ${
              activeMainTab === tab
                ? 'border-b-2 border-indigo-600 text-indigo-900'
                : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent cursor-pointer'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT ROUTER --- */}
      <div className="w-full">
        {/* Pass the dynamic dateRange state as a prop to TrafficSources */}
        {activeMainTab === 'Traffic sources' && <TrafficSources dateRange={dateRange} />}
        
        {activeMainTab === 'Audience' && (
          <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-slate-50/50">
            Audience Component Coming Soon
          </div>
        )}
        
        {activeMainTab === 'Pages' && (
          <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-slate-50/50">
            Pages Component Coming Soon
          </div>
        )}
        
        {activeMainTab === 'Conversions' && (
          <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-slate-50/50">
            Conversions Component Coming Soon
          </div>
        )}
      </div>

    </div>
  );
}