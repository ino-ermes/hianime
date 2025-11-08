import React from 'react';
import {
  BarChart as BC,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: { [key: string]: string | number }[];
  meta: { dataKey: string; stroke: string }[];
}

const BarChart: React.FC<BarChartProps> = ({ data, meta }) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <BC
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        {meta.map(({ dataKey, stroke }, index) => {
          return (
            <Bar dataKey={dataKey} stackId='a' fill={stroke} key={index} />
          );
        })}
      </BC>
    </ResponsiveContainer>
  );
};

export default BarChart;
