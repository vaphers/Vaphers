'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import OverviewTab from './Traffic Source Component/Overview'; 
import OrganicTraffic from './Traffic Source Component/OrganicTraffic'; 
import PaidTraffic from './Traffic Source Component/PaidTraffic';
import ReferralTraffic from './Traffic Source Component/ReferralTraffic'; 
import SocialTraffic from './Traffic Source Component/SocialTraffic'; 

const SUB_TABS = ['Overview', 'Organic Traffic',  'Referral Traffic', 'Social Traffic' , 'Paid Traffic'];

interface TrafficSourcesProps {
  dateRange: { start: string; end: string };
  compareDateRange?: { start: string; end: string };
}

export default function TrafficSources({ dateRange, compareDateRange }: TrafficSourcesProps) {
  const [rawData, setRawData] = useState<any[] | null>(null);
  const [compareData, setCompareData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Don't fetch if dates are empty
      if (!dateRange.start || !dateRange.end) return;

      try {
        setLoading(true);
        setError(null);
        
        const params: Record<string, string> = {
          startDate: dateRange.start,
          endDate: dateRange.end,
        };

        if (compareDateRange?.start && compareDateRange?.end) {
          params.compareStart = compareDateRange.start;
          params.compareEnd = compareDateRange.end;
        }

        const queryParams = new URLSearchParams(params);
        const res = await fetch(`/api/analytics?${queryParams.toString()}`);
        const json = await res.json();
        
        if (!json.success) throw new Error(json.error || `Server Error`);

        setRawData(json.data);
        setCompareData(json.compareData || null);

      } catch (err: any) {
        setError(err.message || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange, compareDateRange]); 

  const renderTabContent = () => {
    if (!rawData) return null;

    switch (activeTab) {
      case 'Overview':
        return <OverviewTab rawData={rawData} compareData={compareData} />;
      case 'Organic Traffic':
        return <OrganicTraffic rawData={rawData} compareData={compareData} />;
      case 'Paid Traffic':
        return <PaidTraffic rawData={rawData} compareData={compareData} />;
      case 'Referral Traffic':
        return <ReferralTraffic rawData={rawData} compareData={compareData} />;
      case 'Social Traffic':
        return <SocialTraffic rawData={rawData} compareData={compareData} />;
      default:  
        return (
          <div className="p-20 text-center text-slate-500 h-full min-h-[400px]">
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-4 bg-white rounded-sm border border-slate-200">
        <div className="w-8 h-8 border-4 border-[#2383e2] border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse font-medium">Loading live data...</p>
      </div>
    );
  }

  if (error || !rawData) {
    return (
      <div className="py-20 flex items-center justify-center bg-white rounded-xl border border-slate-200 p-6 mx-4">
         <div className="flex flex-col sm:flex-row items-center gap-2 text-red-500 text-center sm:text-left">
           <AlertCircle className="w-5 h-5 shrink-0" />
           <p className="font-medium text-sm sm:text-base">{error || "Failed to load data"}</p>
         </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 w-full min-w-0">
      
      {/* Tab Navigation Container */}
      <div className="flex flex-col mb-4 bg-white p-2 rounded border border-slate-200 shadow-xs w-full overflow-hidden">
        
        {/* Changed: Used overflow-x-auto to allow horizontal scrolling on mobile instead of messy wrapping */}
        <div className="flex overflow-x-auto w-full scrollbar-hide lg:flex-wrap gap-1 md:gap-0 pb-1 lg:pb-0">
          {SUB_TABS.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              // Changed: Added shrink-0 and whitespace-nowrap so buttons don't crush on small screens
              className={`shrink-0 whitespace-nowrap px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab 
                  ? 'bg-[#2383e2] text-white border-[#2383e2]' 
                  : 'text-slate-600 hover:bg-slate-50 border-slate-200 cursor-pointer'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white rounded shadow-xs border border-slate-200 overflow-hidden min-h-[500px]">
        <h2 className="text-xl font-semibold p-4 md:px-6 pt-6 text-slate-800">
          {activeTab}
        </h2>
        
        {/* Added overflow-x-auto here just in case the inner charts overflow their bounds on mobile */}
        <div className="w-full overflow-x-auto">
          {renderTabContent()}
        </div>
      </div>
      
    </div>
  );
}