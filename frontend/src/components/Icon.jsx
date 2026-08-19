const PATHS = {
  medical: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  pulse: <polyline points="2,12 7,12 9,6 13,18 15,12 22,12" />,
  chevron: <polyline points="9,4 17,12 9,20" />,
  spine: (
    <>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="8" y1="5" x2="16" y2="5" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </>
  ),
  balance: (
    <>
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <circle cx="4" cy="8" r="2.2" />
      <circle cx="20" cy="8" r="2.2" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 L20 6.5 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V6.5 Z" />
      <polyline points="8.5,12 11,14.5 15.5,9.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <circle cx="16" cy="10" r="2.6" />
      <path d="M3.5 20c0-4 2.7-6.3 6-6.3s6 2.1 6.6 5.3" />
      <path d="M14.8 14.2c2.9.2 5.7 2 5.7 5.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12,7 12,12 16,14" />
    </>
  ),
  layers: (
    <>
      <polygon points="12,3 21,8 12,13 3,8" />
      <polyline points="3,13 12,18 21,13" />
      <polyline points="3,17.5 12,22 21,17.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  chat: (
    <>
      <path d="M4 12a8 8 0 1 1 3.3 6.4L4 20l1.4-3.6A7.96 7.96 0 0 1 4 12z" />
      <line x1="8.5" y1="11" x2="15.5" y2="11" />
      <line x1="8.5" y1="14" x2="13.5" y2="14" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </>
  ),
}

function Icon({ name, size = 24, className = '' }) {
  const path = PATHS[name]
  if (!path) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}

export default Icon
