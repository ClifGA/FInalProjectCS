
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];

export default function LanguagePieChart({ data }) {
  const summary = data.reduce((acc, item) => {
    acc[item.learning_language] = (acc[item.learning_language] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(summary).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Language Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}