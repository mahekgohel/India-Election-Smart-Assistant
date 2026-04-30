const { google } = require('googleapis');

/**
 * Creates a Google Calendar Event for the user.
 * 
 * @param {string} oAuthToken - The OAuth2 token from the user (must have Calendar scope)
 * @param {Object} eventDetails - The event details
 * @returns {Object} The created event data
 */
const addElectionEventToCalendar = async (oAuthToken, eventDetails) => {
    try {
        const oAuth2Client = new google.auth.OAuth2();
        oAuth2Client.setCredentials({ access_token: oAuthToken });

        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

        const event = {
            summary: eventDetails.title,
            description: eventDetails.description,
            location: eventDetails.location || '',
            start: {
                dateTime: new Date(eventDetails.startDate).toISOString(),
                timeZone: 'Asia/Kolkata',
            },
            end: {
                // If no end date, default to 1 hour
                dateTime: eventDetails.endDate 
                    ? new Date(eventDetails.endDate).toISOString() 
                    : new Date(new Date(eventDetails.startDate).getTime() + 60 * 60 * 1000).toISOString(),
                timeZone: 'Asia/Kolkata',
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },      // 1 day before
                    { method: 'popup', minutes: 2 * 60 },       // 2 hours before
                ],
            },
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        return {
            success: true,
            eventId: response.data.id,
            eventLink: response.data.htmlLink
        };
    } catch (error) {
        console.error('Backend Google Calendar API Error:', error);
        throw new Error('Failed to create calendar event.');
    }
};

module.exports = {
    addElectionEventToCalendar
};
