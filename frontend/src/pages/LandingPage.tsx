import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Code, Cpu, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import { Logo } from "../components/Logo";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      {/* Header Bar */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-gray-100 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="font-black text-lg tracking-tight text-slate-900">
            Parallel<span className="text-primary-yellow">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/sign-in"
            className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="bg-primary-yellow hover:bg-primary-accent text-dark-text text-xs font-black px-4.5 py-2.5 rounded-lg shadow-yellowGlow hover:shadow-[0_8px_24px_rgba(245,197,66,0.2)] transition-all hover:scale-[1.03]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full flex flex-col justify-center py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-primary-soft border border-amber-200/50 px-3.5 py-1.5 rounded-full text-xs font-black text-amber-800 uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles size={13} className="text-primary-yellow fill-primary-yellow" />
              Next-Gen Canvas Streaming
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
              Generate fully styled web pages in <span className="underline decoration-primary-yellow decoration-8 underline-offset-4">real-time</span>.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mb-8 leading-relaxed font-medium">
              Describe your idea, watch Gemini structure the layouts, and stream responsive, Tailwind CSS-powered components right onto your canvas dashboard using high-speed WebSockets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/sign-up"
                className="bg-primary-yellow hover:bg-primary-accent text-dark-text font-black px-8 py-3.5 rounded-lg shadow-yellowGlow hover:shadow-[0_8px_24px_rgba(245,197,66,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 group"
              >
                Start Generating Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sign-in"
                className="border border-gray-250 hover:border-gray-350 text-slate-700 font-bold px-8 py-3.5 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-all"
              >
                Returning User Login
              </Link>
            </div>
          </div>

          {/* Interactive Abstract Mockup Frame */}
          <div className="md:col-span-5 relative w-full flex justify-center">
            {/* Ambient glows */}
            <div className="absolute w-72 h-72 bg-primary-soft rounded-full blur-3xl opacity-60 -top-10 -left-10"></div>
            <div className="absolute w-60 h-60 bg-amber-100 rounded-full blur-3xl opacity-50 -bottom-10 -right-10"></div>

            <div className="relative bg-white w-full border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden glass-card">
              {/* Window Header */}
              <div className="bg-gray-50 border-b border-gray-150 px-4 py-3 flex items-center gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
                <div className="h-4.5 w-[140px] bg-white border border-gray-150 rounded text-[9px] font-bold text-slate-400 flex items-center px-2.5 ml-2.5">
                  pyarelalai.sandbox.io
                </div>
              </div>
              {/* Fake canvas preview */}
              <div className="p-6 h-[260px] flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-slate-900 rounded"></div>
                  <div className="flex gap-2">
                    <div className="h-2 w-6 bg-slate-200 rounded"></div>
                    <div className="h-2 w-6 bg-slate-200 rounded"></div>
                  </div>
                </div>
                
                <div className="text-center py-6">
                  <div className="h-2.5 w-16 bg-amber-400 rounded mx-auto mb-3"></div>
                  <div className="h-7 w-48 bg-slate-900 rounded mx-auto mb-4"></div>
                  <div className="h-2 w-32 bg-slate-200 rounded mx-auto"></div>
                </div>

                <div className="flex justify-center gap-3">
                  <div className="h-6 w-16 bg-amber-300 rounded shadow-sm"></div>
                  <div className="h-6 w-16 border border-gray-200 rounded"></div>
                </div>
              </div>
              <div className="bg-amber-400 border-t border-amber-500/10 px-4 py-2.5 flex items-center justify-between text-[10px] font-black text-amber-950">
                <span className="flex items-center gap-1.5">
                  <Zap size={11} className="fill-amber-950 animate-bounce" />
                  Generating Site Canvas
                </span>
                <span>Active WebSockets</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Blocks */}
      <section className="bg-slate-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200/60 p-6.5 rounded-xl shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-lg bg-primary-soft text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <Code size={18} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">Tailwind CDN Execution</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Every page generated contains clean Tailwind markup, which renders instantly in our sandboxed canvas iframe.
            </p>
          </div>

          <div className="bg-white border border-gray-200/60 p-6.5 rounded-xl shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-lg bg-primary-soft text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <Cpu size={18} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">Gemini Flash Speed</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Harnesses the high-speed streaming capabilities of Google Gemini 2.5 Flash to pipe characters directly into memory.
            </p>
          </div>

          <div className="bg-white border border-gray-200/60 p-6.5 rounded-xl shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-lg bg-primary-soft text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">Sandboxed Code Safety</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Previews load inside an isolated environment, protecting browser security while letting you copy cleaner layouts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs font-semibold text-slate-400">
        &copy; 2026 ParallelAI Sandbox Framework. Built with White & Yellow Principles.
      </footer>
    </div>
  );
};
