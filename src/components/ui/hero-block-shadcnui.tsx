import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const socials = [
  { icon: Github, href: "https://github.com/Mohd-Umair-Lari", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mohd-umair-lari-872594288/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:umairlari0786@gmail.com", label: "Email" },
];

export function HeroBlock() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="relative flex items-center justify-center overflow-hidden min-h-[100svh] w-full"
    >
      <div className="absolute inset-0 bg-line-grid" aria-hidden />

      <motion.div
        variants={staggerContainer(0.15)}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative z-10 mx-auto max-w-4xl text-center px-6 pt-16"
      >
        <motion.div variants={fadeUp} className="mb-8 inline-block">
          <Avatar className="mx-auto h-28 w-28 md:h-32 md:w-32 border-4 border-gold/30 shadow-glow ring-4 ring-gold/15">
            <AvatarImage
              src="/profile.jpg"
              alt="Mohd Umair Lari"
              className="object-cover object-center"
            />
            <AvatarFallback className="bg-primary font-display text-2xl font-bold text-primary-foreground">
              UL
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.p variants={fadeUp} className="eyebrow mb-4">
          Kolkata, India · B.Tech CSE (AI & ML)
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mb-3 text-5xl font-bold tracking-tight text-foreground md:text-7xl font-display"
        >
          Mohd Umair Lari
        </motion.h1>

        <motion.p variants={fadeUp} className="mb-6 text-xl font-medium text-gold md:text-2xl">
          AI/ML Engineer & Researcher
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Engineering intelligent, cloud-native systems — from RAG pipelines and Monte Carlo finance
          to edge-native IoT security, published with IEEE and Springer.
        </motion.p>

        <motion.div variants={fadeUp} className="mb-12 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="hero" asChild>
            <a href="mailto:umairlari0786@gmail.com">
              <Mail />
              Get in Touch
            </a>
          </Button>
          <Button size="lg" variant="accent" asChild>
            <a href="#projects">
              View Projects
              <ArrowDown />
            </a>
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="surface surface-interactive flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.7 },
          y: { delay: 1.4, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-gold transition-colors"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
