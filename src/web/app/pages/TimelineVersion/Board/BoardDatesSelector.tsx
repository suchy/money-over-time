import { useNavigate } from '@remix-run/react';
import { ChangeEvent } from 'react';

import { EventInterval } from '~/domain/event/event';
import { formatInputDate } from '~/utils/date';

interface BoardDatesSelectorProps {
  interval: EventInterval;
  minStartDate: Date;
  startDate: Date;
}

const intervalOptions = [
  EventInterval.week,
  EventInterval.month,
  EventInterval.quarter,
  EventInterval.year
];

export const BoardDatesSelector = ({
  interval,
  minStartDate,
  startDate
}: BoardDatesSelectorProps) => {
  const navigate = useNavigate();

  const handleStartDateChange = (formEvent: ChangeEvent<HTMLInputElement>) => {
    const { value } = formEvent.target;

    const params: Record<string, string> = {
      interval
    };

    if (value) {
      params.from = formatInputDate(value);
    }

    const queryString = new URLSearchParams(params);

    navigate(`?${queryString}`);
  };

  const handleIntervalChange = (formEvent: ChangeEvent<HTMLSelectElement>) => {
    const { value } = formEvent.target;

    const params: Record<string, string> = {
      from: formatInputDate(startDate)
    };

    if (value) {
      params.interval = value;
    }

    const queryString = new URLSearchParams(params);

    navigate(`?${queryString}`);
  };

  return (
    <div className="flex flex-row items-center">
      <label htmlFor="interval" className="mr-2 font-medium text-gray-500">
        show
      </label>

      <select
        id="interval"
        value={interval}
        onChange={handleIntervalChange}
        className="mr-2 rounded-sm border border-solid border-x-gray-200"
      >
        {intervalOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <label htmlFor="from" className="mr-2 font-medium text-gray-500">
        from
      </label>

      <input
        id="from"
        min={formatInputDate(minStartDate)}
        type="date"
        value={formatInputDate(startDate)}
        onChange={handleStartDateChange}
        className="w-auto shrink-0 grow-0 rounded-sm border border-solid border-x-gray-200 py-1 px-3 text-sm"
      />
    </div>
  );
};
