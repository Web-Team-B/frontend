import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const TrafficChart = ({ data }) => (
  <div className="chart-traffic">
    <h3>시간별 교통량</h3>
    <BarChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="volume" fill="#8884d8" />
    </BarChart>
  </div>
);

export default TrafficChart;