import { useRef, useEffect, useState, memo } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import completeData from "../src/data/completeData.json";
import vectorimage2 from '../assets/vector.png'

gsap.registerPlugin(ScrollTrigger);

type WhyChooseUsData = {
  section: any;
  features: any;
  stats: any;
  cta: any;
};

const Icons = {
  WhyChoose: {
    Veteran: ({ className }: { className?: string }) => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    Experience: ({ className }: { className?: string }) => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    Warranty: ({ className }: { className?: string }) => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    Financing: ({ className }: { className?: string }) => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    Certified: ({ className }: { className?: string }) => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2L3 7v7c0 5.5 9 8 9 8s9-2.5 9-8V7l-9-5z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 12l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    Community: ({ className }: { className?: string }) => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M5 12h14M12 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Sparkle: ({ className }: { className?: string }) => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
        />
      </svg>
    ),
  },
};

const ANIMATION_VARIANTS = {
  float: {
    initial: { y: 0 },
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

const TrustBadge = ({ label, color }: { label: string; color: string }) => {
  const dotColor = color === "green" ? "hsl(142, 71%, 45%)" : color === "blue" ? "hsl(213, 94%, 68%)" : color === "yellow" ? "hsl(38, 92%, 50%)" : "hsl(0, 91%, 71%)";
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{label}</span>
    </div>
  );
};

const vectoroverlay = vectorimage2; // Using the user's imported image

const iconMap = {
  Veteran: Icons.WhyChoose.Veteran,
  Experience: Icons.WhyChoose.Experience,
  Warranty: Icons.WhyChoose.Warranty,
  Financing: Icons.WhyChoose.Financing,
  Certified: Icons.WhyChoose.Certified,
  Community: Icons.WhyChoose.Community,
};

const CinematicBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-20 left-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[80px] will-change-transform transform-gpu"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[80px] will-change-transform transform-gpu"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
                        linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
                    `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-30" />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "0px" });

  const FeatureIcon =
    iconMap[feature.icon as keyof typeof iconMap] || Icons.WhyChoose.Veteran;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);



  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    // Set motion values for tilt
    x.set(xPos / rect.width - 0.5);
    y.set(yPos / rect.height - 0.5);

    // Set state for particles
    setMousePosition({ x: xPos, y: yPos });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 2000,
      }}
      className="relative group h-full cursor-pointer"
    >
      <div className="relative h-full bg-card overflow-hidden rounded-2xl border border-border">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at center, hsl(var(--primary)/0.03), transparent 70%)`,
          }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ x: "100%", opacity: 0 }}
          animate={{
            x: isHovered ? "-100%" : "100%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
        />

        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"
          initial={{ height: 0, top: "50%" }}
          animate={{
            height: isHovered ? "100%" : 0,
            top: isHovered ? 0 : "50%",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[1px] bg-primary/30"
          initial={{ height: 0, top: "50%" }}
          animate={{
            height: isHovered ? "100%" : 0,
            top: isHovered ? 0 : "50%",
          }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          className="absolute top-0 right-0 w-16 h-16"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-16 h-16"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary" />
        </motion.div>

        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                initial={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                  scale: 0,
                  opacity: 0.6,
                }}
                animate={{
                  x: mousePosition.x + (Math.random() - 0.5) * 150,
                  y: mousePosition.y + (Math.random() - 0.5) * 150,
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        <div className="relative h-full p-8 flex flex-col z-10">
          <div className="relative mb-6">
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 border border-primary/20"
                animate={{
                  borderColor: isHovered
                    ? "hsl(var(--primary))"
                    : "hsl(var(--primary)/0.2)",
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute inset-2 border border-primary/10"
                animate={{ rotate: isHovered ? 45 : 0 }}
                transition={{ duration: 0.5 }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    color: isHovered
                      ? "hsl(var(--accent))"
                      : "hsl(var(--accent))",
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-accent"
                >
                  <FeatureIcon />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute -top-2 -right-2 text-accent"
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.2 : 0.8,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.5 }}
            >
              <Icons.WhyChoose.Sparkle />
            </motion.div>
          </div>

          <div className="mb-4">
            <h3
              className={`
                            text-xl md:text-2xl font-bold mb-3 transition-colors duration-300
                            ${isHovered ? "text-accent" : "text-card-foreground"}
                        `}
            >
              {feature.title}
            </h3>

            <motion.div
              className="h-[2px] bg-gradient-to-r from-accent to-accent/30 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "60px" : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </div>

          <motion.p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
            {feature.description}
          </motion.p>

          <motion.div
            className="absolute bottom-4 right-4 text-7xl font-black text-muted-foreground/20 select-none"
            animate={{
              scale: isHovered ? 1.1 : 1,
              color: isHovered
                ? "hsl(var(--primary)/0.1)"
                : "hsl(var(--muted-foreground)/0.05)",
            }}
          >
            {(index + 1).toString().padStart(2, "0")}
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-3"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </span>
            <motion.div
              className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center overflow-hidden"
              animate={{
                backgroundColor: isHovered
                  ? "hsl(var(--accent))"
                  : "hsl(var(--accent)/0.1)",
                width: "28px",
              }}
            >
              <motion.div
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icons.WhyChoose.ArrowRight
                  className={`w-3.5 h-3.5 ${isHovered ? "text-white" : "text-accent"}`}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            boxShadow: isHovered
              ? "20px 20px 40px -20px hsl(var(--primary)/0.3), -20px -20px 40px -20px hsl(var(--primary)/0.1)"
              : "10px 10px 30px -15px hsl(var(--foreground)/0.1)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.article>
  );
};

const StatCounter = ({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const numericValue = parseInt(value);
  const isNumeric = !isNaN(numericValue);
  const [displayValue, setDisplayValue] = useState<number | string>(isNumeric ? 0 : value);
  const [isHovered, setIsHovered] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!inView || !isNumeric) return;

    let startTime: number;
    const duration = 1200;
    const end = numericValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, numericValue, isNumeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-center group cursor-pointer"
    >
      <div className="relative inline-block">
        <motion.div
          className="text-4xl md:text-5xl font-black text-primary relative z-10"
          animate={{
            scale: isHovered ? 1.1 : 1,
            y: isHovered ? -2 : 0,
          }}
        >
          <span>{displayValue}</span>
          {suffix}
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-primary/10 blur-xl"
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-primary rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="text-xs font-semibold tracking-wider text-muted-foreground mt-2 uppercase">
        {label}
      </div>
    </motion.div>
  );
};

interface CTASectionProps {
  cta: WhyChooseUsData['cta'];
}

const CTASection = memo(({ cta }: CTASectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  const floatAnimation = prefersReducedMotion
    ? {}
    : {
      initial: "initial",
      animate: "animate",
      variants: ANIMATION_VARIANTS.float,
    };

  return (
    <div className="relative mt-16 md:mt-24 lg:mt-32">
      {/* CTA Container */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Solid Dark Charcoal Background */}
        <div
          className="absolute inset-0 rounded-3xl bg-foreground"
          style={{
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        />

        {/* Technical Grid Pattern */}
        <div
          className="absolute inset-0 rounded-3xl opacity-[0.08] overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '45px 45px'
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 md:py-8">

          {/* Desktop Layout - Two columns with floating image */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 text-sm font-bold bg-background/10 border border-white/20 rounded-lg text-white backdrop-blur-sm">
                  READY TO BUILD
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight text-white [&_span]:text-white"
                dangerouslySetInnerHTML={{ __html: cta.title }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-white font-medium text-lg max-w-lg"
              >
                {cta.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                {cta.buttons.map((button, idx) => (
                  <motion.a
                    key={idx}
                    href={button.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                                            px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg
                                            flex items-center gap-2
                                            ${button.primary
                        ? 'bg-accent text-white '
                        : 'bg-transparent text-white border-2 border-white/20 hover:bg-white/5 backdrop-blur-sm'
                      }
                                        `}
                  >
                    {button.text}
                    <Icons.WhyChoose.ArrowRight />
                  </motion.a>
                ))}
              </motion.div>

              {/* Trust Badges */}
              <div className="mt-8 flex gap-4">
                <TrustBadge label="Licensed & Insured" color="green" />
                <TrustBadge label="Free Estimate" color="blue" />
                <TrustBadge label="24/7 Support" color="red" />
              </div>
            </div>

            {/* Right Column - Floating Image */}
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-30rem] w-[85%] lg:w-[95%]"
                style={{ right: '-5%' }}
              >
                <img
                  src={vectoroverlay}
                  alt="Garnet Companies Professional"
                  loading="eager"
                  className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] will-change-transform transform-gpu"
                />
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout - Centered text, no image */}
          <div className="lg:hidden text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-3 py-1.5 text-xs font-semibold bg-background/20 border border-white/30 rounded-full text-white/90 backdrop-blur-sm">
                GARNET COMPANIES
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold leading-[1.2] text-white [&_span]:text-white"
              dangerouslySetInnerHTML={{ __html: cta.title }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-white font-medium text-base max-w-md mx-auto"
            >
              {cta.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
            >
              {cta.buttons.map((button, idx) => (
                <motion.a
                  key={idx}
                  href={button.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                                          px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg
                                          flex items-center justify-center gap-2
                                          ${button.primary
                      ? 'bg-accent text-white hover:bg-accentDark shadow-lg shadow-accent/20'
                      : 'bg-transparent text-white border-2 border-white/20 hover:bg-white/5'
                    }
                                      `}
                >
                  {button.text}
                  <Icons.WhyChoose.ArrowRight />
                </motion.a>
              ))}
            </motion.div>

            {/* Trust Badges - Mobile */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <TrustBadge label="Licensed & Insured" color="green" />
              <TrustBadge label="Free Estimate" color="blue" />
              <TrustBadge label="24/7 Support" color="red" />
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

CTASection.displayName = "CTASection";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const { section, features, stats, cta } = completeData.whyChooseUs;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-20 md:py-24 lg:py-32 overflow-hidden"
      aria-label="Why Choose Garnet Companies"
    >
      <CinematicBackground />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20">
        <header className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="reveal-text"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-[2px] bg-accent" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
                {section.badge}
              </span>
              <div className="w-16 h-[2px] bg-accent" />
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: section.headline }}
            />

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {section.description}
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature: any, index: number) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-24">
          {stats.map((stat: any, index: number) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        <CTASection cta={cta} />
      </div>
    </section>
  );
};

export default WhyChooseUs;
