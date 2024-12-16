import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SpeedChart = ({ data }) => (
  <div className="chart-speed">
    <h3>시간별 속도</h3>
    <LineChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="speed" stroke="#82ca9d" />
    </LineChart>
  </div>
);

export default SpeedChart;
