import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
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
        { startDate: startDate, endDate: endDate },
      ],
      dimensions: [
        { name: 'date' }, // NEW: Added to create the chart timeline
        { name: 'sessionDefaultChannelGroup' },
        { name: 'sessionSource' }, 
      ],
      metrics: [
        { name: 'sessions' },                
        { name: 'engagedSessions' },         
        { name: 'newUsers' },                
        { name: 'totalUsers' },              
        { name: 'screenPageViews' },         
        { name: 'averageSessionDuration' },  
        { name: 'engagementRate' },          
        { name: 'conversions' },             
      ],
    });

    const formattedData = response.rows.map((row) => {
      return {
        date: row.dimensionValues[0].value, // e.g., "20260401"
        channelGroup: row.dimensionValues[1].value,
        source: row.dimensionValues[2].value, 
        sessions: parseInt(row.metricValues[0].value, 10),
        engagedSessions: parseInt(row.metricValues[1].value, 10),
        newUsers: parseInt(row.metricValues[2].value, 10),
        users: parseInt(row.metricValues[3].value, 10),
        views: parseInt(row.metricValues[4].value, 10),
        avgEngagementTime: parseFloat(row.metricValues[5].value).toFixed(2), 
        engagementRate: parseFloat(row.metricValues[6].value).toFixed(4),    
        conversions: parseInt(row.metricValues[7].value, 10),
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching GA4 data:', error);
    throw new Error('Failed to fetch analytics data');
  }
}


export async function getGeographyData(startDate = '30daysAgo', endDate = 'today') {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        { startDate: startDate, endDate: endDate },
      ],
      dimensions: [
        { name: 'country' }, 
        { name: 'city' }
      ],
      metrics: [
        { name: 'sessions' },                
        { name: 'engagedSessions' },         
        { name: 'newUsers' },                
        { name: 'totalUsers' },              
        { name: 'screenPageViews' },         
        { name: 'averageSessionDuration' },  
        { name: 'engagementRate' },          
        { name: 'conversions' },             
      ],
    });

    const formattedData = response.rows.map((row) => {
      return {
        country: row.dimensionValues[0].value,
        city: row.dimensionValues[1].value,
        sessions: parseInt(row.metricValues[0].value, 10),
        engagedSessions: parseInt(row.metricValues[1].value, 10),
        newUsers: parseInt(row.metricValues[2].value, 10),
        users: parseInt(row.metricValues[3].value, 10),
        views: parseInt(row.metricValues[4].value, 10),
        avgEngagementTime: parseFloat(row.metricValues[5].value).toFixed(2), 
        engagementRate: parseFloat(row.metricValues[6].value).toFixed(4),    
        conversions: parseInt(row.metricValues[7].value, 10),
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching GA4 Geography data:', error);
    throw new Error('Failed to fetch geography data');
  }
}



export async function getDevicesData(startDate = '30daysAgo', endDate = 'today') {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        { startDate: startDate, endDate: endDate },
      ],
      dimensions: [
        { name: 'deviceCategory' } // The specific dimension for desktop/mobile/tablet
      ],
      metrics: [
        { name: 'sessions' },                
        { name: 'engagedSessions' },         
        { name: 'newUsers' },                
        { name: 'totalUsers' },              
        { name: 'screenPageViews' },         
        { name: 'averageSessionDuration' },  // Keeping as requested
        { name: 'engagementRate' },          
        { name: 'conversions' },             
      ],
    });

    const formattedData = response.rows.map((row) => {
      return {
        deviceCategory: row.dimensionValues[0].value,
        sessions: parseInt(row.metricValues[0].value, 10),
        engagedSessions: parseInt(row.metricValues[1].value, 10),
        newUsers: parseInt(row.metricValues[2].value, 10),
        users: parseInt(row.metricValues[3].value, 10),
        views: parseInt(row.metricValues[4].value, 10),
        avgEngagementTime: parseFloat(row.metricValues[5].value).toFixed(2), 
        engagementRate: parseFloat(row.metricValues[6].value).toFixed(4),    
        conversions: parseInt(row.metricValues[7].value, 10),
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching GA4 Devices data:', error);
    throw new Error('Failed to fetch devices data');
  }
}