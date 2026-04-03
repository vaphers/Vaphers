'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown, ArrowDownUp } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, subMonths, differenceInDays, subYears } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TrafficSources from './TrafficSources';

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
  
  // Dashboard Master State (Updated default to This Month)
  const [dateRange, setDateRange] = useState({ start: getStartOfMonthStr(), end: getTodayStr() });
  
  // Comparison Master State
  const [isComparing, setIsComparing] = useState(false);
  const [compareMode, setCompareMode] = useState<'previous' | 'previous-year' | 'custom'>('previous');
  const [compareDateRange, setCompareDateRange] = useState({ start: '', end: '' });

  // Popover UI State (Updated default preset)
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [activePreset, setActivePreset] = useState('This month');

  // Temporary State (inside popover before hitting Apply) (Updated default temp range)
  const [tempRange, setTempRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: startOfMonth(new Date()), to: new Date() });
  const [tempIsComparing, setTempIsComparing] = useState(false);
  const [tempCompareMode, setTempCompareMode] = useState<'previous' | 'previous-year' | 'custom'>('previous');
  const [tempCompareRange, setTempCompareRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-4 md:p-6">
      
      {/* --- TOP HEADER & GLOBAL CONTROLS --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4 border-b border-slate-200 pb-4">
        
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-4 text-sm font-medium text-slate-500 mb-1">
             <span>Date range:</span>
             {isComparing && <span className="ml-[135px]">Compare to:</span>}
          </div>

          <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 max-w-fit border border-slate-200 bg-white rounded-sm px-4 py-2.5 shadow-sm transition-colors text-sm font-medium text-slate-700 outline-none">
                <CalendarIcon className="w-4 h-4 text-blue-900" />
                <span className='text-blue-900'>
                  {format(new Date(dateRange.start + 'T12:00:00'), 'MMM d, yyyy')} – {format(new Date(dateRange.end + 'T12:00:00'), 'MMM d, yyyy')}
                </span>
                
                {isComparing && compareDateRange.start && (
                  <>
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="text-slate-500">
                      vs {format(new Date(compareDateRange.start + 'T12:00:00'), 'MMM d, yyyy')} – {format(new Date(compareDateRange.end + 'T12:00:00'), 'MMM d, yyyy')}
                    </span>
                  </>
                )}
                <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
              </button>
            </PopoverTrigger>

            {/* POPOVER CONTENT */}
            <PopoverContent className="w-auto p-0 bg-white border-slate-200 shadow-xl rounded-sm max-w-[95vw] overflow-y-auto max-h-[90vh]" align="start">
              <div className="flex flex-col md:flex-row">
                
                {/* Calendar */}
                <div className="p-4 flex-1 border-b md:border-b-0 md:border-r border-slate-100 flex justify-center">
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
                    numberOfMonths={2}
                    className="p-0 font-sans"
                    classNames={{
                      day: "h-9 w-9 p-0 font-normal text-sm aria-selected:opacity-100 rounded-sm transition-colors",
                      day_today: "bg-slate-100 text-slate-900",
                      
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-900/10 first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm focus-within:relative focus-within:z-20",
                      
                      day_selected: "bg-blue-900 text-white hover:bg-blue-900 hover:text-white focus:bg-blue-900 focus:text-white",
                      
                      day_range_start: "bg-blue-900 text-white hover:bg-blue-900 hover:text-white",
                      day_range_end: "bg-blue-900 text-white hover:bg-blue-900 hover:text-white",
                      day_range_middle: "aria-selected:bg-transparent aria-selected:text-blue-900 hover:bg-blue-900/20",
                    }}
                  />
                </div>

                {/* Calendar Panel */}
                <div className="w-full md:w-[260px] p-4 flex flex-col gap-4 bg-white rounded-r-sm">
                  
                  {/* Date Range Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-500">Date range:</label>
                    <Select value={activePreset} onValueChange={handlePresetChange}>
                      <SelectTrigger className="h-8 rounded-sm text-sm border-slate-300">
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
                    <label className="flex items-center gap-2 cursor-pointer">
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
                        <div className={`block w-9 h-5 rounded-full transition-colors ${tempIsComparing ? 'bg-blue-900' : 'bg-slate-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${tempIsComparing ? 'translate-x-4' : ''}`}></div>
                      </div>
                      <span className="text-sm text-blue-900">Compare to:</span>
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
                          <SelectTrigger className="h-8 rounded-sm text-sm border-slate-300">
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
                  <label className="flex items-center gap-2 cursor-pointer mt-1">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-slate-300 text-blue-900 focus:ring-blue-900 cursor-pointer" />
                    <span className="text-[13px] text-slate-600">Show previous values <i className="text-xs text-slate-400 not-italic ml-1">i</i></span>
                  </label>

                  {/* Action Buttons */}
                  <div className="mt-auto flex justify-end gap-2 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => setIsPickerOpen(false)}
                      className="px-4 py-1 text-[13px] font-semibold text-slate-600 border border-slate-300 hover:bg-slate-50 rounded-xs transition-colors cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button 
                      onClick={handleApply}
                      disabled={!tempRange.from || (tempIsComparing && (!tempCompareRange.start || !tempCompareRange.end))}
                      className="px-4 py-1 text-[13px] font-semibold bg-blue-900 text-white hover:bg-blue-800 rounded-xs transition-colors disabled:opacity-50 cursor-pointer"
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
      <div className="flex gap-6 border-b border-slate-200 mb-6 text-sm font-medium overflow-x-auto">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveMainTab(tab)}
            className={`pb-3 whitespace-nowrap transition-colors outline-none ${
              activeMainTab === tab
                ? 'border-b-2 border-blue-900 text-blue-900'
                : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent cursor-pointer'
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
          <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-sm text-slate-500 bg-slate-50/50 text-4xl">
            Audience Component Coming Soon
          </div>
        )}
        
        {activeMainTab === 'Pages' && (
          <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-sm text-slate-500 bg-slate-50/50 text-4xl">
            Pages Component Coming Soon
          </div>
        )}
        
        {activeMainTab === 'Conversions' && (
          <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-sm text-slate-500 bg-slate-50/50 text-4xl">
            Conversions Component Coming Soon
          </div>
        )}
      </div>

    </div>
  );
}