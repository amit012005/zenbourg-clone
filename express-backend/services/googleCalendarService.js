// MOCK Google Calendar Service - Replace with actual Google Calendar API implementation
require("dotenv").config()

const createGoogleMeetEvent = async (bookingDetails) => {
  console.log("--- MOCK GOOGLE CALENDAR EVENT CREATION ---")
  console.log(`Creating event for: ${bookingDetails.email}`)
  console.log(`Summary: Consultation with ${bookingDetails.name}`)
  console.log(`Start Time: ${new Date(bookingDetails.preferred_date).toISOString()}`)
  // In a real app, you'd use the googleapis library:
  // const { google } = require('googleapis');
  // const auth = new google.auth.GoogleAuth({ scopes: ['https://www.googleapis.com/auth/calendar'] }); // Or service account
  // const calendar = google.calendar({ version: 'v3', auth });
  // const event = { summary: `Consultation: ${bookingDetails.name}`, ... };
  // const response = await calendar.events.insert({ calendarId: 'primary', resource: event, conferenceDataVersion: 1 });
  // return response.data.hangoutLink;

  // For mock, generate a fake link
  const mockMeetLink = `https://meet.google.com/mock-${Math.random().toString(36).substring(2, 10)}`
  console.log(`Generated Mock Google Meet Link: ${mockMeetLink}`)
  console.log("--- END MOCK GOOGLE CALENDAR ---")
  return Promise.resolve(mockMeetLink)
}

module.exports = { createGoogleMeetEvent }
