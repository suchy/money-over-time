import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { Day } from '../../../../domain/day/day';
import { TimelineVersion as TimelineVersionType } from '../../../../domain/timelineVersion/timelineVersion';
import { Container } from '../../components/Container';
import {
  getContentLeftMargin,
  getContentRightMargin,
  getLayoutVariantFlexDirection,
  LayoutVariant
} from '../../utils/layoutVariant';
import { Accounts } from './Accounts/Accounts';
import { Board } from './Board/Board';
import { Events } from './Events/Events';
import { Header } from './Header';
import { Variables } from './Variables/Variables';
import { EventInterval } from '~/domain/event/event';
import { Sidebar } from './Sidebar';

interface LoaderData {
  timelineVersion: TimelineVersionType;
  days: Day[];
  interval: string;
  startDate: string;
}

export const TimelineVersion = () => {
  const data = useLoaderData<LoaderData>();

  const timelineVersion = {
    ...data.timelineVersion,
    startDate: new Date(data.timelineVersion.startDate),
    accounts: data.timelineVersion.accounts.map((account) => ({
      ...account,
      startDate: new Date(account.startDate)
    })),
    events: data.timelineVersion.events.map((event) => ({
      ...event,
      date: new Date(event.date)
    }))
  };

  const startDate = new Date(data.startDate);

  const days = data.days.map((day) => ({ ...day, date: new Date(day.date) }));

  const interval = Object.keys(EventInterval).includes(data.interval)
    ? (data.interval as EventInterval)
    : EventInterval.month;

  const [layoutVariant, setLayoutClassName] = useState(LayoutVariant.leftRight);

  const layoutFlexDirection = getLayoutVariantFlexDirection(layoutVariant);

  const contentLeftMargin = getContentLeftMargin(layoutVariant);

  const contentRightMargin = getContentRightMargin(layoutVariant);

  return (
    <>
      <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
        <Header
          timelineVersion={timelineVersion}
          onLayoutChange={console.log}
        />

        {/* <Container>
          <h1 className="mb-8 text-4xl font-bold">Day as usual</h1>
        </Container> */}

        <div className=" flex h-full flex-shrink flex-grow flex-row items-start overflow-hidden">
          <div className="z-10 h-full w-80 overflow-auto border-t border-gray-100 bg-white p-6 shadow-md">
            <Sidebar timelineVersion={timelineVersion} />
          </div>

          <div className="dotted-background h-full flex-grow overflow-auto p-6">
            <Container>
              <Board
                days={days}
                interval={interval}
                startDate={startDate}
                timelineVersion={timelineVersion}
              />
            </Container>
          </div>
        </div>
      </div>

      <Outlet context={{ timelineVersion }} />
    </>
  );
};
