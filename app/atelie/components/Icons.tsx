import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Ico({ size = 20, children, ...props }: P & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// ── Navigation ──────────────────────────────────────────────
export function IconTag({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </Ico>
  );
}

export function IconUser({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Ico>
  );
}

export function IconInfo({ size }: P) {
  return (
    <Ico size={size}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </Ico>
  );
}

export function IconMapPin({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </Ico>
  );
}

export function IconMessageSquare({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </Ico>
  );
}

export function IconArrowLeft({ size }: P) {
  return (
    <Ico size={size}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Ico>
  );
}

export function IconChevronRight({ size }: P) {
  return (
    <Ico size={size}>
      <polyline points="9 18 15 12 9 6" />
    </Ico>
  );
}

export function IconLock({ size }: P) {
  return (
    <Ico size={size}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </Ico>
  );
}

// ── Section icons ────────────────────────────────────────────
export function IconLeaf({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </Ico>
  );
}

export function IconSun({ size }: P) {
  return (
    <Ico size={size}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </Ico>
  );
}

export function IconScissors({ size }: P) {
  return (
    <Ico size={size}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </Ico>
  );
}

export function IconUsers({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </Ico>
  );
}

export function IconRuler({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M21.3 8.7l-8.6 8.6a2 2 0 01-2.8 0l-4.2-4.2a2 2 0 010-2.8l8.6-8.6a2 2 0 012.8 0l4.2 4.2a2 2 0 010 2.8z" />
      <path d="M7.5 13.5l3-3" />
    </Ico>
  );
}

export function IconShirt({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.86H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.86l.58-3.57a2 2 0 00-1.34-2.23z" />
    </Ico>
  );
}

export function IconEye({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Ico>
  );
}

export function IconCheckCircle({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </Ico>
  );
}

export function IconClock({ size }: P) {
  return (
    <Ico size={size}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Ico>
  );
}

export function IconBus({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M8 6v6M3 6h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
      <path d="M3 10h18M8 18v2M16 18v2" />
      <circle cx="8" cy="14" r="1" />
      <circle cx="16" cy="14" r="1" />
    </Ico>
  );
}

export function IconExternalLink({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Ico>
  );
}

export function IconPhone({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.077 2.18 2 2 0 012.09 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </Ico>
  );
}

export function IconMail({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </Ico>
  );
}

export function IconInstagram({ size }: P) {
  return (
    <Ico size={size}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </Ico>
  );
}

export function IconSearch({ size }: P) {
  return (
    <Ico size={size}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Ico>
  );
}

export function IconHome({ size }: P) {
  return (
    <Ico size={size}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Ico>
  );
}
