import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

// Helper to format numbers (e.g., 1200 -> 1.2K)
const formatNumber = (num: number) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Helper to assign specific colors to channels for the UI progress bars
const getChannelColor = (channel: string) => {
  const colors: Record<string, string> = {
    'Organic Social': 'bg-indigo-500',
    'Direct': 'bg-yellow-400',
    'Organic Search': 'bg-emerald-500',
    'Unassigned': 'bg-slate-300',
    'Referral': 'bg-blue-400',
  };
  return colors[channel] || 'bg-slate-400';
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentStart = searchParams.get('currentStart') || '28daysAgo';
  const currentEnd = searchParams.get('currentEnd') || 'today';
  const compareStart = searchParams.get('compareStart') || '56daysAgo';
  const compareEnd = searchParams.get('compareEnd') || '29daysAgo';

  const dateRanges = [
    { name: 'current', startDate: currentStart, endDate: currentEnd },
    { name: 'compare', startDate: compareStart, endDate: compareEnd }
  ];

  const commonMetrics = [
    { name: 'sessions' },
    { name: 'engagedSessions' },
    { name: 'newUsers' }, 
    { name: 'totalUsers' },
    { name: 'screenPageViews' },
    { name: 'averageSessionDuration' },
    { name: 'engagementRate' },
    { name: 'conversions' }
  ];

  try {
    const [summaryRes, chartRes, channelRes] = await Promise.all([
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges,
        metrics: commonMetrics,
      }),
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges,
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
      }),
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges,
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: commonMetrics,
      })
    ]);

    // --- 1. PARSE SUMMARY METRICS ---
    const summaryRows = summaryRes[0].rows || [];
    const currentSummary = summaryRows.find(r => r.dimensionValues?.[0].value === 'date_range_0')?.metricValues || [];
    const compareSummary = summaryRows.find(r => r.dimensionValues?.[0].value === 'date_range_1')?.metricValues || [];

    const getMetric = (arr: any[], index: number) => parseFloat(arr[index]?.value || '0');

    const summaryCards = [
      { title: 'SESSIONS', value: formatNumber(getMetric(currentSummary, 0)), trend: Math.round(getMetric(currentSummary, 0) - getMetric(compareSummary, 0)), isPercent: false },
      { title: 'ENGAGED SESSIONS', value: formatNumber(getMetric(currentSummary, 1)), trend: Math.round(getMetric(currentSummary, 1) - getMetric(compareSummary, 1)), isPercent: false },
      { title: 'NEW USERS', value: formatNumber(getMetric(currentSummary, 2)), trend: Math.round(getMetric(currentSummary, 2) - getMetric(compareSummary, 2)), isPercent: false },
      { title: 'USERS', value: formatNumber(getMetric(currentSummary, 3)), trend: Math.round(getMetric(currentSummary, 3) - getMetric(compareSummary, 3)), isPercent: false },
      { title: 'VIEWS', value: formatNumber(getMetric(currentSummary, 4)), trend: Math.round(getMetric(currentSummary, 4) - getMetric(compareSummary, 4)), isPercent: false },
      { title: 'AVG. ENGAGEMENT TIME', value: `${Math.round(getMetric(currentSummary, 5))}s`, trend: Math.round(getMetric(currentSummary, 5) - getMetric(compareSummary, 5)), isTime: true },
      { title: 'ENGAGEMENT RATE', value: (getMetric(currentSummary, 6) * 100).toFixed(2), trend: Number(((getMetric(currentSummary, 6) - getMetric(compareSummary, 6)) * 100).toFixed(2)), isPercent: true },
      { title: 'CONVERSIONS', value: formatNumber(getMetric(currentSummary, 7)), trend: Math.round(getMetric(currentSummary, 7) - getMetric(compareSummary, 7)), isPercent: false },
    ];

    // --- 2. PARSE CHART TIMELINE ---
    const chartMap = new Map();
    
    chartRes[0].rows?.forEach(row => {
      const rawDate = row.dimensionValues?.[0].value || '';
      const dateRange = row.dimensionValues?.[1].value; 
      const sessions = parseInt(row.metricValues?.[0].value || '0', 10);
      
      // Fix for TS Error: explicitly cast parsed strings to numbers for the Date constructor
      const year = parseInt(rawDate.substring(0, 4), 10);
      const month = parseInt(rawDate.substring(4, 6), 10) - 1;
      const day = parseInt(rawDate.substring(6, 8), 10);
      const formattedDate = new Date(year, month, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (!chartMap.has(formattedDate)) {
        chartMap.set(formattedDate, { date: formattedDate, current: 0, compare: 0 });
      }
      
      const dataPoint = chartMap.get(formattedDate);
      if (dateRange === 'date_range_0') dataPoint.current = sessions;
      if (dateRange === 'date_range_1') dataPoint.compare = sessions;
    });

    const chartData = Array.from(chartMap.values());

    // --- 3. PARSE CHANNEL TABLE ---
    const channelMap = new Map();
    const totalSessions = getMetric(currentSummary, 0) || 1; 
    
    channelRes[0].rows?.forEach(row => {
      const channelName = row.dimensionValues?.[0].value || 'Unknown';
      const dateRange = row.dimensionValues?.[1].value;
      const metrics = row.metricValues || [];

      if (!channelMap.has(channelName)) {
        channelMap.set(channelName, {
          name: channelName, color: getChannelColor(channelName),
          curr_sessions: 0, comp_sessions: 0,
          curr_engaged: 0, comp_engaged: 0,
          curr_newUsers: 0, comp_newUsers: 0,
          curr_users: 0, comp_users: 0,
          curr_views: 0, comp_views: 0,
          curr_avgTime: 0, comp_avgTime: 0,
          curr_engRate: 0, comp_engRate: 0,
          curr_conv: 0, comp_conv: 0,
        });
      }

      const chan = channelMap.get(channelName);
      const isCurrent = dateRange === 'date_range_0';
      const prefix = isCurrent ? 'curr_' : 'comp_';

      chan[`${prefix}sessions`] = parseFloat(metrics[0]?.value || '0');
      chan[`${prefix}engaged`] = parseFloat(metrics[1]?.value || '0');
      chan[`${prefix}newUsers`] = parseFloat(metrics[2]?.value || '0');
      chan[`${prefix}users`] = parseFloat(metrics[3]?.value || '0');
      chan[`${prefix}views`] = parseFloat(metrics[4]?.value || '0');
      chan[`${prefix}avgTime`] = parseFloat(metrics[5]?.value || '0');
      chan[`${prefix}engRate`] = parseFloat(metrics[6]?.value || '0');
      chan[`${prefix}conv`] = parseFloat(metrics[7]?.value || '0');
    });

    const channelData = Array.from(channelMap.values())
      .sort((a, b) => b.curr_sessions - a.curr_sessions) 
      .map(c => ({
        name: c.name,
        color: c.color,
        share: Math.round((c.curr_sessions / totalSessions) * 100),
        sessions: formatNumber(c.curr_sessions),
        sTrend: Math.round(c.curr_sessions - c.comp_sessions),
        engaged: formatNumber(c.curr_engaged),
        eTrend: Math.round(c.curr_engaged - c.comp_engaged),
        newUsers: formatNumber(c.curr_newUsers),
        nuTrend: Math.round(c.curr_newUsers - c.comp_newUsers),
        users: formatNumber(c.curr_users),
        uTrend: Math.round(c.curr_users - c.comp_users),
        views: formatNumber(c.curr_views),
        vTrend: Math.round(c.curr_views - c.comp_views),
        avgTime: `${Math.round(c.curr_avgTime)}s`,
        tTrend: Math.round(c.curr_avgTime - c.comp_avgTime),
        engRate: (c.curr_engRate * 100).toFixed(2),
        erTrend: Number(((c.curr_engRate - c.comp_engRate) * 100).toFixed(2)),
        conv: formatNumber(c.curr_conv)
      }));

    return NextResponse.json({
      summary: summaryCards,
      chart: chartData,
      channels: channelData
    });

  } catch (error) {
    console.error('GA4 Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dynamic data' }, { status: 500 });
  }
}