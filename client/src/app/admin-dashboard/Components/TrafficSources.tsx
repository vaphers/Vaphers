'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
// Import both components here
import OverviewTab from './Traffic Source Component/Overview'; 
import OrganicTraffic from './Traffic Source Component/OrganicTraffic'; 
import PaidTraffic from './Traffic Source Component/PaidTraffic';

const SUB_TABS = ['Overview', 'Organic Traffic', 'Paid Traffic', 'Referral Traffic', 'Social Traffic'];

interface TrafficSourcesProps {
  dateRange: {
    start: string;
    end: string;
  };
}

export default function TrafficSources({ dateRange }: TrafficSourcesProps) {
  const [rawData, setRawData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const queryParams = new URLSearchParams({
          startDate: dateRange.start,
          endDate: dateRange.end,
        });

        const res = await fetch(`/api/analytics?${queryParams.toString()}`);
        const json = await res.json();
        
        if (!json.success) {
          throw new Error(json.error || `Server Error: Failed to fetch`);
        }

        setRawData(json.data);
      } catch (err: any) {
        console.error("Dashboard failed to load:", err);
        setError(err.message || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange]); 

  // Helper function to render the correct component based on activeTab
  const renderTabContent = () => {
    if (!rawData) return null;

    switch (activeTab) {
      case 'Overview':
        return <OverviewTab rawData={rawData} dateRange={dateRange} />;
      case 'Organic Traffic':
        return <OrganicTraffic rawData={rawData} dateRange={dateRange} />;
      case 'Paid Traffic':
        return <PaidTraffic rawData={rawData} dateRange={dateRange} />;
      default:
        // Empty state for Paid, Referral, Social
        return (
          <div className="p-20 text-center text-slate-500 flex flex-col items-center justify-center h-full min-h-[400px]">
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p>The {activeTab} tab is currently under development.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-4 bg-white rounded-xl border border-slate-200">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse font-medium">Fetching live data...</p>
      </div>
    );
  }

  if (error || !rawData) {
    return (
      <div className="py-20 flex items-center justify-center bg-white rounded-xl border border-slate-200 p-6">
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Failed to load Data</h3>
          <p className="text-sm text-slate-600 bg-red-50 p-3 rounded-md border border-red-100 font-mono break-words">
            {error || "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* SUB TABS ROUTER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 bg-white p-2 rounded border border-slate-200 shadow-xm gap-4">
        <div className="flex flex-wrap p-2 w-full lg:w-auto">
          {SUB_TABS.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-colors  ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50 border-slate-200 cursor-pointer'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD CONTAINER */}
      <div className="bg-white rounded shadow-xm border border-slate-200 overflow-hidden min-h-[500px]">
        {/* We keep the title rendering here so it's consistent across all tabs */}
        <h2 className="text-xl font-semibold p-4 md:px-6 pt-6 flex items-center gap-2 text-slate-800">
          {activeTab}
        </h2>
        
        {/* Render the selected component */}
        {renderTabContent()}
      </div>
    </div>
  );
}