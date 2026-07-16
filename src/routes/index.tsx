import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

const DotSphere = lazy(() => import("@/components/DotSphere"));

const GITHUB_URL = "https://github.com/Mohd-Umair-Lari";
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
    ],
  }),
  component: Portfolio,
});
function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
function SphereStage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.7, 0.45]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(40,80,50,0.55) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 50%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 65%)",
        }}
      />
      {mounted && (
        <Suspense fallback={null}>
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] md:w-[36vw] md:h-[36vw] lg:w-[30vw] lg:h-[30vw] pointer-events-none">
            <DotSphere />
          </div>
        </Suspense>
      )}
    </motion.div>
  );
}
function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <ScrollBackground />
      <SphereStage />
      <Nav />
      <main className="relative">
        <Hero />
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

function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(180deg, #c8ebc8 0%, #dff3df 100%)",
      "linear-gradient(180deg, #eaf6ea 0%, #f6fbf6 100%)",
      "linear-gradient(180deg, #ffffff 0%, #ffffff 100%)",
    ],
  );
  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="fixed inset-0 -z-20 pointer-events-none"
    />
  );
}
function Nav() {
  const links = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Work", "#experience"],
    ["Projects", "#projects"],
    ["Research", "#publications"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 backdrop-blur-md bg-background/60 border-b border-gold/40"
    >
      <div className="container-prose flex items-center justify-between h-16">
        <a href="#top" className="font-display text-xl tracking-wide text-gold">
          Lari
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="story-link hover:text-gold transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={CV_HREF}
          download
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-widest border border-gold/60 text-gold hover:bg-gold hover:text-primary-foreground transition-colors"
        >
          Download CV
        </a>
      </div>
    </motion.header>
  );
}
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const name = "Mohd Umair";
  return (
    <section id="top" ref={ref} className="relative">
      <motion.div
        style={{ y, opacity: fade }}
        className="container-prose relative pt-28 pb-32 md:pt-40 md:pb-48 min-h-[92vh] flex flex-col justify-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="eyebrow mb-8"
        >
          Portfolio · MMXXVI
        </motion.p>

        <h1 className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight">
          <span className="inline-block overflow-hidden">
            {name.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block mr-4 last:mr-0">
                {word.split("").map((ch, i) => (
                  <motion.span
                    key={`${wi}-${i}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.35 + (wi * 4 + i) * 0.04,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="italic text-gradient-gold inline-block"
          >
            Lari.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          AI/ML engineer & researcher engineering{" "}
          <span className="text-foreground">intelligent, cloud-native systems</span>{" "}
          — from RAG pipelines and Monte Carlo finance to edge-native IoT security,
          published with IEEE and Springer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 bg-gold text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide hover:opacity-90 transition hover-scale"
          >
            View selected work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium tracking-wide border border-border hover:border-gold hover:text-gold transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6"
        >
          {[
            ["8.32", "CGPA · B.Tech AI/ML"],
            ["2", "Research publications"],
            ["300+", "LeetCode submissions"],
            ["3", "Spoken languages"],
          ].map(([k, v], i) => (
            <motion.div
              key={v}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55 + i * 0.08, duration: 0.6 }}
              className="border-l border-gold/40 pl-4"
            >
              <dt className="font-display text-3xl md:text-4xl text-gold">{k}</dt>
              <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {v}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            scroll ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
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
            , Kolkata, studying Computer Science with a specialization in
            Artificial Intelligence & Machine Learning.
          </p>
          <p>
            My work sits at the intersection of{" "}
            <span className="text-foreground">applied ML</span>,{" "}
            <span className="text-foreground">cloud-native engineering</span>{" "}
            and <span className="text-foreground">research</span> — shipping
            full-stack AI products on GCP and contributing to peer-reviewed
            papers on IoT security and malware detection.
          </p>
          <p>
            Outside the terminal: I speak German (CEFR A2, sitting for B1),
            French (A1), and English fluently — and I'm always one coffee away
            from the next LeetCode contest.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2">
          <aside className="border border-border p-8 bg-card/70 backdrop-blur-sm">
            <p className="eyebrow mb-6">At a glance</p>
            <ul className="space-y-4 text-sm">
              <Row k="Based in" v="Kolkata, India" />
              <Row k="Degree" v="B.Tech CSE (AI & ML), 2023–27" />
              <Row k="Focus" v="Applied ML · GCP · RAG" />
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
    <li className="flex justify-between gap-4 border-b border-border/60 pb-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-foreground text-right">{v}</span>
    </li>
  );
}
function Skills() {
  const groups: { title: string; items: string[] }[] = [
    { title: "Languages", items: ["Python", "Java", "SQL", "Bash", "HTML / CSS / JS"] },
    { title: "AI / ML", items: ["scikit-learn", "TensorFlow", "LangChain", "RAG Pipelines", "Agentic AI", "OpenCV"] },
    { title: "Google Cloud", items: ["Vertex AI", "BigQuery / BigQuery ML", "Cloud Run", "Cloud Functions", "VM Mapping", "CI/CD"] },
    { title: "Engineering", items: ["FastAPI · Flask", "MERN Full-Stack", "REST APIs · CORS", "MongoDB · MySQL", "Docker", "Git & GitHub"] },
    { title: "Concepts", items: ["SDLC", "OOP", "DSA", "DBMS", "Unit Testing", "Version Control"] },
    { title: "Tools", items: ["Jupyter", "MATLAB", "Apache", "Bootstrap"] },
  ];

  return (
    <Section id="skills" eyebrow="02 — Toolkit" title="Stack & specialisms.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -6, borderColor: "var(--gold)" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group border border-border p-6 bg-card/70 backdrop-blur-sm h-full"
            >
              <h3 className="font-display text-2xl text-gold mb-4">{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="text-xs px-3 py-1.5 border border-border/80 text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
function Experience() {
  return (
    <Section id="experience" eyebrow="03 — Experience" title="Where I've worked.">
      <ol className="space-y-12">
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
          note={
            <a
              href="https://drive.google.com/drive/folders/1_MQZPCji5dUS_6XLYQ2ngoMO1x1JmmLn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold transition-colors underline underline-offset-4"
            >
              ICC & LOR awarded
            </a>
          }
        />
      </ol>
    </Section>
  );
}

function ExperienceItem({
  when, role, org, bullets, tags, note,
}: {
  when: string; role: string; org: string; bullets: string[]; tags: string[]; note?: ReactNode;
}) {
  return (
    <Reveal>
      <li className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border pt-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold">{when}</p>
          {note && <p className="mt-3 text-xs text-muted-foreground italic">{note}</p>}
        </div>
        <div>
          <h3 className="font-display text-3xl md:text-4xl">{role}</h3>
          <p className="mt-1 text-muted-foreground">{org}</p>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex gap-3"
              >
                <span className="text-gold mt-2 shrink-0">—</span>
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-widest px-2.5 py-1 border border-gold/40 text-gold">
                {t}
              </span>
            ))}
          </div>
        </div>
      </li>
    </Reveal>
  );
}
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
      href: "https://github.com/Mohd-Umair-Lari/AI-Driven-Invest-planner",
      cta: "GitHub repo",
    },
    {
      n: "02",
      title: "Serverless AI API on GCP",
      tagline: "FinPass, productionised on Google Cloud.",
      body: [
        "Containerised Python backend + frontend with Docker, deployed to Cloud Run for fully managed, autoscaling serverless inference.",
        "Integrated Google Generative AI via Vertex AI alongside pre-trained APIs, exposed through clean REST endpoints.",
        "Leveraged BigQuery ML for data ingestion and analytics pipelines feeding the LLM layer.",
      ],
      stack: ["Cloud Run", "Vertex AI", "BigQuery ML", "Docker", "Generative AI"],
      href: GITHUB_URL,
      cta: "GCP console",
    },
  ];

  return (
    <Section id="projects" eyebrow="04 — Selected work" title="Projects.">
      <div className="space-y-16">
        {projects.map((p, idx) => (
          <Reveal key={p.title} delay={idx * 0.08}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group grid md:grid-cols-12 gap-8 border-t border-gold/30 pt-12"
            >
              <div className="md:col-span-3">
                <p className="font-mono text-xs text-gold">{p.n} / PROJECT</p>
                <h3 className="font-display text-4xl md:text-5xl mt-3 leading-none">{p.title}</h3>
              </div>
              <div className="md:col-span-9">
                <p className="text-xl md:text-2xl font-display italic text-gold-soft">{p.tagline}</p>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  {p.body.map((para) => <p key={para}>{para}</p>)}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[10px] uppercase tracking-widest px-2.5 py-1 border border-border text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft transition-colors story-link"
                >
                  {p.cta}
                  <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
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
    },
  ];

  return (
    <Section id="publications" eyebrow="05 — Research" title="Published work.">
      <ul className="space-y-8">
        {pubs.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <li className="grid md:grid-cols-[180px_1fr_auto] gap-6 border-t border-border pt-8">
              <div>
                <p className="font-mono text-xs text-gold uppercase tracking-widest">
                  {p.venue.split(" — ")[0]}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{p.when}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground italic">{p.authors}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.venue}</p>
              </div>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start text-[10px] uppercase tracking-widest px-2.5 py-1 border border-gold/50 text-gold hover:bg-gold hover:text-primary-foreground transition-colors story-link"
                >
                  {p.tag}
                </a>
              ) : (
                <span className="self-start text-[10px] uppercase tracking-widest px-2.5 py-1 border border-gold/50 text-gold">
                  {p.tag}
                </span>
              )}
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
function Certifications() {
  const items = [
    { title: "LeetCode — Top 15% Biweekly", desc: "300+ submissions · 50-day & 100-day streak badges", href: "https://leetcode.com/u/Umair-Lari/" },
    { title: "Google Cloud Arcade — Skill Badges", desc: "Hands-on labs in cloud infrastructure & data engineering", href: "https://www.skills.google/public_profiles/8d66a145-3000-404c-96a5-4863dd281884" },
    { title: "Cybersecurity Foundation — Coursera", desc: "Micro-degree, Apr 2024", href: "https://www.coursera.org/account/accomplishments/professional-cert/HQKJ5229NCUV?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof" },
    { title: "Python WebDev & Cloud — Microsoft", desc: "Feb 2024", href: "file:///C:/Users/umair/OneDrive/documents/Umair/Resumes/Umair_Lari_AI_ML_Engineer_Resume.pdf" },
  ];

  return (
    <Section id="certs" eyebrow="06 — Credentials" title="Certifications & achievements.">
      <div className="grid sm:grid-cols-2 gap-px bg-border">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08}>
            <a href={it.href} target="_blank" rel="noreferrer" className="block bg-background/80 backdrop-blur-sm p-8 h-full hover:bg-card transition-colors">
              <p className="font-display text-2xl text-foreground">{it.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{it.desc}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
function Contact() {
  return (
    <section id="contact" className="relative">
      <div className="container-prose py-32 md:py-44">
        <Reveal>
          <p className="eyebrow mb-6">07 — Contact</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1] tracking-tight">
            Let's build something
            <br />
            <span className="italic text-gradient-gold">worth publishing.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-10">
          <Reveal delay={0.1}>
            <ContactCard label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
          </Reveal>
          <Reveal delay={0.2}>
            <ContactCard label="GitHub" value="Mohd-Umair-Lari" href={GITHUB_URL} />
          </Reveal>
          <Reveal delay={0.3}>
            <ContactCard
              label="Phone"
              value={PHONE_PRIMARY}
              secondary={PHONE_SECONDARY}
              href={`tel:${PHONE_PRIMARY.replace(/\s|-/g, "")}`}
            />
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="mt-16 flex flex-wrap gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 bg-gold text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide hover:opacity-90 transition hover-scale"
            >
              Email me →
            </a>
            <a
              href={CV_HREF}
              download
              className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium tracking-wide border border-gold/60 text-gold hover:bg-gold hover:text-primary-foreground transition-colors"
            >
              Download CV (PDF)
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard({
  label, value, secondary, href,
}: { label: string; value: string; secondary?: string; href: string }) {
  return (
    <motion.a
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group block border-t border-gold/40 pt-6 hover:border-gold transition-colors"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-2xl group-hover:text-gold transition-colors break-all">{value}</p>
      {secondary && <p className="mt-1 text-sm text-muted-foreground">{secondary}</p>}
    </motion.a>
  );
}
function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="container-prose py-10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Mohd Umair Lari. All rights reserved.</p>
        <p className="font-mono uppercase tracking-widest">Kolkata · India</p>
      </div>
    </footer>
  );
}
function Section({
  id, eyebrow, title, children,
}: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="relative border-t border-border/60">
      <div className="container-prose py-24 md:py-32">
        <Reveal>
          <header className="mb-14 max-w-3xl">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              {title}
            </h2>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
