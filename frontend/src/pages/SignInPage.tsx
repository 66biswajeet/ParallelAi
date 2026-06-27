import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../components/Logo";

export const SignInPage: React.FC = () => {
  const { signIn, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const errors: { [key: string]: string } = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await signIn({ email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setGeneralError(err.message || "Invalid credentials. Please verify your email and password.");
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
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">Welcome Back</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1.5">Sign in to your canvas workbench</p>
        </div>

        {/* Global Error Banner */}
        {(generalError || error) && (
          <div className="mb-6 p-3 bg-red-50 border border-red-150 rounded-lg text-xs font-semibold text-red-700" role="alert">
            {generalError || error}
          </div>
        )}

        {/* Form fields */}
        <form onSubmit={handleSubmit}>
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
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-xs font-semibold text-slate-500">
          Don't have an account yet?{" "}
          <Link
            to="/sign-up"
            className="text-amber-600 hover:text-amber-700 hover:underline transition-all"
          >
            Sign Up here
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
