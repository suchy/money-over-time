export const a = 5;
// import { addDays, mockedDate, startOfDay } from '../../../../helpers/date';
// import { Account } from '../../../account/account';
// import { Event, EventInterval, EventType } from '../../../event/event';
// import { TimelineVersion } from '../../../timeline-version/timeline-version';
// import { getDays } from './get-days';

// describe('getDays', () => {
//   let timelineVersion: TimelineVersion;

//   beforeEach(() => {
//     timelineVersion = {
//       name: 'Test timeline version',
//       startDate: mockedDate,
//       timelineId: '00000000-0000-0000-0000-000000000000',
//       timelineVersionId: '00000000-0000-0000-0000-000000000000',
//       accounts: [],
//       events: []
//     };
//   });

//   it('should return empty days if timeline version has no accounts', () => {
//     timelineVersion = {
//       ...timelineVersion,
//       accounts: []
//     };

//     const startDate = startOfDay(mockedDate);
//     const endDate = addDays(startDate, 1);

//     const days = getDays(timelineVersion, startDate, endDate);

//     expect(days).toStrictEqual([
//       { date: startDate, finalAccountsBalances: [], eventsResults: [] },
//       { date: endDate, finalAccountsBalances: [], eventsResults: [] }
//     ]);
//   });

//   it('should return days with accounts balances if timeline version has no events', () => {
//     const account = {
//       accountId: '00000000-0000-0000-0000-000000000000',
//       name: 'Test account',
//       startBalance: 100,
//       startDate: mockedDate
//     } as Account;

//     timelineVersion = {
//       ...timelineVersion,
//       accounts: [account],
//       events: []
//     };

//     const startDate = startOfDay(mockedDate);
//     const endDate = addDays(startDate, 1);

//     const days = getDays(timelineVersion, startDate, endDate);

//     expect(days).toStrictEqual([
//       {
//         date: startDate,
//         finalAccountsBalances: [{ account: account, balance: 100 }],
//         eventsResults: []
//       },
//       {
//         date: endDate,
//         finalAccountsBalances: [{ account: account, balance: 100 }],
//         eventsResults: []
//       }
//     ]);
//   });

//   describe('should return days with accounts start balances changed by events', () => {
//     let account: Account;
//     let event: Event;

//     beforeEach(() => {
//       account = {
//         accountId: '00000000-0000-0000-0000-000000000000',
//         name: 'Test account',
//         startBalance: 100,
//         startDate: mockedDate
//       } as Account;

//       event = {
//         accountId: account.accountId,
//         date: account.startDate,
//         name: 'Test event',
//         eventId: '00000000-0000-0000-0000-000000000000',
//         type: EventType.subtraction,
//         expression: '10'
//       } as Event;
//     });

//     it('repeat event', () => {
//       event = {
//         ...event,
//         type: EventType.addition,
//         expression: '10',
//         repeat: {
//           interval: EventInterval.day,
//           intervalNumber: 1
//         }
//       } as Event;

//       timelineVersion = {
//         ...timelineVersion,
//         accounts: [account],
//         events: [event]
//       };

//       const startDate = startOfDay(mockedDate);
//       const endDate = addDays(startDate, 2);

//       const days = getDays(timelineVersion, startDate, endDate);

//       expect(days).toStrictEqual([
//         {
//           date: startDate,
//           finalAccountsBalances: [{ account, balance: 110 }],
//           eventsResults: [
//             { event, accountsBalances: [{ account, balance: 110 }] }
//           ]
//         },
//         {
//           date: addDays(startDate, 1),
//           finalAccountsBalances: [{ account, balance: 120 }],
//           eventsResults: [
//             {
//               event: { ...event, date: addDays(startDate, 1) },
//               accountsBalances: [{ account, balance: 120 }]
//             }
//           ]
//         },
//         {
//           date: endDate,
//           finalAccountsBalances: [{ account, balance: 130 }],
//           eventsResults: [
//             {
//               event: { ...event, date: endDate },
//               accountsBalances: [{ account, balance: 130 }]
//             }
//           ]
//         }
//       ]);
//     });

//     it('addition event', () => {
//       event = {
//         ...event,
//         type: EventType.addition,
//         expression: '10'
//       };

//       timelineVersion = {
//         ...timelineVersion,
//         accounts: [account],
//         events: [event]
//       };

//       const startDate = startOfDay(mockedDate);
//       const endDate = addDays(startDate, 1);

//       const days = getDays(timelineVersion, startDate, endDate);

//       expect(days).toStrictEqual([
//         {
//           date: startDate,
//           finalAccountsBalances: [{ account: account, balance: 110 }],
//           eventsResults: [
//             { event, accountsBalances: [{ account: account, balance: 110 }] }
//           ]
//         },
//         {
//           date: endDate,
//           finalAccountsBalances: [{ account: account, balance: 110 }],
//           eventsResults: []
//         }
//       ]);
//     });

//     it('subtraction event', () => {
//       event = {
//         ...event,
//         type: EventType.subtraction,
//         expression: '10'
//       };

//       timelineVersion = {
//         ...timelineVersion,
//         accounts: [account],
//         events: [event]
//       };

//       const startDate = startOfDay(mockedDate);
//       const endDate = addDays(startDate, 1);

//       const days = getDays(timelineVersion, startDate, endDate);

//       expect(days).toStrictEqual([
//         {
//           date: startDate,
//           finalAccountsBalances: [{ account: account, balance: 90 }],
//           eventsResults: [
//             { event, accountsBalances: [{ account: account, balance: 90 }] }
//           ]
//         },
//         {
//           date: endDate,
//           finalAccountsBalances: [{ account: account, balance: 90 }],
//           eventsResults: []
//         }
//       ]);
//     });
//   });
// });
