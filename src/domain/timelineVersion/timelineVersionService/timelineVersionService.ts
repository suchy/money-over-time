import { startOfDay } from 'date-fns';

import { createId } from '../../../utils/createId';
import { ValidationErrors } from '../../../utils/error';
import { Account } from '../../account/account';
import { accountService } from '../../account/accountService/accountService';
import { Event } from '../../event/event';
import { eventService } from '../../event/eventService/eventService';
import {
  TimelineVersionFactory,
  VariableTimelineVersionProps,
  TimelineVersion
} from '../timelineVersion';

interface CreateTimelineVersionProps extends VariableTimelineVersionProps {
  timelineId: string;
}

export const timelineVersionService = {
  create(timelineVersionProps: CreateTimelineVersionProps) {
    const now = new Date();

    const newTimelineVersionProps = {
      ...timelineVersionProps,
      startDate: startOfDay(timelineVersionProps.startDate),
      timelineVersionId: createId(),
      createdAt: now,
      updatedAt: now
    };

    const timeline = TimelineVersionFactory(newTimelineVersionProps);
    return timeline;
  },

  update: (
    timelineVersion: TimelineVersion,
    timelineVersionProps: Partial<VariableTimelineVersionProps>
  ) => {
    // Make sure timelineId and timelineVersionId is no updated
    // eslint-disable-next-line
    // @ts-ignore
    const {
      // Make sure timelineId and timelineVersionId is no updated
      // eslint-disable-next-line
      // @ts-ignore
      timelineId,
      // Make sure timelineId and timelineVersionId is no updated
      // eslint-disable-next-line
      // @ts-ignore
      timelineVersionId,
      // Make sure timelineId and timelineVersionId is no updated
      // eslint-disable-next-line
      // @ts-ignore
      createdAt,
      ...variableTimelineVersionProps
    } = timelineVersionProps;

    const updatedTimelineVersionProps = {
      ...timelineVersion,
      ...variableTimelineVersionProps,
      updatedAt: new Date()
    };

    updatedTimelineVersionProps.startDate = startOfDay(
      updatedTimelineVersionProps.startDate
    );

    const updatedTimeline = TimelineVersionFactory(updatedTimelineVersionProps);

    return updatedTimeline;
  },

  validate(timlineVersion: TimelineVersion) {
    const errors: ValidationErrors<TimelineVersion> = {};

    if (!timlineVersion.timelineId) {
      errors.timelineId = 'validationErrors.timlineVersion.timelineId.invalid';
    }

    if (!timlineVersion.timelineVersionId) {
      errors.timelineVersionId =
        'validationErrors.timlineVersion.timelineVersionId.invalid';
    }

    if (!timlineVersion.name) {
      errors.name = 'validationErrors.timlineVersion.name.invalid';
    }

    const accountsErrors = timlineVersion.accounts
      .map((account) => accountService.validate(account, timlineVersion))
      .filter((accountError) => !!accountError) as ValidationErrors<Account>[];

    if (accountsErrors.length) {
      errors.accounts = 'validationErrors.timlineVersion.accounts.invalid';
    }

    const eventsErrors = timlineVersion.events
      .map((event) => eventService.validate(event, timlineVersion))
      .filter((eventError) => !!eventError) as ValidationErrors<Event>[];

    if (eventsErrors.length) {
      errors.events = 'validationErrors.timlineVersion.events.invalid';
    }

    const hasErrors = !!Object.entries(errors).length;

    if (hasErrors) {
      return errors;
    }
  }
};
