import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, XCircle } from 'lucide-react'

/* ─── SOCIAL SVG ICONS ───────────────────────────────── */
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)
const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const socials = [
  { icon: <IconFacebook />,  href: 'https://web.facebook.com/joash.jon.magsayo.bumaat.2025', label: 'Facebook' },
  { icon: <IconGitHub />,    href: 'https://github.com/joashbumaat', label: 'GitHub' },
  { icon: <IconLinkedin />,  href: 'https://www.linkedin.com/in/joash-jon-bumaat-1a1a1337a', label: 'LinkedIn' },
  { icon: <IconMail />,      href: 'https://mail.google.com/mail/?view=cm&to=joashjonb@gmail.com', label: 'Email' },
]

/* skill SVG icons — sized 18x18, colour-neutral where possible */
const SkillIcons = {
  HTML5: () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 2l1.5 17L12 21l7.5-2L21 2H3z" fill="#E44D26"/><path d="M12 19.5l6-1.67L19.38 5H12v14.5z" fill="#F16529"/><path d="M12 10h3.5l-.25 2.5L12 13v2l3.75-.75.5-5.75H12V10zm0-3h4.25l.25-2.5H12V7z" fill="white"/><path d="M12 10H8.5l.25 2.5.75.5H12v-2h-.5l-.25-1H12V10zm0-3H7.5l.25 2.5H12V7z" fill="#EBEBEB"/></svg>,
  CSS3:  () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 2l1.5 17L12 21l7.5-2L21 2H3z" fill="#264DE4"/><path d="M12 19.5l6-1.67L19.38 5H12v14.5z" fill="#2965F1"/><path d="M12 10h3.5l-.25 3.25L12 14.25V16.5l3.75-1.25.75-7.25H12V10zm0-3h4.25l.25-2.5H12V7z" fill="white"/><path d="M12 10H8.25l.5 4.25 1 .75H12v-2.25l-1.25-.25L10.5 10H12zm0-3H7.5l.25 2.5H12V7z" fill="#EBEBEB"/></svg>,
  JavaScript: () => <svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="2" fill="#F7DF1E"/><path d="M7 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.7-.5 1.7-1.3 0-.9-.7-1.2-1.8-1.7l-.6-.3C6.9 14.9 6 14.1 6 12.5c0-1.5 1.1-2.6 2.9-2.6 1.2 0 2.1.4 2.7 1.5l-1.5.9c-.3-.5-.6-.8-1.2-.8-.5 0-.9.3-.9.8 0 .6.4.8 1.3 1.2l.6.3C11.6 14.3 13 15 13 16.8c0 2-1.6 2.8-3.6 2.8-2 0-3.2-1-3.8-2.1l1.4-1zm7.2.2c.5.8 1.1 1.5 2.2 1.5 1 0 1.6-.4 1.6-1 0-.7-.6-1-1.7-1.4l-.5-.2C14.6 16 13.5 15 13.5 13.5c0-1.5 1.1-2.6 2.8-2.6 1.2 0 2.1.4 2.7 1.4l-1.4 1c-.3-.5-.6-.8-1.3-.8-.5 0-.9.3-.9.8 0 .5.3.8 1.2 1.1l.5.2c1.7.7 2.9 1.4 2.9 3.1 0 1.8-1.4 2.9-3.3 2.9-1.9 0-3.1-1-3.7-2.2l1.5-.7z" fill="#323330"/></svg>,
  React:  () => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.1" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.4"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)"/></svg>,
  Vite:   () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M21 3L13 21l-2-7-7-2L21 3z" fill="none" stroke="#646CFF" strokeWidth="1.8" strokeLinejoin="round"/><path d="M13 21l2-7" stroke="#BD34FE" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  'Firebase': () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.218C13.28 10.47 14.21 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.218C15.22 6.93 14.29 6 12 6zm-4.5 6C5.1 12 3.6 13.2 3 15.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.218C8.78 16.47 9.71 17.4 12 17.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.218C10.72 12.93 9.79 12 7.5 12z" fill="#06B6D4"/></svg>,
  'Node.js': () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="none" stroke="#539E43" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 8v4l3 2" stroke="#539E43" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Express.js': () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  Python: () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2C9 2 7 3.5 7 6v2h5v1H6C4 9 2 10.5 2 13.5S4 18 6 18h1v-2c0-2 1.5-3.5 5-3.5V11h5V9c0-3-2-5-5-5h-0z" fill="#3776AB"/><circle cx="9.5" cy="6.5" r="1" fill="white"/><path d="M12 22c3 0 5-1.5 5-4.5v-2H12v-1h6c2 0 4-1.5 4-4.5S18 6 16 6h-1v2c0 2-1.5 3.5-5 3.5V13H5v2c0 3 2 5 5 5h2z" fill="#FFD43B"/><circle cx="14.5" cy="17.5" r="1" fill="white"/></svg>,
  C: () => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#5C6BC0" strokeWidth="1.6"/><path d="M15 9a5 5 0 100 6" stroke="#5C6BC0" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
  'C#': () => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#9B59B6" strokeWidth="1.6"/><path d="M14 9a5 5 0 100 6" stroke="#9B59B6" strokeWidth="1.8" strokeLinecap="round" fill="none"/><path d="M17 10.5h-3m0 3h3m-1.5-4.5v6" stroke="#9B59B6" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  'C++': () => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#4FC3F7" strokeWidth="1.6"/><path d="M10 9a5 5 0 100 6" stroke="#4FC3F7" strokeWidth="1.8" strokeLinecap="round" fill="none"/><path d="M15 10.5v3m-1.5-1.5h3m2.5-1.5v3m-1.5-1.5h3" stroke="#4FC3F7" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  Teamwork: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="1.7" strokeLinecap="round"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M17 13c2.5 0 5 1.5 5 5"/></svg>,
  Communication: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/></svg>,
  'Software Testing': () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  'VS Code': () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M17 2L7 13 3 9l-1 1 4 4-4 4 1 1 4-4 10 5V2h-1z" fill="#007ACC"/><path d="M17 2v20L7 16l-4 4-1-1 4-4-4-4 1-1 4 4 10-11V2z" fill="#007ACC" opacity=".5"/></svg>,
  Netlify: () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2L2 12l10 10 10-10L12 2z" fill="none" stroke="#00C7B7" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8 12h8M12 8v8" stroke="#00C7B7" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Render: () => <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#46E3B7" strokeWidth="1.7"/><path d="M8 16V8h4a3 3 0 010 6H8m4 0l3 2" stroke="#46E3B7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Git: () => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="6" cy="18" r="2.5" fill="none" stroke="#F05033" strokeWidth="1.6"/><circle cx="18" cy="6" r="2.5" fill="none" stroke="#F05033" strokeWidth="1.6"/><circle cx="6" cy="6" r="2.5" fill="none" stroke="#F05033" strokeWidth="1.6"/><path d="M8.5 6h7m-9 2.5v7" stroke="#F05033" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  GitHub: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#E8EAF0"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.218.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>,
  Canva: () => <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#7D2AE8"/><path d="M8 12a4 4 0 108 0 4 4 0 00-8 0z" fill="none" stroke="white" strokeWidth="1.6"/><circle cx="12" cy="12" r="1.5" fill="white"/></svg>,
}

/* ─── NAV ─────────────────────────────────────────────── */
const NAV = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'contact',    label: 'Contact' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─── DATA ────────────────────────────────────────────── */
const skillGroups = [
  {
    title: 'Frontend',
    accent: '#6EE7B7',
    bg: 'rgba(110,231,183,0.08)',
    headerIcon: 'Frontend',
    items: ['HTML5','CSS3','JavaScript','React','Vite', 'Firebase'],
  },
  {
    title: 'Backend',
    accent: '#60A5FA',
    bg: 'rgba(96,165,250,0.08)',
    headerIcon: 'Backend',
    items: ['Node.js','Express.js'],
  },
  {
    title: 'Languages',
    accent: '#C084FC',
    bg: 'rgba(192,132,252,0.08)',
    headerIcon: 'Languages',
    items: ['Python','C','C#','C++'],
  },
  {
    title: 'Soft Skills',
    accent: '#F472B6',
    bg: 'rgba(244,114,182,0.08)',
    headerIcon: 'SoftSkills',
    items: ['Teamwork','Communication','Software Testing'],
  },
  {
    title: 'Tools',
    accent: '#FBBF24',
    bg: 'rgba(251,191,36,0.08)',
    headerIcon: 'Tools',
    items: ['VS Code','Netlify','Render','Git','GitHub','Canva'],
  },
]

const CategoryIcon = ({ title }) => {
  const icons = {
    Frontend:   () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    Backend:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="5" rx="1"/><circle cx="6" cy="5.5" r=".8" fill="#60A5FA"/><circle cx="6" cy="12.5" r=".8" fill="#60A5FA"/></svg>,
    Languages:  () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l2 2 4-4"/><path d="M12 2H6a2 2 0 00-2 2v16a2 2 0 002 2h7"/><path d="M9 7h6M9 11h4"/></svg>,
    SoftSkills: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2147ef" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="3"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><circle cx="18" cy="9" r="2.5"/><path d="M16.5 21c0-3 1.5-5 4.5-5"/></svg>,
    Tools:      () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a6 6 0 01-7 7l-8.7 8.7a2 2 0 01-3-3l8.7-8.7a6 6 0 017-7l-3 3z"/></svg>,
  }
  const Icon = icons[title] || icons.Tools
  return <Icon />
}

const experience = [
  {
    role: 'Contract Web Developer',
    company: 'Project Based',
    period: 'Oct – Nov 2025',
    color: '#C084FC',
    desc: 'Translated client requirements into visually appealing and functional web pages using HTML, CSS, and JavaScript. Managed projects from brief to delivery.',
  },
  {
    role: 'Web Developer — Internship',
    company: 'Benpos Systems',
    period: 'Apr – Jun 2025',
    color: '#60A5FA',
    desc: 'Built modern, responsive websites with focus on performance and accessibility. Received tasks from team lead based on client requirements and coded responsive, mobile-first web pages.',
  },
  {
    role: 'Software Tester — Internship',
    company: 'Benpos Systems',
    period: 'Feb – Apr 2025',
    color: '#6EE7B7',
    desc: 'Checked software programs for correctness, documented issues clearly for developers, tested for errors and bugs, and collaborated closely with the development team.',
  },
]

const projects = [
  {
    title: 'Benpos Systems',
    type: 'Internship',
    desc: 'Modern POS platform with fast checkout, responsive design, and secure payments.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    href: 'https://www.benpossystems.com/main/',
    color: '#6EE7B7',
    video: '/benpos.mp4',
  },
  {
    title: 'JK Hardware',
    type: 'Personal Project',
    desc: 'Product-focused hardware store website emphasizing brand reliability and identity.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    href: 'https://jkhardware.netlify.app/',
    color: '#60A5FA',
    video: '/jk.mp4',
  },
  {
    title: 'Pahrump Realtor',
    type: 'Project-based',
    desc: 'Real estate site for a community-first realtor helping clients find their perfect home.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    href: 'https://pahrump-realtor.netlify.app/',
    color: '#C084FC',
    video: '/realtor.mp4',
  },
  {
    title: 'Time Tracking System',
    type: 'Assessment',
    desc: 'Productivity and task management app with clean, minimal UI.',
    tags: ['Express.js', 'Node.js', 'React', 'Firebase (user authentication)'],
    href: 'https://mini-hcm-24594.web.app/',
    color: '#FBBF24',
    video: '/time.mp4',
  },
]

/* ─── HELPERS ─────────────────────────────────────────── */
function Section({ id, children, bg }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id={id} ref={ref} style={{ scrollMarginTop: '64px', background: bg || 'transparent', padding: '96px 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  )
}

const dm = "'DM Sans', sans-serif"
const syne = "'Syne', sans-serif"

function SectionLabel({ children }) {
  return (
    <span style={{ display: 'inline-block', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', border: '1px solid #1E2536', padding: '4px 14px', borderRadius: 999, marginBottom: 16, fontFamily: dm }}>
      {children}
    </span>
  )
}
function SectionTitle({ children }) {
  return <h2 style={{ fontFamily: syne, fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: '#E8EAF0', margin: '0 0 10px', lineHeight: 1.15 }}>{children}</h2>
}
function grad(text) {
  return <span style={{ background: 'linear-gradient(135deg,#6EE7B7,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{text}</span>
}

/* ─── NAVBAR ──────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const ids = NAV.map(n => n.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(ids[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s', background: scrolled ? 'rgba(15,17,23,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid #1E2536' : '1px solid transparent' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: syne, fontWeight: 800, fontSize: 20, color: '#E8EAF0' }}>
          JJ<span style={{ color: '#6EE7B7' }}>.</span>
        </button>
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {NAV.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: active === id ? 'rgba(255,255,255,0.07)' : 'transparent', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 8, fontFamily: dm, fontSize: 14, color: active === id ? '#E8EAF0' : '#9CA3AF', fontWeight: active === id ? 500 : 400, transition: 'all 0.2s' }}
              onMouseEnter={e => { if (active !== id) { e.target.style.color = '#E8EAF0'; e.target.style.background = 'rgba(255,255,255,0.04)' } }}
              onMouseLeave={e => { if (active !== id) { e.target.style.color = '#9CA3AF'; e.target.style.background = 'transparent' } }}
            >{label}</button>
          ))}
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E8EAF0', fontSize: 22, display: 'none', lineHeight: 1, padding: 4 }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(15,17,23,0.97)', borderBottom: '1px solid #1E2536', overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV.map(({ id, label }) => (
                <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false) }}
                  style={{ background: active === id ? 'rgba(255,255,255,0.07)' : 'transparent', border: 'none', cursor: 'pointer', padding: '12px 16px', borderRadius: 8, textAlign: 'left', fontFamily: dm, fontSize: 15, color: active === id ? '#E8EAF0' : '#9CA3AF' }}>
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ─── HOME ────────────────────────────────────────────── */
function Home() {
  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      padding: '80px 24px 40px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '15%', width: 400, height: 400, background: 'rgba(110,231,183,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 350, height: 350, background: 'rgba(59,130,246,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: '1px solid #1E2536', background: '#161B27', fontSize: 12, color: '#9CA3AF', marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ width: 8, height: 8, background: '#6EE7B7', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
        Available for work · Philippines
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
        style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 24px', maxWidth: 800 }}>
        {' '}
        <span style={{ background: 'linear-gradient(135deg,#6EE7B7,#3B82F6 50%,#9333EA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Junior Developer
        </span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
        style={{ color: '#9CA3AF', fontSize: 18, maxWidth: 520, lineHeight: 1.7, margin: '0 0 40px', fontFamily: "'DM Sans', sans-serif" }}>
        I build responsive, modern websites with clean code and great attention to detail.
        Passionate about crafting digital experiences that look and feel amazing.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
        <button onClick={() => scrollTo('projects')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 999, background: '#6EE7B7', border: 'none', color: '#0F1117', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: "'Syne', sans-serif", transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
          View My Work →
        </button>
        <button onClick={() => scrollTo('contact')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 999, background: 'transparent', border: '1px solid #1E2536', color: '#D1D5DB', fontWeight: 400, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#6B7280'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2536'; e.currentTarget.style.color = '#D1D5DB' }}>
          Get In Touch
        </button>
      </motion.div>

      {/* Social links */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
        style={{ display: 'flex', gap: 10 }}>
        {[
          { label: 'Email',     icon: <IconMail />,      href: 'https://mail.google.com/mail/?view=cm&to=joashjonb@gmail.com' },
          { label: 'LinkedIn',  icon: <IconLinkedin />,  href: 'https://www.linkedin.com/in/joash-jon-bumaat-1a1a1337a' },
          { label: 'GitHub',    icon: <IconGitHub />,    href: 'https://github.com/joashbumaat' },
          { label: 'Facebook',  icon: <IconFacebook />,  href: 'https://web.facebook.com/joash.jon.magsayo.bumaat.2025' },
        ].map(({ label, icon, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
            style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #1E2536', background: '#161B27', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#6B7280'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#1E2536'; e.currentTarget.style.color = '#9CA3AF' }}>
            {icon}
          </a>
        ))}
      </motion.div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  )
}



/* ─── ABOUT ───────────────────────────────────────────── */
function About() {
  const hobbies = ['💻 Coding','🎮 Gaming',,'🎵 Music','🏀 Basketball']
  return (
    <Section id="about">
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <SectionLabel>About Me</SectionLabel>
          <SectionTitle>The Person {grad('Behind the Code')}</SectionTitle>
        </div>

        {/* Single card: photo left + bio right */}
        <div style={{ background: '#161B27', border: '1px solid #1E2536', borderRadius: 24, padding: '36px', display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 20 }}>
          {/* Photo */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(110,231,183,0.3),rgba(59,130,246,0.3))', border: '3px solid rgba(110,231,183,0.25)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/profile.jpg" alt="Joash Jon Bumaat" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="font-family:Syne,sans-serif;font-weight:800;font-size:36px;color:#E8EAF0">JJ</span>' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: syne, fontWeight: 700, fontSize: 16, color: '#E8EAF0', margin: '0 0 2px' }}>Joash Jon Bumaat</p>
              <p style={{ color: '#6EE7B7', fontSize: 13, margin: '0 0 12px', fontFamily: dm }}>Junior Developer</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6EE7B7', background: 'rgba(110,231,183,0.08)', border: '1px solid rgba(110,231,183,0.2)', padding: '5px 12px', borderRadius: 999, fontFamily: dm }}>
                <span style={{ width: 6, height: 6, background: '#6EE7B7', borderRadius: '50%', animation: 'blink 2s infinite' }} />
                Open to Opportunities
              </span>
            </div>
          </div>

          {/* Bio */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ fontFamily: syne, fontWeight: 700, fontSize: 17, color: '#E8EAF0', margin: '0 0 14px' }}>About Me</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#9CA3AF', fontSize: 14, lineHeight: 1.8, fontFamily: dm, textAlign: 'justify', }}>
              <p style={{ margin: 0 }}>Hi! I'm Joash Jon Bumaat, a passionate Junior Developer based in Consolacion, Cebu City, Philippines. I specialize in building responsive, modern websites with clean and maintainable code.</p>
              <p style={{ margin: 0 }}>I enjoy developing modern web applications that deliver seamless user experiences across different devices and platforms.</p>
              <p style={{ margin: 0 }}>As a dedicated and growth-oriented developer, I continuously enhance my skills and stay updated with current web technologies. I am eager to contribute my technical skills, creativity, and commitment to continuous learning while growing as a professional in the web development industry.</p>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
              {[
                { label: 'Location', value: 'Consolacion, Cebu City' },
                { label: 'Education', value: 'BS Computer Engineering ' },
                { label: 'Experience', value: '9 months' },
              ].map(d => (
                <div key={d.label}>
                  <p style={{ fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px', fontFamily: dm }}>{d.label}</p>
                  <p style={{ fontSize: 13, color: '#D1D5DB', margin: 0, fontFamily: dm }}>{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies */}
        <div style={{ background: '#161B27', border: '1px solid #1E2536', borderRadius: 24, padding: '28px 32px' }}>
          <h3 style={{ fontFamily: syne, fontWeight: 700, fontSize: 17, color: '#ffffff', margin: '0 0 16px' }}>Hobbies & Interests</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {hobbies.map(h => (
              <span key={h} style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid #1E2536', borderRadius: 999, fontSize: 13, color: '#D1D5DB', fontFamily: dm }}>{h}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ─── SKILLS ──────────────────────────────────────────── */
function Skills() {
  return (
    <Section id="skills" bg="rgba(255,255,255,0.01)">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel>Technical Skills</SectionLabel>
          <SectionTitle>What I Work {grad('With')}</SectionTitle>
          <p style={{ color: '#6B7280', fontSize: 15, margin: '10px auto 0', maxWidth: 480, fontFamily: dm }}>Technologies and tools I use to build modern websites.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          {skillGroups.map((g, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ background: '#161B27', border: '1px solid #1E2536', borderRadius: 20, padding: '24px 20px', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = g.accent + '60'; e.currentTarget.style.boxShadow = `0 0 28px ${g.accent}12` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2536'; e.currentTarget.style.boxShadow = 'none' }}>
              {/* Category icon */}
              <div style={{ width: 42, height: 42, borderRadius: 12, background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <CategoryIcon title={g.headerIcon} />
              </div>
              <h3 style={{ fontFamily: syne, fontWeight: 700, fontSize: 14, color: g.accent, margin: '0 0 14px' }}>{g.title}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {g.items.map((name, j) => {
                  const Icon = SkillIcons[name]
                  return (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#D1D5DB', fontFamily: dm }}>
                      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 18 }}>
                        {Icon ? <Icon /> : <span style={{ width: 6, height: 6, borderRadius: '50%', background: g.accent, display: 'inline-block' }} />}
                      </span>
                      {name}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─── EXPERIENCE ──────────────────────────────────────── */
function Experience() {
  return (
    <Section id="experience">
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel>Work Experience</SectionLabel>
          <SectionTitle>Work  {grad('Experience')}</SectionTitle>
        </div>
        <div style={{ position: 'relative', paddingLeft: 32, borderLeft: '1px solid #1E2536' }}>
          {experience.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ position: 'relative', marginBottom: i < experience.length - 1 ? 24 : 0 }}>
              <span style={{ position: 'absolute', left: -44, top: 24, width: 14, height: 14, borderRadius: '50%', border: `2px solid ${exp.color}`, background: '#0F1117' }} />
              <div style={{ background: '#161B27', border: '1px solid #1E2536', borderRadius: 20, padding: 24, transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = exp.color + '50'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1E2536'}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                  <div>
                    <h3 style={{ fontFamily: syne, fontWeight: 700, fontSize: 15, color: '#E8EAF0', margin: '0 0 3px' }}>{exp.role}</h3>
                    <span style={{ color: exp.color, fontSize: 13, fontFamily: dm }}>{exp.company}</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#6B7280', border: '1px solid #1E2536', padding: '4px 12px', borderRadius: 999, whiteSpace: 'nowrap', fontFamily: dm }}>{exp.period}</span>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: 14, lineHeight: 1.75, margin: 0, fontFamily: dm }}>{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─── PROJECTS ────────────────────────────────────────── */
function Projects() {
  return (
    <Section id="projects" bg="rgba(255,255,255,0.01)">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel>Projects</SectionLabel>
          <SectionTitle>Recent {grad('Work')}</SectionTitle>
          <p style={{ color: '#6B7280', fontSize: 15, margin: '10px auto 0', maxWidth: 480, fontFamily: dm }}>Built with focus on responsiveness, performance, and clean code.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {projects.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ background: '#161B27', border: '1px solid #1E2536', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + '50'; e.currentTarget.style.boxShadow = `0 0 32px ${p.color}0D` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2536'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0F1117', overflow: 'hidden' }}>
                <video src={p.video} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transition: 'opacity 0.3s' }} muted loop playsInline
                  onMouseEnter={e => { e.target.play(); e.target.style.opacity = 1 }}
                  onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; e.target.style.opacity = 0.65 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #161B27 0%, transparent 60%)', pointerEvents: 'none' }} />
              </div>
              <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: '#6B7280', border: '1px solid #1E2536', padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: dm }}>{p.type}</span>
                  <a href={p.href} target="_blank" rel="noreferrer"
                    style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #1E2536', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', textDecoration: 'none', fontSize: 13, transition: 'all 0.2s', flexShrink: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.color = p.color; e.currentTarget.style.borderColor = p.color + '80' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#1E2536' }}>↗</a>
                </div>
                <h3 style={{ fontFamily: syne, fontWeight: 700, fontSize: 15, color: '#E8EAF0', margin: '0 0 8px' }}>{p.title}</h3>
                <p style={{ color: '#9CA3AF', fontSize: 13, lineHeight: 1.7, margin: '0 0 14px', flex: 1, fontFamily: dm }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.06)', fontFamily: dm }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─── CONTACT ──────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'service_vn1c9li'
const EMAILJS_TEMPLATE_ID = 'template_75zomjt'
const EMAILJS_PUBLIC_KEY  = 'SnM-BvGrYOJJPpA7D'

function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:  form.name,
            from_email: form.email,
            message:    form.message,
            to_name:    'Joash',
          },
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', background: '#0F1117', border: '1px solid #1E2536',
    borderRadius: 10, padding: '10px 14px', color: '#E8EAF0', fontSize: 14,
    outline: 'none', fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box',
  }

  return (
    <Section id="contact">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Let's Work {grad('Together')}</SectionTitle>
          <p style={{ color: '#6B7280', fontSize: 15, margin: '10px auto 0', maxWidth: 420, fontFamily: dm }}>Have a project in mind? I'd love to hear about it.</p>
        </div>

        {/* Contact info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '✉️', label: 'Email',    value: 'joashjonb@gmail.com',    href: 'mailto:joashjonb@gmail.com' },
            { icon: '📞', label: 'Phone',    value: '+63 970 910 8077',        href: 'tel:+639709108077' },
            { icon: '📍', label: 'Location', value: 'Consolacion, Cebu City', href: null },
          ].map(c => (
            <div key={c.label} style={{ background: '#161B27', border: '1px solid #1E2536', borderRadius: 16, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>{c.icon}</span>
              <div>
                <p style={{ fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px', fontFamily: dm }}>{c.label}</p>
                {c.href
                  ? <a href={c.href} style={{ fontSize: 12, color: '#D1D5DB', textDecoration: 'none', fontFamily: dm }}>{c.value}</a>
                  : <p style={{ fontSize: 12, color: '#D1D5DB', margin: 0, fontFamily: dm }}>{c.value}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={{ background: '#161B27', border: '1px solid #1E2536', borderRadius: 24, padding: 28 }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: syne, fontWeight: 700, fontSize: 20, color: '#6EE7B7', margin: '0 0 8px' }}>Message Sent!</h3>
              <p style={{ color: '#9CA3AF', fontSize: 14, margin: '0 0 6px', fontFamily: dm }}>Thanks for reaching out, I'll get back to you soon.</p>
              <p style={{ color: '#6B7280', fontSize: 13, margin: '0 0 20px', fontFamily: dm }}></p>
              <button onClick={() => setStatus('idle')}
                style={{ background: 'none', border: '1px solid #1E2536', color: '#9CA3AF', padding: '8px 20px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontFamily: dm }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#6B7280', display: 'block', marginBottom: 6, fontFamily: dm }}>Name</label>
                  <input name="name" type="text" value={form.name} onChange={handle} placeholder="Your full name" required style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#6B7280', display: 'block', marginBottom: 6, fontFamily: dm }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@gmail.com" required style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#6B7280', display: 'block', marginBottom: 6, fontFamily: dm }}>Message</label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="Send me a message..." required rows={5}
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              {status === 'error' && (
                <p style={{ color: '#F87171', fontSize: 13, margin: 0, fontFamily: dm }}>
                  ⚠️ Something went wrong. Please try again or email me at joashjonb@gmail.com
                </p>
              )}
              <button type="submit" disabled={status === 'sending'}
                style={{
                  alignSelf: 'flex-start', border: 'none', color: '#0F1117',
                  padding: '12px 32px', borderRadius: 999, fontWeight: 600, fontSize: 14,
                  fontFamily: syne, transition: 'all 0.2s',
                  background: status === 'sending' ? '#4B7A6A' : '#6EE7B7',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                {status === 'sending' ? 'Sending...' : 'Send Message '}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}

/* ─── FOOTER ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1E2536', padding: '24px', textAlign: 'center', color: '#4B5563', fontSize: 13, fontFamily: dm }}>
      © 2025 Joash Jon Bumaat · Portfolio
    </footer>
  )
}

/* ─── ROOT ────────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <>
      <style>{`
        @media(max-width:768px){.desktop-nav{display:none !important}.mobile-menu-btn{display:block !important}}
      `}</style>
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
