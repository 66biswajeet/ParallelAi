import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Code,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";
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
              <Sparkles
                size={13}
                className="text-primary-yellow fill-primary-yellow"
              />
              Next-Gen Canvas Streaming
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
              Generate fully styled web pages in{" "}
              <span className="underline decoration-primary-yellow decoration-8 underline-offset-4">
                real-time
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mb-8 leading-relaxed font-medium">
              Describe your idea, watch Gemini structure the layouts, and stream
              responsive, Tailwind CSS-powered components right onto your canvas
              dashboard using high-speed WebSockets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/sign-up"
                className="bg-primary-yellow hover:bg-primary-accent text-dark-text font-black px-8 py-3.5 rounded-lg shadow-yellowGlow hover:shadow-[0_8px_24px_rgba(245,197,66,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 group"
              >
                Start Generating Free
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
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

      {/* Tech Stack Section */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Built with Modern Stack
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto font-medium">
              Leveraging cutting-edge technologies and best practices to deliver
              high-performance, scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {/* TypeScript */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">TS</div>
              <h4 className="font-bold text-slate-900 text-sm">TypeScript</h4>
              <p className="text-xs text-slate-500 mt-1">6.0.3</p>
            </div>

            {/* Express */}
            <div className="bg-gradient-to-br from-black/5 to-black/5 border border-slate-300/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">⚡</div>
              <h4 className="font-bold text-slate-900 text-sm">Express.js</h4>
              <p className="text-xs text-slate-500 mt-1">5.2.1</p>
            </div>

            {/* PostgreSQL */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">🐘</div>
              <h4 className="font-bold text-slate-900 text-sm">PostgreSQL</h4>
              <p className="text-xs text-slate-500 mt-1">Latest</p>
            </div>

            {/* Drizzle ORM */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-50 border border-yellow-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-yellow-600 mb-2">🍯</div>
              <h4 className="font-bold text-slate-900 text-sm">Drizzle ORM</h4>
              <p className="text-xs text-slate-500 mt-1">0.45.2</p>
            </div>

            {/* Neon Serverless */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-50 border border-emerald-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">
                ⚙️
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Neon Serverless
              </h4>
              <p className="text-xs text-slate-500 mt-1">1.1.0</p>
            </div>

            {/* BullMQ */}
            <div className="bg-gradient-to-br from-red-50 to-red-50 border border-red-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-red-600 mb-2">🐂</div>
              <h4 className="font-bold text-slate-900 text-sm">BullMQ</h4>
              <p className="text-xs text-slate-500 mt-1">5.79.1</p>
            </div>

            {/* Redis */}
            <div className="bg-gradient-to-br from-red-50 to-red-50 border border-red-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-red-600 mb-2">💾</div>
              <h4 className="font-bold text-slate-900 text-sm">Redis</h4>
              <p className="text-xs text-slate-500 mt-1">5.11.1</p>
            </div>

            {/* Socket.io */}
            <div className="bg-gradient-to-br from-slate-900/5 to-slate-900/5 border border-slate-300/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">🔌</div>
              <h4 className="font-bold text-slate-900 text-sm">Socket.io</h4>
              <p className="text-xs text-slate-500 mt-1">4.8.3</p>
            </div>

            {/* Zod */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">✓</div>
              <h4 className="font-bold text-slate-900 text-sm">Zod</h4>
              <p className="text-xs text-slate-500 mt-1">4.4.3</p>
            </div>

            {/* Google GenAI */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">✨</div>
              <h4 className="font-bold text-slate-900 text-sm">Google GenAI</h4>
              <p className="text-xs text-slate-500 mt-1">2.10.0</p>
            </div>

            {/* JWT */}
            <div className="bg-gradient-to-br from-slate-900/5 to-slate-900/5 border border-slate-300/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">🔐</div>
              <h4 className="font-bold text-slate-900 text-sm">JWT</h4>
              <p className="text-xs text-slate-500 mt-1">9.0.3</p>
            </div>

            {/* React */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-50 border border-cyan-200/50 p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="text-3xl font-black text-cyan-600 mb-2">⚛️</div>
              <h4 className="font-bold text-slate-900 text-sm">React</h4>
              <p className="text-xs text-slate-500 mt-1">Latest</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="bg-slate-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200/60 p-6.5 rounded-xl shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-lg bg-primary-soft text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <Code size={18} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">
              Tailwind CDN Execution
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Every page generated contains clean Tailwind markup, which renders
              instantly in our sandboxed canvas iframe.
            </p>
          </div>

          <div className="bg-white border border-gray-200/60 p-6.5 rounded-xl shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-lg bg-primary-soft text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <Cpu size={18} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">
              Gemini Flash Speed
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Harnesses the high-speed streaming capabilities of Google Gemini
              2.5 Flash to pipe characters directly into memory.
            </p>
          </div>

          <div className="bg-white border border-gray-200/60 p-6.5 rounded-xl shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-lg bg-primary-soft text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">
              Sandboxed Code Safety
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Previews load inside an isolated environment, protecting browser
              security while letting you copy cleaner layouts.
            </p>
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="bg-slate-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Creator Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Ambient glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-yellow/20 to-amber-200/20 rounded-3xl blur-2xl"></div>

                {/* Image container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary-yellow/30 shadow-lg">
                  <img
                    src="/me.png"
                    alt="Biswajeet Jena"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-white border-2 border-primary-yellow rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Full-Stack Developer
                    </p>
                    <p className="text-xs text-primary-yellow font-black mt-1">
                      + AI Integration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Info */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-primary-soft border border-amber-200/50 px-3.5 py-1.5 rounded-full text-xs font-black text-amber-800 uppercase tracking-wider mb-6">
                <Sparkles
                  size={13}
                  className="text-primary-yellow fill-primary-yellow"
                />
                Meet the Creator
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                Hi, I'm{" "}
                <span className="text-primary-yellow">Biswajeet Jena</span> 👋
              </h2>

              <p className="text-sm font-black text-amber-600 mb-6 uppercase tracking-wider">
                AI-Driven Full-Stack Developer & Jr. SDET at Cognizant
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-6 font-medium">
                I specialize in building scalable, high-performance AI wrappers
                and web applications, ensuring their reliability through robust
                testing. Whether I'm crafting seamless user experiences with
                React and Next.js, architecting backends with Node.js, or
                integrating AI capabilities, I love turning complex problems
                into elegant code.
              </p>

              <div className="w-full mb-8">
                <h4 className="font-black text-slate-900 text-sm mb-3 uppercase tracking-wider">
                  Expertise
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></span>
                    Full-Stack Development (TypeScript, React, Node.js, Express)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></span>
                    AI Integration & API Orchestration (Google Gemini, LLMs)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></span>
                    Database Design & Optimization (PostgreSQL, Drizzle ORM)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></span>
                    Real-time Communication (Socket.io, WebSockets)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></span>
                    Testing & Quality Assurance (Automation, SDET practices)
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://github.com/66biswajeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all group font-bold"
                  title="GitHub"
                >
                  <span className="text-lg">gh</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/biswajeet-jena-86bb27212/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group font-bold"
                  title="LinkedIn"
                >
                  <span className="text-lg">in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs font-semibold text-slate-400">
        &copy; 2026 built with ❤️by Biswajeet Jena.
      </footer>
    </div>
  );
};
