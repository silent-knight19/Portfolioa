import quotaLogo from '../assets/quota_logo.png';
import basecaseIcon from '../assets/basecase_icon.png';

export const featuredProjects = [
  {
    id: "quota",
    number: "01",
    title: "Quota",
    subtitle: "AI token usage and cost tracker for VS Code",
    domain: "Developer Tool • VS Code Extension",
    year: "2026",
    image: quotaLogo,
    imageAlt: "Quota Logo",
    description: "A local-first VS Code extension that monitors AI token consumption and estimated API costs in real time across Gemini and Claude models.",
    thesis: "Tracks token usage locally via SQLite without sending any code or prompts to external servers, calculating prompt-cache savings and session costs directly in the editor.",
    technologies: ["TypeScript", "Python", "SQLite", "VS Code Extension API", "Chart.js"],
    highlights: [
      "Status bar indicator showing active session tokens and cost estimates in real time",
      "Calculates prompt cache hit rates to show actual billed cost vs standard rates",
      "100% offline persistence using local SQLite — no data leaves your computer",
      "Interactive dashboard tracking 30-day token consumption and daily trends"
    ],
    caseStudy: {
      problem: "When pair programming with AI tools, it is easy to lose track of token volume and compounding costs. Most developers only find out what they spent when the monthly invoice arrives.",
      architecture: "Quota hooks directly into editor session events and logs token counts to an embedded SQLite database on your machine. A lightweight webview reads from this local database to render usage charts and cost breakdowns.",
      engineeringHighlights: [
        "Local-First Storage: Stores all telemetry in a local SQLite file with zero cloud telemetry or external network calls.",
        "Prompt Cache Tracking: Differentiates between cached tokens and fresh generation to calculate realistic pricing for Gemini and Claude models.",
        "Secure Webview: Renders charts inside an isolated webview with a strict Content Security Policy.",
        "Low Overhead: Uses asynchronous event listeners so the editor remains responsive."
      ],
      outcome: "Gives developers immediate clarity on their AI usage directly in their editor footer, helping manage token spending and optimize prompts.",
      links: {
        github: "https://github.com/silent-knight19/Quota",
        demo: null
      }
    }
  },
  {
    id: "codeorbit",
    number: "02",
    title: "CodeOrbit",
    subtitle: "Custom version control system built from scratch",
    domain: "Systems • Developer Tool",
    year: "2025",
    image: null,
    imageAlt: "CodeOrbit System Architecture",
    description: "A lightweight version control engine written in Node.js, modeled after Git internals to manage repository snapshots, commits, and cloud backups.",
    thesis: "Implements core Git concepts — staging directories, UUID-based commit snapshots, and history traversal — paired with AWS S3 for remote storage.",
    technologies: ["Node.js", "Express", "AWS S3", "React", "MongoDB"],
    highlights: [
      "Custom internal storage (.MyGit) managing separate staging and commit trees",
      "Snapshot creation with UUID commit hashing and parent history tracking",
      "CLI commands for init, add, commit, push, pull, and revert",
      "AWS S3 integration to store and pull repository snapshots from the cloud"
    ],
    caseStudy: {
      problem: "Developers use Git every day, but few understand how staging, trees, commit hashes, and remote syncing actually work under the hood.",
      architecture: "CodeOrbit separates local repository management from remote synchronization. Locally, a Node.js CLI reads and writes files into a hidden `.MyGit` directory. Remotely, an Express API backs up repository snapshots to Amazon S3.",
      engineeringHighlights: [
        "Staging Mechanism: Copies working files into a staging directory before bundling them into an immutable snapshot.",
        "Commit Graph: Each commit is stored as a JSON object pointing to its parent, creating a traversable history tree.",
        "Cloud Sync: Packages repository state into zip archives and syncs them to S3 buckets for remote storage.",
        "Web Dashboard: A React frontend for browsing repositories, viewing commits, and tracking issues."
      ],
      outcome: "A functional Git-inspired version control system demonstrating file system I/O, commit graph mechanics, and cloud storage integration.",
      links: {
        github: "https://github.com/silent-knight19/CodeOrbit",
        demo: null
      }
    }
  },
  {
    id: "basecase",
    number: "03",
    title: "BaseCase",
    subtitle: "DSA practice platform with code execution",
    domain: "Full-Stack Web App • Education",
    year: "2026",
    image: basecaseIcon,
    imageAlt: "BaseCase Logo",
    description: "A deliberate practice workspace for Data Structures and Algorithms with structured pattern tracking, spaced repetition, and an isolated code runner.",
    thesis: "Combines Striver's A2Z DSA roadmap with an in-browser code editor, secure execution backend, and an AI hint assistant guarded by over 150 automated tests.",
    technologies: ["React", "Node.js", "Express", "Firebase", "Gemini AI", "Jest"],
    highlights: [
      "Process-isolated code execution backend with strict memory and execution timeouts",
      "AI hint generator with boundary protection to explain logic without leaking full solutions",
      "Granular Firestore security rules with key validation and rate limiting",
      "Curated practice tracks aligned with Striver's A2Z DSA pattern sheet"
    ],
    caseStudy: {
      problem: "Many online coding platforms either execute code unsafely on shared servers or give AI hints that immediately spoil the full solution instead of guiding the developer's thinking.",
      architecture: "BaseCase pairs a React frontend workspace with an Express backend for code execution. The code runner uses child processes with hard limits, while the hint pipeline uses structured prompt templates to guide rather than answer.",
      engineeringHighlights: [
        "Isolated Runner: Executes submissions with strict timeouts and memory caps using `execFile` without shell interpolation.",
        "Hint Guardrails: Structured AI prompts that offer conceptual direction and edge-case hints rather than copy-paste code.",
        "Firestore Security: Strict rules enforcing user ownership, validated input fields, and credit deductions.",
        "Test Suite: 150+ unit and integration tests covering authentication, input validation, and execution edge cases."
      ],
      outcome: "A live, fully tested web platform (tuf-tracker2.vercel.app) supporting daily problem-solving practice and revision.",
      links: {
        github: "https://github.com/silent-knight19/Tuf-Tracker2",
        demo: "https://tuf-tracker2.vercel.app"
      }
    }
  },
  {
    id: "pixlmeet",
    number: "04",
    title: "PixlMeet",
    subtitle: "Browser-based video calling with WebRTC",
    domain: "Real-Time Web • WebRTC",
    year: "2025",
    image: null,
    imageAlt: "PixlMeet WebRTC Video App",
    description: "A lightweight video calling application that connects users directly in the browser with peer-to-peer audio/video streaming and live chat.",
    thesis: "Uses WebRTC for direct media connections to keep latency low, paired with Socket.IO for room coordination and JWT for meeting authentication.",
    technologies: ["React", "WebRTC", "Socket.IO", "Node.js", "Express", "MongoDB"],
    highlights: [
      "Direct peer-to-peer audio and video streaming with adaptive bitrate handling",
      "Socket.IO signaling server managing room creation, joins, and ICE candidate exchange",
      "Screen sharing support directly from the browser window",
      "In-call text chat and meeting access controls with JWT"
    ],
    caseStudy: {
      problem: "Most video calling platforms require heavy software downloads and route all video streams through centralized media servers, adding latency and server infrastructure costs.",
      architecture: "PixlMeet uses standard browser WebRTC APIs for media transmission directly between peers. A lightweight Node.js and Socket.IO backend handles initial handshakes, room passwords, and signaling.",
      engineeringHighlights: [
        "Signaling Workflow: Handles SDP offer/answer exchanges and dynamic peer additions when participants join or leave.",
        "NAT Traversal: Configured STUN servers to resolve public IP endpoints across routers and home firewalls.",
        "Media Stream Controls: Clean track toggles for microphone mute, camera on/off, and screen capture.",
        "Room Security: JWT authentication ensuring only invited participants can join private rooms."
      ],
      outcome: "A smooth browser video conferencing tool running with zero client downloads and low-latency peer-to-peer streaming.",
      links: {
        github: "https://github.com/silent-knight19/PixlMeet",
        demo: null
      }
    }
  }
];

export const selectedProjects = [
  {
    id: "verboai",
    title: "VerboAI",
    category: "AI Mock Interview Tool",
    description: "An AI-powered interview practice app that asks technical questions dynamically and provides feedback on user responses using Gemini.",
    technologies: ["React", "Gemini AI", "Express", "Firebase"],
    githubLink: "https://github.com/silent-knight19/VerboAI",
    demoLink: "https://verboai-7749.web.app",
    year: "2025"
  },
  {
    id: "focuslabs",
    title: "FocusLabs",
    category: "Productivity & Habit Tracker",
    description: "A clean dashboard for tracking daily habits, streaks, and focus sessions with real-time cloud sync.",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    githubLink: "https://github.com/silent-knight19/FocusLabs",
    demoLink: "https://collabedit-26531.web.app",
    year: "2025"
  }
];

export const archiveProjects = [
  {
    title: "PeerLink",
    domain: "P2P Collaboration",
    technologies: ["TypeScript", "WebRTC", "Socket.IO", "React"],
    year: "2026",
    githubLink: "https://github.com/silent-knight19/PeerLink",
    demoLink: null
  },
  {
    title: "HeartToHeart",
    domain: "Video Calling",
    technologies: ["WebRTC", "WebSockets", "Node.js", "React"],
    year: "2025",
    githubLink: "https://github.com/silent-knight19/HeartToHeart",
    demoLink: null
  },
  {
    title: "Shikshak",
    domain: "Education Platform",
    technologies: ["TypeScript", "React", "Node.js"],
    year: "2026",
    githubLink: "https://github.com/silent-knight19/Shikshak",
    demoLink: null
  },
  {
    title: "Itehaas",
    domain: "Learning Web App",
    technologies: ["TypeScript", "React", "Tailwind CSS"],
    year: "2026",
    githubLink: "https://github.com/silent-knight19/Itehaas",
    demoLink: null
  },
  {
    title: "Zerodhaa",
    domain: "Stock Trading Clone",
    technologies: ["React", "Express", "MongoDB"],
    year: "2025",
    githubLink: "https://github.com/silent-knight19/zerodhaa",
    demoLink: null
  },
  {
    title: "Employee Management System",
    domain: "Task Management",
    technologies: ["React", "Context API", "Vite"],
    year: "2024",
    githubLink: "https://github.com/silent-knight19/Employee-management-system",
    demoLink: null
  },
  {
    title: "GATE-EE",
    domain: "Exam Prep Resources",
    technologies: ["TypeScript", "Markdown"],
    year: "2026",
    githubLink: "https://github.com/silent-knight19/GATE-EE",
    demoLink: null
  }
];

export const technicalSkills = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "Java", "HTML5", "CSS3", "SQL"]
  },
  {
    category: "Frontend",
    skills: ["React", "Tailwind CSS", "Vite", "Responsive Design", "State Management"]
  },
  {
    category: "Backend & Systems",
    skills: ["Node.js", "Express", "REST APIs", "WebSockets", "Socket.IO", "WebRTC"]
  },
  {
    category: "Databases & Cloud",
    skills: ["MongoDB", "SQLite", "Firebase / Firestore", "AWS S3"]
  },
  {
    category: "Tools & Practices",
    skills: ["Git", "GitHub", "Jest / Testing", "VS Code APIs", "Linux / Shell"]
  }
];
