'use client';

import React, { useState } from 'react';

// Import your sub-tab components
import GeographyTab from './Audience Component/GeographyTab'; 
import DevicesTab from './Audience Component/DevicesTab';

const SUB_TABS = ['Geography', 'Devices'];

interface AudienceProps {
  dateRange: { start: string; end: string };
  compareDateRange?: { start: string; end: string };
}

export default function Audience({ dateRange, compareDateRange }: AudienceProps) {
  const [activeTab, setActiveTab] = useState('Geography'); // Set default tab

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Geography':
        // GeographyTab handles its own data fetching because it needs specific GA4 dimensions
        return <GeographyTab dateRange={dateRange} compareRange={compareDateRange} />;
      case 'Devices':
        return <DevicesTab dateRange={dateRange} compareRange={compareDateRange} />;
        return (
          <div className="p-20 text-center text-slate-500 h-full min-h-[400px]">
            <h3 className="text-xl font-semibold mb-2">Devices Tab</h3>
            <p>Coming Soon</p>
          </div>
        );
      default:  
        return (
          <div className="p-20 text-center text-slate-500 h-full min-h-[400px]">
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
          </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 bg-white p-2 rounded border border-slate-200 shadow-xs gap-4">
        <div className="flex flex-wrap p-2 w-full lg:w-auto">
          {SUB_TABS.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab ? 'bg-[#2383e2] text-white border-[#2383e2]' : 'text-slate-600 hover:bg-slate-50 border-slate-200 cursor-pointer'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded shadow-xs border border-slate-200 overflow-hidden min-h-[500px]">
        <h2 className="text-xl font-semibold p-4 md:px-6 pt-6 text-slate-800">
          {activeTab}
        </h2>
        {renderTabContent()}
      </div>
    </div>
  );
}