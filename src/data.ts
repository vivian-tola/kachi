// Centralized content for the portfolio site. Edit this file to update
// copy, projects, skills, or contact details — the page components just
// render whatever is here.

export const site = {
  fullName: "Kachi Okwuchi",
  showAvailability: true,
  availabilityText: "Open to junior frontend roles — from October 2026",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/vivian-tola" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kachi-okwuchi-5ba77a339/" },
];

export const hero = {
  kicker: "ND in Nutrition & Dietetics — frontend dev via ALX",
  title: "I build small things carefully, then write down what broke.",
  titleHighlight: ["what", "broke."],
  paragraph:
    "I taught myself frontend through ALX alongside an ND in Nutrition and Dietetics. Now I want a junior frontend role, with people who review code out loud.",
  primaryCta: { label: "See the project", href: "#work" },
  secondaryCta: { label: "Resume", href: "https://docs.google.com/document/d/1f0ICLT-D1SDyYLY-Cjlrgc6iZlQTAcgD/edit?usp=drivesdk&ouid=100154785997743720001&rtpof=true&sd=true" },
  screenTagline: "frontend developer, in progress",
};

export type ProjectNote = { label: string; text: string };

export type Project = {
  id: string;
  num: string;
  kicker: string;
  title: string;
  blurb: string;
  stack: string[];
  shotCaption: string;
  // Screenshot in /public; leave out to show the caption placeholder instead.
  shot?: string;
  demoHref: string;
  codeHref: string;
  notes: ProjectNote[];
};

export const projects: Project[] = [
  {
    id: "fx",
    num: "01",
    kicker: "Solo build · 3 weeks",
    title: "Currency Converter",
    blurb:
      "Convert between 30-odd currencies against live mid-market rates. Vanilla JS, no libraries — one of my first ALX projects, and I wanted to feel the fetch, the loading state and the failure case myself.",
    stack: ["HTML", "CSS Grid", "JavaScript", "React", "Fetch API", "Vercel"],
    shotCaption: "Currency Converter home page showing live exchange rates",
    shot: "/projects/currency-converter.png",
    demoHref: "https://currex-converter.vercel.app/",
    codeHref: "https://github.com/vivian-tola/CurrexConverter",
    notes: [
      {
        label: "What broke",
        text: "I fired a request on every keystroke and hit the API's rate limit within an hour of launching.",
      },
      {
        label: "What I did",
        text: "Wrote a small debounce, then cached the day's rates in localStorage with a timestamp. Requests dropped from hundreds to one.",
      },
      {
        label: "Still open",
        text: "Offline mode shows stale rates without saying they're stale. Next version puts the fetch time on screen.",
      },
    ],
  },
];

export const skills: { level: string; items: string[] }[] = [
  {
    level: "Comfortable alone",
    items: [
      "React components and props",
      "Tailwind CSS",
      "Semantic HTML",
      "CSS layout — Flexbox and Grid",
      "Responsive from mobile up",
      "Git basics: branch, commit, PR",
    ],
  },
  {
    level: "Fine with a review",
    items: [
      "API integration — fetch and async/await",
      "Zustand for state management",
      "JavaScript DOM work",
      "Accessible forms and labels",
    ],
  },
  {
    level: "Learning, would need help",
    items: [
      "TypeScript",
      "Testing anything",
      "Build tooling past Vite defaults",
      "A real backend (Node)",
    ],
  },
];

// Short labels for the "pop the bubbles" pond. `comfy` bubbles are drawn bigger.
export const bubbles: { name: string; comfy: boolean }[] = [
  { name: "React", comfy: true },
  { name: "Tailwind", comfy: true },
  { name: "HTML", comfy: true },
  { name: "Flexbox & Grid", comfy: true },
  { name: "Responsive", comfy: true },
  { name: "Git", comfy: true },
  { name: "Fetch & async", comfy: false },
  { name: "Zustand", comfy: false },
  { name: "JavaScript", comfy: false },
  { name: "Accessible forms", comfy: false },
  { name: "TypeScript", comfy: false },
  { name: "Node", comfy: false },
];

export const learning: { when: string; what: string; note: string }[] = [
  {
    when: "This month",
    what: "TypeScript, the boring parts",
    note: "Typing my own converter's rate objects instead of following a tutorial.",
  },
  {
    when: "Next",
    what: "A real backend",
    note: "Node and a database, so the Shift Swap Board (next up) can sync between two phones instead of living in localStorage.",
  },
  {
    when: "Ongoing",
    what: "Accessibility",
    note: "Working through my projects with a keyboard only. Found four traps so far.",
  },
  {
    when: "Finished",
    what: "ALX Frontend Web Development",
    note: "Coursework squeezed into evenings and weekends around my ND classes.",
  },
];

export type DesignInspiration = {
  id: string;
  title: string;
  source: string;
  focus: string;
  status: "Not started" | "In progress" | "Done";
  projectHref?: string;
};

export const designInspirations: DesignInspiration[] = [
  {
    id: "shift-swap",
    title: "Shift Swap Board",
    source: "My own idea — from a scheduling problem I've seen firsthand",
    focus:
      "A board for staff to post and claim shifts. First real project pairing React with Zustand for shared state and Tailwind for styling, instead of scattering useState and hand-written CSS everywhere.",
    status: "Not started",
  },
  {
    id: "pricing",
    title: "SaaS pricing page — bold type, dark-mode toggle",
    source: "Add the link when I find it",
    focus:
      "Large type scales and a light/dark toggle that doesn't fight the rest of the layout.",
    status: "Not started",
  },
  {
    id: "product-grid",
    title: "E-commerce product grid with filters",
    source: "Add the link when I find it",
    focus:
      "Filter state in Zustand, plus keyboard-accessible filter chips and empty states.",
    status: "Not started",
  },
  {
    id: "dashboard",
    title: "Dashboard with data tables and charts",
    source: "Add the link when I find it",
    focus:
      "Dense layouts that still breathe, wired to real API data instead of static mocks.",
    status: "Not started",
  },
];

export const about = {
  heading: ["Nutrition by training,", "frontend", "by choice."],
  portraitAlt: "Portrait of Kachi Okwuchi",
  portraitCaption: "That's me, probably debugging",
  paragraphs: [
    "I completed my ND in Nutrition and Dietetics, and learned frontend development on the side through ALX — evenings and weekends spent rebuilding interfaces until React finally clicked.",
    "I'm continuing on to a BSc in Microbiology, but frontend is the skill I want to get genuinely good at. I work comfortably in React, wire up API integrations, manage state with Zustand, and style everything with Tailwind.",
    "What I need now is a junior role that sharpens what ALX started — a team that reviews code out loud, so guessing turns into knowing.",
  ],
  facts: [
    { icon: "pin", label: "Lagos · remote-friendly (WAT)" },
    { icon: "grad", label: "ALX Frontend, finished" },
    { icon: "keyboard", label: "Keyboard-tested" },
  ] as const,
};

export const contact = {
  kicker: "Contact",
  headline: "Got a junior seat and a review culture?",
  headlineAccent: "Let's talk.",
  email: "okwuchiomotolaonyeka@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/vivian-tola" },
    { label: "Resume", href: "https://docs.google.com/document/d/1f0ICLT-D1SDyYLY-Cjlrgc6iZlQTAcgD/edit?usp=drivesdk&ouid=100154785997743720001&rtpof=true&sd=true" },
  ],
};

export const footer = {
  note: "Built with Next.js and three.js, mostly at night",
};
