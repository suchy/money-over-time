export const timelinesPath = () => `/timelines`;

export const newTimelinePath = () => `${timelinesPath()}/new`;

export const timelineVersionPath = (timelineVersionId: string) =>
  `${timelinesPath()}/${timelineVersionId}`;

export const renameTimelineVersionPath = (timelineVersionId: string) =>
  `${timelineVersionPath(timelineVersionId)}/rename`;

export const editAccountPath = (timelineVersionId: string, accountId: string) =>
  `${timelineVersionPath(timelineVersionId)}/accounts/${accountId}`;

export const newAccountPath = (timelineVersionId: string) =>
  `${timelineVersionPath(timelineVersionId)}/accounts/new`;

export const deleteAccountPath = (
  timelineVersionId: string,
  accountId: string
) => `${editAccountPath(timelineVersionId, accountId)}/delete`;

export const newEventPath = (timelineVersionId: string) =>
  `${timelineVersionPath(timelineVersionId)}/events/new`;

export const editEventPath = (timelineVersionId: string, eventId: string) =>
  `${timelineVersionPath(timelineVersionId)}/events/${eventId}`;

export const deleteEventPath = (timelineVersionId: string, eventId: string) =>
  `${editEventPath(timelineVersionId, eventId)}/delete`;
