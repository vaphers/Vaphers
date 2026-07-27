'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown, ArrowDownUp } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, subMonths, differenceInDays, subYears } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TrafficSources from './TrafficSources';
import Audience from './Audiences';

const MAIN_TABS = ['Traffic sources', 'Audience', 'Pages', 'Conversions'];

// Helpers for default dates
const getTodayStr = () => format(new Date(), 'yyyy-MM-dd');
const getStartOfMonthStr = () => format(startOfMonth(new Date()), 'yyyy-MM-dd');

// --- PRESET LOGIC ---
const PRESETS = [
  { label: 'Today', getValue: () => ({ from: new Date(), to: new Date() }) },
  { label: 'Yesterday', getValue: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }) },
  { label: 'This month', getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
  { label: 'Last month', getValue: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
  { label: 'Last 30 days', getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { label: 'Last 90 days', getValue: () => ({ from: subDays(new Date(), 90), to: new Date() }) },
];

export default function AnalyticsDashboard() {
  const [activeMainTab, setActiveMainTab] = useState('Traffic sources');
  
  // Responsive State for Calendar
  const [isMobile, setIsMobile] = useState(false);

  // Dashboard Master State
  const [dateRange, setDateRange] = useState({ start: getStartOfMonthStr(), end: getTodayStr() });
  
  // Comparison Master State
  const [isComparing, setIsComparing] = useState(false);
  const [compareMode, setCompareMode] = useState<'previous' | 'previous-year' | 'custom'>('previous');
  const [compareDateRange, setCompareDateRange] = useState({ start: '', end: '' });

  // Popover UI State
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [activePreset, setActivePreset] = useState('This month');

  // Temporary State (inside popover before hitting Apply)
  const [tempRange, setTempRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: startOfMonth(new Date()), to: new Date() });
  const [tempIsComparing, setTempIsComparing] = useState(false);
  const [tempCompareMode, setTempCompareMode] = useState<'previous' | 'previous-year' | 'custom'>('previous');
  const [tempCompareRange, setTempCompareRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

  // Handle window resize for responsive calendar months
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile(); // Check on mount
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Sync state when popover opens
  useEffect(() => {
    if (isPickerOpen) {
      setTempRange({
        from: dateRange.start ? new Date(dateRange.start + 'T12:00:00') : new Date(),
        to: dateRange.end ? new Date(dateRange.end + 'T12:00:00') : new Date()
      });
      setTempIsComparing(isComparing);
      setTempCompareMode(compareMode);
      setTempCompareRange({ start: compareDateRange.start, end: compareDateRange.end });
    }
  }, [isPickerOpen, dateRange, isComparing, compareMode, compareDateRange]);

  // Handle Preset Click via Dropdown
  const handlePresetChange = (presetLabel: string) => {
    setActivePreset(presetLabel);
    if (presetLabel === 'Custom') return;

    const preset = PRESETS.find(p => p.label === presetLabel);
    if (preset) {
      const range = preset.getValue();
      setTempRange(range);
      updatePreviousPeriod(range.from, range.to, tempCompareMode);
    }
  };

  // Helper: Auto-calculate previous period/year
  const updatePreviousPeriod = (from?: Date, to?: Date, mode: string = tempCompareMode) => {
    if (!from || !to) return;
    
    if (mode === 'previous') {
      const daysDiff = differenceInDays(to, from);
      const prevFrom = subDays(from, daysDiff + 1);
      const prevTo = subDays(to, daysDiff + 1);
      setTempCompareRange({
        start: format(prevFrom, 'yyyy-MM-dd'),
        end: format(prevTo, 'yyyy-MM-dd')
      });
    } else if (mode === 'previous-year') {
      setTempCompareRange({
        start: format(subYears(from, 1), 'yyyy-MM-dd'),
        end: format(subYears(to, 1), 'yyyy-MM-dd')
      });
    }
  };

  // Handle Apply
  const handleApply = () => {
    if (tempRange.from) {
      setDateRange({
        start: format(tempRange.from, 'yyyy-MM-dd'),
        end: tempRange.to ? format(tempRange.to, 'yyyy-MM-dd') : format(tempRange.from, 'yyyy-MM-dd')
      });
    }
    
    setIsComparing(tempIsComparing);
    setCompareMode(tempCompareMode);
    
    if (tempIsComparing) {
      setCompareDateRange({
        start: tempCompareRange.start,
        end: tempCompareRange.end || tempCompareRange.start
      });
    }
    
    setIsPickerOpen(false);
  };

  // UI Formatter for Date Boxes
  const formatDateBox = (d: Date | string | undefined) => {
    if (!d) return '...';
    const parsed = typeof d === 'string' ? new Date(d + 'T12:00:00') : d;
    return format(parsed, 'MMM-dd yyyy');
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      ` }} />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl tracking-tight text-slate-900 leading-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            Analytics Overview
          </span>
        </div>
      </header>

      <div className="w-full px-4 md:px-8">
      {/* --- TOP HEADER & GLOBAL CONTROLS --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4 border-b border-slate-200 pb-4">
        
        <div className="flex flex-col w-full gap-2">
          {/* Dynamic Label Header */}
          <div className="text-xs montserrat-medium text-slate-500 uppercase tracking-wider mb-1">
             <span>Date range{isComparing ? ' & Comparison' : ''}:</span>
          </div>

          <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
            <PopoverTrigger asChild>
              {/* Responsive trigger button layout */}
              <button className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 w-full sm:max-w-fit border border-slate-200 bg-white rounded-sm px-4 py-2.5 shadow-xs transition-colors text-sm font-medium text-slate-700 outline-none text-left">
                
                {/* Primary Date Range */}
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-slate-900 shrink-0" />
                  <span className='text-slate-900 truncate'>
                    {format(new Date(dateRange.start + 'T12:00:00'), 'MMM d, yyyy')} – {format(new Date(dateRange.end + 'T12:00:00'), 'MMM d, yyyy')}
                  </span>
                </div>
                
                {/* Comparison Date Range */}
                {isComparing && compareDateRange.start && (
                  <div className="flex items-center gap-1 sm:gap-2 text-slate-500 pl-6 sm:pl-0 w-full sm:w-auto">
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="truncate">
                      vs {format(new Date(compareDateRange.start + 'T12:00:00'), 'MMM d, yyyy')} – {format(new Date(compareDateRange.end + 'T12:00:00'), 'MMM d, yyyy')}
                    </span>
                  </div>
                )}
                <ChevronDown className="hidden sm:block w-4 h-4 ml-auto sm:ml-2 text-slate-400 shrink-0" />
              </button>
            </PopoverTrigger>

            {/* POPOVER CONTENT */}
            <PopoverContent className="w-full sm:w-auto p-0 bg-white border-slate-200 shadow-xl rounded-sm max-w-[95vw] overflow-y-auto max-h-[90vh]" align="start">
              <div className="flex flex-col lg:flex-row">
                
                {/* Calendar */}
                <div className="p-4 flex-1 border-b lg:border-b-0 lg:border-r border-slate-100 flex justify-center overflow-x-auto">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={tempRange.from}
                    selected={tempRange}
                    showOutsideDays={false}
                    onSelect={(range: any) => {
                      setTempRange(range || { from: undefined, to: undefined });
                      setActivePreset('Custom');
                      updatePreviousPeriod(range?.from, range?.to);
                    }}
                    numberOfMonths={isMobile ? 1 : 2} // Responsive months
                    className="p-0 font-sans"
                    classNames={{
                      day: "h-9 w-9 p-0 font-normal text-sm aria-selected:opacity-100 rounded-sm transition-colors",
                      day_today: "bg-slate-100 text-slate-900",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#2383e2]/10 first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm focus-within:relative focus-within:z-20",
                      day_selected: "bg-[#2383e2] text-white hover:bg-[#2383e2] hover:text-white focus:bg-[#2383e2] focus:text-white",
                      day_range_start: "bg-[#2383e2] text-white hover:bg-[#2383e2] hover:text-white",
                      day_range_end: "bg-[#2383e2] text-white hover:bg-[#2383e2] hover:text-white",
                      day_range_middle: "aria-selected:bg-transparent aria-selected:text-[#2383e2] hover:bg-[#2383e2]/20",
                    }}
                  />
                </div>

                {/* Calendar Panel */}
                <div className="w-full lg:w-[260px] p-4 flex flex-col gap-4 bg-white rounded-r-sm">
                  
                  {/* Date Range Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-500">Date range:</label>
                    <Select value={activePreset} onValueChange={handlePresetChange}>
                      <SelectTrigger className="h-8 rounded-sm text-sm border-slate-300 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent> 
                        {PRESETS.map(p => (
                          <SelectItem key={p.label} value={p.label}>{p.label}</SelectItem>
                        ))}
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Read-only Display Box */}
                    <div className="flex items-center gap-2 border border-slate-300 rounded-sm px-3 py-1.5 bg-slate-50">
                      <CalendarIcon className="w-4 h-4 text-blue-900 flex-shrink-0" />
                      <span className="text-sm text-slate-700 truncate">
                        {formatDateBox(tempRange.from)} – {formatDateBox(tempRange.to)}
                      </span>
                    </div>
                  </div>

                  {/* Comparison Controls */}
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={tempIsComparing}
                          onChange={(e) => {
                            setTempIsComparing(e.target.checked);
                            if (e.target.checked) updatePreviousPeriod(tempRange.from, tempRange.to);
                          }}
                        />
                        <div className={`block w-9 h-5 rounded-full transition-colors ${tempIsComparing ? 'bg-[#2383e2]' : 'bg-slate-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${tempIsComparing ? 'translate-x-4' : ''}`}></div>
                      </div>
                      <span className="text-sm text-gray-700">Compare to:</span>
                    </label>

                    {tempIsComparing && (
                      <div className="flex flex-col gap-2">
                        <Select 
                          value={tempCompareMode} 
                          onValueChange={(val: any) => {
                            setTempCompareMode(val);
                            if (val !== 'custom') updatePreviousPeriod(tempRange.from, tempRange.to, val);
                          }}
                        >
                          <SelectTrigger className="h-8 rounded-sm text-sm border-slate-300 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="previous">Previous period</SelectItem>
                            <SelectItem value="previous-year">Previous year</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>

                        {tempCompareMode === 'custom' ? (
                          <div className="flex items-center gap-1">
                            <input 
                              type="date" 
                              className="w-full text-xs border border-slate-300 rounded-sm px-2 py-1.5 outline-none focus:border-blue-900"
                              value={tempCompareRange.start}
                              onChange={(e) => setTempCompareRange(prev => ({ ...prev, start: e.target.value }))}
                            />
                            <span className="text-slate-400">-</span>
                            <input 
                              type="date" 
                              className="w-full text-xs border border-slate-300 rounded-sm px-2 py-1.5 outline-none focus:border-blue-900"
                              value={tempCompareRange.end}
                              onChange={(e) => setTempCompareRange(prev => ({ ...prev, end: e.target.value }))}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 border border-slate-300 rounded-sm px-3 py-1.5 bg-slate-50">
                            <ArrowDownUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700 truncate">
                              {formatDateBox(tempCompareRange.start)} – {formatDateBox(tempCompareRange.end)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Show Previous Values Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer mt-1 w-fit">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-slate-300 text-blue-900 focus:ring-blue-900 cursor-pointer" />
                    <span className="text-[13px] text-slate-600">Show previous values <i className="text-xs text-slate-400 not-italic ml-1">i</i></span>
                  </label>

                  {/* Action Buttons */}
                  <div className="mt-auto flex justify-end gap-2 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => setIsPickerOpen(false)}
                      className="px-4 py-1.5 text-[13px] font-semibold text-slate-600 border border-slate-300 hover:bg-slate-50 rounded-xs transition-colors cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button 
                      onClick={handleApply}
                      disabled={!tempRange.from || (tempIsComparing && (!tempCompareRange.start || !tempCompareRange.end))}
                      className="px-4 py-1.5 text-[13px] font-semibold bg-[#2383e2] text-white hover:bg-[#1d7bc9] rounded-xs transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      APPLY
                    </button>
                  </div>

                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* --- DYNAMIC MAIN TABS --- */}
      <div className="flex gap-6 border-b border-slate-200 mb-6 text-sm montserrat-medium overflow-x-auto pb-1 scrollbar-hide">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveMainTab(tab)}
            className={`pb-3 whitespace-nowrap transition-colors outline-none cursor-pointer ${
              activeMainTab === tab
                ? 'border-b-2 border-[#2383e2] text-[#2383e2]'
                : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT ROUTER --- */}
      <div className="w-full">
        {activeMainTab === 'Traffic sources' && (
          <TrafficSources 
            dateRange={dateRange} 
            compareDateRange={isComparing ? compareDateRange : undefined} 
          />
        )}
        
        {activeMainTab === 'Audience' && (
          <Audience 
            dateRange={dateRange} 
            compareDateRange={isComparing ? compareDateRange : undefined} 
          />
        )}
        
        {activeMainTab === 'Pages' && (
          <div className="py-20 text-center border border-slate-200 bg-white rounded-sm text-slate-400 montserrat-medium text-sm shadow-sm">
            Pages Analytics Component
          </div>
        )}
        
        {activeMainTab === 'Conversions' && (
          <div className="py-20 text-center border border-slate-200 bg-white rounded-sm text-slate-400 montserrat-medium text-sm shadow-sm">
            Conversions Analytics Component
          </div>
        )}
      </div>

      </div>
    </div>
  );
}