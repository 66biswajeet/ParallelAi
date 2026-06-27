import React from "react";
import { Coins, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "./Button";
import confetti from "canvas-confetti";

interface CreditsCardProps {
  credits: number;
  onRefresh?: () => void;
}

export const CreditsCard: React.FC<CreditsCardProps> = ({ credits }) => {
  const maxCredits = 100;
  const percentage = Math.min((credits / maxCredits) * 100, 100);

  const handleRecharge = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#F5C542", "#FFD54F", "#FFFFFF"],
    });
    alert("Recharging demo credits: +50 credits provisioned!");
    // In a real app, this triggers payment checkout.
    // For our fully functioning system, we can write a local action to mock it
    try {
      const savedUser = localStorage.getItem("pyarelal_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        parsed.credits += 50;
        localStorage.setItem("pyarelal_user", JSON.stringify(parsed));
        // Force refresh by reloading the page briefly or dispatching a state reload
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-premium p-6 relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-soft rounded-full blur-2xl opacity-70 -mr-10 -mt-10"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-lg bg-primary-soft border border-amber-200/50 flex items-center justify-center text-amber-600">
          <Coins size={20} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500">Credit Balance Allocations</h3>
          <p className="text-2xl font-black text-slate-900">{credits} Credits</p>
        </div>
      </div>

      {/* Credit allocation meter */}
      <div className="mb-6 relative z-10">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Allocation Meter</span>
          <span>{credits} / {maxCredits} max</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200/40 p-0.5">
          <div
            className="h-full bg-primary-yellow rounded-full shadow-yellowGlow transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Rules Information */}
      <div className="flex gap-2.5 bg-primary-soft/50 border border-amber-200/30 rounded-lg p-3.5 mb-6 relative z-10">
        <Sparkles size={16} className="text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed font-medium">
          <strong>Usage rule:</strong> Each custom website project compilation consumes exactly <strong className="text-amber-700">5 credits</strong> from your profile balance.
        </div>
      </div>

      {credits < 5 && (
        <div className="flex gap-2 bg-red-50 border border-red-100 rounded-lg p-3.5 mb-6 relative z-10">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs text-red-800 leading-relaxed font-semibold">
            Warning: Your credit balance is insufficient to generate a new website project. Please recharge.
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        variant="primary"
        onClick={handleRecharge}
        className="w-full relative z-10"
      >
        Recharge Demo Credits (+50)
      </Button>
    </div>
  );
};
