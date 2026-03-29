import { Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, ContactShadows, Stars, PresentationControls } from '@react-three/drei';
import { ShieldAlert, TrendingUp, BrainCircuit, ArrowRight, Activity, Users, Lock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// A much more complex and beautiful 3D core
function FinancialCore() {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(groupRef.current){
      groupRef.current.rotation.y = Math.sin(t / 4) / 2;
      groupRef.current.rotation.z = Math.cos(t / 4) / 4;
      groupRef.current.position.y = Math.sin(t / 1.5) / 5;
    }
  });

  return (
    <PresentationControls 
      global={false} 
      cursor={true} 
      snap={true} 
      speed={1} 
      zoom={1} 
      rotation={[0, 0, 0]} 
      polar={[-Math.PI / 4, Math.PI / 4]} 
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <group ref={groupRef}>
        {/* Outer Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshPhysicalMaterial color="#3b82f6" metalness={1} roughness={0.2} emissive="#1d4ed8" emissiveIntensity={0.5} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshPhysicalMaterial color="#10b981" metalness={1} roughness={0.2} emissive="#047857" emissiveIntensity={0.8} />
        </mesh>

        {/* Inner Diamond Core */}
        <Float speed={5} rotationIntensity={1} floatIntensity={2}>
          <mesh>
            <octahedronGeometry args={[1.2, 0]} />
            <meshPhysicalMaterial 
              color="#0ea5e9"
              metalness={0.9}
              roughness={0.1}
              transmission={1}
              ior={1.5}
              thickness={0.5}
              envMapIntensity={2}
              clearcoat={1}
            />
          </mesh>
          <mesh>
             <octahedronGeometry args={[0.5, 0]} />
             <meshBasicMaterial color="#ffffff" wireframe={true} />
          </mesh>
        </Float>
      </group>
    </PresentationControls>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#050810] text-slate-100 overflow-x-hidden font-sans selection:bg-blue-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 lg:px-16 py-6 backdrop-blur-md bg-[#050810]/70 border-b border-slate-800/50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
             <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Money<span className="text-blue-400">Elligence</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#how-to-use" className="hover:text-blue-400 transition-colors">User Guide</a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</a>
          <a href="#security" className="hover:text-cyan-400 transition-colors">Security</a>
          <a href="#about-us" className="hover:text-purple-400 transition-colors">About</a>
        </div>
        <button 
          onClick={() => navigate('/assessment')}
          className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold transition-all hover:border-blue-500"
        >
          Launch Terminal
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
            <color attach="background" args={['#050810']} />
            <fog attach="fog" args={['#050810', 5, 20]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 20, 10]} intensity={2} penumbra={1} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            
            <Suspense fallback={null}>
              <FinancialCore />
              <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#60a5fa" />
              <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pointer-events-none mt-[-5vh]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          >
            <BrainCircuit className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">India's First AI Financial Mentor</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-tight drop-shadow-2xl"
          >
            Calculate Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400 glow-text">
              Money Score
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed"
          >
            A highly precise, 6-dimension assessment analyzing your wealth, gaps, and readiness. Powered by Google Gemini.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 pointer-events-auto"
          >
            <button 
              onClick={() => navigate('/assessment')}
              className="flex items-center gap-2 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105"
            >
              Analyze My Profile <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 animate-bounce cursor-pointer flex flex-col items-center">
          <span className="text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">Discover</span>
          <a href="#how-it-works"><ChevronDown className="text-slate-500 w-6 h-6 hover:text-blue-400 transition-colors"/></a>
        </div>
      </section>

      {/* User Guide / How to Use Section */}
      <section id="how-to-use" className="relative py-24 px-6 lg:px-20 bg-[#050810] border-t border-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">How to Use MoneyElligence</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Three simple steps to generate your personalized AI master plan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Connecting line */}
             <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-900 via-emerald-900 to-indigo-900 z-0"/>
             
             <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-[#0b1221] border border-blue-500/30 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">1️⃣</div>
                <h3 className="text-xl font-bold text-white mb-3">Launch the Terminal</h3>
                <p className="text-slate-400">Click the Launch Terminal button. You will enter a sleek 5-step configuration wizard. Share basic data like income and expenses.</p>
             </div>
             
             <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-[#0b1221] border border-emerald-500/30 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">2️⃣</div>
                <h3 className="text-xl font-bold text-white mb-3">AI Engine Initiates</h3>
                <p className="text-slate-400">Our Python backend instantly maps your data against the complex Indian tax code and sends it natively to Google Gemini Pro.</p>
             </div>

             <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-[#0b1221] border border-indigo-500/30 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">3️⃣</div>
                <h3 className="text-xl font-bold text-white mb-3">Execute Master Plan</h3>
                <p className="text-slate-400">Receive a 6-dimensional Money Health Score and exact, prioritized tasks (e.g., 'Optimize 80C by ₹1.5L') to maximize your wealth.</p>
             </div>
          </div>
        </div>
      </section>

      {/* The Intelligence Engine / Features Section */}
      <section id="features" className="relative py-32 px-6 lg:px-20 bg-[#070b14] border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">The Intelligence Engine</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
              We mathematically calculate your structural gaps across 6 dimensions, feeding the data natively to Google's Gemini Pro API to output exact, measurable financial prescriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300 bg-slate-800/20">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6">
                 <ShieldAlert className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Risk Profiling</h3>
              <p className="text-slate-400 leading-relaxed">
                We analyze your EMI ratio, active life cover, and emergency buffer against Indian inflation models to calculate your baseline defense.
              </p>
            </div>

            <div className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300 bg-slate-800/20 border-t-4 border-t-emerald-500">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-6">
                 <BrainCircuit className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Gemini Execution</h3>
              <p className="text-slate-400 leading-relaxed">
                If your tax efficiency score is critical, our AI engine instantly maps Section 80C and NPS loopholes to save you up to ₹46,800/year organically.
              </p>
            </div>

            <div className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300 bg-slate-800/20">
               <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-6">
                 <Lock className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Flawless Fallback</h3>
              <p className="text-slate-400 leading-relaxed">
                Designed to never fail. If standard API nodes degrade, our intrinsic deterministic algorithms instantly deploy accurate, fail-safe recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us / Philosophy */}
      <section id="about-us" className="relative py-32 px-6 lg:px-20 bg-gradient-to-b from-[#070b14] to-[#04060b]">
        <div className="max-w-5xl mx-auto glass-panel p-12 lg:p-16 border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="md:w-1/3 flex justify-center">
               <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-500 p-1 rotating-border">
                 <div className="w-full h-full bg-[#050810] rounded-3xl flex items-center justify-center">
                    <Users className="w-14 h-14 text-white" />
                 </div>
               </div>
            </div>
            <div className="md:w-2/3 text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why We Built This?</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
                <span className="font-bold text-white">95% of India's retail savers</span> have no coherent financial plan. A premium financial advisor costs upwards of ₹25,000 annually. Middle-class savers are forced to guess, leading to highly mismanaged debt and entirely missed compound growth.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed font-light mb-8">
                MoneyElligence democratizes elite, structural wealth management. No jargon, no paid gates, just exact geometric strategy powered by mathematical reality.
              </p>
              
              <button 
                onClick={() => navigate('/assessment')}
                className="text-blue-400 font-bold hover:text-blue-300 inline-flex items-center gap-2 border-b border-blue-400/30 pb-1"
              >
                Launch Your First Free Run <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative py-24 px-6 lg:px-20 bg-[#050810] border-t border-blue-900/20">
         <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
           <ShieldAlert className="w-16 h-16 text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
           <h2 className="text-3xl font-black text-white mb-4">Bank-Grade Privacy Protocols</h2>
           <p className="text-slate-400">We do not ask for your PAN, Aadhar, or authentic bank logins. Your profiling data is processed exclusively in transient memory during AI alignment and is strictly untraceable.</p>
         </div>
      </section>

      {/* Finance for Beginners Section */}
      <section id="how-it-works" className="relative py-24 px-6 lg:px-20 bg-gradient-to-b from-[#02050b] to-[#04060b] border-t border-blue-900/20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Finance Made <span className="text-blue-500 glow-text">Simple.</span></h2>
          <p className="text-slate-400 text-lg">You don't need a math degree to use MoneyElligence. We do the heavy lifting.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 pb-12 rounded-3xl bg-gradient-to-br from-blue-900/20 to-[#050810] border border-blue-900/30">
              <span className="text-5xl mb-6 block">🤔</span>
              <h3 className="text-2xl font-bold text-white mb-3">1. The Problem</h3>
              <p className="text-blue-200/70 leading-relaxed font-light">Rich people hire expensive advisors (costing ₹25,000+ a year) to look at their money and tell them exactly what to do. The average person can't afford this, so they lose out on tax savings and compounding growth. We replace the expensive human with an AI.</p>
           </div>
           
           <div className="p-8 pb-12 rounded-3xl bg-gradient-to-br from-[#050810] to-blue-900/20 border border-blue-900/30">
              <span className="text-5xl mb-6 block">🧠</span>
              <h3 className="text-2xl font-bold text-white mb-3">2. The AI Mastermind</h3>
              <p className="text-blue-200/70 leading-relaxed font-light">When you answer 5 questions, our algorithm scores you on 6 vital areas (like Debt or Emergency Cash). It sends this math to Google Gemini Pro. The AI acts as your advisor, looking at your exact numbers, and gives you a personalized, strictly-Indian prescription (like 'Start a ₹12k ELSS SIP') to fix your lowest scores.</p>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-slate-800 bg-[#04060b] text-slate-500 text-sm">
        <p>© 2026 MoneyElligence. Built for ET Gen-AI Hackathon.</p>
        <p className="mt-2 text-xs opacity-50">Powered by Google Gemini Pro & React Three Fiber.</p>
      </footer>
    </div>
  );
}
