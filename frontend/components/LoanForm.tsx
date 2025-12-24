"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    GraduationCap,
    Briefcase,
    User,
    DollarSign,
    Calendar,
    ShieldCheck,
    Home,
    ShoppingBag,
    Palmtree,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Loader2,
    Sparkles
} from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

const BACKEND_URL = "https://164.68.122.165.sslip.io/api/predict";

export default function LoanForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<"Approved" | "Rejected" | null>(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        no_of_dependents: 0,
        education: "Graduate",
        self_employed: "No",
        income_annum: 0,
        loan_amount: 0,
        loan_term: 0,
        cibil_score: 0,
        residential_assets_value: 0,
        commercial_assets_value: 0,
        luxury_assets_value: 0,
        bank_asset_value: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "education" || name === "self_employed" ? value : Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) return; // Prevent submission unless on last step

        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post(BACKEND_URL, formData);
            setResult(response.data.prediction);
        } catch (error) {
            console.error("Prediction error:", error);
            alert("Failed to get prediction from server. Please ensure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/10">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Building2 size={120} />
                </div>

                {!result ? (
                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                if (step < 3) nextStep();
                            }
                        }}
                        className="space-y-8 relative z-10"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Loan Calculator</h2>
                                <p className="text-zinc-400">Step {step} of 3: {step === 1 ? "Personal Info" : step === 2 ? "Financial Details" : "Asset Evaluation"}</p>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2, 3].map((s) => (
                                    <div
                                        key={s}
                                        className={cn(
                                            "h-1.5 w-8 rounded-full transition-all duration-300",
                                            step >= s ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-zinc-800"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <User size={16} /> Dependents
                                        </label>
                                        <input
                                            type="number"
                                            name="no_of_dependents"
                                            value={formData.no_of_dependents}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <GraduationCap size={16} /> Education
                                        </label>
                                        <select
                                            name="education"
                                            value={formData.education}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option value="Graduate">Graduate</option>
                                            <option value="Not Graduate">Not Graduate</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <Briefcase size={16} /> Self Employed
                                        </label>
                                        <select
                                            name="self_employed"
                                            value={formData.self_employed}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <DollarSign size={16} /> Annual Income (₹)
                                        </label>
                                        <input
                                            type="number"
                                            name="income_annum"
                                            value={formData.income_annum}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <DollarSign size={16} /> Loan Amount (₹)
                                        </label>
                                        <input
                                            type="number"
                                            name="loan_amount"
                                            value={formData.loan_amount}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <Calendar size={16} /> Loan Term (Years)
                                        </label>
                                        <input
                                            type="number"
                                            name="loan_term"
                                            value={formData.loan_term}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <ShieldCheck size={16} /> Cibil Score
                                        </label>
                                        <input
                                            type="number"
                                            name="cibil_score"
                                            value={formData.cibil_score}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <Home size={16} /> Residential Assets
                                        </label>
                                        <input
                                            type="number"
                                            name="residential_assets_value"
                                            value={formData.residential_assets_value}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <Building2 size={16} /> Commercial Assets
                                        </label>
                                        <input
                                            type="number"
                                            name="commercial_assets_value"
                                            value={formData.commercial_assets_value}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <ShoppingBag size={16} /> Luxury Assets
                                        </label>
                                        <input
                                            type="number"
                                            name="luxury_assets_value"
                                            value={formData.luxury_assets_value}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <Palmtree size={16} /> Bank Asset Value
                                        </label>
                                        <input
                                            type="number"
                                            name="bank_asset_value"
                                            value={formData.bank_asset_value}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center pt-8 border-t border-zinc-800">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-2.5 rounded-xl border border-zinc-700 text-white hover:bg-zinc-800 transition-all"
                                >
                                    Back
                                </button>
                            )}
                            <div className="ml-auto">
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-900/20"
                                    >
                                        Next <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin" /> Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Predict Approval <Sparkles size={18} />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        {result === "Approved" ? (
                            <div className="space-y-6">
                                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                                    <CheckCircle2 size={64} className="text-green-500" />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-bold text-white mb-2">Congratulations!</h2>
                                    <p className="text-green-400 text-xl font-medium">Your Loan Application is Approved</p>
                                </div>
                                <p className="text-zinc-400 max-w-md">
                                    Based on our AI analysis, your financial profile meets the requirements for this loan. You can proceed with the next steps.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                                    <XCircle size={64} className="text-red-500" />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-bold text-white mb-2">Application Rejected</h2>
                                    <p className="text-red-400 text-xl font-medium">We couldn't approve your loan at this time</p>
                                </div>
                                <p className="text-zinc-400 max-w-md">
                                    Our AI analysis suggests that your current financial profile doesn't meet the approval criteria. Improving your Cibil score or reducing the loan amount might help.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setResult(null);
                                setStep(1);
                            }}
                            className="mt-12 px-8 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
                        >
                            Start New Analysis
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
