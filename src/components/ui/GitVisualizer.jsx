import { useMemo } from 'react';

/**
 * GitVisualizer — Renders an animated SVG git graph from engine state.
 *
 * Props:
 *   gitState — the full state object from GitEngine
 */

const COLORS = [
  '#34d399', // green (main)
  '#a78bfa', // purple
  '#f472b6', // pink
  '#60a5fa', // blue
  '#fb923c', // orange
  '#fbbf24', // yellow
  '#f87171', // red
  '#2dd4bf', // teal
];

export default function GitVisualizer({ gitState }) {
  const graph = useMemo(() => {
    if (!gitState || !gitState.commits || gitState.commits.length === 0) {
      return null;
    }
    return buildGraph(gitState);
  }, [gitState]);

  if (!graph) {
    return (
      <div className="rounded-xl border border-surface-3/40 bg-surface-1 p-6 text-center">
        <p className="text-xs text-text-muted font-mono mb-2">Visualisation Git</p>
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-surface-4 flex items-center justify-center">
            <span className="text-text-muted text-xs">?</span>
          </div>
          <p className="text-sm text-text-muted">Faites votre premier commit pour voir le graphe apparaître</p>
        </div>
      </div>
    );
  }

  const { nodes, edges, branchLines, labels: branchLabels, width, height } = graph;

  return (
    <div className="rounded-xl border border-surface-3/40 bg-surface-1 overflow-hidden">
      <div className="px-4 py-2 border-b border-surface-3/30 flex items-center justify-between">
        <span className="text-xs text-text-muted font-mono">git log --graph --all --oneline</span>
        <span className="text-[10px] text-text-muted/60">
          {gitState.commits.length} commit{gitState.commits.length > 1 ? 's' : ''} ·{' '}
          {Object.keys(gitState.branches).length} branche{Object.keys(gitState.branches).length > 1 ? 's' : ''}
        </span>
      </div>
      <div className="p-4 overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block mx-auto"
          style={{ minWidth: width }}
        >
          {/* Edges (commit connections) */}
          {edges.map((edge, i) => (
            <path
              key={`e-${i}`}
              d={edge.path}
              fill="none"
              stroke={edge.color}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.6}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            />
          ))}

          {/* Merge dashed lines */}
          {edges.filter(e => e.isMerge).map((edge, i) => (
            <path
              key={`m-${i}`}
              d={edge.path}
              fill="none"
              stroke={edge.color}
              strokeWidth={1.5}
              strokeDasharray="4,3"
              strokeLinecap="round"
              opacity={0.4}
              className="animate-fade-in"
            />
          ))}

          {/* Commit nodes */}
          {nodes.map((node, i) => (
            <g key={node.hash} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              {/* Glow effect for HEAD */}
              {node.isHEAD && (
                <circle
                  cx={node.x} cy={node.y} r={18}
                  fill={node.color}
                  opacity={0.1}
                  className="animate-pulse-soft"
                />
              )}
              {/* Node circle */}
              <circle
                cx={node.x} cy={node.y}
                r={node.isMerge ? 11 : 12}
                fill="#0b0f1a"
                stroke={node.color}
                strokeWidth={node.isHEAD ? 2.5 : 2}
              />
              {/* Inner dot */}
              <circle
                cx={node.x} cy={node.y}
                r={3}
                fill={node.color}
              />
              {/* Hash label */}
              <text
                x={node.x}
                y={node.y + 26}
                textAnchor="middle"
                fill={node.color}
                fontSize={9}
                fontFamily="monospace"
                opacity={0.7}
              >
                {node.hash}
              </text>
              {/* Commit message (truncated) */}
              <text
                x={node.x}
                y={node.y + 38}
                textAnchor="middle"
                fill="#475569"
                fontSize={8}
                fontFamily="monospace"
              >
                {node.message.length > 18 ? node.message.slice(0, 18) + '…' : node.message}
              </text>
            </g>
          ))}

          {/* Branch labels */}
          {branchLabels.map((label, i) => {
            const isHead = label.name === gitState.HEAD;
            return (
              <g key={`l-${i}`} className="animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                <rect
                  x={label.x - label.width / 2 - 1}
                  y={label.y - 10}
                  width={label.width + 2}
                  height={16}
                  rx={4}
                  fill={isHead ? label.color : '#0b0f1a'}
                  stroke={label.color}
                  strokeWidth={1}
                  opacity={isHead ? 0.9 : 0.6}
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  fill={isHead ? '#0b0f1a' : label.color}
                  fontSize={9}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {isHead ? '⮕ ' : ''}{label.name}
                </text>
              </g>
            );
          })}

          {/* Stash indicator */}
          {gitState.stash.length > 0 && (
            <g className="animate-fade-in">
              <rect x={width - 70} y={4} width={62} height={18} rx={4} fill="#fbbf2420" stroke="#fbbf24" strokeWidth={1} />
              <text x={width - 39} y={16} textAnchor="middle" fill="#fbbf24" fontSize={9} fontFamily="monospace">
                stash({gitState.stash.length})
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

/**
 * Build graph layout from Git state.
 */
function buildGraph(gitState) {
  const { commits, branches, HEAD, tags } = gitState;
  if (commits.length === 0) return null;

  // Assign branch lanes (y-positions)
  const branchNames = Object.keys(branches);
  const branchLane = {};
  // HEAD branch gets lane 0
  branchLane[HEAD] = 0;
  let laneIdx = 1;
  branchNames.forEach((b) => {
    if (branchLane[b] === undefined) branchLane[b] = laneIdx++;
  });

  const branchColor = {};
  branchNames.forEach((b, i) => {
    branchColor[b] = COLORS[branchLane[b] % COLORS.length] || COLORS[0];
  });

  // Layout params
  const nodeSpacingX = 70;
  const nodeSpacingY = 50;
  const startX = 50;
  const startY = 55;
  const maxLanes = Math.max(laneIdx, 1);

  // Build commit positions (reverse chronological = left to right)
  const commitPos = {};
  const nodes = [];
  const edges = [];

  commits.forEach((commit, idx) => {
    const lane = branchLane[commit.branch] !== undefined ? branchLane[commit.branch] : 0;
    const x = startX + idx * nodeSpacingX;
    const y = startY + lane * nodeSpacingY;
    const color = branchColor[commit.branch] || COLORS[0];
    const isHEAD = branches[HEAD] === commit.hash;

    commitPos[commit.hash] = { x, y, color, lane };

    nodes.push({
      hash: commit.hash,
      message: commit.message,
      x, y, color,
      isHEAD,
      isMerge: commit.isMerge,
      branch: commit.branch,
    });
  });

  // Build edges
  commits.forEach((commit) => {
    const pos = commitPos[commit.hash];
    if (!pos) return;

    (commit.parents || []).forEach((parentHash, pIdx) => {
      const parentPos = commitPos[parentHash];
      if (!parentPos) return;

      const isMerge = pIdx > 0;
      let path;

      if (parentPos.lane === pos.lane) {
        // Same lane — straight line
        path = `M ${parentPos.x} ${parentPos.y} L ${pos.x} ${pos.y}`;
      } else {
        // Different lanes — curve
        const midX = (parentPos.x + pos.x) / 2;
        path = `M ${parentPos.x} ${parentPos.y} C ${midX} ${parentPos.y}, ${midX} ${pos.y}, ${pos.x} ${pos.y}`;
      }

      edges.push({
        path,
        color: isMerge ? commitPos[parentHash]?.color || pos.color : pos.color,
        isMerge,
      });
    });
  });

  // Branch labels (positioned above the tip commit)
  const brLabels = [];
  Object.entries(branches).forEach(([name, hash]) => {
    if (!hash || !commitPos[hash]) return;
    const pos = commitPos[hash];
    const textW = name.length * 6.5 + (name === HEAD ? 16 : 8);
    brLabels.push({
      name,
      x: pos.x,
      y: pos.y - 22,
      color: branchColor[name] || COLORS[0],
      width: textW,
    });
  });

  const width = Math.max(startX + commits.length * nodeSpacingX + 40, 200);
  const height = startY + maxLanes * nodeSpacingY + 30;

  return { nodes, edges, labels: brLabels, width, height };
}
