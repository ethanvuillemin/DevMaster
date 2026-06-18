/**
 * SVG icons custom pour chaque track — remplace les emojis.
 * Usage: <TrackIcon trackId="git" size={40} color="#6366F1" />
 */

const icons = {

  git: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main branch line */}
      <line x1="16" y1="8" x2="16" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Feature branch */}
      <path d="M16 16 Q32 16 32 24 Q32 32 16 32" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
      {/* Nodes */}
      <circle cx="16" cy="8"  r="4" fill={color}/>
      <circle cx="16" cy="24" r="3.5" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="32" cy="24" r="4" fill={color} opacity="0.8"/>
      <circle cx="16" cy="40" r="4" fill={color}/>
    </svg>
  ),

  cicd: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pipeline stages */}
      <rect x="4"  y="18" width="10" height="12" rx="3" fill={color} opacity="0.9"/>
      <rect x="19" y="18" width="10" height="12" rx="3" fill={color} opacity="0.7"/>
      <rect x="34" y="18" width="10" height="12" rx="3" fill={color} opacity="0.5"/>
      {/* Connecting arrows */}
      <path d="M14 24 L19 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M29 24 L34 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <polyline points="31,21 34,24 31,27" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <polyline points="16,21 19,24 16,27" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Cycle arrow */}
      <path d="M38 14 Q44 14 44 24 Q44 38 24 38 Q8 38 8 14" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
      <polyline points="6,12 8,14 10,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
    </svg>
  ),

  docker: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stack of containers */}
      <rect x="8"  y="30" width="32" height="10" rx="3" fill={color} opacity="0.9"/>
      <rect x="11" y="20" width="26" height="9"  rx="2" fill={color} opacity="0.7"/>
      <rect x="14" y="11" width="20" height="8"  rx="2" fill={color} opacity="0.5"/>
      {/* Grid lines on bottom container */}
      <line x1="20" y1="30" x2="20" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <line x1="32" y1="30" x2="32" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    </svg>
  ),

  ml: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="8" y1="40" x2="8"  y2="8"  stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <line x1="8" y1="40" x2="42" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      {/* Decision boundary */}
      <path d="M12 36 Q24 20 40 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2" opacity="0.7"/>
      {/* Class A dots */}
      <circle cx="14" cy="32" r="3" fill={color} opacity="0.9"/>
      <circle cx="18" cy="28" r="3" fill={color} opacity="0.9"/>
      <circle cx="13" cy="24" r="2.5" fill={color} opacity="0.9"/>
      {/* Class B dots */}
      <circle cx="30" cy="18" r="3" fill="none" stroke={color} strokeWidth="2" opacity="0.7"/>
      <circle cx="36" cy="22" r="3" fill="none" stroke={color} strokeWidth="2" opacity="0.7"/>
      <circle cx="34" cy="14" r="2.5" fill="none" stroke={color} strokeWidth="2" opacity="0.7"/>
    </svg>
  ),

  dl: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Input layer */}
      <circle cx="8"  cy="14" r="3.5" fill={color} opacity="0.5"/>
      <circle cx="8"  cy="24" r="3.5" fill={color} opacity="0.5"/>
      <circle cx="8"  cy="34" r="3.5" fill={color} opacity="0.5"/>
      {/* Hidden layer 1 */}
      <circle cx="22" cy="10" r="3.5" fill={color} opacity="0.75"/>
      <circle cx="22" cy="20" r="3.5" fill={color} opacity="0.75"/>
      <circle cx="22" cy="30" r="3.5" fill={color} opacity="0.75"/>
      <circle cx="22" cy="40" r="3.5" fill={color} opacity="0.75"/>
      {/* Hidden layer 2 */}
      <circle cx="36" cy="16" r="3.5" fill={color} opacity="0.75"/>
      <circle cx="36" cy="28" r="3.5" fill={color} opacity="0.75"/>
      <circle cx="36" cy="38" r="3.5" fill={color} opacity="0.75"/>
      {/* Output */}
      <circle cx="46" cy="24" r="4" fill={color}/>
      {/* Connections (selected) */}
      <line x1="11.5" y1="14" x2="18.5" y2="20" stroke={color} strokeWidth="1" opacity="0.2"/>
      <line x1="11.5" y1="24" x2="18.5" y2="20" stroke={color} strokeWidth="1" opacity="0.2"/>
      <line x1="11.5" y1="34" x2="18.5" y2="30" stroke={color} strokeWidth="1" opacity="0.2"/>
      <line x1="25.5" y1="20" x2="32.5" y2="16" stroke={color} strokeWidth="1" opacity="0.2"/>
      <line x1="25.5" y1="30" x2="32.5" y2="28" stroke={color} strokeWidth="1" opacity="0.2"/>
      <line x1="39.5" y1="16" x2="42" y2="24" stroke={color} strokeWidth="1.5" opacity="0.35"/>
      <line x1="39.5" y1="28" x2="42" y2="24" stroke={color} strokeWidth="1.5" opacity="0.35"/>
    </svg>
  ),

  genai: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central diamond */}
      <path d="M24 6 L38 24 L24 42 L10 24 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      {/* Inner diamond */}
      <path d="M24 14 L32 24 L24 34 L16 24 Z" fill={color} opacity="0.4"/>
      {/* Sparkles */}
      <path d="M6 10 L7.5 6 L9 10 L13 11.5 L9 13 L7.5 17 L6 13 L2 11.5 Z" fill={color} opacity="0.8"/>
      <path d="M40 6 L41 3 L42 6 L45 7 L42 8 L41 11 L40 8 L37 7 Z" fill={color} opacity="0.6"/>
      <path d="M42 36 L43 33.5 L44 36 L46.5 37 L44 38 L43 40.5 L42 38 L39.5 37 Z" fill={color} opacity="0.5"/>
      {/* Lines from center */}
      <line x1="24" y1="6"  x2="24" y2="2"  stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="38" y1="24" x2="42" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="24" y1="42" x2="24" y2="46" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="10" y1="24" x2="6"  y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
};

export default function TrackIcon({ trackId, size = 40, color = '#6366F1' }) {
  const Icon = icons[trackId];
  if (!Icon) {
    // fallback: simple hexagon
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z"
          stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" strokeLinejoin="round"/>
      </svg>
    );
  }
  return <Icon size={size} color={color} />;
}
