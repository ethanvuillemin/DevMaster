/**
 * Rendeur markdown léger adapté au contenu des leçons Git.
 * Supporte : titres, paragraphes, code inline, code blocks, tableaux,
 * listes, blockquotes, gras, liens.
 */
export default function MarkdownRenderer({ text }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  let codeBlock = null;
  let tableRows = [];

  // ── Inline parsing ──────────────────────────────────────
  const parseInline = (str) => {
    const parts = [];
    let rest = str;
    let key = 0;

    while (rest.length > 0) {
      const bold = rest.match(/\*\*(.+?)\*\*/);
      const code = rest.match(/`([^`]+)`/);
      const link = rest.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const candidates = [bold, code, link].filter(Boolean);

      if (candidates.length === 0) {
        parts.push(rest);
        break;
      }

      const first = candidates.reduce((a, b) => (a.index < b.index ? a : b));

      if (first.index > 0) parts.push(rest.slice(0, first.index));

      if (first === bold) {
        parts.push(
          <strong key={key++} className="text-text-primary font-bold">
            {first[1]}
          </strong>
        );
      } else if (first === code) {
        parts.push(
          <code
            key={key++}
            className="bg-surface-3/60 text-accent-blue px-1.5 py-0.5 rounded text-[0.88em] font-mono"
          >
            {first[1]}
          </code>
        );
      } else if (first === link) {
        parts.push(
          <a
            key={key++}
            href={first[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue underline underline-offset-2 decoration-accent-blue/30 hover:decoration-accent-blue transition-colors"
          >
            {first[1]}
          </a>
        );
      }

      rest = rest.slice(first.index + first[0].length);
    }

    return parts;
  };

  // ── Flush table ─────────────────────────────────────────
  const flushTable = () => {
    if (tableRows.length < 2) {
      tableRows = [];
      return;
    }

    const headers = tableRows[0]
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean);
    const dataRows = tableRows
      .slice(2)
      .map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));

    elements.push(
      <div key={`t-${i}`} className="overflow-x-auto my-4 rounded-lg border border-surface-3/40">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-surface-3">
              {headers.map((h, j) => (
                <th
                  key={j}
                  className="px-3 py-2 text-left text-text-primary font-semibold whitespace-nowrap"
                >
                  {parseInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => (
              <tr key={ri} className="border-b border-surface-3/30 last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-text-secondary">
                    {parseInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    tableRows = [];
  };

  // ── Line-by-line parsing ────────────────────────────────
  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (codeBlock !== null) {
        elements.push(
          <pre
            key={`cb-${i}`}
            className="bg-surface-0 border border-surface-3/40 rounded-lg p-4 overflow-x-auto
                       my-3 text-[13px] leading-relaxed text-text-primary font-mono"
          >
            {codeBlock}
          </pre>
        );
        codeBlock = null;
      } else {
        if (tableRows.length > 0) flushTable();
        codeBlock = '';
      }
      i++;
      continue;
    }
    if (codeBlock !== null) {
      codeBlock += (codeBlock ? '\n' : '') + line;
      i++;
      continue;
    }

    // Tables
    if (line.includes('|') && line.trim().startsWith('|')) {
      tableRows.push(line);
      i++;
      continue;
    }
    if (tableRows.length > 0) flushTable();

    // Headings
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={i}
          className="text-text-primary text-lg font-display font-bold mt-6 mb-2 tracking-tight"
        >
          {parseInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4
          key={i}
          className="text-text-secondary text-sm font-display font-semibold mt-4 mb-1"
        >
          {parseInline(line.slice(5))}
        </h4>
      );
    }
    // Blockquote
    else if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-[3px] border-accent-yellow pl-4 py-2 my-3
                     bg-amber-950/20 rounded-r-lg text-accent-yellow/90 text-sm italic"
        >
          {parseInline(line.slice(2))}
        </blockquote>
      );
    }
    // Ordered list
    else if (line.match(/^\d+\.\s/)) {
      elements.push(
        <div key={i} className="text-text-secondary pl-4 my-0.5 text-[15px] leading-7">
          {parseInline(line)}
        </div>
      );
    }
    // Unordered list
    else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex gap-2 text-text-secondary pl-4 my-0.5 text-[15px] leading-7">
          <span className="text-text-muted shrink-0">•</span>
          <span>{parseInline(line.slice(2))}</span>
        </div>
      );
    }
    // Blank line
    else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    }
    // Paragraph
    else {
      elements.push(
        <p key={i} className="text-text-secondary my-1 text-[15px] leading-7">
          {parseInline(line)}
        </p>
      );
    }

    i++;
  }

  if (tableRows.length > 0) flushTable();

  return <div>{elements}</div>;
}
