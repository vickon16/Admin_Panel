import "./chart.scss"
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {data} from "../../data/chartData";

const Chart = ({title, aspect}) => {
  return (
    <article className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width={"100%"} aspect={aspect}>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}>
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <XAxis dataKey="name" scale="band" stroke="gray" />
          <YAxis stroke="gray" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="expenses"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="total" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="deviation" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </article>
  );
}

export default Chart
