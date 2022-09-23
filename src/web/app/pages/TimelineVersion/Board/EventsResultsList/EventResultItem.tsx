import { EventResult } from '../../../../../../domain/day/day';

interface EventResultItemProps {
  eventResult: EventResult;
}

export const EventResultItem = ({ eventResult }: EventResultItemProps) => {
  const accountBalance = getEventAccountBalance(eventResult);

  const color = accountBalance?.account.color || 'gray';

  const { event } = eventResult;

  return (
    <div
      key={event.eventId}
      className="group relative w-1/2 pb-8 first:pt-6 last:pb-0 odd:left-px odd:border-r odd:border-r-gray-200 odd:pr-6 odd:text-right even:ml-[50%] even:border-l even:border-l-gray-200 even:pl-6"
    >
      <div
        className="absolute top-px aspect-square w-4 rounded-sm group-first:top-7 group-odd:-right-2 group-even:-left-2"
        style={{ background: color }}
      />

      <p className="font-semibold">{event.name}</p>

      {accountBalance && (
        <p>
          {event.expression} <br />
          {accountBalance.account.name}: {accountBalance.balance.toFixed(2)}
        </p>
      )}
    </div>
  );
};

const getEventAccountBalance = ({ event, accountsBalances }: EventResult) => {
  const { accountId } = event;

  if (!accountId) {
    return;
  }

  const accountBalance = accountsBalances.find(
    ({ account }) => account.accountId === accountId
  );

  return accountBalance;
};
