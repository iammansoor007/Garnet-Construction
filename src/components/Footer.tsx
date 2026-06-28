import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import completeData from "../src/data/completeData.json";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand palette constants (Garnet Companies) ─────────────────────────── */
const GOLD = "hsl(var(--primary))"; // Deep Garnet (#6D0F26)
const DARK_GOLD = "hsl(var(--primary) / 0.7)"; // Darker Garnet (#4A0B1A)
const SILVER = "hsl(var(--color-border-light))"; // Light border (#E2E8F0)
const BG = "hsl(var(--color-dark))"; // Dark Footer Background
const CARD = "rgba(255, 255, 255, 0.04)"; // Brand card translucent background
const GRAPHITE = "rgba(255, 255, 255, 0.08)"; // Translucent borders

/* ─── Unsplash Images ──────────────────────────────────── */
const Images = {
  Abstract:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  Pattern:
    "https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
};

/* ─── Icon library ─────────────────────────────────────── */
const Icons = {
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h4v12H4V8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8h4v2c.6-.8 1.5-2 3-2 2.5 0 4 1.5 4 4v8h-4v-6c0-1.5-.5-2-2-2s-2 .5-2 2v6h-4V8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.8 9 5-.2-2.2.6-4.5 2.5-6 2.5-2 6-1.5 7.5 1 1.1-.2 2.2-.6 3-1 0 0-.5 1.7-2 3 1.1-.1 2-.5 3-1 0 0-.5 1.6-2 3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Google: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10c2.4 0 4.6-.85 6.3-2.28l-2.5-2.5c-.97.58-2.1.9-3.3.9-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6h-3l4 4 4-4h-3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Phone: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Location: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L20 6v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Warranty: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Paint: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 10L12 3L21 10L18 13L12 8L6 13L3 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 13V19H18V13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Repair: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M16 4L20 8L12 16H8V12L16 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20H20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Replacement: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M20 12H4M12 4v16M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Residential: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 10L12 3L21 10L18 13L12 8L6 13L3 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 13V19H16V13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Commercial: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8V4H16V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Emergency: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Maintenance: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Inspection: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Financing: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  CreditCard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Image: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 16l-4-4-5 5-3-3-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  FileText: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

const iconMap: Record<string, () => JSX.Element> = {
  Repair: Icons.Repair,
  Replacement: Icons.Replacement,
  Inspection: Icons.Inspection,
  Maintenance: Icons.Maintenance,
  Residential: Icons.Residential,
  Commercial: Icons.Commercial,
  Emergency: Icons.Emergency,
  Paint: Icons.Paint,
  Warranty: Icons.Warranty,
  Financing: Icons.Financing,
  CreditCard: Icons.CreditCard,
  Image: Icons.Image,
  FileText: Icons.FileText,
  Star: Icons.Star,
  Shield: Icons.Shield,
  Linkedin: Icons.Linkedin,
  Twitter: Icons.Twitter,
  Instagram: Icons.Instagram,
  Facebook: Icons.Facebook,
  Google: Icons.Google,
};

/* ─── Parallax helper ──────────────────────────────────── */
const ParallaxLayer = ({
  children,
  speed = 0.05,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={`absolute inset-0 will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
};

/* ─── Newsletter form ──────────────────────────────────── */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: CARD,
            border: `1px solid ${isFocused ? GOLD + "60" : GRAPHITE}`,
            boxShadow: isFocused ? `0 0 24px ${GOLD}20` : "none",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            transition: "all 0.4s",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "hsl(var(--color-white))",
              fontSize: "0.8rem",
              padding: "0.85rem 1.25rem",
              flex: 1,
              fontFamily: "inherit",
            }}
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${DARK_GOLD})`,
              color: "hsl(var(--color-white))",
              border: "none",
              borderRadius: 999,
              padding: "0.65rem 1.25rem",
              margin: "0.25rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            Subscribe <Icons.ArrowRight />
          </motion.button>
        </div>
      </form>
      <AnimatePresence>
        {isSubscribed && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ color: GOLD, fontSize: "0.72rem", marginTop: "0.5rem", textAlign: "center" }}
          >
            ✓ Thank you for subscribing
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Social links ─────────────────────────────────────── */
const SocialLinks = () => {
  const { social } = completeData.footer;
  return (
    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
      {social.map((item: any) => {
        const SocialIcon = iconMap[item.icon as keyof typeof iconMap] || Icons.Linkedin;
        return (
          <motion.a
            key={item.platform}
            href={item.href}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label={item.platform}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: CARD,
              border: `1px solid ${GRAPHITE}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: SILVER,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s",
            }}
            className="footer-social-btn"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.border = `1px solid ${GOLD}60`;
              (e.currentTarget as HTMLElement).style.color = GOLD;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.border = `1px solid ${GRAPHITE}`;
              (e.currentTarget as HTMLElement).style.color = SILVER;
            }}
          >
            <SocialIcon />
          </motion.a>
        );
      })}
    </div>
  );
};

/* ─── Service links ────────────────────────────────────── */
const ServiceLinks = () => {
  const { services } = completeData.footer;
  return (
    <div>
      <h4
        style={{
          fontSize: "0.65rem",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <Icons.Sparkle /> {services.title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
        {services.main.map((service: any) => {
          const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Icons.Paint;
          return (
            <motion.a
              key={service.label}
              href={service.href}
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: SILVER,
                fontSize: "0.8rem",
                textDecoration: "none",
                padding: "0.35rem 0",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = GOLD)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = SILVER)}
            >
              <span style={{ color: GOLD + "80", flexShrink: 0 }}>
                <ServiceIcon />
              </span>
              {service.label}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Materials section ────────────────────────────────── */
const MaterialsSection = () => {
  const { services } = completeData.footer;
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h5
        style={{
          fontSize: "0.6rem",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: GOLD + "99",
          marginBottom: "0.75rem",
        }}
      >
        {services.materials.title}
      </h5>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {services.materials.items.map((material: any) => (
          <motion.a
            key={material.label}
            href={material.href}
            whileHover={{ y: -1 }}
            style={{
              padding: "0.25rem 0.75rem",
              background: GRAPHITE,
              border: `1px solid ${GRAPHITE}`,
              borderRadius: 999,
              color: SILVER,
              fontSize: "0.7rem",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = GOLD + "60";
              (e.currentTarget as HTMLElement).style.color = GOLD;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = GRAPHITE;
              (e.currentTarget as HTMLElement).style.color = SILVER;
            }}
          >
            {material.label}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

/* ─── Contact info ─────────────────────────────────────── */
const ContactInfo = () => {
  const { contact } = completeData.footer;
  const items = [
    { icon: <Icons.Mail />, value: contact.email, href: `mailto:${contact.email}`, clickable: true },
    { icon: <Icons.Phone />, value: contact.phone, href: `tel:${contact.phone}`, clickable: true },
    { icon: <Icons.Location />, value: contact.address, href: null, clickable: false },
    { icon: <Icons.Clock />, value: contact.emergency, href: null, clickable: false },
  ];

  return (
    <div>
      <h4
        style={{
          fontSize: "0.65rem",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <Icons.Sparkle /> {contact.title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        {items.map((item, i) =>
          item.clickable ? (
            <a
              key={i}
              href={item.href!}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
                color: SILVER,
                fontSize: "0.82rem",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = GOLD)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = SILVER)}
            >
              <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
              {item.value}
            </a>
          ) : (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
                color: SILVER + "bb",
                fontSize: "0.82rem",
              }}
            >
              <span style={{ color: GOLD + "99", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
              {item.value}
            </div>
          )
        )}
      </div>

      {/* Service Areas */}
      <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: `1px solid ${GRAPHITE}` }}>
        <h5
          style={{
            fontSize: "0.6rem",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: GOLD + "99",
            marginBottom: "0.5rem",
          }}
        >
          Service Areas
        </h5>
        <p style={{ fontSize: "0.78rem", color: SILVER + "99", lineHeight: 1.7 }}>{contact.areas}</p>
      </div>
    </div>
  );
};

/* ─── Office hours ─────────────────────────────────────── */
const OfficeHours = ({ hours }: { hours: any }) => (
  <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: `1px solid ${GRAPHITE}` }}>
    <h4
      style={{
        fontSize: "0.65rem",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: GOLD,
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      <Icons.Sparkle /> Office Hours
    </h4>
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.78rem" }}>
      {[
        { day: "Monday – Friday", val: hours.monday },
        { day: "Saturday", val: hours.saturday },
        { day: "Sunday", val: hours.sunday },
      ].map((row) => (
        <div key={row.day} style={{ display: "flex", justifyContent: "space-between", color: SILVER + "bb" }}>
          <span>{row.day}</span>
          <span style={{ color: GOLD + "cc" }}>{row.val}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Certifications grid ──────────────────────────────── */
const CertificationsGrid = () => {
  const { certifications } = completeData.footer;
  return (
    <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: `1px solid ${GRAPHITE}` }}>
      <h4
        style={{
          fontSize: "0.65rem",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <Icons.Sparkle /> Certifications
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certifications.map((cert: any, i: number) => {
          const CertIcon = iconMap[cert.icon as keyof typeof iconMap] || Icons.Shield;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ borderColor: GOLD + "50" }}
              style={{
                padding: "0.6rem 0.75rem",
                background: BG,
                border: `1px solid ${GRAPHITE}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "border-color 0.3s",
                cursor: "default",
              }}
            >
              <span style={{ color: GOLD, flexShrink: 0 }}>
                <CertIcon />
              </span>
              <div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: GOLD, display: "block", fontFamily: "'Montserrat', sans-serif" }}>
                  {cert.cert}
                </span>
                <span style={{ fontSize: "0.62rem", color: SILVER + "77" }}>{cert.number}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Scrolling marquee ────────────────────────────────── */
const LegacyMarquee = () => {
  const { marquee } = completeData.footer;
  const texts: string[] = marquee.texts;
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "1.5rem 0",
        borderTop: `1px solid ${GRAPHITE}`,
        borderBottom: `1px solid ${GRAPHITE}`,
        margin: "2rem 0 0",
        position: "relative",
      }}
    >
      {/* Fade masks */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 8%, transparent 92%, ${BG} 100%)`, zIndex: 1, pointerEvents: "none" }} />
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap" }}
        animate={{ x: [0, -1200] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "2rem", marginRight: "2rem" }}>
            {texts.map((text, j) => (
              <span key={j} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: GOLD + "55" }}><Icons.Sparkle /></span>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: SILVER + "55", fontFamily: "'Montserrat', sans-serif" }}>
                  {text}
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Main Footer ──────────────────────────────────────── */
const Footer = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const { company, quickLinks, bottom, hours } = completeData.footer;

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <footer
      ref={sectionRef}
      style={{ background: BG, position: "relative", overflow: "hidden" }}
    >
      {/* ── Gold top border bar ── */}
      <div style={{ height: 3, background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD} 70%, transparent 100%)` }} />

      {/* ── Background architecture ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Tech grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `linear-gradient(to right, ${GOLD} 1px, transparent 1px), linear-gradient(to bottom, ${GOLD} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Center glow */}
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: `radial-gradient(circle, hsl(var(--primary) / 0.03) 0%, transparent 70%)`, borderRadius: "50%" }} />
      </div>

      {/* ── Floating ambient blobs ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-8%", left: "-8%", width: 450, height: 450, background: `radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(60px)", willChange: "transform" }}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 100, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "20%", right: "-5%", width: 350, height: 350, background: `radial-gradient(circle, hsl(var(--primary) / 0.03) 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(50px)", willChange: "transform" }}
        />
      </div>

      {/* ── Parallax overlay images ── */}
      <ParallaxLayer speed={0.03} className="z-0">
        <div style={{ position: "absolute", top: "10%", right: 0, width: "35%", height: "60%" }}>
          <img src={Images.Abstract} alt="" className="w-full h-full object-cover" style={{ opacity: 0.03 }} />
        </div>
      </ParallaxLayer>
      <ParallaxLayer speed={0.05} className="z-0">
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "28%", height: "40%" }}>
          <img src={Images.Pattern} alt="" loading="lazy" className="w-full h-full object-cover" style={{ opacity: 0.03 }} />
        </div>
      </ParallaxLayer>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-16 pb-12">

          {/* Col 1 – Brand + newsletter */}
          <div className="footer-reveal space-y-6">
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, ${DARK_GOLD})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px hsl(var(--primary)/0.3)` }}>
                <span style={{ color: "hsl(var(--color-white))", fontWeight: 900, fontSize: "0.85rem", fontFamily: "var(--font-heading)", letterSpacing: "0.05em" }}>GC</span>
              </div>
              <div>
                <span style={{ color: "hsl(var(--color-white))", fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 600, display: "block" }}>{company.name}</span>
                <span style={{ color: "hsl(var(--primary) / 0.6)", fontFamily: "var(--font-heading)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{company.tagline}</span>
              </div>
            </div>

            <p style={{ color: "hsl(var(--color-border-light) / 0.6)", fontSize: "0.8rem", lineHeight: 1.8, maxWidth: 360 }}>{company.description}</p>

            <SocialLinks />

            {/* Newsletter */}
            <div>
              <h4 style={{ fontSize: "0.62rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(var(--primary) / 0.53)", marginBottom: "0.6rem" }}>
                Subscribe to Insights
              </h4>
              <NewsletterForm />
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {quickLinks.map((link: any) => {
                const LinkIcon = iconMap[link.icon as keyof typeof iconMap] || Icons.Star;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{ fontSize: "0.65rem", color: "hsl(var(--color-border-light) / 0.46)", display: "flex", alignItems: "center", gap: "0.3rem", textDecoration: "none", transition: "color 0.2s", fontFamily: "'Montserrat', sans-serif" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = GOLD)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--color-border-light) / 0.46)")}
                  >
                    <LinkIcon /> {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2 – Services */}
          <div className="footer-reveal">
            <ServiceLinks />
            <MaterialsSection />
          </div>

          {/* Col 3 – Contact + Hours + Certs */}
          <div className="footer-reveal md:col-span-2 lg:col-span-1">
            <ContactInfo />
            {hours && <OfficeHours hours={hours} />}
            <CertificationsGrid />
          </div>
        </div>

        {/* Scrolling marquee */}
        <LegacyMarquee />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-border/10 text-[11px] text-muted-foreground/50 font-medium font-body text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <span>{bottom.copyright}</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-primary/20" />
            <span>{bottom.rights}</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {bottom.links.map((link: any) => (
              <a
                key={link.label}
                href={link.href}
                style={{ color: "hsl(var(--color-border-light) / 0.33)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = GOLD)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--color-border-light) / 0.33)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "hsl(var(--color-border-light) / 0.2)", textDecoration: "none", transition: "color 0.2s", fontFamily: "'Montserrat', sans-serif" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = GOLD)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--color-border-light) / 0.2)")}
          >
            {bottom.tagline}
          </a>
        </div>
      </div>

      {/* ── Subtle bottom glow ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to top, hsl(var(--primary) / 0.024), transparent)`, pointerEvents: "none" }} />
    </footer>
  );
};

export default Footer;
