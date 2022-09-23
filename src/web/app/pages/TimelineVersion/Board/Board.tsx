import { useState } from 'react';

import { Day } from '../../../../../domain/day/day';
import { TimelineVersion } from '../../../../../domain/timelineVersion/timelineVersion';
import { BoardDatesSelector } from './BoardDatesSelector';
import { Chart } from './Chart';
import { DaySummaryModal } from './DaySummaryModal';
import { EventsResultsList } from './EventsResultsList/EventsResultsList';
import { EventInterval } from '~/domain/event/event';
import { fullDateFormat } from '~/utils/date';

interface BoardProps {
  days: Day[];
  interval: EventInterval;
  startDate: Date;
  timelineVersion: TimelineVersion;
}

export const Board = ({
  days,
  interval,
  startDate,
  timelineVersion
}: BoardProps) => {
  const [selectedDay, setSelectedDay] = useState<Day | undefined>();

  const handleDayClick = (day: Day) => {
    setSelectedDay(day);
  };

  const handleDaySummaryModalClose = () => {
    setSelectedDay(undefined);
  };

  return (
    <>
      <section>
        <header className="mb-2 flex flex-row items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-500">
            Accounts balance over time
          </h1>

          <BoardDatesSelector
            interval={interval}
            minStartDate={timelineVersion.startDate}
            startDate={startDate}
          />
        </header>

        <div className="rounded-md  bg-white p-6 pb-4 shadow-sm">
          <Chart days={days} onDayClick={handleDayClick} />
        </div>
      </section>
    </>
  );
};
