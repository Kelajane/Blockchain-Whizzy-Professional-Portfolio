import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { 
  SiX 
} from "react-icons/si";
import { 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaFacebookF, 
  FaWhatsapp, 
  FaTelegramPlane 
} from "react-icons/fa";
import { 
  ExternalLink, 
  Menu, 
  X, 
  ArrowRight,
  Code,
  Palette,
  Cpu,
  Database,
  Search,
  ChevronUp,
  Zap,
  Users,
  Shield,
  Award,
  Target,
  CheckCircle2,
  Clock,
  PauseCircle,
  ChevronDown,
  Send,
  Download,
  Terminal,
  Loader2,
  Key
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { GoogleGenAI, Modality } from "@google/genai";
import { cn } from "./lib/utils";
import { 
  PERSONAL_INFO, 
  PROJECTS, 
  EXPERIENCES, 
  SKILLS, 
  SOCIAL_LINKS,
  CERTIFICATIONS
} from "./constants";
import { Project } from "./types";

const TypingText = ({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return <span>{displayedText}<span className="animate-pulse text-neon-blue">_</span></span>;
};

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
      <motion.div 
        className="h-full bg-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const FloatingNodes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-blue rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: [null, Math.random() * 100 + "%"],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(project.demoVideo || null);

  useEffect(() => {
    const checkKey = async () => {
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  const openKeyDialog = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleExecute = async (e: React.MouseEvent) => {
    if (project.link === "#" || !project.link) {
      e.preventDefault();

      // Special handling for Professional Portfolio Website generation
      if (project.title === "Professional Portfolio Website" && !generatedVideoUrl) {
        if (!hasApiKey) {
          toast.error("API Key Required", {
            description: "Please select an API key to generate the demo video.",
            action: {
              label: "Select Key",
              onClick: openKeyDialog
            }
          });
          return;
        }
      }

      setIsExecuting(true);
      
      toast.info("Initiating Protocol...", {
        description: `Establishing secure connection for ${project.title}`,
        icon: <Terminal className="w-4 h-4" />,
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (project.title === "Professional Portfolio Website" && !generatedVideoUrl) {
        toast.loading("Generating Cinematic Demo Video...", {
          id: "execution-step",
          description: "This process takes about 2-3 minutes. Please stay on this page.",
        });

        try {
          const apiKey = (process.env as any).API_KEY;
          if (!apiKey) throw new Error("API_KEY_MISSING");
          
          const ai = new GoogleGenAI({ apiKey });
          
          let operation = await ai.models.generateVideos({
            model: 'veo-3.1-lite-generate-preview',
            prompt: 'A cinematic, high-quality 16:9 product demo video showcasing the creation of a professional portfolio website from scratch. Stage 1: A blank digital canvas in a dark-themed design tool. A cursor moves rapidly, drawing white wireframe boxes for a hero section and a project grid. Stage 2: Sleek sans-serif typography appears, with a bold heading "CREATIVE DEVELOPER". Stage 3: Visual design elements are added—deep charcoal backgrounds, vibrant neon blue and purple glowing accents, and high-resolution project thumbnails sliding into place. Stage 4: The interface becomes interactive, showing a mobile responsive view shrinking and expanding smoothly. Stage 5: The final reveal of a polished, premium portfolio website with smooth hover effects and glowing borders. The style is tech-focused, clean, and realistic.',
            config: {
              numberOfVideos: 1,
              resolution: '1080p',
              aspectRatio: '16:9'
            }
          });

          // Poll for completion
          while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation });
          }

          const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
          if (downloadLink) {
            const response = await fetch(downloadLink, {
              method: 'GET',
              headers: {
                'x-goog-api-key': apiKey,
              },
            });

            if (!response.ok) {
              if (response.status === 403) throw new Error("PERMISSION_DENIED");
              throw new Error(`Fetch failed: ${response.statusText}`);
            }

            const blob = await response.blob();
            const localUrl = URL.createObjectURL(blob);
            setGeneratedVideoUrl(localUrl);
            
            toast.success("Demo Video Generated!", {
              id: "execution-step",
              description: "The protocol has been fully executed. Live demo is ready.",
            });
          } else {
            throw new Error("No video URI returned");
          }
        } catch (error: any) {
          console.error("Generation error:", error);
          
          const isPermissionError = error.message?.includes("PERMISSION_DENIED") || 
                                   error.status === 403 || 
                                   JSON.stringify(error).includes("PERMISSION_DENIED") ||
                                   error.message?.includes("Requested entity was not found");

          if (isPermissionError) {
            setHasApiKey(false);
            toast.error("Permission Denied (403)", {
              id: "execution-step",
              description: "This key lacks permissions. Ensure 'Generative Language API' is enabled and the project has an active Billing Account (required for Veo).",
              action: {
                label: "How to Fix",
                onClick: () => window.open("https://ai.google.dev/gemini-api/docs/billing", "_blank")
              }
            });
          } else if (error.message === "API_KEY_MISSING") {
            toast.error("API Key Missing", {
              id: "execution-step",
              description: "No API key was found. Please select a key to continue.",
              action: {
                label: "Select Key",
                onClick: openKeyDialog
              }
            });
          } else {
            toast.error("Protocol Interrupted", {
              id: "execution-step",
              description: "An unexpected error occurred during video generation.",
            });
          }
          setIsExecuting(false);
          return;
        }
      } else {
        toast.loading("Synchronizing with Blockchain Node...", {
          id: "execution-step",
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        toast.success("Protocol Executed Successfully!", {
          id: "execution-step",
          description: "All systems operational. Access granted.",
          duration: 4000,
        });
      }
      
      setIsExecuting(false);
      setShowDemo(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-bg-dark/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] bg-bg-dark border border-neon-blue/30 overflow-y-auto futuristic-card p-0 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/50 hover:text-neon-blue transition-colors z-10"
        >
          <X size={32} />
        </button>

        <AnimatePresence mode="wait">
          {showDemo && generatedVideoUrl ? (
            <motion.div 
              key="demo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full aspect-video bg-black relative"
            >
              <video 
                src={generatedVideoUrl} 
                autoPlay 
                controls 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-4 left-4 px-4 py-2 bg-neon-blue text-black font-display font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors z-20"
              >
                Exit Demo
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="aspect-video w-full relative overflow-hidden border-b border-white/10">
                <img 
                  src={`${project.image}?w=1600&q=90`} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest border border-white/20 backdrop-blur-md mb-4",
                    project.status === "Completed" ? "bg-neon-blue/20 text-neon-blue border-neon-blue/50" : 
                    project.status === "In Progress" ? "bg-blue-500/20 text-blue-400 border-blue-400/50" : "bg-yellow-500/20 text-yellow-400 border-yellow-400/50"
                  )}>
                    {project.status === "Completed" && <CheckCircle2 size={12} />}
                    {project.status === "In Progress" && <Clock size={12} />}
                    {project.status === "On Hold" && <PauseCircle size={12} />}
                    {project.status}
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-widest text-white">{project.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-10 lg:p-12 space-y-8 lg:space-y-12">
                <div className="grid md:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-neon-blue mb-4">Mission Brief</h3>
                      <p className="text-lg lg:text-xl text-white/70 leading-relaxed font-light">{project.longDescription || project.description}</p>
                    </div>

                    {project.challenges && (
                      <div>
                        <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-neon-purple mb-4">Operational Challenges</h3>
                        <ul className="space-y-4">
                          {project.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-4 text-white/60 font-light">
                              <div className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-2.5 flex-shrink-0 shadow-[0_0_5px_rgba(160,32,240,1)]" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || project.tags).map(tech => (
                          <span key={tech} className="px-3 py-1 border border-white/10 bg-white/5 text-[10px] font-display font-bold uppercase tracking-widest text-white/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.link && (
                      <div className="space-y-4">
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleExecute}
                          className={cn(
                            "inline-flex items-center w-full justify-center py-4 bg-neon-blue text-black font-display font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]",
                            isExecuting && "opacity-70 cursor-wait pointer-events-none"
                          )}
                        >
                          {isExecuting ? (
                            <>Executing Protocol... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                          ) : (
                            <>
                              {project.title === "Professional Portfolio Website" && !generatedVideoUrl && !hasApiKey ? (
                                <span className="flex items-center" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openKeyDialog(); }}>
                                  Select API Key for Demo <Key className="ml-2 w-5 h-5" />
                                </span>
                              ) : (
                                <>{project.title === "Professional Portfolio Website" && !generatedVideoUrl ? "Generate & Execute" : "Execute Protocol"} <ExternalLink className="ml-2 w-5 h-5" /></>
                              )}
                            </>
                          )}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const CertificateModal = ({ image, title, onClose }: { image: string; title: string; onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-bg-dark/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-5xl bg-bg-dark border border-neon-blue/30 futuristic-card p-2 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/50 hover:text-neon-blue transition-colors z-10 flex items-center gap-2 font-display text-[10px] uppercase tracking-widest group"
        >
          Close Protocol <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
        <div className="relative overflow-hidden bg-black/40 border border-white/5">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-dark/20 to-transparent" />
        </div>
        <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg md:text-xl font-display font-bold uppercase tracking-widest text-white">{title}</h3>
          <div className="flex items-center gap-3 text-neon-blue">
            <Award size={20} className="animate-pulse" />
            <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em]">Verified Node Credential</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
      isScrolled ? "bg-bg-dark/80 backdrop-blur-lg border-neon-blue/20 py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-display font-black tracking-widest text-neon-blue drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
          BW<span className="text-neon-purple">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-white/70 hover:text-neon-blue transition-all hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-neon-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg-dark border-b border-neon-blue/20 p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-lg font-display font-bold uppercase tracking-widest text-white hover:text-neon-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 relative">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      viewport={{ once: true }}
      className="h-1 bg-neon-blue mb-4 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
    />
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-display font-black uppercase tracking-widest leading-none mb-4 text-white"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-white/50 font-medium max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-[10px] font-display font-bold uppercase tracking-widest mb-2 text-neon-blue">Name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={cn(
            "w-full p-4 bg-white/5 border border-white/10 focus:outline-none focus:border-neon-blue transition-all text-white",
            errors.name && "border-red-500"
          )}
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-[10px] font-display font-bold uppercase tracking-widest mb-2 text-neon-blue">Email</label>
        <input 
          type="email" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={cn(
            "w-full p-4 bg-white/5 border border-white/10 focus:outline-none focus:border-neon-blue transition-all text-white",
            errors.email && "border-red-500"
          )}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-[10px] font-display font-bold uppercase tracking-widest mb-2 text-neon-blue">Message</label>
        <textarea 
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={cn(
            "w-full p-4 bg-white/5 border border-white/10 focus:outline-none focus:border-neon-blue transition-all text-white resize-none",
            errors.message && "border-red-500"
          )}
          placeholder="Tell me about your project..."
        />
        {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.message}</p>}
      </div>
      <button 
        disabled={isSubmitting}
        className="w-full py-4 bg-neon-blue text-black font-display font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,240,255,0.4)]"
      >
        {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
      </button>
      {isSuccess && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neon-blue text-xs font-bold uppercase text-center"
        >
          Thank you! I'll get back to you soon.
        </motion.p>
      )}
    </form>
  );
};

const ProjectSkeleton = () => (
  <div className="futuristic-card flex flex-col h-full opacity-50 relative overflow-hidden">
    <div className="aspect-video mb-6 lg:mb-8 overflow-hidden border border-white/5 relative bg-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
    </div>
    <div className="h-8 w-3/4 bg-white/10 mb-3 lg:mb-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
    </div>
    <div className="h-4 w-full bg-white/5 mb-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
    </div>
    <div className="h-4 w-5/6 bg-white/5 mb-6 lg:mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
    </div>
    <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-6 w-16 bg-white/5 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
        </div>
      ))}
    </div>
    <div className="h-4 w-1/3 bg-white/10 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
    </div>
  </div>
);

export default function App() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [skillsSearch, setSkillsSearch] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCert, setActiveCert] = useState<{ image: string; title: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedTag, selectedStatus]);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const { scrollY } = useScroll();
  const aboutImageY = useTransform(scrollY, [1000, 2000], [0, -50]);

  // Mouse Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = (e.clientX - rect.left) / width - 0.5;
    const mouseYRelative = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXRelative);
    mouseY.set(mouseYRelative);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const allTags = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];
  const allStatuses = ["All", "Completed", "In Progress", "On Hold"];

  const filteredProjects = PROJECTS.filter(p => {
    const matchesTag = selectedTag === "All" || p.tags.includes(selectedTag);
    const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
    return matchesTag && matchesStatus;
  });

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

  const filteredSkills = SKILLS.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.toLowerCase().includes(skillsSearch.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const AchievementIcon = ({ name }: { name: string }) => {
    const icons: Record<string, any> = { Zap, Users, Shield, Award, Target };
    const Icon = icons[name] || Zap;
    return <Icon className="w-4 h-4 text-accent" />;
  };

  return (
    <div className="min-h-screen selection:bg-neon-blue selection:text-black bg-bg-dark text-white grid-pattern relative">
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
      <ScrollProgress />
      <Nav />

      <AnimatePresence>
        {activeProject && (
          <ProjectModal 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
        {activeCert && (
          <CertificateModal
            image={activeCert.image}
            title={activeCert.title}
            onClose={() => setActiveCert(null)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 lg:pt-64 lg:pb-48 px-6 relative overflow-hidden">
        <FloatingNodes />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-blue/5 to-transparent pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1 border border-neon-blue/30 text-neon-blue text-[10px] font-display font-bold uppercase tracking-[0.3em] mb-8 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <span className="inline-block w-2 h-2 bg-neon-blue rounded-full mr-2 animate-pulse" />
            System Online: Available for new opportunities
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl sm:text-7xl md:text-8xl 2xl:text-[10rem] font-display font-black uppercase tracking-tighter leading-[0.85] mb-12 text-white"
          >
            <TypingText text={PERSONAL_INFO.name} />
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-end">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-light leading-tight text-white/70">
                <TypingText 
                  text={`${PERSONAL_INFO.nickname} — A multidisciplinary creator specializing in Frontend, Design, and Blockchain.`} 
                  delay={1.5} 
                  speed={30}
                />
              </div>
            </motion.div>

            <div className="hidden lg:block w-px h-32 bg-white/10" />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              {PERSONAL_INFO.roles.map((role, idx) => (
                <motion.span 
                  key={role} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="px-4 py-2 border border-white/10 bg-white/5 font-mono text-sm md:text-base font-bold uppercase tracking-widest text-white/50 hover:text-neon-blue hover:border-neon-blue hover:bg-neon-blue/5 transition-all cursor-default"
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 lg:py-48 bg-white/5 backdrop-blur-sm px-6 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="About Me" />
            <div className="space-y-8 text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed font-light">
              <p>{PERSONAL_INFO.about}</p>
              <div className="p-8 md:p-12 border-l-2 border-neon-purple bg-neon-purple/5 italic text-white/90 text-xl md:text-2xl font-light">
                "{PERSONAL_INFO.story}"
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.a
                  href={PERSONAL_INFO.resume}
                  download
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neon-blue text-black font-display font-bold uppercase tracking-widest hover:bg-white transition-colors group"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end perspective-1000"
            style={{ y: aboutImageY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="relative w-64 h-80 sm:w-80 sm:h-[400px] md:w-96 md:h-[480px] lg:w-[450px] lg:h-[560px]"
            >
              {/* HUD Elements - Hexagonal Outlines */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 z-0 opacity-20"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  backgroundColor: "rgba(0, 240, 255, 0.1)",
                  border: "1px dashed rgba(0, 240, 255, 0.3)"
                }}
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 z-0 opacity-10"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  backgroundColor: "rgba(160, 32, 240, 0.1)",
                  border: "1px dotted rgba(160, 32, 240, 0.2)"
                }}
              />

              {/* Glowing Hexagonal Border */}
              <div 
                className="absolute inset-0 z-10 border-2 border-neon-blue/30 animate-pulse-slow shadow-[0_0_60px_rgba(0,240,255,0.4)]"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              />
              
              {/* Main Image Container - Hexagonal */}
              <div 
                className="absolute inset-0 z-10 group overflow-hidden border-2 border-neon-blue/50 shadow-[0_0_40px_rgba(0,240,255,0.3)] bg-gradient-to-b from-bg-dark/60 to-bg-dark/20 backdrop-blur-sm"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <img 
                  src="/about 1.png" 
                  alt="David Ajaraogu - Blockchain Whizzy" 
                  className="w-full h-full object-contain opacity-100 brightness-110 contrast-125 transition-all duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Scanning Line */}
                <div className="absolute left-0 right-0 h-1 bg-neon-blue/50 shadow-[0_0_15px_rgba(0,240,255,0.8)] z-20 animate-scan pointer-events-none" />
                
                {/* Holographic Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-16 left-0 w-full text-center z-20 pointer-events-none">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-[10px] md:text-xs font-display font-black uppercase tracking-[0.6em] text-white drop-shadow-[0_0_10px_rgba(0,240,255,1)]"
                  >
                    System Active
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs md:text-sm font-display font-black uppercase tracking-[0.4em] text-neon-blue mt-2"
                  >
                    Blockchain Whizzy
                  </motion.p>
                </div>
              </div>

              {/* Technical HUD Markers */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-[8px] font-mono text-neon-blue/40 uppercase tracking-widest z-20">
                Lat: 6.5244° N | Long: 3.3792° E
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 text-[8px] font-mono text-neon-purple/40 uppercase tracking-widest z-20">
                Status: Verified Node
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-neon-purple z-20" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-neon-blue z-20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 lg:py-48 px-6">
        <div className="max-w-[1800px] mx-auto">
          <SectionHeading title="Experience" subtitle="My professional journey and career milestones." />
          
          <div className="space-y-12 md:space-y-16">
            {EXPERIENCES.map((exp, i) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="futuristic-card group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 blur-3xl -z-10" />
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-widest text-white group-hover:text-neon-blue transition-colors">{exp.role}</h3>
                    <p className="text-lg md:text-xl font-bold text-neon-purple mt-3 font-display">{exp.company}</p>
                  </div>
                  <div className="mt-4 md:mt-0 font-mono font-bold text-sm md:text-base text-white/40 tracking-widest">
                    [{exp.period}]
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-blue mr-4 mt-2.5 flex-shrink-0 shadow-[0_0_5px_rgba(0,240,255,1)]" />
                      <span className="text-base md:text-lg text-white/60 font-light">{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.achievements && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                    {exp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center space-x-4 bg-white/5 p-4 border border-white/5 hover:border-neon-blue/30 transition-all">
                        <AchievementIcon name={ach.icon} />
                        <span className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-white/70">{ach.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 lg:py-48 bg-white/5 backdrop-blur-sm px-6">
        <div className="max-w-[1800px] mx-auto">
          <SectionHeading title="Projects" subtitle="A selection of my favorite works in development and design." />
          
          {/* Project Filter */}
          <div className="space-y-8 mb-16">
            <div>
              <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] mb-4 text-white/30">Filter by Tag</p>
              <div className="flex flex-wrap gap-3">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "px-6 py-2 border border-white/10 font-display font-bold uppercase text-[10px] tracking-[0.2em] transition-all",
                      selectedTag === tag ? "bg-neon-blue text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "bg-white/5 text-white/50 hover:border-neon-blue/50"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] mb-4 text-white/30">Filter by Status</p>
              <div className="flex flex-wrap gap-3">
                {allStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={cn(
                      "px-6 py-2 border border-white/10 font-display font-bold uppercase text-[10px] tracking-[0.2em] transition-all",
                      selectedStatus === status ? "bg-neon-purple text-white shadow-[0_0_15px_rgba(160,32,240,0.4)]" : "bg-white/5 text-white/50 hover:border-neon-purple/50"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Skeleton Loader
                Array.from({ length: showAllProjects ? filteredProjects.length : 4 }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectSkeleton />
                  </motion.div>
                ))
              ) : (
                displayedProjects.map((project, i) => (
                  <motion.div 
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    variants={{
                      hover: { 
                        scale: 1.03, 
                        boxShadow: "0 0 40px rgba(0, 240, 255, 0.3)",
                        borderColor: "rgba(0, 240, 255, 0.6)",
                        y: -5
                      }
                    }}
                    whileHover="hover"
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="futuristic-card flex flex-col h-full group cursor-pointer"
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="aspect-video mb-6 lg:mb-8 overflow-hidden border border-white/10 relative">
                      <motion.img 
                        variants={{
                          hover: { scale: 1.1 }
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={`${project.image}?w=1200&q=80`} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className={cn(
                        "absolute top-4 right-4 px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest border border-white/20 backdrop-blur-md flex items-center gap-2",
                        project.status === "Completed" ? "bg-neon-blue/20 text-neon-blue border-neon-blue/50" : 
                        project.status === "In Progress" ? "bg-blue-500/20 text-blue-400 border-blue-400/50" : "bg-yellow-500/20 text-yellow-400 border-yellow-400/50"
                      )}>
                        {project.status === "Completed" && <CheckCircle2 size={12} />}
                        {project.status === "In Progress" && <Clock size={12} />}
                        {project.status === "On Hold" && <PauseCircle size={12} />}
                        {project.status}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold uppercase tracking-widest mb-3 lg:mb-4 text-white group-hover:text-neon-blue transition-colors">{project.title}</h3>
                    <p className="text-sm lg:text-base text-white/50 mb-6 lg:mb-8 flex-grow leading-relaxed font-light">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-display font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 text-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center font-display font-bold uppercase tracking-widest text-[10px] text-neon-blue group-hover:text-white transition-colors">
                      View Project Details <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* View All Projects Button */}
          {!showAllProjects && filteredProjects.length > 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <button 
                onClick={() => setShowAllProjects(true)}
                className="group relative px-12 py-4 bg-transparent border border-neon-blue text-neon-blue font-display font-bold uppercase tracking-widest overflow-hidden transition-all hover:text-black"
              >
                <div className="absolute inset-0 bg-neon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                <span className="flex items-center gap-2">
                  View All Projects <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 md:py-32 lg:py-48 bg-bg-dark px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
        <div className="max-w-[1800px] mx-auto">
          <SectionHeading title="Certifications" />
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-12">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 p-6 md:p-10 hover:border-neon-blue/50 transition-all futuristic-card"
              >
                <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                  <div className="w-full sm:w-48 md:w-64 aspect-square relative overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 text-center sm:text-left flex flex-col h-full">
                    <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
                      <Award className="text-neon-blue" size={20} />
                      <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-neon-blue">Verified Credential</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-wider text-white mb-3 group-hover:text-neon-blue transition-colors leading-tight">{cert.title}</h3>
                    <p className="text-white/60 font-medium mb-4 text-sm md:text-base">{cert.issuer}</p>
                    <div className="inline-block self-center sm:self-start px-4 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest mb-6">
                      Issued: {cert.date}
                    </div>

                    {cert.image && (
                      <div className="mt-auto pt-4">
                        <button 
                          onClick={() => setActiveCert({ image: cert.image, title: cert.title })}
                          className="inline-flex items-center gap-2 px-6 py-3 border border-neon-blue/30 bg-neon-blue/5 text-[10px] font-display font-bold uppercase tracking-widest text-neon-blue hover:bg-neon-blue hover:text-black transition-all group/link shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                        >
                          View Certificate <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/5 group-hover:border-neon-blue/30 transition-colors" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/5 group-hover:border-neon-blue/30 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 lg:py-48 px-6 overflow-hidden relative">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <SectionHeading title="Skills" subtitle="Technical toolkit and creative capabilities." />
            
            {/* Skills Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-blue/50" />
              <input 
                type="text"
                value={skillsSearch}
                onChange={(e) => setSkillsSearch(e.target.value)}
                placeholder="Search database..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 focus:outline-none focus:border-neon-blue font-mono text-sm text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skillGroup, i) => (
                <motion.div 
                  layout
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-10 futuristic-card relative group"
                >
                  <div className="absolute -top-4 -left-4 w-14 h-14 bg-bg-dark border border-neon-blue/30 flex items-center justify-center text-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                    {skillGroup.category.includes("Frontend") && <Code size={28} />}
                    {skillGroup.category.includes("Design") && <Palette size={28} />}
                    {skillGroup.category.includes("Blockchain") && <Cpu size={28} />}
                    {skillGroup.category.includes("IT") && <Database size={28} />}
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-8 mt-6 text-white group-hover:text-neon-blue transition-colors">{skillGroup.category}</h3>
                  <ul className="space-y-3">
                    {skillGroup.items.map(skill => (
                      <li key={skill} className="font-mono text-sm flex items-center text-white/50">
                        <div className="w-1.5 h-1.5 bg-neon-purple mr-4 shadow-[0_0_5px_rgba(160,32,240,1)]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 lg:py-48 bg-white/5 backdrop-blur-sm px-6 relative">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Connect" />
              <p className="text-2xl sm:text-3xl text-white/40 mb-16 leading-tight font-light">
                Initiate communication protocol. 
                Available for collaboration on next-gen digital experiences.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 rounded-full border border-neon-blue/30 flex items-center justify-center group-hover:border-neon-blue transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <Send className="text-neon-blue" size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-display font-bold tracking-widest">Direct Link</p>
                    <p className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">kelajane6@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-bg-dark/50 p-8 sm:p-12 md:p-16 border border-white/10 backdrop-blur-xl"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-24 border-t border-white/10 px-6 bg-bg-dark relative overflow-hidden">
        <FloatingNodes />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
            {/* Brand Column */}
            <div className="sm:col-span-2 xl:col-span-1">
              <p className="text-2xl md:text-3xl font-display font-black uppercase tracking-widest mb-6 text-neon-blue group cursor-default">
                Blockchain Whizzy<span className="text-neon-purple group-hover:animate-ping inline-block">.</span>
              </p>
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-md font-light">
                David Ajaraogu Chinonyerem — Architecting the decentralized future through code and design.
              </p>
            </div>

            {/* Horizontal Nav Column */}
            <div className="sm:col-span-2 xl:col-span-2">
              <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 text-white/20">Navigation</h4>
              <ul className="flex flex-row flex-wrap gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6">
                {["Home", "About", "Experience", "Projects", "Certifications", "Skills", "Contact"].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-[10px] font-display font-bold uppercase tracking-widest text-white/50 hover:text-neon-blue transition-all hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div className="sm:col-span-2 xl:col-span-1">
              <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 text-white/20">Network</h4>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {SOCIAL_LINKS.map((link) => {
                  const IconMap: Record<string, any> = {
                    Linkedin: FaLinkedin,
                    Twitter: SiX,
                    Github: FaGithub,
                    Instagram: FaInstagram,
                    Facebook: FaFacebookF,
                    MessageCircle: FaWhatsapp,
                    Send: FaTelegramPlane
                  };
                  
                  const brandColors: Record<string, string> = {
                    LinkedIn: "#0077B5",
                    "X/Twitter": "#ffffff", // X is black/white
                    GitHub: "#ffffff",
                    Instagram: "#E4405F",
                    Facebook: "#1877F2",
                    WhatsApp: "#25D366",
                    Telegram: "#0088CC"
                  };

                  const Icon = IconMap[link.icon] || FaGithub;
                  const brandColor = brandColors[link.platform] || "#00f0ff";

                  return (
                    <motion.a 
                      key={link.platform} 
                      href={link.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        scale: 1.1, 
                        y: -5,
                        borderColor: brandColor,
                        color: brandColor,
                        backgroundColor: `${brandColor}20`,
                        boxShadow: `0 0 20px ${brandColor}40`
                      }}
                      style={{ color: `${brandColor}80` }}
                      className="p-3 md:p-4 border border-white/10 bg-white/5 transition-all rounded-xl"
                      aria-label={link.platform}
                    >
                      <Icon size={20} className="md:w-6 md:h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Legal & Copyright */}
          <div className="pt-12 md:pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-10">
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10">
              {["Privacy", "Terms", "Security"].map((item) => (
                <a key={item} href="#" className="text-[9px] font-display font-bold uppercase tracking-[0.3em] text-white/20 hover:text-neon-blue transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <p className="text-[9px] font-display font-bold uppercase tracking-[0.3em] text-white/20 text-center lg:text-right">
              © 2026 David Ajaraogu Chinonyerem // Build v1.0.5 // Protocol: Optimized
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
