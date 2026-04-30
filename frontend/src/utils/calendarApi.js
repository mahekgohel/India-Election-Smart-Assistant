import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Method 1: Adds an event using the Backend API (requires user to be authenticated with Google Calendar scopes)
 * @param {Object} eventDetails - The event details (title, description, date)
 * @param {string} authToken - Firebase Auth / Google Auth token
 */
export const addEventToCalendarAPI = async (eventDetails, authToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calendar/add-event`, eventDetails, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding event via API:", error);
    throw new Error(error.response?.data?.message || 'Failed to add event to calendar.');
  }
};

/**
 * Method 2: Fallback/Instant method - Generates a direct Google Calendar web link.
 * This is incredibly useful as it requires zero OAuth permissions and works instantly 
 * for any user, making the UX completely frictionless.
 * 
 * @param {Object} eventDetails - The event details
 * @returns {string} The Google Calendar template URL
 */
export const generateGoogleCalendarLink = ({ title, description, location, startDate, endDate }) => {
  // Format dates to Google Calendar format: YYYYMMDDTHHmmssZ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const start = formatDate(startDate);
  // If no endDate provided, default to 1 hour after start
  const end = endDate ? formatDate(endDate) : formatDate(new Date(new Date(startDate).getTime() + 60 * 60 * 1000));

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', title);
  url.searchParams.append('dates', `${start}/${end}`);
  url.searchParams.append('details', description);
  
  if (location) {
    url.searchParams.append('location', location);
  }

  return url.toString();
};
