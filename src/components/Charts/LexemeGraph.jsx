import  { useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function LexemeGraph({ data }) {
  const graphData = useMemo(() => {
    const sessions = {};
    const pairCounts = {};
    const nodeSet = new Set();

    data.forEach(d => {
      const sessionKey = `${d.user_id}_${d.timestamp}`;
      if (!sessions[sessionKey]) sessions[sessionKey] = [];
      sessions[sessionKey].push(d.lexeme_string);
      nodeSet.add(d.lexeme_string);
    });

    Object.values(sessions).forEach(words => {
      const unique = Array.from(new Set(words));
      for (let i = 0; i < unique.length; i++) {
        for (let j = i + 1; j < unique.length; j++) {
          const key = [unique[i], unique[j]].sort().join("||");
          pairCounts[key] = (pairCounts[key] || 0) + 1;
        }
      }
    });

    const nodes = Array.from(nodeSet).map(word => ({
      id: word,
      label: word
    }));

    const links = Object.entries(pairCounts).map(([key, value]) => {
      const [source, target] = key.split("||");
      return { source, target, value };
    });

    return { nodes, links };
  }, [data]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Word Relationship Graph</h2>
      <div style={{ height: "700px" }}>
        <ForceGraph2D
          graphData={graphData}
          nodeAutoColorBy="id"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.label;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#3182CE";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "#000000";
            ctx.fillText(label, node.x, node.y + 12);
          }}
          linkWidth={link => Math.sqrt(link.value)}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          linkColor={() => "#aaa"}
        />
      </div>
    </div>
  );
}
