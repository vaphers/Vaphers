import { NextResponse } from 'next/server';
import { getTrafficData } from '@/lib/ga4';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate') || '30daysAgo';
  const endDate = searchParams.get('endDate') || 'today';
  
  // Compare parameters
  const compareStart = searchParams.get('compareStart');
  const compareEnd = searchParams.get('compareEnd');

  try {
    const data = await getTrafficData(startDate, endDate);
    
    let compareData = null;
    if (compareStart && compareEnd) {
      compareData = await getTrafficData(compareStart, compareEnd);
    }

    return NextResponse.json({ success: true, data, compareData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}