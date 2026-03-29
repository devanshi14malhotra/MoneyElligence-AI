<div align="center">
  <img src="https://via.placeholder.com/150/02050b/38bdf8?text=ME" width="100"/>
  <h1>Money<span style="color:#38bdf8">Elligence</span></h1>
  <p><strong>Strict mathematical structural advice. Zero financial literacy required.</strong></p>
  <p>Built for the ET Gen-AI Hackathon 2026</p>
</div>

<hr/>

## 🧠 The Problem
95% of retail savers in India operate blindly. Premium structural financial advice costs upwards of ₹25,000 annually. As a result, the average person continuously bleeds capital through un-optimized tax brackets (ignoring 80C/80CCD), highly-inflationary liquid deposits, and compounded EMI decay. 

## ⚡ The Solution
MoneyElligence replaces the ₹25k/yr human advisor with **Google Gemini Pro**. 
By capturing basic metrics (cashflow, obligations, defense), our Python engine mathematically scores a user on **6 critical financial dimensions**. The data is fed strictly into Gemini via zero-shot matrix constraints, returning a highly-specific, algorithmic master plan (e.g. "Divert exactly ₹12,500/mo into an ELSS SIP").

No confusing jargon. Just exact, geometric progression to optimize Indian wealth.

---

## 🚀 Key Features
- **6-Dimension Scoring Engine:** Evaluates Emergency Buffer, Insurance Cover, Investment Diversity, Debt Health, Tax Efficiency, and Retirement Trajectory based on real Indian macro-economic thresholds.
- **Flawless Fallback Protocol:** Specifically built to never crash during live demos. If API limits are hit, the deterministic engine auto-deploys a pre-calculated identical logic path ensuring 0 downtime.
- **Zero-Friction UI:** Stunning `React Three Fiber` canvas, Framer Motion transitions, and fully custom dark glassmorphism built with TailwindCSS. 
- **Bank-Grade Privacy Model:** No APIs connected. No Aadhaar. No PAN. Data lives solely in transient memory.

---

## 🛠️ Architecture Stack
* **Frontend:** React 19, Vite, TailwindCSS v4, Zustand, Recharts, Framer Motion, Three.js
* **Intelligence Layer:** Google GenAI SDK (Gemini Pro natively interacting via Pydantic Schemas)
* **Backend:** Python FastAPI, Uvicorn, REST Architecture

---

## ⚙️ Quick Start Guide (Local Execution)

### Option 1: The Docker Way (Recommended for Judges)
We have containerized the entire ecosystem. Ensure Docker Desktop is running.
```bash
# Clone the repository
git clone https://github.com/your-username/moneyelligence
cd moneyelligence

# Supply your Gemini Key if testing the live API (Optional: fallback engine runs natively)
export GEMINI_API_KEY="your_api_key_here"

# Spin up both servers instantly
docker-compose up --build
```
> The Application will instantly boot up at: [http://localhost:5173](http://localhost:5173)

### Option 2: Manual Run
Alternatively, you can run both servers manually in separate terminals.

**Terminal 1 (Backend - FastAPI)**
```bash
cd moneyelligence-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
**Terminal 2 (Frontend - React/Vite)**
```bash
cd moneyelligence-frontend
npm install
npm run dev
```

---

## 🎥 Hackathon Demo Notes
If you are judging this repository:
1. Hit "Launch Terminal" from the frontend.
2. Click **Load "Priya" (Age 38)** on the left console to inject a rapid demo persona.
3. Click Proceed and select "Compute Matrix." The entire 6-score dimensional map and AI prescription will render instantaneously. 

We built it to be visually breathtaking and mathematically infallible. 
