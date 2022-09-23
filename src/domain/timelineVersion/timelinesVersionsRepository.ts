import { FirebaseRepositoryFactory } from '../../infrastructure/firebase/repository';
import { Event } from '../event/event';
import { TimelineVersion } from './timelineVersion';

export const TimelinesVersionsRepositoryFactory = () => {
  const firebaseRepository = FirebaseRepositoryFactory<TimelineVersion>(
    'timelinesVersions',
    'timelineVersionId'
  );

  const timelinesVersionsRepository = {
    ...firebaseRepository,

    insert(timelineVersion: TimelineVersion) {
      const eventsWithRemovedEmptyEndDate = timelineVersion.events.map(
        (event) => {
          if (event.repeat) {
            const hasEmptyEndDate =
              Object.prototype.hasOwnProperty.call(event.repeat, 'endDate') &&
              event.repeat.endDate === undefined;

            if (hasEmptyEndDate) {
              const { endDate, ...newEventRepeat } = event.repeat;

              return { ...event, repeat: newEventRepeat } as Event;
            }

            return event;
          }

          if (
            Object.prototype.hasOwnProperty.call(event, 'repeat') &&
            event.repeat === undefined
          ) {
            const { repeat, ...newEvent } = event;

            return newEvent as Event;
          }

          return event;
        }
      );

      const updatedTimelineVersion = {
        ...timelineVersion,
        events: eventsWithRemovedEmptyEndDate
      };

      return firebaseRepository.insert(updatedTimelineVersion);
    }
  };

  return timelinesVersionsRepository;
};

// interface AccountRecord {
//   accountId: string;
//   name: string;
//   startBalance: number;
//   startDate: string;
//   color: string;
// }

// interface EventRecord {
//   accountId?: string;
//   date: string;
//   name: string;
//   eventId: string;
//   type: string;
//   value: number;
//   expression: string;
//   repeat?: {
//     endDate?: string;
//     interval: string;
//     intervalNumber: number;
//     isCustom: boolean;
//   };
// }

// interface TimelineVersionRecord {
//   name: string;
//   startDate: string;
//   timelineId: string;
//   timelineVersionId: string;
//   accounts: AccountRecord[];
//   events: EventRecord[];
// }

// const mapTimelineVersionDocument = (
//   timelineVersionRecord: TimelineVersionRecord
// ) => ({
//   ...timelineVersionRecord,
//   startDate: new Date(timelineVersionRecord.startDate),
//   accounts: timelineVersionRecord.accounts.map((account) => ({
//     ...account,
//     startDate: new Date(account.startDate)
//   })),
//   events: timelineVersionRecord.events.map((event) => ({
//     ...event,
//     date: new Date(event.date),
//     type: EventType[event.type as EventType],
//     expression: event.expression,
//     repeat: event.repeat
//       ? {
//           endDate: event.repeat.endDate
//             ? new Date(event.repeat.endDate)
//             : undefined,
//           interval: event.repeat.interval as EventInterval,
//           intervalNumber: event.repeat.intervalNumber,
//           isCustom: event.repeat.isCustom
//         }
//       : undefined
//   }))
// });
