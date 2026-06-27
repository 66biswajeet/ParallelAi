import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { Navbar } from "../components/Navbar";
import { CreditsCard } from "../components/CreditsCard";
import { HelpCircle, Sparkles, BookOpen, Layers } from "lucide-react";

export const CreditsPage: React.FC = () => {
  const { user, fetchCredits } = useAuthStore();

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Credits Management</h1>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Top-up your balance or review credit transaction rules.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Credit balance visual component */}
          <div className="md:col-span-5">
            <CreditsCard credits={user?.credits || 0} />
          </div>

          {/* Pricing guidelines (right pane) */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Guide Card */}
            <div className="bg-white border border-gray-200/80 rounded-xl shadow-premium p-6 flex flex-col gap-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen size={16} className="text-amber-500" />
                How Credits Work
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Credits are the core token currency of ParallelAI. They represent computational power allocated to run Gemini LLM streaming APIs.
              </p>

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500" />
                    New Project Generation
                  </span>
                  <span className="text-amber-600 font-extrabold">-5 Credits</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Layers size={13} />
                    Project Refinements (Coming Soon)
                  </span>
                  <span className="text-slate-400 font-extrabold">-2 Credits</span>
                </div>
              </div>
            </div>

            {/* Help guidelines */}
            <div className="bg-white border border-gray-200/80 rounded-xl shadow-premium p-6 flex flex-col gap-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle size={16} className="text-amber-500" />
                Frequently Asked Questions
              </h2>

              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">What happens if generation fails?</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    If an internal compiler exception occurs, the system logs the failure, and you can contact support to reverse the credits.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Do credits expire?</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    No, demo tokens and purchased credits stay permanently stored in your database profiles.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
