import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const introLines = [
  'Building digital experiences...',
  'Showcasing my work...',
  'Loading creative projects...',
  'Preparing something awesome...',
  'Welcome to my Universe...',
];

const skills = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Responsive UI'];

const projects = [
  {
    title: 'Portfolio Landing Page',
    copy: 'A cinematic hero, fluid typography, and a reserved image panel that stays empty until you add your photo.',
  },
  {
    title: 'Personal Brand System',
    copy: 'A reusable visual system with sharp spacing, dark glass panels, and a polished section flow.',
  },
  {
    title: 'Motion-First Intro',
    copy: 'Animated entrance pacing inspired by the reference while remaining original in structure and content.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
};

function App() {
  const [introIndex, setIntroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIntroIndex((current) => (current + 1) % introLines.length);
    }, 1600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(167,139,250,0.18),transparent_28%),radial-gradient(circle_at_30%_90%,rgba(34,197,94,0.12),transparent_24%),linear-gradient(160deg,#070b14_0%,#0d1424_100%)] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85),transparent_95%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -left-20 top-24 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed right-[-3rem] top-32 h-80 w-80 rounded-full bg-violet-300/10 blur-3xl"
        animate={{ y: [0, -16, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070b14]/65 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-5">
          <a href="#home" className="inline-flex items-center gap-3 text-[0.82rem] font-extrabold uppercase tracking-[0.14em]">
            <span className="grid h-9 w-9 place-items-center rounded-[12px] border border-white/10 bg-gradient-to-br from-sky-300/20 to-violet-300/20">M</span>
            <span>Umair Lari</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#about">About</a>
            <a className="transition hover:text-white" href="#work">Work</a>
            <a className="transition hover:text-white" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="home" className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <section className="grid min-h-[calc(100vh-76px)] items-center py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <p className="mb-5 text-sm uppercase tracking-[0.16em] text-slate-400">Portfolio / Creative technology / Product thinking</p>
            <span className="inline-flex items-center rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-sm text-sky-200 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              Hello, I’m Umair Lari
            </span>
            <h1 className="mt-5 max-w-[10ch] font-display text-5xl leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Building digital experiences with clarity and motion.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              A close-feeling but original recreation of the reference style, built with the exact modern stack you asked for and designed to keep the image slot empty until you send your photo.
            </p>

            <div className="mt-8 min-h-[218px] rounded-[28px] border border-white/10 bg-white/5 px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
              <div className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-500">Animated intro</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={introLines[introIndex]}
                  variants={lineMotion}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl font-medium leading-[1.35] text-white sm:text-3xl"
                >
                  {introLines[introIndex]}
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
                <span className="h-2 w-2 rounded-full bg-sky-300" />
                {introIndex + 1} / {introLines.length}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-300 to-violet-300 px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5">
                View Work
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/8">
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mt-10 min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-4 shadow-glow lg:mt-0 lg:min-h-[560px]"
            aria-label="Empty image placeholder"
          >
            <div className="relative h-full min-h-[388px] rounded-[24px] border border-dashed border-white/15 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.12),transparent_30%),radial-gradient(circle_at_80%_25%,rgba(167,139,250,0.1),transparent_28%)]">
              <div className="absolute inset-auto bottom-4 left-4 right-4 rounded-[18px] border border-white/10 bg-[#070b14]/75 p-4 text-sm text-slate-400 backdrop-blur-md">
                <strong className="mb-1 block text-slate-100">Image placeholder</strong>
                This slot is intentionally empty. Add your image later and the layout will stay intact.
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2 className="font-display text-4xl tracking-[-0.03em] text-white sm:text-5xl">About</h2>
            <p className="max-w-2xl leading-8 text-slate-400">
              The goal here is to reproduce the same kind of premium, minimal portfolio presence without copying the target’s source code or exact branding assets.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[24px] border border-white/10 bg-white/5 p-7 shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
              <h3 className="text-lg font-bold text-white">What I do</h3>
              <p className="mt-3 leading-8 text-slate-400">
                I build interfaces and personal brands that feel deliberate, responsive, and polished. The structure is optimized for strong first impressions and fast scanning.
              </p>
            </article>
            <article className="rounded-[24px] border border-white/10 bg-white/5 p-7 shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
              <h3 className="text-lg font-bold text-white">Tech stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="work" className="py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2 className="font-display text-4xl tracking-[-0.03em] text-white sm:text-5xl">Selected Work</h2>
            <p className="max-w-2xl leading-8 text-slate-400">
              These cards are placeholders for your actual projects and can be swapped without changing the overall layout.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article key={project.title} className="rounded-[24px] border border-white/10 bg-[#0b1220]/80 p-7 shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
                <p className="text-xs uppercase tracking-[0.12em] text-sky-200">0{index + 1} / Project</p>
                <h3 className="mt-3 text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 leading-8 text-slate-400">{project.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2 className="font-display text-4xl tracking-[-0.03em] text-white sm:text-5xl">Contact</h2>
            <p className="max-w-2xl leading-8 text-slate-400">
              Add your real email and social links here, then we can swap in your image when you send it.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <h3 className="text-lg font-bold text-white">Let’s connect</h3>
              <div className="mt-5 grid gap-3">
                <a className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4" href="mailto:umairlari0786@gmail.com">
                  <span className="font-semibold text-white">Email</span>
                  <span className="text-slate-400">umairlari0786@gmail.com</span>
                </a>
                <a className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4" href="https://www.linkedin.com/in/mohd-umair-lari-872594288/" target="_blank" rel="noreferrer">
                  <span className="font-semibold text-white">LinkedIn</span>
                  <span className="text-slate-400">linkedin.com/in/umair-lari</span>
                </a>
                <a className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4" href="https://github.com/Mohd-Umair-Lari" target="_blank" rel="noreferrer">
                  <span className="font-semibold text-white">GitHub</span>
                  <span className="text-slate-400">github.com/umair-lari</span>
                </a>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/7 to-white/3 p-7">
              <h3 className="text-lg font-bold text-white">Notes</h3>
              <p className="mt-3 leading-8 text-slate-400">
                The app is now on the exact stack you requested: React, TypeScript, Tailwind CSS, Framer Motion, and Vite.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 text-slate-400">
        <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] flex-col gap-2 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <span>Umair Lari</span>
          <span>Built with React, TypeScript, Tailwind CSS, Framer Motion, and Vite.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;