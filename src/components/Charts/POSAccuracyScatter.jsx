import { useMemo } from "react";
import {
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
  Legend
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

export default function POSAccuracyScatter({ data }) {
  const groupedData = useMemo(() => {
    const summary = {};

    data.forEach(entry => {
      const pos = extractPOS(entry.lexeme_string);
      if (!summary[pos]) {
        summary[pos] = { pos, seen: 0, correct: 0 };
      }
      summary[pos].seen += Number(entry.history_seen);
      summary[pos].correct += Number(entry.history_correct);
    });

    return Object.values(summary).map(({ pos, seen, correct }) => ({
      pos,
      total_seen: seen,
      accuracy: seen > 0 ? correct / seen : 0
    }));
  }, [data]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Average Accuracy vs. Total Instances (by POS)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis type="number" dataKey="total_seen" name="Total Instances" />
          <YAxis type="number" dataKey="accuracy" name="Average Accuracy" domain={[0.85, 1]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          {Object.keys(posColors).map(pos => (
            <Scatter
              key={pos}
              name={pos}
              data={groupedData.filter(d => d.pos === pos)}
              fill={posColors[pos]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}