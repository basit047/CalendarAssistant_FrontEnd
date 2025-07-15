export interface EmailModelSync {
  from: string | null;
  snippet: string | null;
  isMeetingInvite: boolean;
  hasConflict: boolean;
  receivedAt: string | null;
  eventModel: EventModel;
  calendarEvent: CalendarEvent;
  nonMeetingInviteResponse: NonMeetingInviteResponse;
  title: string | null;
  messageId: string | null;
  attendees: string | null;
}

export interface NonMeetingInviteResponse {
  summary: string;
  responseSuggestedByLLM: string;
}

export interface EventModel {
  startDateTime: string;
  endDateTime: string;
  title: string | null;
  conflictingTitle: string | null;
  conflictingStartDateTime: string;
  conflictingEndDateTime: string;
  suggestedStartDateTime: string;
  suggestedEndDateTime: string;
  updateEvent: UpdateEvent;
  sendEmailModel: SendEmailModel;
}

export interface CalendarEvent {
  summary: string | null;
  location: string | null;
  description: string | null;
  startTime: string;
  endTime: string;
  attendees: string[] | null;
}

export interface SendEmailModel {
  to: string | null;
  subject: string | null;
  message: string | null;
}

export interface UpdateEvent {
  eventId: string | null;
  attendees: string[] | null;
}

// export interface Event {
//     anyoneCanAddSelf: boolean | null;
//     attendees: EventAttendee[];
//     attendeesOmitted: boolean | null;
//     birthdayProperties: EventBirthdayProperties;
//     colorId: string;
//     conferenceData: ConferenceData;
//     createdRaw: string;
//     createdDateTimeOffset: string | null;
//     created: string | null;
//     creator: CreatorData;
//     description: string;
//     end: EventDateTime;
//     endTimeUnspecified: boolean | null;
//     eTag: string;
//     eventType: string;
//     extendedProperties: ExtendedPropertiesData;
//     focusTimeProperties: EventFocusTimeProperties;
//     gadget: GadgetData;
//     guestsCanInviteOthers: boolean | null;
//     guestsCanModify: boolean | null;
//     guestsCanSeeOtherGuests: boolean | null;
//     hangoutLink: string;
//     htmlLink: string;
//     iCalUID: string;
//     id: string;
//     kind: string;
//     location: string;
//     locked: boolean | null;
//     organizer: OrganizerData;
//     originalStartTime: EventDateTime;
//     outOfOfficeProperties: EventOutOfOfficeProperties;
//     privateCopy: boolean | null;
//     recurrence: string[];
//     recurringEventId: string;
//     reminders: RemindersData;
//     sequence: number | null;
//     source: SourceData;
//     start: EventDateTime;
//     status: string;
//     summary: string;
//     transparency: string;
//     updatedRaw: string;
//     updatedDateTimeOffset: string | null;
//     updated: string | null;
//     visibility: string;
//     workingLocationProperties: EventWorkingLocationProperties;
// }

// export interface CreatorData {
//     displayName: string;
//     email: string;
//     id: string;
//     self: boolean | null;
// }

// export interface ExtendedPropertiesData {
//     private__: { [key: string]: string; };
//     shared: { [key: string]: string; };
// }

// export interface GadgetData {
//     display: string;
//     height: number | null;
//     iconLink: string;
//     link: string;
//     preferences: { [key: string]: string; };
//     title: string;
//     type: string;
//     width: number | null;
// }

// export interface OrganizerData {
//     displayName: string;
//     email: string;
//     id: string;
//     self: boolean | null;
// }

// export interface RemindersData {
//     overrides: EventReminder[];
//     useDefault: boolean | null;
// }

// export interface SourceData {
//     title: string;
//     url: string;
// }
