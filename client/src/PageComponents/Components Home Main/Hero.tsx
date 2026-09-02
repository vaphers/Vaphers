import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  X,
  Menu,
  Check,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  Plus
} from 'lucide-react';

// ==========================================
// DATA DEFINITIONS & NAVIGATION MENUS
// ==========================================

interface NavMenuSection {
  title: string;
  icon?: string;
  items: string[];
}

interface NavPromoCard {
  titlePrefix: string;
  titleHighlight: string;
  buttonText: string;
  subtext?: string;
  poweredBy?: string;
}

interface NavMenuItemData {
  id: string;
  label: string;
  leftSection: NavMenuSection;
  middleSection: NavMenuSection;
  promoCard: NavPromoCard;
}

const NAV_MENUS: NavMenuItemData[] = [
  {
    id: 'seo-services',
    label: 'SEO Services',
    leftSection: {
      title: 'SERVICES WE PROVIDE',
      items: [
        'Managed SEO Services',
        'AI SEO Services',
        'Digital Marketing Services',
        'Local SEO Services',
        'Enterprise SEO Services',
        'PPC Services',
      ],
    },
    middleSection: {
      title: 'OUR SEO AGENCY',
      icon: '👥',
      items: [
        'SEO Agency',
        'What does an SEO Company Do?',
        'Best SEO Companies',
        'In-House vs. SEO Agency',
        'How Much Do SEO Agencies Cost?',
        'How to Compare SEO Agencies',
      ],
    },
    promoCard: {
      titlePrefix: "Let's Drive Results",
      titleHighlight: 'Together',
      buttonText: 'Get SEO Proposal',
      poweredBy: 'Vaphers',
    },
  },
  {
    id: 'seo-strategies',
    label: 'SEO Strategies',
    leftSection: {
      title: 'STRATEGY FRAMEWORKS',
      items: [
        'Generative Engine Optimization (GEO)',
        'Content Velocity & Topic Clusters',
        'Technical & Core Web Vitals Audits',
        'High-Intent Keyword Funnels',
        'Authoritative Link Building & PR',
        'Programmatic SEO Architecture',
      ],
    },
    middleSection: {
      title: 'GROWTH PLAYBOOKS',
      icon: '⚡',
      items: [
        'B2B SaaS Growth Blueprint',
        'E-Commerce Revenue SEO Scaling',
        'Voice & Conversational Search Strategy',
        'AI Algorithm Update Recovery',
        'Conversion Rate Optimization (CRO)',
        'Global Multi-Region SEO',
      ],
    },
    promoCard: {
      titlePrefix: 'Outrank Competitors in',
      titleHighlight: 'Organic Search',
      buttonText: 'Request Strategy Audit',
      poweredBy: 'Vaphers',
    },
  },
  {
    id: 'seo-resources',
    label: 'SEO Resources',
    leftSection: {
      title: 'FREE TOOLS & AUDITS',
      items: [
        'AI SERP Rank Tracker',
        'Keyword Opportunity Analyzer',
        'Competitor Gap Matrix',
        'Schema & Rich Snippet Generator',
        'Backlink Authority Checker',
        'ROI & Traffic Calculator',
      ],
    },
    middleSection: {
      title: 'KNOWLEDGE & INSIGHTS',
      icon: '📚',
      items: [
        '2025 AI Search Industry Report',
        'Enterprise SEO Case Studies',
        'Live Algorithm Updates Feed',
        'SEO Masterclasses & Webinars',
        'Free Implementation Templates',
        'Developer API Documentation',
      ],
    },
    promoCard: {
      titlePrefix: 'Unlock Free Intelligence',
      titleHighlight: 'For Your Brand',
      buttonText: 'Download SEO Toolkit',
      poweredBy: 'Vaphers',
    },
  },
  {
    id: 'ai-seo',
    label: 'AI SEO',
    leftSection: {
      title: 'AI CAPABILITIES',
      items: [
        'Neural Search Indexing & LLM Citations',
        'Automated Content & Schema AI',
        'Predictive Search Intent Modeling',
        'Real-Time SERP Anomaly Detection',
        'Multi-Modal Visual Search SEO',
        'Dynamic Personalization at Scale',
      ],
    },
    middleSection: {
      title: 'AI SEARCH PLATFORMS',
      icon: '✨',
      items: [
        'Google Gemini & AI Overviews Optimization',
        'ChatGPT Search & Perplexity Visibility',
        'Copilot & Apple Intelligence SEO',
        'Entity Knowledge Graph Engineering',
        'Vector Search & Semantic Embedding',
        'Autonomous Agent Discovery',
      ],
    },
    promoCard: {
      titlePrefix: 'Dominate the Era of',
      titleHighlight: 'AI Search Engines',
      buttonText: 'Get AI SEO Demo',
      poweredBy: 'Vaphers',
    },
  },
];

const COMMUNITY_USERS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
];

const TRUSTED_COMPANIES = [
  { name: 'Studio Atelier', style: 'font-black tracking-tight text-xl' },
  { name: 'Luxe Living', style: 'font-medium tracking-normal text-xl' },
  { name: 'Vanguard Interiors', style: 'font-bold tracking-tight text-xl' },
  { name: 'Maison Design', style: 'font-extrabold tracking-tight text-xl' },
  { name: 'Arch & Space', style: 'font-semibold tracking-wide text-xl' },
];

// ==========================================
// MAIN APP COMPONENT (SINGLE CONSOLIDATED FILE)
// ==========================================

export default function HeroHomeMain() {
  // Navigation & Dropdown State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState<string | null>('seo-services');
  const navContainerRef = useRef<HTMLDivElement>(null);

  // CTA Button Hover State in Left Column
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Center Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Demo Modal & Toast State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Schedule an Interior Design Strategy Consultation');
  const [modalInitialService, setModalInitialService] = useState('AI SEO Services');
  const [modalStep, setModalStep] = useState<'form' | 'success'>('form');
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    company: '',
    goal: 'AI SEO Services',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Video autoplay safe handle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsVideoPlaying(false);
      });
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleScheduleDemo = () => {
    setModalTitle('Schedule a 1-on-1 AI & SEO Strategy Demo');
    setModalInitialService('AI SEO Services');
    setModalFormData((prev) => ({ ...prev, goal: 'AI SEO Services' }));
    setModalStep('form');
    setIsDemoModalOpen(true);
  };

  const handleGetStarted = () => {
    setModalTitle('Get Started with Mark AI Engine');
    setModalInitialService('Managed SEO Services');
    setModalFormData((prev) => ({ ...prev, goal: 'Managed SEO Services' }));
    setModalStep('form');
    setIsDemoModalOpen(true);
  };

  const handleVerseAction = () => {
    setModalTitle('Join the Mark AI Verse Ecosystem');
    setModalInitialService('Generative Engine Optimization');
    setModalFormData((prev) => ({ ...prev, goal: 'Generative Engine Optimization' }));
    setModalStep('form');
    setIsDemoModalOpen(true);
  };

  const handleMenuItemSelect = (menuTitle: string, item: string) => {
    triggerToast(`Selected: ${item} (${menuTitle})`);
    setModalTitle(`Explore ${item}`);
    setModalInitialService(item);
    setModalFormData((prev) => ({ ...prev, goal: item }));
    setModalStep('form');
    setIsDemoModalOpen(true);
    setActiveMenuId(null);
  };

  const handleCompanyClick = (companyName: string) => {
    triggerToast(`Viewing enterprise AI & SEO case study for ${companyName}`);
  };

  const handleStatClick = () => {
    triggerToast('+340% Organic Traffic Growth verified across 150+ enterprise rollouts');
    setModalTitle('Unlock +340% AI Organic Lift For Your Brand');
    setModalInitialService('Generative Engine Optimization');
    setModalFormData((prev) => ({ ...prev, goal: 'Generative Engine Optimization' }));
    setModalStep('form');
    setIsDemoModalOpen(true);
  };

  const toggleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  const activeMenuData = NAV_MENUS.find((m) => m.id === activeMenuId);

  // Animation variants for headline
  const headlineContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const headlineLineVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#ffffff] flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 z-50 bg-[#0f172a] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2.5 border border-blue-500/30"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <Check className="w-3.5 h-3.5 text-blue-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main White Hero Canvas Card */}
      <div className="w-full bg-white  overflow-visible flex flex-col justify-between  relative">
        


        {/* ========================================== */}
        {/* 2. 3-COLUMN HERO SECTION                   */}
        {/* ========================================== */}
        <div className="px-6 md:px-12 py-4 md:py-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-stretch relative z-10">
          
          {/* -------------------------------------- */}
          {/* COLUMN 1: LEFT TYPOGRAPHY & CTA        */}
          {/* -------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 md:space-y-8 lg:space-y-0 py-2">
            {/* Top Eyebrow & Stacked Headline */}
            <div className="space-y-4 md:space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex items-center gap-3 text-[11px] md:text-xs font-semibold tracking-wider text-blue-600 uppercase"
              >
                <motion.span
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                  className="w-2 h-2 rounded-full bg-blue-600"
                />
                <span className="whitespace-nowrap text-neutral-600 font-medium">
                  TURNING POTENTIAL WITH PERFORMANCE
                </span>
                <span className="h-[1px] w-8 md:w-14 bg-blue-200 inline-block flex-shrink-0" />
                <span className="text-blue-600 font-accent tracking-widest text-sm">
                  2026
                </span>
              </motion.div>

              {/* Stacked 3-Line Headline */}
              <motion.div
                variants={headlineContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col space-y-1 sm:space-y-1.5"
              >
                {/* Line 1: MARKETING (Bungee Shade) */}
                <motion.div variants={headlineLineVariants} className="leading-none">
                  <span className="font-accent bungee-shade text-blue-600 tracking-wider text-3xl sm:text-4xl lg:text-[48px] xl:text-[58px] inline-block uppercase">
                    Marketing
                  </span>
                </motion.div>

                {/* Line 2: for Interior (Refined Manrope, medium weight) */}
                <motion.div variants={headlineLineVariants} className="leading-none pt-0.5">
                  <span className="font-sans font-medium bungee-shade text-blue-600 text-4xl sm:text-5xl lg:text-[50px] xl:text-[48px] tracking-[-0.03em] inline-block">
                    For Interior
                  </span>
                </motion.div>

                {/* Line 3: DESIGNERS (Bungee Shade) */}
                <motion.div variants={headlineLineVariants} className="leading-none pt-0.5">
                  <span className="font-accent bungee-shade text-blue-600 tracking-wider text-3xl sm:text-4xl lg:text-[42px] xl:text-[58px] inline-block uppercase">
                    DESIGNERS
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Middle Snippet Card with Video Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="space-y-2.5 pt-2 lg:pt-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <h3 className="text-sm font-semibold text-[#111111] tracking-tight">
                  Accelerating Progress
                </h3>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => triggerToast('Previewing AI search performance simulation')}
                className="group flex items-center gap-3.5 max-w-sm cursor-pointer p-2 -ml-2 rounded-2xl bg-neutral-50/50 hover:bg-blue-50/60 transition-all border border-neutral-100 hover:border-blue-200"
              >
                <div className="w-[74px] h-[48px] rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0 relative shadow-xs border border-neutral-200/90 group-hover:scale-105 transition-transform group-hover:border-blue-400">
                  <video
                    src="https://v1.pinimg.com/videos/mc/expMp4/ad/ae/35/adae35a207173b8a57704cbd267e224e_t1.mp4"
                    className="w-full h-full object-cover opacity-90"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent" />
                </div>

                <p className="text-xs text-neutral-600 font-medium leading-[1.45]">
                  Helping high-end interior design firms unlock predictive AI engines for exponential search, client acquisition, and visual authority.
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Button: Morphs into Arrow Design on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="pt-3 lg:pt-5"
            >
              <motion.button
                type="button"
                layout
                onMouseEnter={() => setIsCtaHovered(true)}
                onMouseLeave={() => setIsCtaHovered(false)}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 10px 28px -4px rgba(37, 99, 235, 0.4)',
                }}
                whileTap={{ scale: 0.96 }}
                onClick={handleGetStarted}
                className={`cursor-pointer rounded-full border-2 border-blue-600 transition-colors duration-300 flex items-center justify-center overflow-hidden shadow-xs ${
                  isCtaHovered
                    ? 'bg-blue-600 text-white w-13 h-13 px-0'
                    : 'bg-white text-blue-600 h-12 px-6'
                }`}
                style={{ transitionProperty: 'background-color, border-color, color, width, height, padding' }}
              >
                <AnimatePresence initial={false}>
                  {!isCtaHovered && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, marginRight: 0 }}
                      animate={{ opacity: 1, width: 'auto', marginRight: '8px' }}
                      exit={{ opacity: 0, width: 0, marginRight: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="font-semibold text-sm tracking-tight whitespace-nowrap overflow-hidden inline-block"
                    >
                      Get started
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.div
                  layout
                  animate={isCtaHovered ? { x: [0, 3, 0], scale: 1.15 } : { x: 0, scale: 1 }}
                  transition={isCtaHovered ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } : { duration: 0.2 }}
                  className="flex items-center justify-center flex-shrink-0"
                >
                  <ArrowRight
                    className={`transition-all duration-300 ${
                      isCtaHovered
                        ? 'w-5 h-5 text-white stroke-[2.5]'
                        : 'w-4 h-4 text-blue-600 stroke-2'
                    }`}
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* -------------------------------------- */}
          {/* COLUMN 2: CENTER VIDEO CARD            */}
          {/* -------------------------------------- */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative flex justify-center items-center w-full"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              {/* Outer ambient blue glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/25 via-sky-500/20 to-indigo-600/25 rounded-[44px] blur-2xl opacity-80 pointer-events-none transform transition-opacity duration-700" />

              {/* Video Card Container */}
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[9/14] sm:aspect-[9/13.8] rounded-[32px] md:rounded-[36px] overflow-hidden bg-black shadow-2xl shadow-blue-950/25 border border-neutral-800/80 group">
                {!isVideoLoaded && (
                  <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                  </div>
                )}

                <video
                  ref={videoRef}
                  src="https://v1.pinimg.com/videos/mc/expMp4/ad/ae/35/adae35a207173b8a57704cbd267e224e_t1.mp4"
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                  className="w-full h-full object-cover select-none transform transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

                {/* Floating controls */}
                <div
                  className={`absolute bottom-4 inset-x-4 flex items-center justify-between transition-opacity duration-300 ${
                    isVideoHovered ? 'opacity-100' : 'opacity-0 md:opacity-0 md:group-hover:opacity-100'
                  } z-20`}
                >
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                    <button
                      onClick={toggleVideoPlay}
                      className="text-white hover:text-blue-400 transition-colors p-1 cursor-pointer"
                      aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleVideoMute}
                      className="text-white hover:text-blue-400 transition-colors p-1 cursor-pointer"
                      aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={handleVerseAction}
                    className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/15 text-white hover:text-blue-400 transition-colors cursor-pointer"
                    aria-label="Expand video"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* -------------------------------------- */}
          {/* COLUMN 3: RIGHT STATS & VERSE          */}
          {/* -------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8 md:space-y-10 lg:space-y-0 py-2">
            {/* Top AI & Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="flex items-center gap-3.5"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-4xl bungee-shade sm:text-5xl font-accent text-blue-600 tracking-wider inline-block">
                  AI
                </span>
                <span className="text-2xl sm:text-3xl font-light text-neutral-400">—</span>
              </div>
              <div className="text-[12px] sm:text-[13px] text-neutral-600 font-medium leading-[1.35] max-w-[180px]">
                Unlocking Transformative Growth with AI-Driven Interior Marketing & Search
              </div>
            </motion.div>

            {/* Middle Minimalist Single Stat (+340%) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
              whileHover={{ x: 2 }}
              onClick={handleStatClick}
              className="cursor-pointer group py-3 border-y border-neutral-100 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-accent text-3xl sm:text-4xl lg:text-[40px] text-blue-600 bungee-shade tracking-wider">
                  +340%
                </span>

              </div>
              <div className="text-xs text-neutral-600 font-medium leading-relaxed group-hover:text-neutral-900 transition-colors">
                Average organic visibility and search growth across 150+ interior design studios.
              </div>
            </motion.div>

            {/* Bottom Mark AI verse & Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <h5 className="text-2xl sm:text-[25px] font-semibold text-[#111111] tracking-tight leading-snug">
                  Your Partner In Marketing
                </h5>
                <p className="text-xs text-neutral-600 font-medium leading-[1.45] max-w-[270px]">
                  Partner with a creative force that unleashes high-aesthetic branding and algorithmic client acquisition.
                </p>
              </div>

              <div className="flex items-end justify-between pt-1">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                    <span>More than 5k studios</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block animate-pulse" />
                  </div>
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center z-10 shadow-xs">
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    {COMMUNITY_USERS.map((avatar, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-neutral-200 shadow-xs"
                      >
                        <img
                          src={avatar}
                          alt="Interior design studio user"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVerseAction}
                  className="w-12 h-12 rounded-full border-2 border-neutral-200 hover:border-blue-600 bg-white hover:bg-blue-50/50 flex items-center justify-center transition-all group shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Explore Mark AI verse"
                >
                  <ArrowUpRight className="w-5 h-5 text-neutral-800 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 3. BOTTOM TRUSTED COMPANIES BAR            */}
        {/* ========================================== */}
        <div className="w-full border-t border-neutral-200/90 pt-8 pb-10 px-6 md:px-12 mt-8 lg:mt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs sm:text-[13px] text-neutral-600 font-medium leading-[1.3] flex-shrink-0"
            >
              <div className="text-blue-600 font-bold">/Trusted by</div>
              <div>leading global companies.</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-between md:justify-end gap-6 sm:gap-10 lg:gap-14 flex-1"
            >
              {TRUSTED_COMPANIES.map((company, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCompanyClick(company.name)}
                  className={`text-neutral-700 hover:text-blue-600 transition-colors opacity-85 hover:opacity-100 cursor-pointer ${company.style}`}
                >
                  {company.name}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 4. INTERACTIVE PROPOSAL / DEMO MODAL       */}
      {/* ========================================== */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-white rounded-[28px] shadow-2xl border border-neutral-200/80 overflow-hidden z-10 p-6 sm:p-8"
            >
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {modalStep === 'form' ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next-Gen Search & Marketing</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] tracking-tight mb-2">
                    {modalTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                    Discover how Vaphers combines high-converting search algorithms with targeted visual marketing to attract luxury interior design clients.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModalStep('success');
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={modalFormData.name}
                        onChange={(e) =>
                          setModalFormData({ ...modalFormData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={modalFormData.email}
                        onChange={(e) =>
                          setModalFormData({ ...modalFormData, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Company / Brand Domain
                      </label>
                      <input
                        type="text"
                        required
                        value={modalFormData.company}
                        onChange={(e) =>
                          setModalFormData({ ...modalFormData, company: e.target.value })
                        }
                        placeholder="acme.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Primary Objective
                      </label>
                      <select
                        value={modalFormData.goal}
                        onChange={(e) =>
                          setModalFormData({ ...modalFormData, goal: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition font-medium cursor-pointer"
                      >
                        <option value="Managed SEO Services">Managed SEO Services</option>
                        <option value="AI SEO Services">AI SEO Services & LLM Citations</option>
                        <option value="Digital Marketing Services">Digital Marketing & PPC</option>
                        <option value="Generative Engine Optimization">Generative Engine Optimization (GEO)</option>
                        <option value="Enterprise SEO Strategy">Enterprise SEO & Growth Architecture</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-3 rounded-full text-sm font-bold tracking-tight transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
                      >
                        <span>Get Proposal & Strategy</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4 border border-blue-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] tracking-tight mb-2">
                    Proposal Request Received!
                  </h3>
                  <p className="text-sm text-neutral-600 mb-6 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-neutral-900">{modalFormData.name}</span>. Our SEO & AI Growth engineering team will prepare your custom audit for <span className="font-semibold text-blue-600">{modalFormData.company || 'your brand'}</span> and email it to <span className="font-semibold text-neutral-900">{modalFormData.email}</span>.
                  </p>
                  <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 text-left mb-6 text-xs text-neutral-700 space-y-1.5">
                    <div className="font-bold text-neutral-900">Next Steps:</div>
                    <div>• AI Overviews & Knowledge Graph SERP benchmark audit</div>
                    <div>• Competitor organic traffic gap model</div>
                    <div>• Dedicated 1-on-1 strategy briefing</div>
                  </div>
                  <button
                    onClick={() => setIsDemoModalOpen(false)}
                    className="bg-blue-600 text-white px-7 py-2.5 rounded-full text-xs font-bold hover:bg-blue-700 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
