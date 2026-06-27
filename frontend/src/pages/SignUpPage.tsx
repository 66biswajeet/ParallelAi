import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Logo } from "../components/Logo";

export const SignUpPage: React.FC = () => {
  const { signUp, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = "Full Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await signUp({ name, email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setGeneralError(err.message || "An unexpected registration error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 relative">
      {/* Background glow decoration */}
      <div className="absolute w-64 h-64 bg-primary-soft rounded-full blur-3xl opacity-50 top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute w-72 h-72 bg-amber-100/60 rounded-full blur-3xl opacity-40 bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2"></div>

      <div className="w-full max-w-md bg-white border border-gray-200/80 rounded-2xl shadow-premium p-8 relative z-10 glass-card">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-4 group focus:outline-none">
            <Logo size="sm" className="group-hover:scale-105 transition-transform" />
            <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-amber-500 transition-colors">
              Parallel<span className="text-primary-yellow">AI</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create your Account</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1.5 flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500 fill-amber-500" />
            Receive 20 free credits instantly on signup
          </p>
        </div>

        {/* Global Error Banner */}
        {(generalError || error) && (
          <div className="mb-6 p-3 bg-red-50 border border-red-150 rounded-lg text-xs font-semibold text-red-700" role="alert">
            {generalError || error}
          </div>
        )}

        {/* Form elements */}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            placeholder="John Doe"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={fieldErrors.name}
            disabled={isLoading}
          />
          <InputField
            label="Email Address"
            placeholder="developer@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            disabled={isLoading}
          />
          <InputField
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center text-xs font-semibold text-slate-500">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-amber-600 hover:text-amber-700 hover:underline transition-all"
          >
            Sign In here
          </Link>
        </div>
      </div>

      <Link
        to="/"
        className="absolute top-6 left-6 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5 focus:outline-none"
      >
        <ArrowLeft size={14} />
        Back to Landing
      </Link>
    </div>
  );
};
