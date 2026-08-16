import { NextResponse } from 'next/server';
import { getTrafficData, getGeographyData, getDevicesData, getPagesData } from '@/lib/ga4';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate') || '30daysAgo';
  const endDate = searchParams.get('endDate') || 'today';
  
  const type = searchParams.get('type') || 'traffic'; 

  const compareStart = searchParams.get('compareStart');
  const compareEnd = searchParams.get('compareEnd');

  try {
    let data, compareData = null;

    if (type === 'geography') {
      data = await getGeographyData(startDate, endDate);
      if (compareStart && compareEnd) {
        compareData = await getGeographyData(compareStart, compareEnd);
      }
    } else if (type === 'devices') {
      data = await getDevicesData(startDate, endDate);
      if (compareStart && compareEnd) {
        compareData = await getDevicesData(compareStart, compareEnd);
      }
    } else if (type === 'pages') {
      data = await getPagesData(startDate, endDate);
      if (compareStart && compareEnd) {
        compareData = await getPagesData(compareStart, compareEnd);
      }
    } else {
      data = await getTrafficData(startDate, endDate);
      if (compareStart && compareEnd) {
        compareData = await getTrafficData(compareStart, compareEnd);
      }
    }

    return NextResponse.json({ success: true, data, compareData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}