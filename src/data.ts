// Centralized content for the portfolio site. Edit this file to update
// copy, projects, skills, or contact details — the page components just
// render whatever is here.

export const site = {
  fullName: "Onyeka Okwuchi",
  showAvailability: true,
  availabilityText: "Open to junior frontend roles — from October 2026",
};

export type HeroFact =
  | { label: string; value: string }
  | { label: string; links: { label: string; href: string }[] };

const heroFacts: HeroFact[] = [
  { label: "Based in", value: "Lagos, Nigeria · remote-friendly (WAT)" },
  {
    label: "Working in",
    value: "React · Zustand · Tailwind CSS · API integration · Git",
  },
  {
    label: "Came from",
    value:
      "ND in Nutrition and Dietetics — taught myself frontend on the side through ALX.",
  },
  {
    label: "Studying",
    value: "Working toward a BSc in Microbiology, alongside frontend dev.",
  },
  {
    label: "Elsewhere",
    links: [
      { label: "GitHub", href: "#contact" },
      { label: "Frontend Mentor", href: "#contact" },
      { label: "LinkedIn", href: "#contact" },
    ],
  },
];

export const hero = {
  kicker: "ND in Nutrition & Dietetics — frontend dev via ALX",
  titleLines: [
    "I build small",
    "things carefully,",
    "then write down",
    "what broke.",
  ],
  paragraph:
    "I finished my ND in Nutrition and Dietetics, then taught myself frontend development on the side through ALX. I'm continuing on to a BSc in Microbiology, but what I actually want right now is a junior frontend role — somewhere to sharpen the React, state management and API skills I've been building, with people who review code out loud.",
  primaryCta: { label: "See the two projects →", href: "#work" },
  secondaryCta: { label: "Download resume (PDF)", href: "https://docs.google.com/document/d/1f0ICLT-D1SDyYLY-Cjlrgc6iZlQTAcgD/edit?usp=drivesdk&ouid=100154785997743720001&rtpof=true&sd=true" },
  facts: heroFacts,
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
    stack: ["HTML", "CSS Grid", "JavaScript", "Fetch API", "Netlify"],
    shotCaption: "Screenshot of the converter — add yours here",
    demoHref: "#work",
    codeHref: "#work",
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
  {
    id: "shift",
    num: "02",
    kicker: "Solo build · 2 weeks",
    title: "Shift Swap Board",
    blurb:
      "A board for staff to post and claim shifts — my first project pairing React with Zustand for state and Tailwind for styling, instead of scattering useState and hand-written CSS everywhere.",
    stack: ["React", "Zustand", "Tailwind CSS", "LocalStorage", "Vite"],
    shotCaption: "Screenshot of the shift board — add yours here",
    demoHref: "#work",
    codeHref: "#work",
    notes: [
      {
        label: "What broke",
        text: "Every claim re-rendered the whole board and lost the scroll position, because I was threading callbacks down through five layers of props.",
      },
      {
        label: "What I did",
        text: "Pulled the shared state into a Zustand store instead of prop-drilling, then keyed the list properly so re-renders stayed cheap.",
      },
      {
        label: "Still open",
        text: "There's no real backend — two people on two phones don't see the same board yet. That's what I'm learning next.",
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

export const learning: { when: string; what: string; note: string }[] = [
  {
    when: "This month",
    what: "TypeScript, the boring parts",
    note: "Typing my own converter's rate objects instead of following a tutorial.",
  },
  {
    when: "Next",
    what: "A real backend",
    note: "Node and a database, so the shift board syncs between two phones.",
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
  portraitCaption: "Portrait placeholder — black and white",
  paragraphs: [
    "I completed my ND in Nutrition and Dietetics, and learned frontend development on the side through ALX — evenings and weekends spent rebuilding interfaces until React finally clicked.",
    "I'm continuing on to a BSc in Microbiology, but frontend is the skill I want to get genuinely good at. I work comfortably in React, wire up API integrations, manage state with Zustand, and style everything with Tailwind.",
    "What I need now is a junior role that sharpens what ALX started — a team that reviews code out loud, so guessing turns into knowing.",
  ],
};

export const contact = {
  kicker: "Contact",
  headline: "Got a junior seat and a review culture? Let's talk.",
  cards: [
    { label: "Email", value: "okwuchiomotolaonyeka@gmail.com", href: "mailto:okwuchiomotolaonyeka@gmail.com" },
    { label: "GitHub", value: "github.com/vivian-tola", href: "https://github.com/vivian-tola" },
    { label: "Resume", value: "One page, PDF ↓", href: "https://docs.google.com/document/d/1f0ICLT-D1SDyYLY-Cjlrgc6iZlQTAcgD/edit?usp=drivesdk&ouid=100154785997743720001&rtpof=true&sd=true" },
  ],
};

export const footer = {
  tagline: "frontend developer, in progress",
  note: "Built with NextJs and Tailwind. Learning as I go.",
};
