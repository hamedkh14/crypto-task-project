'use client'
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const timeframes = [
  { label: '1 Minute', value: '1m' },
  { label: '5 Minutes', value: '5m' },
  { label: '15 Minutes', value: '15m' },
  { label: '1 Hour', value: '1h' },
  { label: '1 Day', value: '1d' },
];

const TradingChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('1m');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${selectedTimeframe}`);
    const data = await response.json();

    const labels = data.map((item: any) => new Date(item[0]).toLocaleTimeString());
    const prices = data.map((item: any) => item[4]);

    setChartData({
      labels,
      datasets: [
        {
          label: `BTCUSDT Close Price (${selectedTimeframe})`,
          data: prices,
          backgroundColor: 'rgb(252, 213, 53)',
          borderColor: 'rgb(252, 213, 53)',
          borderWidth: 1,
        },
      ],
    });

    setLastUpdated(new Date());
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [selectedTimeframe]);

  return (
    <div>
      {/* Select time */}
      <select
        value={selectedTimeframe}
        onChange={(e) => setSelectedTimeframe(e.target.value)}
        className='text-black border border-gray-400 w-48 h-10 ml-5 rounded-md'
      >
        {timeframes.map((tf) => (
          <option key={tf.value} value={tf.value}>
            {tf.label}
          </option>
        ))}
      </select>

      {/* Chart */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />

      {lastUpdated && (
        <p>Last updated: {lastUpdated.toLocaleTimeString()}</p>
      )}
    </div>
  );
};

export default TradingChart;
