import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { Account } from '../../../../../domain/account/account';
import { Day } from '../../../../../domain/day/day';
import { format } from '../../../../../utils/date';

interface ChartProps {
  days: Day[];
  onDayClick: (day: Day) => void;
}

export const Chart = ({ days, onDayClick }: ChartProps) => {
  const accounts = getDaysAccounts(days);

  const chartData = getChartData(days);

  const handleLineClick = (data: any) => {
    if (!data) {
      return;
    }

    const firstLine = Array.isArray(data.activePayload)
      ? data.activePayload[0]
      : undefined;

    if (!firstLine) {
      return;
    }

    const { day } = firstLine.payload;

    if (!day) {
      return;
    }

    onDayClick(day);
  };

  return (
    <div className="aspect-video grow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} onClick={handleLineClick}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          {accounts.map((account) => (
            <Line
              activeDot
              dataKey={account.name}
              dot={false}
              key={account.accountId}
              stroke={account.color}
              strokeWidth={1.5}
              type="monotone"
            />
          ))}

          <Tooltip isAnimationActive={false} />

          {/* <Legend iconType="square" verticalAlign="bottom" /> */}

          <XAxis
            // axisLine={false}
            dataKey="date"
            padding={{ left: 16, right: 16 }}
            tickCount={32}
            tickLine={false}
          />

          <YAxis
            // axisLine={false}
            padding={{ top: 16, bottom: 16 }}
            tickLine={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const getDaysAccounts = (days: Day[]) =>
  days.reduce((accounts: Account[], day) => {
    const uniqueAccounts = [...accounts];

    day.finalAccountsBalances.forEach(({ account }) => {
      const isUnique = !uniqueAccounts.some(
        (uAccount) => uAccount.accountId === account.accountId
      );

      if (isUnique) {
        uniqueAccounts.push(account);
      }
    });

    return uniqueAccounts;
  }, []);

const getChartData = (days: Day[]) =>
  // eslint-disable-next-line
  days.reduce((chartData: any[], day) => {
    const balances = day.finalAccountsBalances.reduce(
      // eslint-disable-next-line
      (balances: any, { account, balance }) => ({
        ...balances,
        [account.name]: balance,
        day
      }),
      {}
    );

    const dayChartData = { date: format(day.date, 'dd.MM'), ...balances };

    return [...chartData, dayChartData];
  }, []);
