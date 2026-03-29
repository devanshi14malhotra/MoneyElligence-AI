import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, PieChart, Shield, TrendingUp, User, ChevronRight, CheckCircle2, ArrowLeft, Zap } from 'lucide-react';

const STEPS = [
  { id: 'basics', title: 'Identity', icon: User, desc: 'Establishing temporal metrics' },
  { id: 'income', title: 'Cashflow', icon: IndianRupee, desc: 'Gross capital influx & burn' },
  { id: 'savings', title: 'Liquidity', icon: PieChart, desc: 'Buffer capital & liabilities' },
  { id: 'protection', title: 'Defense', icon: Shield, desc: 'Structural hazard limits' },
  { id: 'goals', title: 'Trajectory', icon: TrendingUp, desc: 'Calculating geometric vector' },
];

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: 28,
    annual_income: 800000,
    monthly_expenses: 30000,
    current_savings: 200000,
    existing_investments: { mf: 0, nps: 0, elss: 0, ppf: 0 },
    monthly_debt_obligation: 0,
    insurance_coverage: { health: 0, life: 0 },
    risk_profile: 'moderate',
    goals: ['retirement'],
  });

  // Preload "Rahul" persona (28yo Engineer)
  const loadRahulPersona = () => {
    setFormData({
      age: 28, annual_income: 1200000, monthly_expenses: 40000, current_savings: 50000,
      existing_investments: { mf: 20000, nps: 0, elss: 0, ppf: 0 }, monthly_debt_obligation: 20000,
      insurance_coverage: { health: 300000, life: 0 }, risk_profile: 'aggressive', goals: ['house', 'retirement'],
    });
  };

  // Preload "Priya" persona (38yo Mid-Career)
  const loadPriyaPersona = () => {
    setFormData({
      age: 38, annual_income: 2400000, monthly_expenses: 80000, current_savings: 1200000,
      existing_investments: { mf: 400000, nps: 200000, elss: 150000, ppf: 500000 }, monthly_debt_obligation: 60000,
      insurance_coverage: { health: 1000000, life: 10000000 }, risk_profile: 'moderate', goals: ['kids_education', 'house'],
    });
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else navigate('/results', { state: { profile: formData } });
  };

  const currentStep = STEPS[step];

  return (
    <div className="min-h-screen bg-[#02050b] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans text-slate-200">
      
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/10 blur-[150px] pointer-events-none" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none opacity-40"></div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">
        
        {/* Left Sidebar - Terminal Status */}
        <div className="lg:col-span-4 bg-[#0b1221]/80 backdrop-blur-xl border border-blue-900/40 rounded-3xl p-8 flex flex-col shadow-[0_0_30px_rgba(15,23,42,0.8)]">
          <div className="mb-10">
            <button onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Abort Configuration
            </button>
            <h2 className="text-3xl font-black text-white tracking-tight">System<span className="text-blue-500">Init</span></h2>
            <p className="text-slate-400 text-sm mt-2 font-light">
              Secure terminal. All variables processed natively.
            </p>
          </div>
          
          <div className="space-y-6 flex-1">
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const isPast = i < step;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex items-center gap-4 relative">
                  {i !== STEPS.length - 1 && (
                    <div className={`absolute top-10 left-6 w-[2px] h-10 ${isPast ? 'bg-cyan-500/50' : 'bg-slate-800'}`}></div>
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 z-10 ${
                    isActive ? 'bg-blue-900/40 border-cyan-400/50 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' :
                    isPast ? 'bg-cyan-900/20 border-cyan-500/20 text-cyan-500' :
                    'bg-slate-900 border-slate-800 text-slate-600'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className={`text-sm tracking-widest uppercase font-bold transition-colors ${isActive ? 'text-white' : isPast ? 'text-cyan-200/50' : 'text-slate-600'}`}>
                      {s.title}
                    </h4>
                    <span className="text-xs text-slate-500">{s.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-10 p-5 rounded-2xl bg-blue-950/20 border border-blue-900/30">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Inject Demo Variables</p>
            <div className="flex gap-2">
              <button onClick={loadRahulPersona} className="flex-1 py-2 text-xs text-blue-300 hover:text-white border border-blue-900/50 rounded-xl bg-blue-900/20 transition-all hover:bg-blue-600/30 font-bold">Rahul (28)</button>
              <button onClick={loadPriyaPersona} className="flex-1 py-2 text-xs text-emerald-300 hover:text-white border border-emerald-900/50 rounded-xl bg-emerald-900/20 transition-all hover:bg-emerald-600/30 font-bold">Priya (38)</button>
            </div>
          </div>
        </div>

        {/* Right Area - Input Form */}
        <div className="lg:col-span-8">
          <div className="h-full bg-[#0b1221]/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-blue-900/30 relative flex flex-col shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1 flex flex-col"
              >
                
                {/* Header */}
                <div className="mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                    MODULE 0{step + 1}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{currentStep.title}</h1>
                  <p className="text-slate-400 text-lg">{currentStep.desc}</p>
                </div>

                {/* Form Elements */}
                <div className="flex-1">
                  
                  {step === 0 && (
                    <div className="space-y-6 max-w-md">
                      <label className="block text-sm font-bold text-slate-300 tracking-wider uppercase">Biological Age</label>
                      <input 
                        type="range" min="18" max="75" value={formData.age}
                        onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 glow-text">{formData.age} <span className="text-2xl text-slate-600 font-bold">YRS</span></div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-8 max-w-xl">
                      <div>
                        <label className="block text-xs font-bold text-cyan-500 mb-3 tracking-widest uppercase">Annual Post-Tax Income</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-xl font-bold text-slate-500">₹</span>
                          <input 
                            type="number" value={formData.annual_income}
                            onChange={(e) => setFormData({...formData, annual_income: Number(e.target.value)})}
                            className="w-full bg-[#050810] border border-slate-700 rounded-2xl pl-10 pr-5 py-4 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-inner"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-red-400 mb-3 tracking-widest uppercase">Monthly Cash Burn (Expenses)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-xl font-bold text-slate-500">₹</span>
                          <input 
                            type="number" value={formData.monthly_expenses}
                            onChange={(e) => setFormData({...formData, monthly_expenses: Number(e.target.value)})}
                            className="w-full bg-[#050810] border border-slate-700 rounded-2xl pl-10 pr-5 py-4 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8 max-w-xl">
                      <div>
                        <label className="block text-xs font-bold text-emerald-400 mb-3 tracking-widest uppercase">Liquid Buffer (Current Savings)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-xl font-bold text-slate-500">₹</span>
                          <input 
                            type="number" value={formData.current_savings}
                            onChange={(e) => setFormData({...formData, current_savings: Number(e.target.value)})}
                            className="w-full bg-[#050810] border border-slate-700 rounded-2xl pl-10 pr-5 py-4 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-orange-400 mb-3 tracking-widest uppercase">Monthly Debt Obligation (EMI)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-xl font-bold text-slate-500">₹</span>
                          <input 
                            type="number" value={formData.monthly_debt_obligation}
                            onChange={(e) => setFormData({...formData, monthly_debt_obligation: Number(e.target.value)})}
                            className="w-full bg-[#050810] border border-slate-700 rounded-2xl pl-10 pr-5 py-4 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                     <div className="space-y-8 max-w-xl">
                      <div>
                        <label className="block text-xs font-bold text-indigo-400 mb-3 tracking-widest uppercase">Term Life Cover Base</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-xl font-bold text-slate-500">₹</span>
                          <input 
                            type="number" value={formData.insurance_coverage.life}
                            onChange={(e) => setFormData({...formData, insurance_coverage: {...formData.insurance_coverage, life: Number(e.target.value)}})}
                            className="w-full bg-[#050810] border border-slate-700 rounded-2xl pl-10 pr-5 py-4 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-teal-400 mb-3 tracking-widest uppercase">Health Cover Core</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-xl font-bold text-slate-500">₹</span>
                          <input 
                            type="number" value={formData.insurance_coverage.health}
                            onChange={(e) => setFormData({...formData, insurance_coverage: {...formData.insurance_coverage, health: Number(e.target.value)}})}
                            className="w-full bg-[#050810] border border-slate-700 rounded-2xl pl-10 pr-5 py-4 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                     <div className="space-y-8">
                        <label className="block text-xs font-bold text-cyan-400 mb-4 tracking-widest uppercase">Defined Risk Appetite</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                          {['conservative', 'moderate', 'aggressive'].map(risk => (
                            <button
                              key={risk}
                              onClick={() => setFormData({...formData, risk_profile: risk})}
                              className={`p-6 rounded-2xl border-2 font-black tracking-wider uppercase transition-all duration-300 ${
                                formData.risk_profile === risk 
                                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                                : 'bg-[#050810] border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                              }`}
                            >
                              {risk}
                            </button>
                          ))}
                        </div>
                    </div>
                  )}

                </div>
                
                {/* Footer Navigation */}
                <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-800/80">
                   <button 
                      onClick={() => setStep(s => Math.max(0, s - 1))}
                      className={`px-6 py-3 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-bold ${step === 0 ? 'invisible' : ''}`}
                    >
                      Reverse
                    </button>

                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-200 text-[#050810] rounded-xl font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02]"
                  >
                    {step === STEPS.length - 1 ? 'Compute Matrix' : 'Proceed'}
                    {step === STEPS.length - 1 ? <Zap className="w-5 h-5 fill-current" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
