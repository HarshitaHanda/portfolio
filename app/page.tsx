'use client';

import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useMemo, useRef, useState } from 'react';

import genMonkVisualStorytelling from '../pictures/ChatGPT Image May 26, 2026, 05_28_35 PM.png';
import genMonkVisualStorytellingAlt from '../pictures/ChatGPT Image May 26, 2026, 05_55_22 PM.png';
import genMonkVisualStorytellingThird from '../pictures/ChatGPT Image May 26, 2026, 06_16_00 PM.png';

const heroImage = '/api/profile-image';

const projects = [
  {
    title: 'AI Dental SaaS Waitlist',
    category: 'Brand + Landing Experience',
    description:
      'Built a landing page validating an AI-powered dental workflow product for US clinics, focused on trust, clarity, and conversion.',
    preview:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    accent: 'AI-powered product narrative for clinical teams.',
    stats: ['+38% engagement lift', '3-week sprint', 'conversion-first storytelling'],
    projectLink: 'https://dezy-ai-chi.vercel.app/'
  },
  {
    title: 'AI + Visual Storytelling Lab',
    category: 'Brand visuals + storytelling systems',
    description:
      "Designed GenMonk's brand visual for Instagram — concept exploring their 'ancient wisdom meets AI' positioning.",
    preview: genMonkVisualStorytelling.src,
    accent: 'A concept-led visual study blending cultural symbolism, premium brand cues, and AI-era narrative.',
    stats: ['Instagram campaign concept', 'brand world building', 'visual storytelling direction'],
    gallery: [
      {
        src: genMonkVisualStorytelling.src,
        caption:
          'In an age of endless digital noise, clarity becomes the ultimate competitive advantage.\n\nAt GenMonk, we blend ancient discipline with modern AI systems to craft brands, stories, and experiences that don’t just capture attention — they leave a lasting legacy.\n\nWhere human intuition meets machine precision.\nWhere storytelling becomes strategy.\nWhere innovation feels timeless.\n\nGenMonk — Where Ancient Wisdom Meets Digital Innovation.\n\n#GenMonk #AIInnovation #DigitalStorytelling #BrandStrategy #CreativeDirection #LuxuryBranding #FutureOfMarketing #AIMarketing #VisualStorytelling #BrandIdentity #CreativeTechnology #MarketingAgency #DigitalInnovation #CinematicBranding #HumanCenteredAI'
      },
      {
        src: genMonkVisualStorytellingAlt.src,
        caption:
          'The future of marketing isn’t louder.\nIt’s clearer. More intentional. More human.\n\nGenMonk combines strategic thinking, cinematic storytelling, and AI-powered innovation to build brands that resonate beyond trends and algorithms.\n\nBuilt for visionaries.\nDesigned for impact.\n\nWhere Ancient Wisdom Meets Digital Innovation.\n\n#GenMonk #CreativeAgency #AIMarketing #BrandStorytelling #DigitalCulture #LuxuryMarketing #CreativeStudio #ArtificialIntelligence #VisualIdentity #ModernBranding #FutureBrands #CreativeTechnology #MarketingInnovation #HumanAndMachine'
      },
      {
        src: genMonkVisualStorytellingThird.src,
        caption:
          'Not human versus machine.\nHuman with machine.\n\nGenMonk exists at the intersection of philosophy, storytelling, branding, and intelligent systems — building modern digital experiences that feel emotional, immersive, and unforgettable.\n\nFocused like monks.\nInnovative like AI.\n\n#GenMonk #AIBranding #CreativeDirection #DigitalInnovation #FutureOfBranding #Storytelling #LuxuryCreative #AestheticMarketing #VisualCampaign #AICreative #BrandExperience #ModernMarketing #ExperimentalDesign #CinematicVisuals'
      }
    ]
  },
  {
    title: 'Financial Document Intelligence System',
    category: 'AI systems + insight UX',
    description:
      'Designed an intelligence layer for extracting insights from financial reports, with an elegant interface for analysts and operators.',
    preview:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    accent: 'Brought precision and visual calm to complex data workflows.',
    stats: ['document OCR flow', 'multi-view dashboards', 'rapid insights'],
    projectLink: 'https://fin-doc-ai-8psk3aybfbihvfjyajtdf3.streamlit.app/'
  }
];

const experience = [
  {
    title: 'Frontend Engineer Intern',
    company: 'DevRev',
    period: '2025 — Present',
    blurb:
      'Worked on frontend systems in a fast-moving product environment, shipping polished user-facing experiences and solving production issues with performance and clarity in mind.'
  }
];

const categories = [
  {
    title: 'Engineering',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'APIs', 'AI/ML']
  },
  {
    title: 'Creative',
    items: ['Branding', 'Storytelling', 'Creative Direction', 'Visual Thinking', 'Writing']
  },
  {
    title: 'AI',
    items: ['Prompt Engineering', 'AI Tools', 'Workflow Automation', 'Experimental Interfaces']
  }
];

const sections = ['hero', 'about', 'work', 'experience', 'skills', 'philosophy', 'contact'];

export default function Home() {
  const [ready, setReady] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const heroRef = useRef<HTMLElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.3,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.1
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value as number, { immediate: true }) : lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed'
    });

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = lenis.scroll;
      setProgress(max > 0 ? (current / max) * 100 : 0);
    };

    const onScroll = () => updateProgress();
    lenis.on('scroll', onScroll);

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%'
          }
        }
      );
    });

    gsap.to('.hero-image-layer', {
      scale: 1.04,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.hero-text-layer', {
      y: -45,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
      setTrail((prev) => [{ x: event.clientX, y: event.clientY, id: Date.now() }, ...prev].slice(0, 8));
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (!lenis) {
      return;
    }

    if (isModalOpen) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis.start();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openProject = (project: (typeof projects)[number]) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  const heroText = useMemo(
    () => [
      'Building between',
      'Technology,',
      'Aesthetics',
      'and Obsession.'
    ],
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(158,27,50,0.22),transparent_15%),radial-gradient(circle_at_bottom_right,_rgba(239,225,209,0.12),transparent_18%)]" />
      </div>

      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-[#020202]"
        initial={{ opacity: 1 }}
        animate={{ opacity: ready ? 0 : 1, pointerEvents: ready ? 'none' : 'auto' }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      >
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-serif text-3xl md:text-4xl tracking-[0.3em] text-mist"
          >
            Harshita
          </motion.p>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '12rem', opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-4 h-px bg-gradient-to-r from-transparent via-crimson to-transparent"
          />
        </div>
      </motion.div>

      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-transparent">
        <div className="h-full bg-gradient-to-r from-crimson to-[#f3c4b7]" style={{ width: `${progress}%` }} />
      </div>

      <div
        className="pointer-events-none fixed z-30 rounded-full opacity-70 blur-2xl"
        style={{
          left: cursor.x - 48,
          top: cursor.y - 48,
          width: 96,
          height: 96,
          background: 'radial-gradient(circle, rgba(158,27,50,0.7) 0%, rgba(158,27,50,0.15) 45%, transparent 70%)'
        }}
      />
      {trail.map((point) => (
        <div
          key={point.id}
          className="pointer-events-none fixed z-20 rounded-full border border-white/20 bg-white/5"
          style={{
            left: point.x - 12,
            top: point.y - 12,
            width: 24,
            height: 24,
            opacity: 0.3
          }}
        />
      ))}

      <header className="nav-shell">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-sm text-stone-200 md:px-10">
          <div>
            <p className="font-serif text-lg tracking-[0.28em] text-mist">HARSHITA</p>
          </div>
          <nav className="hidden gap-6 md:flex">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="uppercase tracking-[0.2em] text-[0.72rem] text-stone-200/80 transition hover:text-white"
              >
                {section}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="hero" ref={heroRef} className="relative flex min-h-[100svh] items-start overflow-hidden px-5 pb-8 pt-6 md:px-10">
        <div className="hero-image-layer absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Harshita profile background"
            className="h-full w-full scale-[1.08] object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.78))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(158,27,50,0.18),transparent_18%),radial-gradient(circle_at_75%_70%,rgba(239,225,209,0.08),transparent_14%)]" />
        </div>

        <div className="hero-grid absolute inset-0 opacity-30" />

        <div className="relative z-10 w-full">
          <motion.div
            className="hero-text-layer max-w-3xl [transform:translateZ(0)]"
            initial="hidden"
            animate="show"
          >
            <div className="rounded-[1.4rem] border border-white/15 bg-black px-4 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.75)] sm:px-6 sm:py-5 md:px-8 md:pb-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {heroText.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.08 * index, ease: 'easeOut' }}
                    className={`font-serif leading-none ${index === 0 ? 'text-sm uppercase tracking-[0.45em] text-[#fffdf8] sm:text-base' : 'text-[clamp(2.8rem,7vw,5rem)] font-semibold text-white [text-shadow:0_10px_32px_rgba(0,0,0,0.95),0_0_30px_rgba(0,0,0,0.85)]'}`}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <span className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-100/80">
            <span>↓</span>
            <span>scroll</span>
          </span>
        </motion.div>
      </section>

      <section id="about" className="relative px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_1.2fr] md:items-end">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.45em] text-crimson">About me</p>
            <h2 className="mt-5 font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-none text-white">
              Not just another developer.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-100 md:text-base">
              I’m Harshita — a frontend engineer with a deep curiosity for AI, storytelling, branding, digital aesthetics, and building things that feel alive. I love experimenting with ideas, interfaces, human behavior, internet culture, and immersive digital experiences. Somewhere between engineering and art is where I feel most at home.
            </p>
          </div>

          <motion.div
            data-reveal
            className="glass-panel rounded-[2rem] p-6 md:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            style={{
              x: cursor.x / 90 - 12,
              y: cursor.y / 100 - 12,
              background: 'rgba(0, 0, 0, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-mist/90">Summary</p>
            <p className="mt-3 text-base leading-8 text-white md:text-lg">
              I’m Harshita — a frontend engineer with a deep curiosity for AI, storytelling, branding, digital aesthetics, and building things that feel alive. I love experimenting with ideas, interfaces, human behavior, internet culture, and immersive digital experiences. Somewhere between engineering and art is where I feel most at home.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="work" className="relative px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-crimson">Selected work</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,4vw,4rem)] text-white">Where AI, branding, and storytelling meet.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-stone-200/85 md:text-base">
              A focused look at the projects where I’ve shaped immersive digital experiences, refined brand narratives, and built interfaces that feel both intelligent and emotionally resonant.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                data-reveal
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="card-shine glass-panel cursor-pointer overflow-hidden rounded-[1.8rem]"
                onClick={() => openProject(project)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={project.preview} alt={project.title} className="h-full w-full object-cover opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[0.7rem] uppercase tracking-[0.27em] text-stone-100">
                    {project.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-2xl text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-200/85">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="relative px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.45em] text-crimson">Experience</p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,4vw,4rem)] leading-none text-white">
              A timeline of creative engineering.
            </h2>
          </div>

          <div className="relative pl-7">
            <div className="timeline-line" />
            {experience.map((item, index) => (
              <motion.div
                key={item.title}
                data-reveal
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.12 }}
                className="relative mb-8 rounded-[1.5rem] border border-white/15 bg-black/85 px-5 py-5 md:px-6"
              >
                <div className="absolute left-[-1.6rem] top-6 h-3 w-3 rounded-full bg-crimson shadow-[0_0_16px_rgba(158,27,50,0.8)]" />
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-mist/90">{item.period}</p>
                    <h3 className="mt-3 font-serif text-2xl text-white">{item.title}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/85">{item.company}</p>
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white">{item.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.45em] text-crimson">Skills</p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,4vw,4rem)] leading-none text-white">
              Built to move between intuition and systems.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {categories.map((group, index) => (
              <motion.div
                key={group.title}
                data-reveal
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-[1.8rem] p-5"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-mist/80">{group.title}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="floating-orb rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-stone-100"
                      style={{
                        transform: `translateY(${(itemIndex % 2 === 0 ? -2 : 2) * (index + 1)}px)`
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-5 py-20 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(158,27,50,0.34),transparent_30%),radial-gradient(circle_at_bottom,rgba(239,225,209,0.12),transparent_18%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />
        <motion.div
          data-reveal
          className="relative z-10 max-w-4xl text-center"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="text-xs uppercase tracking-[0.45em] text-crimson">Philosophy</p>
          <h2 className="mt-6 font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[0.9] text-white">
            The future belongs to people who can build and feel.
          </h2>
        </motion.div>
      </section>

      <section id="contact" className="relative px-5 pb-16 pt-6 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.45em] text-crimson">Contact</p>
            <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2.5rem,4vw,4rem)] leading-none text-white">
              Let’s create something unforgettable.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/harshita-handa-9aa037184?utm_source=share_via&utm_content=profile&utm_medium=member_android'
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/harshita_handa19?igsh=MTM4OWNxc3V5MGFubQ=='
              },
              { label: 'Email', href: 'mailto:harshitahanda2000@gmail.com' }
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-sm uppercase tracking-[0.25em] text-stone-100"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>

        <footer className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-stone-300 md:flex-row md:items-center md:justify-between">
          <span>Frontend Engineer + Creative Technologist</span>
          <span>Designed for cinematic digital presence</span>
        </footer>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/88 px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalContentRef}
              onClick={(event) => event.stopPropagation()}
              onWheel={(event) => {
                const container = modalContentRef.current;

                if (!container) {
                  return;
                }

                event.preventDefault();
                container.scrollTop += event.deltaY;
              }}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="glass-panel w-full max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[2rem]"
            >
              {'gallery' in activeProject && activeProject.gallery?.length ? null : (
                <div className="relative h-48 md:h-64">
                  <img src={activeProject.preview} alt={activeProject.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <button
                    onClick={() => setModalOpen(false)}
                    className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-2 text-xs uppercase tracking-[0.25em] text-white"
                  >
                    Close
                  </button>
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-crimson">{activeProject.category}</p>
                    <h3 className="mt-3 font-serif text-[2rem] text-white md:text-[2.4rem]">{activeProject.title}</h3>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs uppercase tracking-[0.2em] text-stone-100"
                  >
                    Close
                  </button>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-100/85 md:text-base">{activeProject.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {activeProject.stats.map((stat) => (
                    <span key={stat} className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-stone-100">
                      {stat}
                    </span>
                  ))}
                </div>

                {'projectLink' in activeProject && activeProject.projectLink ? (
                  <div className="mt-6">
                    <a
                      href={activeProject.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-crimson/60 bg-crimson/15 px-4 py-2 text-sm uppercase tracking-[0.2em] text-stone-100 transition hover:bg-crimson/25"
                    >
                      Open Project
                    </a>
                  </div>
                ) : null}

                {'gallery' in activeProject && activeProject.gallery?.length ? (
                  <div className="mt-8 grid gap-5">
                    {activeProject.gallery.map((photo) => (
                      <div key={photo.src} className="mx-auto w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.02]">
                        <div className="bg-black/10 p-3 sm:p-4">
                          <img src={photo.src} alt={photo.caption} className="mx-auto h-48 w-full max-w-md object-contain sm:h-56 md:h-64" />
                        </div>
                        <div className="p-4 text-sm leading-7 text-stone-100/85 whitespace-pre-line md:text-base">
                          {photo.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
