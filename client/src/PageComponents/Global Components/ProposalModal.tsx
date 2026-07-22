"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Globe, 
  Mail, 
  Phone, 
  Loader2, 
  X,
  Search,
  Code2,
  TrendingUp,
  Share2,
  Zap,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { toast } from "sonner";

const countryCodes = [
  { code: "+1", flag: "🇺🇸", name: "US/CA" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
];

const services = [
  { id: "seo", label: "Search Engine Optimization", desc: "Rank #1 for high-intent keywords", icon: Search, badge: "Organic Growth" },
  { id: "webdev", label: "Website Design & Dev", desc: "Fast, high-converting Next.js sites", icon: Code2, badge: "High Speed" },
  { id: "ppc", label: "Pay Per Click (PPC Ads)", desc: "High ROI Google & Meta ad campaigns", icon: TrendingUp, badge: "Paid Ads" },
  { id: "smo", label: "Social Media Optimization", desc: "Scale brand reach & engagement", icon: Share2, badge: "Brand Reach" },
  { id: "appdev", label: "App Development", desc: "Native iOS & Android mobile apps", icon: Smartphone, badge: "Mobile Apps" },
  { id: "audit", label: "Free Website Audit", desc: "Technical & SEO health diagnosis", icon: Zap, badge: "Free Audit" },
  { id: "other", label: "Other / Custom Service", desc: "Bespoke digital strategy & execution", icon: Sparkles, badge: "Custom Scope" },
];

// Smooth slide variants
const pageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  }),
};

export default function ProposalModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [selectedService, setSelectedService] = useState<string>("");
  const [customService, setCustomService] = useState("");
  const [contactMethod, setContactMethod] = useState<"both" | "email" | "phone">("both");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [website, setWebsite] = useState("");
  const [skipWebsite, setSkipWebsite] = useState(false);
  const [websiteSkipReason, setWebsiteSkipReason] = useState("");

  // Sync open state instantly via URL & custom window event for 0ms latency
  useEffect(() => {
    const checkOpen = () => {
      const isUrlOpen = new URLSearchParams(window.location.search).get("proposal") === "true";
      setIsOpen(isUrlOpen);
    };

    checkOpen();

    const handleOpenEvent = () => setIsOpen(true);
    const handlePopState = () => checkOpen();

    window.addEventListener("open-proposal", handleOpenEvent);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("open-proposal", handleOpenEvent);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [searchParams]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setDirection(1);
        setSelectedService("");
        setCustomService("");
        setEmail("");
        setPhoneNumber("");
        setFirstName("");
        setLastName("");
        setWebsite("");
        setSkipWebsite(false);
        setWebsiteSkipReason("");
      }, 300);
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    const params = new URLSearchParams(window.location.search);
    params.delete("proposal");
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedService) {
        toast.error("Please select a service option");
        return;
      }
      if (selectedService === "other" && !customService.trim()) {
        toast.error("Please specify your custom requirement");
        return;
      }
    }
    if (step === 2) {
      if (contactMethod === "email" && !email) {
        toast.error("Please enter your email address");
        return;
      }
      if (contactMethod === "phone" && !phoneNumber) {
        toast.error("Please enter your phone number");
        return;
      }
      if (contactMethod === "both" && (!email || !phoneNumber)) {
        toast.error("Please provide both email and phone number");
        return;
      }
    }
    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return;
    }
    if (!skipWebsite && !website.trim()) {
      toast.error("Please enter your website URL or select skip");
      return;
    }

    setLoading(true);

    const fullPhone = phoneNumber ? `${phoneCode} ${phoneNumber}` : "";
    const finalService = selectedService === "other" ? customService : (services.find(s => s.id === selectedService)?.label || selectedService);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Proposal Request Modal",
          first_name: firstName,
          last_name: lastName,
          email,
          phoneNumber: fullPhone,
          website: skipWebsite ? "No website yet" : website,
          websiteSkipReason: skipWebsite ? websiteSkipReason : "",
          service: finalService,
          contactMethod,
          _ts: Date.now().toString(),
          pageUrl: window.location.href,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Proposal Request Submitted!", { description: "Our team will reach out with a custom proposal." });
        closeModal();
      } else {
        toast.error("Failed to send request", { description: data.message || "Please try again." });
      }
    } catch {
      toast.error("Network Error", { description: "Could not send your request." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent 
        data-lenis-prevent="true"
        data-lenis-prevent-touch="true"
        data-lenis-prevent-wheel="true"
        className="w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white rounded-3xl border border-blue-500/20 shadow-2xl [&>button]:hidden"
      >
        {/* Header Banner */}
        <div className="shrink-0 bg-gradient-to-r from-blue-950 via-blue-900 to-[#1125fd] text-white p-5 sm:p-6 relative overflow-hidden select-none">
          <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="border border-blue-400/40 bg-blue-500/20 text-blue-200 text-[11px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Step {step} of 3
              </span>
              <span className="text-xs text-blue-200/90 font-medium hidden sm:inline">
                {step === 1 ? "Select Service" : step === 2 ? "Contact Channel" : "Brand Details"}
              </span>
            </div>

            <button 
              onClick={closeModal} 
              className="text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <DialogTitle className="text-2xl sm:text-3xl text-white bungee-inline-regular tracking-wide leading-tight relative z-10">
            Get A Custom Proposal
          </DialogTitle>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-0.5 font-normal relative z-10">
            Data-driven growth strategies engineered to scale your revenue.
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-blue-950/60 h-1.5 rounded-full mt-4 overflow-hidden border border-blue-400/20">
            <div 
              className="bg-gradient-to-r from-blue-400 to-blue-300 h-full transition-all duration-300 ease-out rounded-full shadow-[0_0_12px_#60a5fa]" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* 3-Step Pill Tracker */}
        <div className="bg-slate-100/80 px-6 py-2.5 border-b border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-500 shrink-0">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? "text-[#1125fd]" : ""}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? "bg-[#1125fd] text-white" : "bg-slate-300 text-slate-600"}`}>1</span>
            <span className="hidden sm:inline">Service Scope</span>
          </div>
          <div className="w-8 h-px bg-slate-300 hidden sm:block" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? "text-[#1125fd]" : ""}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? "bg-[#1125fd] text-white" : "bg-slate-300 text-slate-600"}`}>2</span>
            <span className="hidden sm:inline">Contact Preference</span>
          </div>
          <div className="w-8 h-px bg-slate-300 hidden sm:block" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? "text-[#1125fd]" : ""}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? "bg-[#1125fd] text-white" : "bg-slate-300 text-slate-600"}`}>3</span>
            <span className="hidden sm:inline">Brand Details</span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div 
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          data-lenis-prevent-wheel="true"
          onWheel={(e) => e.stopPropagation()}
          className="flex-1 overflow-y-auto p-6 sm:p-7 bg-slate-50/50 flex flex-col overscroll-contain"
        >
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-col flex flex-grow justify-between min-h-0"
              >
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">What service are you looking for?</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Select an option below to tailor your proposal.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {services.map((s) => {
                      const isSelected = selectedService === s.id;
                      const IconComp = s.icon;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelectedService(s.id)}
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                            isSelected 
                              ? "bg-blue-50/90 border-[#1125fd] shadow-md ring-4 ring-blue-500/10 scale-[1.01]" 
                              : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-[#1125fd] text-white" : "bg-blue-50 text-blue-600"}`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[#1125fd] text-white flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-1.5 py-0.5 rounded-md inline-block mb-1">
                              {s.badge}
                            </span>
                            <p className={`text-xs font-bold block leading-snug ${isSelected ? "text-[#1125fd]" : "text-slate-900"}`}>
                              {s.label}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedService === "other" && (
                    <div className="mb-4">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Describe your custom requirements *
                      </label>
                      <Textarea
                        value={customService}
                        onChange={(e) => setCustomService(e.target.value)}
                        placeholder="e.g. Next.js website dev, Technical SEO audit, Paid Meta ads..."
                        rows={2}
                        className="bg-white border-blue-200 text-xs rounded-xl focus:ring-[#1125fd] resize-none"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-7 py-3 bg-[#1125fd] hover:bg-[#0c1cdb] text-white text-xs font-bold rounded-2xl transition-all shadow-md hover:shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Next: Contact Channel <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CONTACT PREFERENCE */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-col flex flex-grow justify-between min-h-0"
              >
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Where should we send your proposal?</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Select how you'd prefer our growth team to reach out.</p>
                  </div>

                  <div className="flex bg-slate-200/70 p-1 rounded-2xl mb-5">
                    <button
                      onClick={() => setContactMethod("both")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${contactMethod === "both" ? "bg-white text-[#1125fd] shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                    >
                      Email & Phone
                    </button>
                    <button
                      onClick={() => setContactMethod("email")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${contactMethod === "email" ? "bg-white text-[#1125fd] shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                    >
                      Email Only
                    </button>
                    <button
                      onClick={() => setContactMethod("phone")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${contactMethod === "phone" ? "bg-white text-[#1125fd] shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                    >
                      Phone Only
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {(contactMethod === "email" || contactMethod === "both") && (
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#1125fd]" /> Business Email Address *
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@brand.com"
                          className="bg-white border-slate-200 text-xs h-11 rounded-2xl focus:ring-[#1125fd]"
                        />
                      </div>
                    )}

                    {(contactMethod === "phone" || contactMethod === "both") && (
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#1125fd]" /> Direct Phone Number *
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={phoneCode}
                            onChange={(e) => setPhoneCode(e.target.value)}
                            className="bg-white border border-slate-200 text-xs font-semibold text-slate-800 rounded-2xl px-3 h-11 focus:outline-none focus:border-[#1125fd]"
                          >
                            {countryCodes.map(c => (
                              <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                            ))}
                          </select>
                          <Input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="(555) 000-0000"
                            className="bg-white border-slate-200 text-xs h-11 rounded-2xl focus:ring-[#1125fd] flex-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <button
                    onClick={handleBack}
                    className="px-5 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-7 py-3 bg-[#1125fd] hover:bg-[#0c1cdb] text-white text-xs font-bold rounded-2xl transition-all shadow-md hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    Next: Final Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BRAND & WEBSITE DETAILS */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-col flex flex-grow justify-between min-h-0"
              >
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Tell us about your brand</h3>
                    <p className="text-xs text-slate-500 mt-0.5">This allows our team to run an instant digital audit.</p>
                  </div>

                  <div className="space-y-4 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">First Name *</label>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="bg-white border-slate-200 text-xs h-11 rounded-2xl focus:ring-[#1125fd]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="bg-white border-slate-200 text-xs h-11 rounded-2xl focus:ring-[#1125fd]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#1125fd]" /> Website URL {!skipWebsite && "*"}
                        </label>
                        <label className="text-[11px] text-slate-500 flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={skipWebsite}
                            onChange={(e) => setSkipWebsite(e.target.checked)}
                            className="rounded text-[#1125fd] focus:ring-[#1125fd]"
                          />
                          <span>No website yet</span>
                        </label>
                      </div>

                      {!skipWebsite ? (
                        <Input
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://yourbrand.com"
                          className="bg-white border-slate-200 text-xs h-11 rounded-2xl focus:ring-[#1125fd]"
                        />
                      ) : (
                        <Input
                          value={websiteSkipReason}
                          onChange={(e) => setWebsiteSkipReason(e.target.value)}
                          placeholder="Reason / Notes (e.g. launching new brand...)"
                          className="bg-white border-slate-200 text-xs h-11 rounded-2xl"
                        />
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center gap-2 text-xs text-blue-950 mb-4">
                    <ShieldCheck className="w-4 h-4 text-[#1125fd] shrink-0" />
                    <span>Confidential submission. Your data goes directly to our admin team.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <button
                    onClick={handleBack}
                    className="px-5 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-7 py-3 bg-[#1125fd] hover:bg-[#0c1cdb] text-white text-xs font-bold rounded-2xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 flex-1 sm:flex-initial cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Submit Proposal Request <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </DialogContent>
    </Dialog>
  );
}
