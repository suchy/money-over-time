export enum EventType {
  accountOperation = 'accountOperation',
  variableChange = 'variableChange'
}
export enum EventInterval {
  day = 'day',
  week = 'week',
  month = 'month',
  quarter = 'quarter',
  year = 'year'
}

export interface EventRepeat {
  interval: EventInterval;
  isCustom: boolean;
  intervalNumber: number;
  endDate?: Date;
}

interface EventProps {
  accountId?: string;
  date: Date;
  eventId: string;
  expression: string;
  name: string;
  repeat?: EventRepeat;
  type: EventType;
}

export type VariableEventProps = Omit<EventProps, 'eventId'>;

export type Event = Readonly<EventProps>;

export const EventFactory = (eventProps: EventProps) => {
  const event: Event = Object.freeze(eventProps);
  return event;
};
