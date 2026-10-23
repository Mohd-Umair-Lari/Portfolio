import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { baseTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DotSphere = lazy(() => import("@/components/DotSphere"));
const GITHUB_URL = "https://github.com/Mohd-Umair-Lari";
const LINKEDIN_URL = "https://www.linkedin.com/in/mohd-umair-lari-872594288/";
const FINPASS_URL = "https://github.com/Mohd-Umair-Lari/AI-Driven-Invest-planner";
const OFFERBRIDGES_URL = "https://github.com/Mohd-Umair-Lari/Offer-Bridge";
const SCHOLAR_URL =
  "https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=zTbVLvcAAAAJ";
const EMAIL = "umairlari0786@gmail.com";
const PHONE_PRIMARY = "+91 63881-83436";
const PHONE_SECONDARY = "+91 99566-75648";
const CV_HREF = "/Umair_Lari_Resume.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohd Umair Lari — AI/ML Engineer & Researcher" },
      {
        name: "description",
        content:
          "AI/ML engineer, full-stack builder and IEEE-published researcher. B.Tech CSE (AI & ML), MAKAUT. Building intelligent, cloud-native systems on GCP.",
      },
      { property: "og:title", content: "Mohd Umair Lari — AI/ML Engineer & Researcher" },
      {
        property: "og:description",
        content:
          "FinPass · Serverless AI on GCP · IEEE & Springer publications. Portfolio of Mohd Umair Lari.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV_LINKS = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Work", "experience"],
  ["Projects", "projects"],
  ["Research", "publications"],
  ["Credentials", "certs"],
  ["Contact", "contact"],
] as const;

const external = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

/* ---------------- Page ---------------- */

function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <Backdrop />
      <Nav />
      <main className="relative">
        <HeroBlock />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Fixed backdrop (green → white on scroll + sphere) ---------------- */

function Backdrop() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll();
  const greenOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.7, 0.45]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      <motion.div style={{ opacity: greenOpacity }} className="absolute inset-0 bg-backdrop" />
      <div className="absolute inset-0 bg-dot-grid opacity-25" />
      <div className="absolute inset-0 bg-glow opacity-50" />
      {mounted && (
        <motion.div
          style={{ scale: sphereScale, opacity: sphereOpacity }}
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] md:w-[36vw] md:h-[36vw] lg:w-[30vw] lg:h-[30vw]"
        >
          <Suspense fallback={null}>
            <DotSphere />
          </Suspense>
        </motion.div>
      )}
    </div>
  );
}

/* ---------------- Nav ---------------- */

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={baseTransition}
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-md bg-card border-b border-border"
    >
      <div className="container-prose flex items-center justify-between h-16">
        <a href="#top" className="font-display text-xl font-semibold tracking-wide text-gold">
          Lari<span className="text-foreground">.</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {NAV_LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "story-link transition-colors",
                active === id ? "text-gold" : "text-muted-foreground hover:text-gold",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="accent" size="sm" asChild className="hidden sm:inline-flex">
            <a href={CV_HREF} download>
              Download CV
            </a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-secondary transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gold"
      />
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={baseTransition}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="container-prose py-4 flex flex-col">
              {NAV_LINKS.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-3 text-base border-b border-border/60 last:border-0 transition-colors",
                    active === id ? "text-gold" : "text-foreground hover:text-gold",
                  )}
                >
                  {label}
                </a>
              ))}
              <a href={CV_HREF} download className="py-3 text-base text-gold sm:hidden">
                Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------- Shared ---------------- */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative border-t border-border/60">
      <div className="container-prose py-24 md:py-32">
        <Reveal>
          <header className="mb-14 max-w-3xl">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              {title}
            </h2>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="A builder who publishes.">
      <div className="grid md:grid-cols-5 gap-12">
        <Reveal className="md:col-span-3 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm an undergraduate at{" "}
            <span className="text-foreground">
              Maulana Abdul Kalam Azad University of Technology
            </span>
            , Kolkata, studying Computer Science with a specialization in Artificial Intelligence &
            Machine Learning.
          </p>
          <p>
            My work sits at the intersection of <span className="text-foreground">applied ML</span>,{" "}
            <span className="text-foreground">cloud-native engineering</span> and{" "}
            <span className="text-foreground">research</span> — shipping full-stack AI products on
            GCP and contributing to peer-reviewed papers on IoT security and malware detection.
          </p>
          <p>
            Outside the terminal: I speak German (CEFR A2, sitting for B1), French (A1), and English
            fluently — and I'm always one coffee away from the next LeetCode contest.
          </p>
        </Reveal>

        <Reveal index={1} className="md:col-span-2">
          <aside className="surface p-8">
            <p className="eyebrow mb-6">At a glance</p>
            <ul className="space-y-4 text-sm">
              <Row k="Based in" v="Kolkata, India" />
              <Row k="Degree" v="B.Tech CSE (AI & ML), 2023–27" />
              <Row k="Focus" v="Applied AI & ML · Cloud · RAG Implementation" />
              <Row k="Research" v="IEEE MPCON 2026 · Springer 2026" />
              <Row k="Languages" v="EN · DE (A2→B1) · FR (A1)" />
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-foreground text-right">{v}</span>
    </li>
  );
}

/* ---------------- Skills ---------------- */

function Skills() {
  const groups: { title: string; items: string[] }[] = [
    { title: "Languages", items: ["Python", "Java", "SQL", "Bash", "HTML / CSS / JS"] },
    {
      title: "AI / ML",
      items: ["scikit-learn", "TensorFlow", "LangChain", "RAG Pipelines", "Agentic AI", "OpenCV"],
    },
    {
      title: "Google Cloud",
      items: [
        "Vertex AI",
        "BigQuery / BigQuery ML",
        "Cloud Run",
        "Cloud Functions",
        "VM Mapping",
        "CI/CD",
      ],
    },
    {
      title: "Engineering",
      items: [
        "FastAPI · Flask",
        "MERN Full-Stack",
        "REST APIs · CORS",
        "MongoDB · MySQL",
        "Docker",
        "Git & GitHub",
        "Playwright & Crawling",
      ],
    },
    { title: "Concepts", items: ["SDLC", "OOP", "DSA", "DBMS", "Unit Testing", "Version Control"] },
    { title: "Tools", items: ["Jupyter", "MATLAB", "Apache", "Bootstrap"] },
  ];

  return (
    <Section id="skills" eyebrow="02 — Toolkit" title="Stack & specialisms.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <Reveal key={g.title} index={i} className="h-full">
            <div className="group surface surface-interactive p-6 h-full">
              <h3 className="font-display text-xl font-semibold text-gold mb-4">{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li key={it} className="chip group-hover:text-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Experience ---------------- */

function Experience() {
  return (
    <Section id="experience" eyebrow="03 — Experience" title="Where I've worked.">
      <ol>
        <ExperienceItem
          when="Apr 2024 — Jun 2024"
          role="Data Analyst Intern"
          org="Ozibook Fintech · Bengaluru"
          bullets={[
            "Owned the core data-analysis project for Personal Coaches, designing solutions that increased client tenure and retention.",
            "Built Python tooling to validate large-scale financial datasets for 3 clients — lifted data accuracy by 38% and cut manual provisioning time across CI/CD.",
            "Engineered and maintained automated data pipelines in Python/Pandas, leading a team of 4 interns through development & deployment.",
          ]}
          tags={["Python", "Pandas", "CI/CD", "Team lead"]}
          note="ICC & LOR awarded"
        />
      </ol>
    </Section>
  );
}

function ExperienceItem({
  when,
  role,
  org,
  bullets,
  tags,
  note,
}: {
  when: string;
  role: string;
  org: string;
  bullets: string[];
  tags: string[];
  note?: string;
}) {
  return (
    <li className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border pt-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-gold">{when}</p>
        {note && <p className="mt-3 text-xs text-muted-foreground italic">{note}</p>}
      </Reveal>
      <div>
        <Reveal index={1}>
          <h3 className="font-display text-3xl md:text-4xl font-semibold">{role}</h3>
          <p className="mt-1 text-muted-foreground">{org}</p>
        </Reveal>
        <div className="mt-6 space-y-3 text-muted-foreground leading-relaxed">
          {bullets.map((b, i) => (
            <Reveal key={b} index={i + 2}>
              <p className="flex gap-3">
                <span className="text-gold shrink-0">—</span>
                <span>{b}</span>
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal index={bullets.length + 2}>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip-accent">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </li>
  );
}

/* ---------------- Projects ---------------- */

function Projects() {
  const projects = [
    {
      n: "01",
      title: "FinPass",
      tagline: "AI-powered financial planning & investment optimization platform.",
      body: [
        "Full-stack AI application with multiple RESTful APIs (FastAPI + Flask) backed by MongoDB — personalised onboarding, portfolio analytics and investment guidance.",
        "RAG-powered conversational responses with persistent memory, secure auth, and 1,000-run Monte Carlo goal simulations driving risk-based asset allocation.",
        "CORS-aware cross-origin integration between a Vercel frontend and a HuggingFace-hosted backend.",
      ],
      stack: ["FastAPI", "Flask", "MongoDB", "RAG", "Monte Carlo", "Vercel", "HuggingFace"],
      href: FINPASS_URL,
    },
    {
      n: "02",
      title: "OfferBridges",
      tagline: "Credit card marketplace for offers on e-commerce.",
      body: [
        "A full-stack credit card marketplace for offers on e-commerce, built with React and FastAPI.",
        "Engineered an automated offer-intelligence pipeline using crawler, Playwright/fetch-based extraction and AI-assisted discount evaluation. It processes Amazon, Flipkart and Myntra product links, identifies eligible bank-card offers, calculates the best savings and matches them to the desired card holders in real time.",
        "Refactored the platform architecture onto Next.js + Node.js to withstand the scraping load, combining React 19 for the frontend with MongoDB and JWT/OAuth to support 10,000+ requests robustly.",
      ],
      stack: ["React", "Node.js + Next.js", "MongoDB", "JWT/OAuth", "Playwright"],
      href: OFFERBRIDGES_URL,
    },
  ];

  return (
    <Section id="projects" eyebrow="04 — Selected work" title="Projects.">
      <div className="space-y-8">
        {projects.map((p, idx) => (
          <Reveal key={p.title} index={idx}>
            <article className="group surface surface-interactive grid md:grid-cols-12 gap-8 p-8 md:p-10">
              <div className="md:col-span-4">
                <p className="font-mono text-xs text-gold">{p.n} / PROJECT</p>
                <h3 className="font-display text-4xl md:text-5xl font-semibold mt-3 leading-none">
                  {p.title}
                </h3>
                <a
                  href={p.href}
                  {...external(p.href)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-gold story-link"
                >
                  GitHub repo
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
              <div className="md:col-span-8">
                <p className="text-xl md:text-2xl font-display text-gold-soft">{p.tagline}</p>
                <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                  {p.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Publications ---------------- */

function Publications() {
  const pubs = [
    {
      venue: "IEEE MPCON 2026",
      when: "14–15 March 2026",
      title: "An Edge-Native Machine Learning Framework for Proactive IoT Network Security",
      authors: "Babul P. Tewari, Umair Lari, Poulomi Mukherjee",
      tag: "Conference",
      href: "https://ieeexplore.ieee.org/abstract/document/11508580",
    },
    {
      venue: "Springer — Securing the Internet of Things: ML and Beyond",
      when: "Accepted, 2026",
      title: "Malware Detection in IoT: A Machine Learning based Solution",
      authors: "Umair Lari, Poulomi Mukherjee, Babul P. Tewari",
      tag: "Book chapter",
      href: SCHOLAR_URL,
    },
  ];

  return (
    <Section id="publications" eyebrow="05 — Research" title="Published work.">
      <div className="space-y-6">
        {pubs.map((p, i) => (
          <Reveal key={p.title} index={i}>
            <article className="surface surface-interactive grid md:grid-cols-[180px_1fr_auto] gap-6 p-8">
              <div>
                <p className="font-mono text-xs text-gold uppercase tracking-widest">
                  {p.venue.split(" — ")[0]}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{p.when}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground italic">{p.authors}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.venue}</p>
              </div>
              <a
                href={p.href}
                {...external(p.href)}
                className="chip-accent self-start hover:bg-gold hover:text-primary-foreground"
              >
                {p.tag}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Certifications ---------------- */

function Certifications() {
  const items = [
    {
      title: "LeetCode — Top 15% Biweekly",
      desc: "300+ submissions · 50-day & 100-day streak badges",
      href: "https://leetcode.com/u/Umair-Lari/",
    },
    {
      title: "Google Cloud Arcade — Skill Badges",
      desc: "Hands-on labs in cloud infrastructure & data engineering",
      href: "https://www.skills.google/public_profiles/8d66a145-3000-404c-96a5-4863dd281884",
    },
    {
      title: "Google Scholar",
      desc: "Made the public appearance with first publication, Feb 2024",
      href: SCHOLAR_URL,
    },
    {
      title: "Cybersecurity Foundation — Coursera",
      desc: "8-course micro-degree program for cybersecurity tinkering, Apr 2024",
      href: "https://www.coursera.org/account/accomplishments/professional-cert/HQKJ5229NCUV?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof",
    },
  ];

  return (
    <Section id="certs" eyebrow="06 — Credentials" title="Certifications & achievements.">
      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <Reveal key={it.title} index={i} className="h-full">
            <a
              href={it.href}
              {...external(it.href)}
              className="group surface surface-interactive flex h-full flex-col justify-between gap-6 p-8"
            >
              <div>
                <p className="font-display text-2xl font-semibold text-foreground group-hover:text-gold transition-colors">
                  {it.title}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{it.desc}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-gold">
                View profile
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  const cards = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { label: "GitHub", value: "Mohd-Umair-Lari", href: GITHUB_URL },
    { label: "LinkedIn", value: "Connect with me", href: LINKEDIN_URL },
    {
      label: "Phone",
      value: PHONE_PRIMARY,
      secondary: PHONE_SECONDARY,
      href: `tel:${PHONE_PRIMARY.replace(/\s|-/g, "")}`,
    },
  ];

  return (
    <section id="contact" className="relative border-t border-border/60">
      <div className="container-prose py-28 md:py-40">
        <Reveal>
          <p className="eyebrow mb-6">07 — Contact</p>
          <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
            Let's build something
            <br />
            <span className="text-gradient-gold">worth publishing.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.label} index={i} className="h-full">
              <a
                href={c.href}
                {...external(c.href)}
                className="group surface surface-interactive block h-full p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {c.label}
                </p>
                <p className="mt-3 font-display text-lg font-semibold group-hover:text-gold transition-colors break-all">
                  {c.value}
                </p>
                {c.secondary && <p className="mt-1 text-sm text-muted-foreground">{c.secondary}</p>}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal index={2}>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href={`mailto:${EMAIL}`}>Email me →</a>
            </Button>
            <Button variant="accent" size="lg" asChild>
              <a href={CV_HREF} download>
                Download CV (PDF)
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="relative border-t border-border bg-card backdrop-blur-sm">
      <div className="container-prose py-10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Mohd Umair Lari. All rights reserved.</p>
        <div className="flex items-center gap-6 font-mono uppercase tracking-widest">
          <a href={GITHUB_URL} {...external(GITHUB_URL)} className="story-link hover:text-gold">
            GitHub
          </a>
          <a href={LINKEDIN_URL} {...external(LINKEDIN_URL)} className="story-link hover:text-gold">
            LinkedIn
          </a>
          <a href="#top" className="story-link hover:text-gold">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
