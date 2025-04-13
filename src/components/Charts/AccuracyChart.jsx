import React from "react";
import { ResponsiveContainer, Tooltip } from "recharts";
import { RadialBarChart, RadialBar, Legend, Cell } from "recharts";

function summarizeEffectiveness(data) {
  let totalSeen = 0;
  let totalCorrect = 0;

  data.forEach(d => {
    totalSeen += d.history_seen || 0;
    totalCorrect += d.history_correct || 0;
  });

  const effectiveness = totalSeen > 0 ? (totalCorrect / totalSeen) : 0;

  return [
    { name: "Effective", value: effectiveness * 100 },
    { name: "Missed", value: 100 - effectiveness * 100 }
  ];
}

const COLORS = ["#10B981", "#EF4444"];

export default function AccuracyChart({ data }) {
  const chartData = summarizeEffectiveness(data);

  if (!chartData.length) {
    return <div className="p-4 bg-white rounded shadow">No data to display.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Overall Learning Effectiveness</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart innerRadius="40%" outerRadius="90%" data={chartData} startAngle={180} endAngle={0}>
          <RadialBar background dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </RadialBar>
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
