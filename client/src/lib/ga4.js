import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Initialize the client using your environment variables
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // The replace method is crucial here to handle escaped newlines in .env files properly
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

export async function getTrafficData(startDate = '30daysAgo', endDate = 'today') {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      dimensions: [
        {
          name: 'sessionDefaultChannelGroup', // Maps to Traffic Source (Organic, Direct, Referral, etc.)
        },
      ],
      metrics: [
        { name: 'sessions' },                // Sessions
        { name: 'engagedSessions' },         // Engaged Sessions
        { name: 'newUsers' },                // New Users
        { name: 'totalUsers' },              // Users
        { name: 'screenPageViews' },         // Views
        { name: 'averageSessionDuration' },  // Avg Engagement Time
        { name: 'engagementRate' },          // Engagement Rate
        { name: 'conversions' },             // Conversions
      ],
    });

    // Format the response into a cleaner array of objects for your Next.js frontend charts
    const formattedData = response.rows.map((row) => {
      return {
        channelGroup: row.dimensionValues[0].value,
        sessions: parseInt(row.metricValues[0].value, 10),
        engagedSessions: parseInt(row.metricValues[1].value, 10),
        newUsers: parseInt(row.metricValues[2].value, 10),
        users: parseInt(row.metricValues[3].value, 10),
        views: parseInt(row.metricValues[4].value, 10),
        avgEngagementTime: parseFloat(row.metricValues[5].value).toFixed(2), // Keeps 2 decimal places
        engagementRate: parseFloat(row.metricValues[6].value).toFixed(4),    // Returns a decimal (e.g., 0.5521 for 55.21%)
        conversions: parseInt(row.metricValues[7].value, 10),
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching GA4 data:', error);
    throw new Error('Failed to fetch analytics data');
  }
}