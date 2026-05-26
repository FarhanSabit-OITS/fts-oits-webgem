# OITS Dhaka - Modern Software Solutions
## Comprehensive Implementation Documentation & Developer's Guide

Welcome to the official developer and administration guide for the **OITS Dhaka One-Pager Web Application**. This document details the technical specifications, architectural setup, interactive client features, responsive configurations, and deep-dive integrations—including the advanced Gemini-powered corporate AI Assistant.

---

## Table of Contents
1. [System Overview & Architecture](#1-system-overview--architecture)
2. [Detailed Visual & Functional Modules](#2-detailed-visual--functional-modules)
    - [Header & Theme Engine](#header--theme-engine)
    - [Hero & Immersive Parallax Area](#hero--immersive-parallax-area)
    - [Core Services Grid](#core-services-grid)
    - [Workflow & Process Evolution](#workflow--process-evolution)
    - [Interactive Portfolio with Grid Filtering](#interactive-portfolio-with-grid-filtering)
    - [About Us Story Snippet & Team Roster](#about-us-story-snippet--team-roster)
    - [Double-Control Testimonials Carousel](#double-control-testimonials-carousel)
    - [Secure Industrial Contact Portal](#secure-industrial-contact-portal)
3. [Gemini Corporate AI Assistant Deep-Dive](#3-gemini-corporate-ai-assistant-deep-dive)
    - [Vite Environment Compilation Config](#vite-environment-compilation-config)
    - [Speech Recognition Dictation](#speech-recognition-dictation)
    - [Intelligent Error Recoverability](#intelligent-error-recoverability)
4. [Developer's Guide & Project Blueprint](#4-developers-guide--project-blueprint)
    - [Technical Specifications & Tooling Inventory](#technical-specifications--tooling-inventory)
    - [Directory Structures](#directory-structures)
    - [Workflow State Management Patterns](#workflow-state-management-patterns)
5. [User & Admin Modification Instructions](#5-user--admin-modification-instructions)
    - [Adding a Portfolio Piece](#adding-a-portfolio-piece)
    - [Tweaking the AI Assistant Prompt Context](#tweaking-the-ai-assistant-prompt-context)
    - [Amending Contact Coordinates](#amending-contact-coordinates)

---

## 1. System Overview & Architecture

The **OITS Dhaka website** is a desktop-first optimized, fully responsive single-page web application. It showcases high-performance digital services, project work, workflows, and company insights. 

### The Aesthetic Vision
Inspiration was drawn from Swiss-modern editorial sites such as Eino.world. The site pairs a strict, clean display hierarchy with high-contrast neutral backgrounds, subtle geometric parallax accents, and granular negative space. The UX alternates seamlessly between a high-density Slate-White light mode and deep, atmospheric space-dark grays.

### Core Architectural Flow
```
                     +----------------------------------------+
                     |                Browser                 |
                     +-------------------+--------------------+
                                         |
                       Registers Scroll observers, IntersectionObservers,
                       Dynamic SEO meta-tags & Themes
                                         |
                                         v
                     +----------------------------------------+
                     |               React App                |
                     | (App.tsx / Theme + Scroll Controllers) |
                     +-------------------+--------------------+
                                         |
             +---------------------------+---------------------------+
             |                           |                           |
             v                           v                           v
   +--------------------+     +---------------------+     +---------------------+
   |   Header/Footer    |     |   Interactive UI    |     |  Gemini AI Support  |
   |   (Theme Switch)   |     | (Filtering/Carousel)|     | (Speech Dictation)  |
   +--------------------+     +---------------------+     +---------------------+
```

---

## 2. Detailed Visual & Functional Modules

### Header & Theme Engine
*   **Location**: `components/Header.tsx`
*   **Functionality**: Offers standard site navigation using sticky blurred backdrops (`backdrop-blur-md`). Houses the global Theme Switch toggle.
*   **Implementation**: Utilizes Tailwind’s `dark` variant. It checks `localStorage` for preexisting theme preferences or falls back onto raw browser media inquiries using query listener hooks. Standard browser animations are run using native CSS transitions.

### Hero & Immersive Parallax Area
*   **Location**: `components/Hero.tsx`
*   **Visual Philosophy**: Styled with a massive responsive layout, featuring high-fidelity code display overlays on large panels. Text layouts have absolute legibility because taglines incorporate a custom `text-glow` shadow filter and high CSS contrast ratios.
*   **Performance Parallax**: Implements a `mousemove` gesture tracker. Instead of locking the main rendering thread on mouse movements, events are scheduled inside the browser's native `requestAnimationFrame` loop to render silky-smooth interactive translations.
*   **Active Visual Assets**: Dynamic overlays pair with continuous, low-cost CSS pulse filters on geometric background glow circles.

### Core Services Grid
*   **Location**: `components/Hero.tsx` & `components/Services.tsx`
*   **Implementation**: To display premium design capabilities concisely, core items (Web Dev, Mobile Apps, Dedicated Teams, and Cloud Infrastructure) are styled within an interactive `grid grid-cols-2 gap-3` structure directly in the left column of the Hero block. Each service details descriptive technical features using micro-animations.

### Workflow & Process Evolution
*   **Location**: `components/Process.tsx`
*   **Architecture**: Details OITS Dhaka's execution roadmap: 
    1. Discovery & Strategy
    2. Design & Prototyping
    3. Agile Development
    4. Quality Assurance
    5. Launch & Evolution
*   **Interactive Design**: Uses highlighted sequential circles showing number strings (e.g. `01`, `02`) with corresponding active highlight rules as elements enter viewports.

### Interactive Portfolio with Grid Filtering
*   **Location**: `components/Portfolio.tsx`
*   **Filtering Controls**: Users can categorize real-world work items instantly by **Category** or **Status** metrics. Active counters display real-time availability ratios for filtered views.
*   **Featured Work Card**: Houses a high-visibility container on the hero page that rotates filtered items, rendered with dynamic overlays, scale zooms, and a visual project advancement progress bar.
*   **Project Detail Modals**: High-performance details pop up on select triggers, supporting embedded video demonstrations with graceful fallbacks.

### About Us Story Snippet & Team Roster
*   **Location**: `components/About.tsx` & `components/Hero.tsx`
*   **Intro Piece**: Sits cleanly beneath the main action controls, calling out OITS Dhaka's core values: Agile execution, 24/7 dedicated assistance, and top-tier security standards.
*   **Team Layout**: Renders clean portrait avatars that cascade smoothly when triggered into viewports.

### Double-Control Testimonials Carousel
*   **Location**: `components/Hero.tsx`
*   **Dual-Loop**: Testimonials loop inside an auto-advancing 6-second timer.
*   **Intuitive Controls**: Integrated interactive pagination controls allowing manual left/right cycles through slides.

### Secure Industrial Contact Portal
*   **Location**: `components/Contact.tsx`
*   **Data Validation**: Rigid validation enforces correct naming and valid corporate email styling before dispatch.
*   **Realistic Transmission Pipeline**: Employs interactive loaders like connection links and dynamic background glows during dispatch. Successful dispatches show visual feedback, while failures present an active retry mechanism.

---

## 3. Gemini Corporate AI Assistant Deep-Dive

OITS Dhaka integrates a floating AI Consultant inside `components/AiAssistant.tsx`. The assistant utilizes Google's modern `@google/genai` library client-side.

```
+-------------+      User Input / Voice Dictation      +---------------------------+
| User Client | -------------------------------------> | AiAssistant.tsx React     |
+-------------+                                        +-------------+-------------+
       ^                                                             |
       |                                                             | Initializes System Inst.
       | Sends Concise Project Consultation                          v
       +------------------------------------------------------ [ Gemini API Call ]
                                                               (Process.env.API_KEY)
```

### Vite Environment Compilation Config
Securing Gemini API parameters without breaking direct native loading, compiled secrets are bound inside `vite.config.ts`'s compilation structure:

```ts
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```
This ensures developers do not have to write server-side API proxy controllers for high-speed offline operations.

### Speech Recognition Dictation
For natural UX, the assistant incorporates local speech dictation capabilities:
```ts
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
```
When toggled, it records user voice pitches and parses results into readable input field variables, preventing the need for tedious mobile entries.

### Intelligent Error Recoverability
If issues occur—such as expired API credentials or unexpected connection limits—the helper flags errors cleanly using standard red alert containers, offering an actionable `Retry` trigger to resume ongoing chat workflows immediately.

---

## 4. Technical Specs & Developer's Guide

### Technical Specifications & Tooling Inventory
```json
{
  "dependencies": {
    "@google/genai": "^1.34.0",
    "lucide-react": "^0.562.0",
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
  },
  "devDependencies": {
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

### Directory Structures
This structure keeps visual rendering separated clearly from technical configuration parameters:
```
├── App.tsx                   # Central entry coordinate & dynamic SEO observer
├── constants.ts              # System-wide variables, team data, services metrics
├── types.ts                  # Shared data models, system enumerables
├── index.css                 # Standard Tailwind imports, utility definitions
├── index.html                # Basic viewport details
└── components/
    ├── Header.tsx            # Sticky navigation & system-wide theme logic
    ├── Hero.tsx              # Interactive banner, quick services, testimonials
    ├── Services.tsx          # Tech domains & detailed capability grids
    ├── Portfolio.tsx         # Filterable case work & detailed modals
    ├── Contact.tsx           # Validate forms, inline map iframe
    ├── About.tsx             # Values, mission statement & team assets
    └── AiAssistant.tsx       # Speech synthesis & Gemini interactive UI
```

---

## 5. User & Admin Modification Instructions

### Adding a Portfolio Piece
To showcase a new development, open `constants.ts` and append an object to `PROJECTS`:

```ts
{
  id: '8',
  title: 'Next-Gen IoT Broker',
  category: 'Enterprise Software',
  imageUrl: 'https://images.unsplash.com/...',
  description: 'MQTT protocol hub with real-time routing logic.',
  fullDescription: 'Custom telemetry monitoring system built for...',
  problemStatement: 'Existing platforms struggled with broker lag...',
  technicalApproach: 'Built using Go channels with a Redis pub/sub layer...',
  results: 'Boosted sensor tracking reliability to 99.99%...',
  technologies: ['React', 'Go', 'Redis', 'Docker'],
  duration: '4-5 Months',
  status: 'Completed'
}
```

### Tweaking the AI Assistant Prompt Context
To re-train the embedded assistant on OITS Dhaka metrics, modify the `systemInstruction` configuration variable in `components/AiAssistant.tsx`:

```ts
systemInstruction: `You are the Lead Digital Strategy & Engineering Consultant for OITS Dhaka...
CORPORATE PERSONA & TONE: Professional, reassuring, intellectually authoritative...
KNOWLEDGE BASE & CAPABILITIES: Enterprise Web Solutions, Native Mobile Apps, Dedicated Teams, Cloud & DevOps...
PORTFOLIO SHIELDS: FinTech Analytics Hub, Luma Healthcare, Global Logistics Engine, SecurePay Gateway...`
```

### Amending Contact Coordinates
To update OITS Dhaka's focal point details, simply update the constants declared at the top of `constants.ts`:

```ts
export const CONTACT_EMAIL = "newoffice@oitsdhaka.com";
export const ADDRESS = "New Office Address, Dhaka, Bangladesh";
```
All system grids, maps, helper prompts, and links will auto-cascade these changes project-wide immediately.

---
*Created & maintained by the OITS Dhaka Team.*
