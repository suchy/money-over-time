import { Day } from '../../../../../domain/day/day';
import { fullDateFormat } from '../../../../../utils/date';
import { EventsResultsList } from './EventsResultsList/EventsResultsList';
import { Dialog } from '~/web/app/components/Dialog/Dialog';
import { DialogTitle } from '~/web/app/components/Dialog/DialogTitle';

interface DaySummaryModalProps {
  day: Day;
  onClose: () => void;
}

export const DaySummaryModal = ({ day, onClose }: DaySummaryModalProps) => {
  const date = fullDateFormat(day.date);

  const { finalAccountsBalances, eventsResults } = day;

  const hasEvents = !!eventsResults.length;

  return (
    <Dialog closeUrl="#">
      <DialogTitle>Accounts balances at the end of {date} </DialogTitle>

      <div className="pb-8">
        <div className="mb-8 flex flex-row flex-wrap">
          {finalAccountsBalances.map(({ account, balance }) => (
            <div
              key={account.accountId}
              className="grow rounded-sm border border-x-gray-200 p-4 odd:mr-1 even:ml-1"
            >
              <div className="flex flex-row items-start">
                <div className="grow">
                  <div className="mb-2 text-sm font-medium">{account.name}</div>
                  <div className="text-2xl font-semibold leading-none">
                    {balance.toFixed(2)}
                  </div>
                </div>

                <div
                  className="aspect-square w-8 rounded-sm"
                  style={{ background: account.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {!hasEvents && (
          <p className="text-center">There were no events that day.</p>
        )}

        {hasEvents && <EventsResultsList eventsResults={eventsResults} />}
      </div>
    </Dialog>
  );
};
