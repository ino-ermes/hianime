import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart as AC,
  Area,
  ResponsiveContainer,
} from 'recharts';

interface AreaChartProps {
  data: { [key: string]: string | number }[];
  meta: { dataKey: string; stroke: string }[];
}

const AreaChart: React.FC<AreaChartProps> = ({ data, meta }) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <AC
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
        {meta.map(({ dataKey, stroke }) => {
          return <Area dataKey={dataKey} stackId='a' fill={stroke} />;
        })}
      </AC>
    </ResponsiveContainer>
  );
};

export default AreaChart;
