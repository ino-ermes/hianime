import React from 'react';
import {
  LineChart as LC,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: { [key: string]: string | number }[];
  meta: { dataKey: string; stroke: string }[];
}

const LineChart: React.FC<LineChartProps> = ({ data, meta }) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <LC
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          padding={{ left: 30, right: 30 }}
          tick={{ fill: '#eeeeee' }}
        />
        <YAxis tick={{ fill: '#eeeeee' }} />
        <Tooltip />
        <Legend />
        {meta.map(({ dataKey, stroke }, index) => {
          return (
            <Line
              type='monotone'
              dataKey={dataKey}
              stroke={stroke}
              key={index}
            />
          );
        })}
      </LC>
    </ResponsiveContainer>
  );
};

export default LineChart;
