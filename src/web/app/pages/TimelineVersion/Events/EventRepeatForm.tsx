import { ChangeEvent, useState } from 'react';

import {
  Event,
  EventInterval,
  EventRepeat
} from '../../../../../domain/event/event';
import { addDays, formatInputDate } from '../../../../../utils/date';
import { ValidationErrors } from '../../../../../utils/error';

interface EventRepeatFormProps {
  event: Event;
  eventRepeat?: EventRepeat;
  errors?: ValidationErrors<EventRepeat>;
}

const repeatOptions = [
  { label: 'never', value: 'never' },
  { label: 'every day', value: EventInterval.day },
  { label: 'every week', value: EventInterval.week },
  { label: 'every month', value: EventInterval.month },
  { label: 'every quarter', value: EventInterval.quarter },
  { label: 'every year', value: EventInterval.year },
  { label: 'custom', value: 'custom' }
];

const repeatIntervalOptions = Object.keys(EventInterval).map((interval) => ({
  label: interval + 's',
  value: interval
}));

export const EventRepeatForm = ({
  event,
  eventRepeat,
  errors
}: EventRepeatFormProps) => {
  const [isCustom, setIsCustom] = useState(!!eventRepeat?.isCustom);

  const [isRepetitive, setIsRepetitive] = useState(!!eventRepeat);

  const [interval, setInterval] = useState(eventRepeat?.interval || 'never');

  const [intervalNumber, setIntervalNumber] = useState(
    eventRepeat?.intervalNumber || 1
  );

  const repeatEndDate = eventRepeat?.endDate
    ? formatInputDate(eventRepeat.endDate)
    : '';

  const minRepeatEndDate = formatInputDate(addDays(event.date, 1));

  const handleRepeatChange = (formEvent: ChangeEvent<HTMLSelectElement>) => {
    const { value } = formEvent.target;

    const isNone = value === 'never';

    if (isNone) {
      setIsRepetitive(false);
      return;
    }

    const isCustom = value === 'custom';

    const interval = isCustom ? EventInterval.day : (value as EventInterval);

    setIsRepetitive(true);
    setInterval(interval);
    setIntervalNumber(1);
    setIsCustom(isCustom);
  };

  return (
    <>
      <input
        type="hidden"
        name="repeatIsCustom"
        defaultValue={isCustom.toString()}
      />

      <input
        type="hidden"
        name="isRepetitive"
        defaultValue={isRepetitive.toString()}
      />

      <input type="hidden" name="repeatIntervalNumber" value={intervalNumber} />

      <input type="hidden" name="repeatInterval" defaultValue={interval} />

      <div className="my-4">
        <label htmlFor="repeat">Repeat:</label>

        <select
          id="repeat"
          onChange={handleRepeatChange}
          value={isCustom ? 'custom' : interval}
        >
          {repeatOptions.map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {isRepetitive && isCustom && (
        <div className="mb-4">
          <label htmlFor="repeatIntervalNumber">intervalNumber</label>

          <div className="flex flex-row items-start">
            <div
              className={`w-20 ${
                errors?.intervalNumber ? 'border-red-600' : ''
              }`}
            >
              <input
                defaultValue={intervalNumber}
                id="repeatIntervalNumber"
                min={1}
                name="repeatIntervalNumber"
                className="text-center"
                type="number"
              />

              {errors?.endDate && <p>{errors?.endDate}</p>}
            </div>

            <div className="ml-4">
              <select
                defaultValue={interval}
                id="repeatInterval"
                name="repeatInterval"
              >
                {repeatIntervalOptions.map(({ label, value }) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {isRepetitive && (
        <div className={`mb-4 ${errors?.endDate ? 'border-red-600' : ''}`}>
          <label htmlFor="repeatEndDate">Stop repeating on:</label>
          <input
            id="repeatEndDate"
            min={minRepeatEndDate}
            name="repeatEndDate"
            type="date"
            defaultValue={repeatEndDate}
          />

          {errors?.endDate && <p>{errors?.endDate}</p>}
        </div>
      )}
    </>
  );
};
