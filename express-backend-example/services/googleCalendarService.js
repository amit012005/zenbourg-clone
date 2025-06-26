// MOCKED Google Calendar Service - Replace with actual googleapis implementation
require("dotenv").config()

const createGoogleMeetEvent = async ({ summary, description, startTime, endTime, attendees }) => {
  const mockMeetLink = `https://meet.google.com/mock-${Math.random().toString(36).substring(7)}`
  console.log("--- MOCK GOOGLE CALENDAR EVENT ---")
  console.log(`Event: ${summary}`)
  console.log(`Description: ${description}`)
  console.log(`Time: ${startTime} to ${endTime}`)
  console.log(`Attendees: ${attendees.map((a) => a.email).join(", ")}`)
  console.log(`Generated Meet Link: ${mockMeetLink}`)
  console.log("--- END MOCK GOOGLE CALENDAR EVENT ---")
  return Promise.resolve(mockMeetLink)
}

module.exports = { createGoogleMeetEvent }
