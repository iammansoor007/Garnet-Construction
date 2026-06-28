import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Home, Sun, Droplets } from "lucide-react";

import heroBg from "@/assets/ngherogarmet.jpg";
import {
  FiArrowRight,
  FiChevronDown,
  FiStar,
  FiThumbsUp,
  FiMail,
  FiPhone,
  FiUser,
  FiHome,
  FiDollarSign,
  FiBriefcase,
  FiSend,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiMessageSquare,
  FiSmartphone,
  FiZap,
  FiClock,
  FiShield,
  FiTool,
  FiSun,
  FiCloudRain,
  FiAward,
  FiDroplet,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import { RiBuildingLine, RiShieldCheckLine } from "react-icons/ri";
import completeData from "../src/data/completeData.json";



// MODERN PROFESSIONAL FORM COMPONENT - UPDATED FOR COATINGS SERVICES
const CoatingInquiryForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    serviceType: "garage",
    serviceDetails: "",
    email: "",
    phone: "",
    address: "",
    urgency: "standard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(520);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setContainerHeight(Math.max(height, 500));
    }
  }, [step, isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Coating quote request:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        serviceType: "garage",
        serviceDetails: "",
        email: "",
        phone: "",
        address: "",
        urgency: "standard",
      });
    }, 3000);
  };

  const serviceOptions = [
    {
      value: "water-damage",
      label: "Water Damage Restoration",
      icon: FiHome,
      desc: "Furniture, appliances, clutter — we haul it all",
    },
    {
      value: "garage-cleanout",
      label: "Garage Cleanout",
      icon: FiSun,
      desc: "Full or partial garage cleanouts",
    },
    {
      value: "estate-cleanout",
      label: "Estate Cleanout",
      icon: RiBuildingLine,
      desc: "Compassionate full-property cleanouts",
    },
    {
      value: "shed-removal",
      label: "Shed / Demo",
      icon: FiTool,
      desc: "Old sheds, fences, small structures",
    },
    {
      value: "moving",
      label: "Moving Help",
      icon: FiSearch,
      desc: "Loading, unloading, furniture moving",
    },
    {
      value: "other",
      label: "Other / Not Sure",
      icon: FiTool,
      desc: "Tell us what you need — we'll see if we can help",
    },
  ];

  const urgencyOptions = [
    { value: "emergency", label: "🚨 Urgent (ASAP)" },
    { value: "soon", label: "⚡ Soon (1-2 weeks)" },
    { value: "planned", label: "📅 Planning (1-3 months)" },
  ];

  const stepIcons = [FiUserCheck, FiMessageSquare, FiSmartphone];
  const stepLabels = ["Your Info", "Project Details", "Contact"];

  const SelectedIcon =
    serviceOptions.find((opt) => opt.value === formData.serviceType)?.icon ||
    FiHome;

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 24, boxShadow: "0 32px 80px hsl(var(--primary)/0.12)" }}
        className="overflow-hidden will-change-transform transform-gpu"
      >
        <div className="relative flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)", borderBottom: "1px solid hsl(var(--border))" }}>
          <div className="px-5 sm:px-6 md:px-8 py-4 sm:py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--primary))" }}>
                  <FiZap className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "hsl(var(--color-white))" }} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    Free Estimate Request
                  </h3>
                  <p className="text-sm mt-0.5 text-muted-foreground">
                    Get your quote in 3 easy steps
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 rounded-full px-3 py-1.5" style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={step >= i ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" } : { background: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium ml-1" style={{ color: "hsl(var(--primary))" }}>
                  Steps
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{ minHeight: `${containerHeight}px` }}
          className="transition-all duration-300 ease-in-out"
        >
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="px-4 sm:px-6 md:px-8 py-4 sm:py-6"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => {
                    const StepIcon = stepIcons[s - 1];
                    const isActive = step === s;
                    const isCompleted = step > s;
                    return (
                      <div
                        key={s}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                          style={isActive ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "0 0 20px hsl(var(--primary)/0.3)" } : isCompleted ? { background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" } : { background: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
                        >
                          {isCompleted ? (
                            <FiCheckCircle className="w-6 h-6" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className="text-xs font-bold mt-2 transition-colors"
                          style={{ color: isActive ? "hsl(var(--primary))" : isCompleted ? "hsl(var(--primary)/0.8)" : "hsl(var(--muted-foreground))" }}
                        >
                          {stepLabels[s - 1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="relative mt-4 h-1 rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ background: "hsl(var(--primary))" }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step - 1) / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="rounded-xl p-3 flex items-center gap-2 mb-2" style={{ background: "hsl(var(--primary)/0.06)", border: "1px solid hsl(var(--primary)/0.13)" }}>
                        <FiUser className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                        <span className="text-xs text-muted-foreground">
                          Step 1 of 3 - Tell us who you are
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          First name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-muted-foreground" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-foreground transition-all focus:outline-none"
                            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                            placeholder="John"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Last name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-muted-foreground" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-foreground transition-all focus:outline-none"
                            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Property address
                        </label>
                        <div className="relative group">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-muted-foreground" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-foreground transition-all focus:outline-none"
                            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                            placeholder="123 Main St, Canton, MI"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!formData.firstName || !formData.lastName || !formData.address}
                        className="w-full py-3.5 rounded-xl font-bold mt-4 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                        style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "0 8px 24px hsl(var(--primary)/0.2)" }}
                      >
                        Continue
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="rounded-xl p-3 flex items-center gap-2 mb-2" style={{ background: "hsl(var(--primary)/0.06)", border: "1px solid hsl(var(--primary)/0.13)" }}>
                        <FiTool className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                        <span className="text-xs text-muted-foreground">
                          Step 2 of 3 - What service do you need?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Service needed
                        </label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3.5 pl-12 pr-10 text-foreground focus:outline-none transition-all appearance-none cursor-pointer"
                            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", height: "52px" }}
                          >
                            {serviceOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <SelectedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Urgency
                        </label>
                        <div className="relative">
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3.5 pl-4 pr-10 text-foreground focus:outline-none transition-all appearance-none cursor-pointer"
                            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                          >
                            {urgencyOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Additional details{" "}
                          <span className="text-xs font-normal text-muted-foreground">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          name="serviceDetails"
                          value={formData.serviceDetails}
                          onChange={handleChange}
                          rows={3}
                          className="w-full rounded-xl py-3 px-4 text-foreground focus:outline-none transition-all resize-none"
                          style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", minHeight: "80px" }}
                          placeholder="Tell us about your project, colors, etc."
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                        >
                          Continue
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="rounded-xl p-3 flex items-center gap-2 mb-2" style={{ background: "hsl(var(--primary)/0.06)", border: "1px solid hsl(var(--primary)/0.13)" }}>
                        <FiShield className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                        <span className="text-xs text-muted-foreground">
                          Step 3 of 3 - How should we reach you?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Email address
                        </label>
                        <div className="relative group">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-muted-foreground" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-foreground transition-all focus:outline-none"
                            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                            placeholder="hello@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                          Phone number
                        </label>
                        <div className="relative group">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-muted-foreground" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-foreground transition-all focus:outline-none"
                            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                            placeholder="+1 (386) 246-7999"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.email || !formData.phone}
                          className="flex-1 py-3.5 rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "0 8px 24px hsl(var(--primary)/0.2)" }}
                        >
                          {isSubmitting ? "Sending..." : "Get Free Estimate"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-12 text-center flex flex-col items-center justify-center"
              style={{ minHeight: `${containerHeight}px` }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <FiCheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Estimate Request Sent!
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Thanks for contacting Garnet Companies. We'll reach out within 4 hours with your free estimate.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const { badge, headlines, description, buttons, stats } = completeData.hero;

  const iconComponents = {
    FiArrowRight: FiArrowRight,
    RiBuildingLine: RiBuildingLine,
    FiStar: FiStar,
    FiThumbsUp: FiThumbsUp,
    RiShieldCheckLine: RiShieldCheckLine,
    FiDollarSign: FiDollarSign,
    FiClock: FiClock,
    FiShield: FiShield,
    FiHome: FiHome,
    FiTool: FiTool,
    FiMapPin: FiMapPin,
    FiMessageSquare: FiMessageSquare,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background isolate"
      style={{ backgroundColor: "hsl(var(--color-dark))" }}
    >
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={heroBg}
          alt="Garnet Companies - Expert Restoration & Construction Services Across Colorado's Front Range"
          loading="eager"
          {...({ fetchpriority: "high" } as any)}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full object-cover absolute inset-0 opacity-40 sm:opacity-55 md:opacity-60 will-change-transform"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0" style={{ backgroundColor: "hsl(var(--color-dark) / 0.45)" }} />

        {/* Softened Directional Gradients */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--color-dark) / 0.9) 0%, hsl(var(--color-dark) / 0.5) 50%, transparent 100%)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-24 pb-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">


              <motion.h1
                className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white lg:leading-[1.15] tracking-tight uppercase mt-8 lg:mt-8"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {headlines.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                className="text-base sm:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {description}
              </motion.p>

              <motion.div
                className=" w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  {buttons.map((button, idx) => {
                    const Icon = iconComponents[button.icon as keyof typeof iconComponents];
                    const isFirst = idx === 0;

                    return (
                      <motion.a
                        key={idx}
                        href={button.href}
                        className={`group relative overflow-hidden px-8 py-4 rounded-xl sm:rounded-2xl w-full sm:w-auto inline-flex items-center justify-center gap-3 text-base font-bold transition-all duration-300 active:scale-95 border-2 ${isFirst
                          ? "bg-accent text-white border-transparent hover:bg-accent/80 shadow-lg shadow-accent/20"
                          : "bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white"
                          }`}
                        whileHover={{ y: -4 }}
                      >
                        <span className="relative z-10">{button.text}</span>
                        {Icon && (
                          <Icon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-5 w-full"
                style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {stats.map((stat, idx) => {
                  const StatIcon = iconComponents[stat.icon as keyof typeof iconComponents];
                  return (
                    <div key={stat.label} className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 group mx-auto lg:mx-0">
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        {StatIcon
                          ? <StatIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "hsl(var(--accent))" }} />
                          : <span className="w-4 h-4 rounded-full" style={{ background: "hsl(var(--accent))" }} />
                        }
                      </div>
                      <div className="min-w-0 text-center lg:text-left">
                        <div className="text-base sm:text-xl lg:text-2xl font-black text-white leading-none mb-0.5 break-words">
                          {stat.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold break-words" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <CoatingInquiryForm />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Curved Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-20 lg:h-24"
          style={{ fill: "hsl(var(--background))" }}
        >
          <path d="M0,0V120H1200V0C900,90,300,90,0,0Z"></path>
        </svg>
      </div>
    </section >
  );
};

export default Hero;
