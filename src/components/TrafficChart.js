import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const TrafficChart = ({ data }) => {
  // 예시 데이터
  const data_ex = [
    { time: "08:00", volume: 120 },
    { time: "09:00", volume: 150 },
    { time: "10:00", volume: 180 },
    // 더 많은 데이터
  ];

  return (
    <div className="chart-traffic">
      <h3>시간별 교통량</h3>
      <BarChart width={400} height={200} data={data || data_ex}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            if (name === "volume") {
              return [`교통량: ${value}`]; // 교통량을 포맷하여 표시
            }
            return value;
          }}
        />
        <Bar dataKey="volume" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TrafficChart;