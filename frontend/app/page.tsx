import LoanForm from "@/components/LoanForm";
import { Sparkles, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen animated-bg flex flex-col items-center py-20 px-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="text-center mb-16 relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-blue-400 text-sm font-medium mb-6 animate-pulse">
          <Sparkles size={14} /> AI-Powered Loan Decisioning
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Loan Approval</span> System
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
          Leverage our advanced machine learning algorithms to predict your loan approval status in seconds. Precision, speed, and reliability.
        </p>
      </div>

      {/* Form Section */}
      <div className="relative z-10 w-full mb-24">
        <LoanForm />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {[
          {
            icon: <ShieldCheck className="text-blue-400" />,
            title: "Secure Analysis",
            desc: "Your financial data is processed securely with enterprise-grade encryption."
          },
          {
            icon: <Zap className="text-indigo-400" />,
            title: "Instant Results",
            desc: "No more waiting for days. Get your prediction results instantly after submission."
          },
          {
            icon: <BarChart3 className="text-blue-400" />,
            title: "Smart Metrics",
            desc: "Our model considers over 20+ variables to give you the most accurate prediction."
          }
        ].map((feature, i) => (
          <div key={i} className="glass p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-32 pt-12 border-t border-white/5 text-center text-zinc-500 text-sm w-full max-w-6xl">
        <p>&copy; 2025 Loan Predict Pro AI. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Node.js & Machine Learning</p>
      </footer>
    </main>
  );
}
