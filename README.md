# LUME | Intelligent Business Terminal 🚀

Lume is a high-end, responsive web dashboard developed for **Adlum Spa & Barber**. It combines sleek, modern aesthetics with **Lume Insights**, a custom AI-driven financial analyst designed to provide sharp, witty, and actionable business feedback.

---

## 💎 Design Philosophy: Glassmorphism
Unlike standard web dashboards, Lume utilizes a **Frosted Glass (Glassmorphism)** UI. 
* **Translucency:** Key components use `backdrop-filter: blur()` to maintain a premium, airy feel.
* **Modernity:** A deep slate and blue color palette designed to look professional yet futuristic.
* **Responsive Terminal:** The AI assistant is housed in a floating action component, ensuring it is always one click away without cluttering the workspace.

---

## 🛠 Tech Stack
- **Library:** [React.js 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) (Chosen for lightning-fast HMR)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Intelligence:** [Google Gemini 3.1 Flash API](https://ai.google.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started (Beginner Friendly)

Follow these steps to get a local copy of Lume running on your machine.

### 1. Prerequisites
You need to have **Node.js** installed. You can download it [here](https://nodejs.org/).

### 2. Installation
Open your **Bash terminal** and run the following:
```bash
# Clone the repo
git clone [https://github.com/ryanmakau560-debug/Lume.git](https://github.com/ryanmakau560-debug/Lume.git)

# Enter the directory
cd Lume

# Install necessary packages
npm install
3. Environment Configuration
Lume uses an API key to communicate with the AI. For security, this key is kept out of the public code.

In the main folder, create a file named .env.

Inside that file, paste the following line:

Plaintext
VITE_GEMINI_KEY=YOUR_API_KEY_HERE
(Note: Get your key from Google AI Studio)

4. Launching the Project
Bash
npm run dev
The terminal will provide a link (usually http://localhost:5173). Open it in your browser to start using Lume!

🧠 Architectural Decisions
To ensure the project is scalable and secure, I implemented the following:

Terminal Sanitization: The AI component includes logic to auto-clean API keys (stripping stray colons or line numbers) to prevent authentication failures during deployment.

Z-Index Management: A strict layering system (z-index) ensures the AI terminal stays on top of all UI elements.

Vite Environment Shielding: Using the VITE_ prefix for variables to ensure only necessary keys are exposed to the client-side build.

🛡 Security Note
This project utilizes a .gitignore file to ensure that .env files containing private API keys are never pushed to public repositories. Never share your .env file.

📬 Contact & Support
Developed by Ryan Makau.
Project hosted at: https://github.com/ryanmakau560-debug/Lume


### **How to update this:**
1. Open your project in **VS Code**.
2. Open the file named `README.md`.
3. Select everything inside (`Ctrl + A`) and delete it.
4. Paste the code above.
5. Save it, then run:
   ```bash
   git add .
   git commit -m "docs: upgrade readme to professional standard"
   git push origin main
This will make your GitHub profile look a lot more professional for anyone checking out your work!
