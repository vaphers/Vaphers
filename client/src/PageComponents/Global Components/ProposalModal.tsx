"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

// Services List with clean vector icons
const services = [
  { id: "seo", label: "Search Engine Optimization", icon: Search },
  { id: "webdev", label: "Website Development", icon: Code2 },
  { id: "ppc", label: "Pay Per Click (Ads)", icon: TrendingUp },
  { id: "smo", label: "Social Media Optimization", icon: Share2 },
  { id: "audit", label: "Website Audit (Free)", icon: Zap },
  { id: "appdev", label: "App Development", icon: Smartphone },
  { id: "other", label: "Other / Custom", icon: Sparkles },
];

export default function ProposalModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("proposal") === "true";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [selectedService, setSelectedService] = useState<string>("");
  const [customService, setCustomService] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [website, setWebsite] = useState("");
  const [skipWebsite, setSkipWebsite] = useState(false);
  const [websiteSkipReason, setWebsiteSkipReason] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
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
    const params = new URLSearchParams(searchParams.toString());
    params.delete("proposal");
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      toast.error("Please select a service");
      return;
    }
    if (step === 1 && selectedService === "other" && !customService.trim()) {
      toast.error("Please describe what you are looking for");
      return;
    }
    if (step === 2 && !email && !phoneNumber) {
      toast.error("Please provide an email or phone number");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!firstName) {
      toast.error("Please enter your first name");
      return;
    }
    if (!skipWebsite && !website) {
      toast.error("Please provide your website or choose to skip");
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
          website: skipWebsite ? "" : website,
          websiteSkipReason: skipWebsite ? websiteSkipReason : "",
          service: finalService,
          contactMethod: email && phoneNumber ? "Email & Phone" : (email ? "Email" : "Phone"),
          _ts: Date.now().toString(),
          pageUrl: window.location.href,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Proposal Request Sent!", { description: "Our team will be in touch shortly." });
        closeModal();
      } else {
        toast.error("Failed to send request", { description: data.message || "Please try again." });
      }
    } catch (err) {
      toast.error("Network Error", { description: "Could not send your request. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -25, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent 
        data-lenis-prevent="true"
        data-lenis-prevent-touch="true"
        data-lenis-prevent-wheel="true"
        className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white rounded-3xl border border-blue-500/20 shadow-2xl [&>button]:hidden"
      >
        {/* Fixed Non-scrolling Vaphers Brand Header */}
        <div className="shrink-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-600 text-white p-6 sm:p-7 relative overflow-hidden">
          
          {/* Subtle Background Glow Accent */}
          <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="border border-blue-400/40 bg-blue-500/20 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Step {step} of 3
              </span>
              <span className="text-xs text-blue-200/80 font-medium hidden sm:inline">
                {step === 1 ? "Select Service" : step === 2 ? "Contact Preference" : "Your Details"}
              </span>
            </div>

            <button 
              onClick={closeModal} 
              className="text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <DialogTitle className="text-2xl sm:text-3xl text-white bungee-inline-regular tracking-wide leading-tight relative z-10">
            Get A Custom Proposal
          </DialogTitle>
          <p className="text-sm text-blue-100/90 mt-1 font-normal relative z-10">
            Tailored digital strategies to scale your revenue.
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-blue-950/60 h-1.5 rounded-full mt-5 overflow-hidden border border-blue-400/20">
            <div 
              className="bg-blue-400 h-full transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_#60a5fa]" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Dedicated Scrollable Content Body with Lenis Prevent Attributes & Touch/Wheel Handler */}
        <div 
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          data-lenis-prevent-wheel="true"
          onWheel={(e) => e.stopPropagation()}
          className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/50 flex flex-col overscroll-contain"
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Services Selection */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-col flex flex-grow min-h-0">
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                    What service are you looking for?
                  </h3>
                  <p className="text-sm text-slate-500">
                    Choose an option below to tailor your proposal.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-6">
                  {services.map((s) => {
                    const IconComponent = s.icon;
                    const isSelected = selectedService === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.id)}
                        className={`group relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]" 
                            : "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50/40"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-3">
                          <div className={`p-2.5 rounded-xl transition-colors ${
                            isSelected ? "bg-white text-blue-600" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        
                        <span className={`text-sm font-semibold leading-tight ${isSelected ? "text-white" : "text-slate-900"}`}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selectedService === "other" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4">
                      <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Custom Requirements</label>
                      <Textarea 
                        value={customService} 
                        onChange={(e) => setCustomService(e.target.value)} 
                        placeholder="Tell us what you're looking for..."
                        className="bg-white border-blue-200 h-20 text-sm focus-visible:ring-2 focus-visible:ring-blue-600 resize-none font-normal"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto pt-5 flex justify-end border-t border-slate-200/60">
                  <Button 
                    onClick={handleNext} 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Contact Info */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-col flex flex-grow min-h-0">
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                    Where should we send your proposal?
                  </h3>
                  <p className="text-sm text-slate-500">
                    Provide your contact details so our strategists can follow up.
                  </p>
                </div>
                
                <div className="space-y-4 flex-grow mb-6">
                  {/* Email */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2.5">
                      <Mail className="w-4 h-4 text-blue-600" /> Work Email Address *
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john@company.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-50/70 h-12 border-slate-200 text-sm font-normal focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2.5">
                      <Phone className="w-4 h-4 text-blue-600" /> Phone Number (Optional)
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        type="text" 
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        className="bg-slate-50/70 h-12 w-20 text-center font-semibold text-sm border-slate-200"
                        placeholder="+1"
                      />
                      <Input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="bg-slate-50/70 h-12 flex-1 border-slate-200 text-sm font-normal focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-200/60">
                  <button 
                    onClick={handleBack} 
                    className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center transition-colors px-3 py-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                  </button>
                  <Button 
                    onClick={handleNext} 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Personal & Website Details */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-col flex flex-grow min-h-0">
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                    Final Details
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tell us your name and business website for your audit.
                  </p>
                </div>
                
                <div className="space-y-4 flex-grow mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-1.5 block">First Name *</label>
                      <Input 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-white h-12 border-slate-200 text-sm font-normal focus-visible:ring-2 focus-visible:ring-blue-600" 
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Last Name</label>
                      <Input 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-white h-12 border-slate-200 text-sm font-normal focus-visible:ring-2 focus-visible:ring-blue-600" 
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {!skipWebsite ? (
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-center mb-2.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                          <Globe className="w-4 h-4 text-blue-600" /> Website URL *
                        </label>
                        <button 
                          type="button"
                          onClick={() => setSkipWebsite(true)} 
                          className="text-xs font-medium text-slate-500 hover:text-blue-600 underline transition-colors cursor-pointer"
                        >
                          I don't have a website
                        </button>
                      </div>
                      <Input 
                        value={website} 
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="yourcompany.com"
                        className="bg-slate-50/70 h-12 border-slate-200 text-sm font-normal focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white transition-all"
                      />
                    </div>
                  ) : (
                    <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200">
                      <div className="flex justify-between items-center mb-2.5">
                        <label className="text-xs font-semibold text-slate-800">Reason / Details</label>
                        <button 
                          type="button"
                          onClick={() => { setSkipWebsite(false); setWebsiteSkipReason(""); }} 
                          className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                        >
                          Add Website URL Instead
                        </button>
                      </div>
                      <Input 
                        value={websiteSkipReason} 
                        onChange={(e) => setWebsiteSkipReason(e.target.value)}
                        placeholder="E.g., New business starting up, using social media..."
                        className="bg-white h-12 border-blue-200 text-sm font-normal focus-visible:ring-2 focus-visible:ring-blue-600"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-200/60">
                  <button 
                    onClick={handleBack} 
                    className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center transition-colors px-3 py-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                  </button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      <>Get My Proposal <ArrowRight className="ml-2 w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
