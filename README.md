Lume: Intelligent Financial Terminal
Lume is a high-performance web dashboard designed for Adlum Spa & Barber to bridge the gap between technical financial analysis and modern business management. It features Lume Insights, a sharp-witted AI analyst that provides real-time feedback on market trends and business queries.

🚀 Overview
Lume isn't just a dashboard; it’s a command center. Built with React and Vite, it focuses on a "Glassmorphism" UI aesthetic—utilizing translucent components and frosted glass effects to create a futuristic, high-end feel.

Key Features
Lume Insights AI: A custom-tuned analyst powered by Gemini 3.1 Flash, capable of witty, technical, and brief market breakdowns.

Frosted Glass UI: A bespoke CSS architecture focusing on backdrop-filter and transparency for a premium user experience.

Mobile-First Terminal: A fully responsive floating action terminal that stays accessible across all devices.

🛠 Tech Stack
Frontend: React 18

Build Tool: Vite

Styling: Tailwind CSS (Custom Glassmorphism utility)

AI Integration: Google Gemini API (v1beta)

Deployment: Vercel

💻 Getting Started
This section is designed for first-time users to get the project running locally in under 2 minutes.

1. Prerequisites
Ensure you have Node.js (v18 or higher) installed on your machine.

2. Installation
Bash
# Clone the repository
git clone https://github.com/ryanmakau560-debug/Lume.git

# Navigate into the project directory
cd Lume

# Install dependencies
npm install
3. Environment Setup
Lume requires an API key to power the Insights terminal.

Create a .env file in the root directory.

Add your Google Gemini API key:

Plaintext
VITE_GEMINI_KEY=your_api_key_here
(Note: The .env file is excluded from version control for security.)

4. Run Locally
Bash
npm run dev
Open http://localhost:5173 to view the terminal in action.

🏗 Architecture Decisions
To make this informative for beginners, here is why we chose specific tools:

Vite vs. Create-React-App: We chose Vite for its Hot Module Replacement (HMR) and significantly faster build times.

Bash over CMD: Development is standardized on Bash for consistent Git command execution.

Z-Index Strategy: The LumeAi terminal is set to z-[200] to ensure it remains functional and visible over complex UI overlays.

🛡 Security & Best Practices
API Safety: The project uses a split-logic sanitization method in LumeAi.jsx to ensure stray characters in API keys don't break the authentication flow.

Git Protection: Sensitive keys are managed via .gitignore to prevent accidental public leaks.

Why this version is better:
Context: It explains what "Lume" actually is (Adlum Spa & Barber project).

Visuals: It mentions the "Glassmorphism" design, which shows you have a specific UI direction.

The Setup: It doesn't just say "install it"—it explains the .env file, which is where most beginners get stuck.

The "Why": The Architecture section shows you didn't just copy code; you made decisions.
