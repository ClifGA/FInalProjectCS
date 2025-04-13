import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";

const posMap = {
  "<adj>": "Adjective",
  "<adv>": "Adverb",
  "<cnjcoo>": "Conjunction",
  "<det>": "Determiner",
  "<n>": "Noun",
  "<pr>": "Preposition",
  "<prn>": "Pronoun",
  "<vblex>": "Verb",
  "<vbser>": "Verb"
};

const posColors = {
  Adjective: "#A855F7",
  Adverb: "#F97316",
  Conjunction: "#22C55E",
  Determiner: "#FACC15",
  Noun: "#06B6D4",
  Preposition: "#6366F1",
  Pronoun: "#EC4899",
  Verb: "#3B82F6"
};

function extractPOS(lexemeString) {
  const match = lexemeString.match(/<([^<>]+)>/g);
  if (!match) return "Unknown";
  for (const tag of match) {
    if (posMap[tag]) return posMap[tag];
  }
  return "Other";
}

const POSFrequencyBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    const summary = {};

    data.forEach(entry => {
      const pos = extractPOS(entry.lexeme_string);
      if (!summary[pos]) {
        summary[pos] = { pos, total_seen: 0 };
      }
      summary[pos].total_seen += Number(entry.history_seen);
    });

    return Object.values(summary);
  }, [data]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Total Questions Seen per Part of Speech
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
          <XAxis type="number" dataKey="total_seen" />
          <YAxis type="category" dataKey="pos" />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_seen" name="Total Seen">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={posColors[entry.pos] || "#999"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default POSFrequencyBarChart;
