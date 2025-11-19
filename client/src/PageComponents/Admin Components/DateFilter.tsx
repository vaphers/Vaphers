import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DateFilter({ onChange }: { onChange: (period: 'day' | 'month') => void }) {
  const [period, setPeriod] = useState<'day' | 'month'>('day');

  function handleSelect(value: 'day' | 'month') {
    setPeriod(value);
    onChange(value);
  }

  return (
    <Select onValueChange={handleSelect} value={period}>
      <SelectTrigger>
        <SelectValue placeholder="Select Date Range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="day">Last 7 Days</SelectItem>
        <SelectItem value="month">Last 12 Months</SelectItem>
      </SelectContent>
    </Select>
  );
}

