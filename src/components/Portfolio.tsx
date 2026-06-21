import { useRef, useEffect, useState, useMemo, forwardRef } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Palette,
  CheckCircle2,
  MapPin,
  ExternalLink
} from "lucide-react";
import completeData from "../src/data/completeData.json";

import imgWaterDamage from "@/assets/waterdamage.jfif";
import imgFireDamage from "@/assets/firedamage.jfif";
import imgCommercialConstruction from "@/assets/commercialconstruvtion.jfif";
import imgStormDamage from "@/assets/stormdamage.jfif";
import imgResidentialConstruction from "@/assets/residentalconstrcution.jfif";

const projectImages: Record<string, string> = {
  portfolio1: imgWaterDamage,
  portfolio2: imgFireDamage,
  portfolio3: imgCommercialConstruction,
  portfolio4: imgStormDamage,
  portfolio5: imgResidentialConstruction,
};

const MasonryCard = forwardRef<HTMLDivElement, { project: any; index: number }>(({ project, index }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  // Varied heights for masonry feel
  const isTall = index % 3 === 0;

  const resolvedImage = projectImages[project.image as keyof typeof projectImages] || projectImages.portfolio1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative mb-8 break-inside-avoid"
    >
      <div 
        className="relative overflow-hidden bg-card w-full"
        style={{ aspectRatio: isTall ? "3/4" : "1/1" }}
      >
        {/* Project Image */}
        <motion.img
          src={resolvedImage}
          alt={project.title}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-700"
          animate={{ scale: isHovered ? 1.08 : 1 }}
        />

        {/* Artistic Brush Stroke Mask Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center p-8 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl"
          >
            <ExternalLink className="w-6 h-6" />
          </motion.div>

          {/* Decorative Brush Stroke SVGs */}
          <div className="absolute top-0 left-0 w-full opacity-40 rotate-180">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20 fill-primary">
              <path d="M0,0 C150,100 350,0 500,100 L500,00 L0,0 Z"></path>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-full opacity-40">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20 fill-primary">
              <path d="M0,0 C150,100 350,0 500,100 L500,00 L0,0 Z"></path>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Content Area - Properly positioned below the image */}
      <div className="p-5 md:p-8 border-x border-b border-border bg-card">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-accent font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3">
          <MapPin className="w-3 h-3" />
          {project.location}
          <span className="text-muted-foreground/30 px-1 md:px-2">/</span>
          {project.year}
        </div>

        <h3 className="text-xl md:text-2xl font-black text-foreground uppercase italic tracking-tighter leading-none mb-3 md:mb-4 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-[12px] md:text-sm leading-relaxed line-clamp-2 mb-4 md:mb-6">
          {project.desc}
        </p>

        <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-foreground/70">
              {project.scope}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-accent transform group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
});

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { section, projects } = completeData.portfolio;

  const categories = ["All", "Residential", "Commercial", "HOA"];

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects;
    return projects.filter(p =>
      p.category.toLowerCase().includes(activeTab.toLowerCase())
    );
  }, [activeTab, projects]);

  return (
    <section id="portfolio" className="relative bg-background py-20 md:py-32 overflow-hidden border-t border-border">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-primary/[0.03] rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-8 relative z-10">
        {/* Structured Header - Centralized */}
        <div className="flex flex-col items-center text-center gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mb-4 md:mb-6 bg-accent/10 px-4 py-2 rounded-full border border-accent/20 shadow-sm"
            >
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-accent/20">
                <Palette className="w-3 h-3" />
              </div>
              <span className="text-accent uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-black">
                {section.badge}
              </span>
            </motion.div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tighter leading-none text-center"
              dangerouslySetInnerHTML={{ __html: section.headline }}
            />
          </div>
        </div>

          {/* Minimalist Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative py-2 ${activeTab === cat
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {cat}
                {activeTab === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

        {/* Artistic Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <MasonryCard
                key={project.number}
                project={project}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* View All Action */}
        <div className="mt-16 md:mt-20 pt-16 md:pt-20 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-foreground">
              Ready to see more?
            </h4>
            <p className="text-muted-foreground text-[10px] md:text-sm uppercase tracking-widest mt-1">
              Browse our complete archive of professional installations
            </p>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full md:w-auto inline-flex items-center justify-center gap-4 md:gap-6 bg-accent text-white hover:bg-accentDark px-6 md:px-10 py-4 md:py-5 font-black uppercase tracking-[0.2em] shadow-lg shadow-accent/15 transition-all"
          >
            <span>Load More Projects</span>
            <div className="hidden md:block w-8 h-[2px] bg-current transform group-hover:w-12 transition-all" />
            <ArrowRight className="md:hidden w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
