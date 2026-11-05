// src/routes/index.tsx
// SquadMind Global Ltd. — single-page homepage for TanStack Router (file-based routing).
// Requires: react, @tanstack/react-router, tailwindcss, lucide-react
// Contact form POSTs JSON to /api/contact (Express endpoint, see notes in chat).

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUp,
  Armchair,
  Briefcase,
  CalendarDays,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Gift,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Newspaper,
  Phone,
  X,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const ORIGIN = 'https://squadmindglobal.com/assets/images' // swap for your own /assets once downloaded
const fallback = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'subsidiaries', label: 'Subsidiaries' },
  { id: 'clientele', label: 'Clientele' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

const SLIDES = [
  {
    eyebrow: 'We are',
    title: 'Squadmind Global Ltd.',
    subtitle: 'Full scale Event, Exhibition & Marketing Agency',
    tagline: 'Operational in Asia, Africa & Middle East.',
    body: 'At SquadMind Global Ltd., we believe in turning possibilities into realities. Founded in 2020 and headquartered in Dhaka, Bangladesh, we are a dynamic consortium of specialized ventures, each dedicated to delivering innovative solutions across a spectrum of industries.',
    image: fallback('squadmind-hero-1', 1920, 1080),
    cta: { label: 'Learn More', href: '#about' },
  },
  {
    eyebrow: 'At SquadMind Global',
    title: 'We bring creativity, strategy and precision.',
    subtitle: '',
    tagline: '',
    body: 'Our approach is driven by collaboration and expertise. Each arm of our organization is led by a dedicated SquadLeader, ensuring specialized focus and exceptional results in event management, exhibition organizing, interactive marketing campaign management, public relations, brand activation, production & publication, interior design, trade consultancy, and more.',
    image: fallback('squadmind-hero-2', 1920, 1080),
    cta: { label: 'Our Services', href: '#services' },
  },
  {
    eyebrow: 'What sets us apart',
    title: 'Unwavering commitment to quality and client satisfaction.',
    subtitle: '',
    tagline: '',
    body: 'Over 300 projects across 12+ countries, delivered by specialists who care about every detail — from the first brief to the final handover.',
    image: fallback('squadmind-hero-3', 1920, 1080),
    cta: { label: 'See Our Work', href: '#projects' },
  },
  {
    eyebrow: 'Our vision & mission',
    title: 'Innovation that redefines success.',
    subtitle: '',
    tagline: '',
    body: '',
    image: fallback('squadmind-hero-4', 1920, 1080),
    cta: { label: 'Get in Touch', href: '#contact' },
    vision:
      'To lead by innovation and create unparalleled solutions that redefine success for our clients.',
    mission:
      'To deliver excellence through specialized services, driven by expertise and a passion for making a difference.',
  },
] as Array<{
  eyebrow: string
  title: string
  subtitle: string
  tagline: string
  body: string
  image: string
  cta: { label: string; href: string }
  vision?: string
  mission?: string
}>

const WHY_US = [
  {
    title: 'Expertise in Every Sector',
    body: 'Each division of SquadMind is led by industry specialists who bring years of experience and deep insights into the projects we handle. In every segment that we work on, our expertise ensures exceptional outcomes tailored to your needs.',
  },
  {
    title: 'Client-Centric Approach',
    body: 'Your success is our priority. We listen, collaborate, and adapt to provide solutions that align perfectly with your goals and expectations in a sustainable manner.',
  },
  {
    title: 'Innovative and Strategic Solutions',
    body: 'We combine creativity with strategic thinking to craft innovative ideas that resonate with your vision and drive impactful results in your target market.',
  },
  {
    title: 'Comprehensive Services Under One Roof',
    body: 'Our multidisciplinary team offers a wide range of services, allowing you to access integrated solutions without the hassle of managing multiple vendors.',
  },
  {
    title: 'Proven Track Record',
    body: 'With a growing portfolio of more than 300 successful projects and satisfied clients, we have built a reputation for reliability, quality, and excellence in different countries.',
  },
  {
    title: 'Commitment to Excellence',
    body: 'We are driven by a passion for perfection and a commitment to delivering projects on time, within budget, and beyond expectations.',
  },
]

const SERVICES = [
  {
    icon: CalendarDays,
    title: 'Event Management',
    body: 'From small gatherings to large-scale events, we bring your ideas to life with meticulous planning, creative designs, and seamless execution. We have specific individuals for each of the segments which ensures flawless and remarkable experience.',
  },
  {
    icon: Building2,
    title: 'Exhibition Organizing & Management',
    body: 'We specialize in managing trade exhibitions that elevate your brand and connect you with your target audience. We ensure a seamless experience that maximizes engagement, fosters networking opportunities, and drives measurable business growth.',
  },
  {
    icon: Megaphone,
    title: 'Interactive Marketing Campaign',
    body: 'We develop engaging and interactive marketing campaigns to bring your brand closer to your audience, leaving a lasting impression that drives loyalty. We analyze market demographics and come up with plans that fit the audience.',
  },
  {
    icon: Briefcase,
    title: 'Business Consultancy',
    body: 'Our consultancy services provide strategic insights and expert advice to help your business navigate challenges, seize opportunities, and achieve sustainable growth.',
  },
  {
    icon: Clapperboard,
    title: 'Production Video Commercial & Documentary',
    body: 'From visual content to multimedia production, we deliver high-quality solutions that captivate audiences and amplify your message. Our creative team and crews have executed more than 100 projects over the course of 5 years.',
  },
  {
    icon: Armchair,
    title: 'Interior Design and Décor',
    body: 'Transform exhibition, personal and commercial spaces with our innovative interior design and décor solutions that blend functionality with aesthetic appeal, creating environments that inspire.',
  },
  {
    icon: Gift,
    title: 'Gift & Goodie Production',
    body: 'We have a strong sourcing capacity for gift items and our very own facility to produce fabric & leather products that can be used as promo and commercial items.',
  },
  {
    icon: Newspaper,
    title: 'Public Relations Management',
    body: 'Build your brand’s voice and connect with your audience through impactful PR strategies, media relations, and targeted communication campaigns.',
  },
]

const STATS = [
  { value: 300, suffix: '+', label: 'Projects' },
  { value: 100, suffix: '+', label: 'Brands' },
  { value: 12, suffix: '+', label: 'Countries' },
  { value: 5, suffix: '', label: 'Years of Journey' },
]

const SISTER_CONCERNS = Array.from({ length: 5 }, (_, i) => ({
  name: `Sister Concern ${i + 1}`,
  src: `${ORIGIN}/sister-concerns/sister-concern_${i + 1}.png`,
}))

const CLIENT_LOGOS = Array.from({ length: 89 }, (_, i) => ({
  name: `Client ${i + 1}`,
  src: `${ORIGIN}/clients/Logos-${i + 1}.png`,
}))

const WORK = Array.from({ length: 36 }, (_, i) => ({
  title: `Project ${i + 1}`,
  src: `${ORIGIN}/work/${i + 1}.JPG`,
}))

const POSTS = [
  {
    date: 'SEP 01',
    comments: 12,
    title: 'Our New Office',
    img: `${ORIGIN}/blog/1.jpg`,
  },
  {
    date: 'SEP 12',
    comments: 7,
    title: 'An Old Men Life',
    img: `${ORIGIN}/blog/2.jpg`,
  },
  {
    date: 'SEP 18',
    comments: 10,
    title: 'A Beach Day',
    img: `${ORIGIN}/blog/3.jpg`,
  },
  {
    date: 'SEP 25',
    comments: 15,
    title: 'New Ad Shoot',
    img: `${ORIGIN}/blog/4.jpg`,
  },
]

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.949940296738!2d90.39487867589783!3d23.784796887453933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c15675ee1851%3A0x46a752df774dcf7e!2sSquadMind%20Global%20Ltd.!5e0!3m2!1sen!2sbd!4v1734951916864!5m2!1sen!2sbd'

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                             */
/* -------------------------------------------------------------------------- */

/** <img> that swaps to a placeholder if the original asset 404s. */
function Img({
  src,
  alt,
  seed,
  className,
  w = 800,
  h = 600,
}: {
  src: string
  alt: string
  seed: string
  className?: string
  w?: number
  h?: number
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        const el = e.currentTarget
        if (!el.dataset.fallback) {
          el.dataset.fallback = '1'
          el.src = fallback(seed, w, h)
        }
      }}
    />
  )
}

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function SectionHeading({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string
  title: string
  light?: boolean
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-bold tracking-tight md:text-5xl ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-orange-500" />
    </div>
  )
}

function Section({
  id,
  className = '',
  children,
}: {
  id: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-5 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 shadow-lg backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <a href="#home" className="flex items-center gap-2">
          <Img
            src={`${ORIGIN}/squadmind_logo-sm-main.png`}
            alt="SquadMind Global"
            seed="squadmind-logo"
            w={200}
            h={60}
            className="h-10 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                active === item.id
                  ? 'bg-orange-500 text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle navigation"
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-slate-950 lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium uppercase tracking-wide text-white/90"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hero carousel                                                             */
/* -------------------------------------------------------------------------- */

function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = SLIDES.length

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000)
    return () => clearInterval(t)
  }, [paused, count])

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count)

  return (
    <section
      id="home"
      className="relative h-svh min-h-160 w-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt=""
            className={`h-full w-full object-cover transition-transform duration-8000 ${
              i === index ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 pt-16">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
                  {s.eyebrow}
                </p>
                <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                  {s.title}
                </h1>
                {s.subtitle && (
                  <p className="mt-4 text-xl font-medium text-white/90 md:text-2xl">
                    {s.subtitle}
                  </p>
                )}
                {s.tagline && (
                  <p className="mt-1 text-lg text-orange-300">{s.tagline}</p>
                )}
                {s.body && (
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                    {s.body}
                  </p>
                )}
                {s.vision && s.mission && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-400">
                        Our Vision
                      </h3>
                      <p className="text-white/85">{s.vision}</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-400">
                        Our Mission
                      </h3>
                      <p className="text-white/85">{s.mission}</p>
                    </div>
                  </div>
                )}
                <a
                  href={s.cta.href}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  {s.cta.label} <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 p-3 text-white transition hover:bg-orange-500 md:block"
      >
        <ChevronLeft />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 p-3 text-white transition hover:bg-orange-500 md:block"
      >
        <ChevronRight />
      </button>

      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index
                ? 'w-10 bg-orange-500'
                : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  About / Why choose us                                                     */
/* -------------------------------------------------------------------------- */

function About() {
  const [open, setOpen] = useState<number>(0)
  return (
    <Section id="about" className="bg-white">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Who we are
          </p>
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Why Choose Us
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {WHY_US.map((item, i) => (
              <div key={item.title}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span
                    className={`font-semibold ${
                      open === i ? 'text-orange-600' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform ${
                      open === i
                        ? 'rotate-180 text-orange-600'
                        : 'text-slate-400'
                    }`}
                  />
                </button>
                {open === i && (
                  <p className="px-5 pb-5 leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-orange-500/10" />
          <Img
            src={`${ORIGIN}/about.png`}
            alt="About SquadMind"
            seed="squadmind-about"
            w={900}
            h={700}
            className="relative w-full rounded-2xl object-cover shadow-xl"
          />
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

function Services() {
  return (
    <Section id="services" className="bg-slate-950">
      <SectionHeading
        eyebrow="We are passionate about"
        title="Our Services"
        light
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/4 p-6 transition hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/[0.07]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
              <Icon size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-white/65">
              {body}
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange-400 hover:text-orange-300"
            >
              More <ArrowRight size={14} />
            </a>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Subsidiaries                                                              */
/* -------------------------------------------------------------------------- */

function Subsidiaries() {
  return (
    <Section id="subsidiaries" className="bg-slate-50">
      <SectionHeading eyebrow="Subsidiaries" title="Our Sister Concerns" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {SISTER_CONCERNS.map((s, i) => (
          <div
            key={s.src}
            className="flex aspect-4/3 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
          >
            <Img
              src={s.src}
              alt={s.name}
              seed={`sister-${i}`}
              w={300}
              h={220}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Clientele                                                                 */
/* -------------------------------------------------------------------------- */

function Clientele() {
  const [showAll, setShowAll] = useState(false)
  const logos = showAll ? CLIENT_LOGOS : CLIENT_LOGOS.slice(0, 24)
  return (
    <Section id="clientele" className="bg-white">
      <SectionHeading eyebrow="Clientele" title="Our Loving Clients" />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {logos.map((c, i) => (
          <div
            key={c.src}
            className="flex aspect-3/2 items-center justify-center rounded-xl border border-slate-200 bg-white p-3 grayscale transition hover:border-orange-300 hover:grayscale-0"
          >
            <Img
              src={c.src}
              alt={c.name}
              seed={`client-${i}`}
              w={240}
              h={160}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowAll((v) => !v)}
          className="rounded-full border border-slate-300 px-7 py-3 font-semibold text-slate-800 transition hover:border-orange-500 hover:text-orange-600"
        >
          {showAll ? 'Show fewer' : `Show all ${CLIENT_LOGOS.length} clients`}
        </button>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Projects / portfolio                                                      */
/* -------------------------------------------------------------------------- */

function Projects() {
  const [visible, setVisible] = useState(12)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const items = useMemo(() => WORK.slice(0, visible), [visible])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight')
        setLightbox((i) => (i === null ? i : (i + 1) % WORK.length))
      if (e.key === 'ArrowLeft')
        setLightbox((i) =>
          i === null ? i : (i - 1 + WORK.length) % WORK.length,
        )
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <Section id="projects" className="bg-slate-950">
      <SectionHeading eyebrow="Whom we changed" title="Our Portfolio" light />

      <div className="mb-14 grid grid-cols-2 gap-6 md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-white/4 p-6 text-center"
          >
            <div className="text-4xl font-extrabold text-orange-400 md:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm uppercase tracking-widest text-white/70">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 *:mb-4">
        {items.map((w, i) => (
          <button
            key={w.src}
            onClick={() => setLightbox(i)}
            className="group relative block w-full overflow-hidden rounded-xl"
          >
            <Img
              src={w.src}
              alt={w.title}
              seed={`work-${i}`}
              w={700}
              h={i % 3 === 0 ? 900 : 600}
              className="w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-linear-to-t from-slate-950/80 via-transparent opacity-0 transition group-hover:opacity-100">
              <span className="p-4 text-sm font-semibold text-white">
                {w.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {visible < WORK.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisible((v) => Math.min(v + 12, WORK.length))}
            className="rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Load more
          </button>
        </div>
      )}

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X />
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((lightbox - 1 + WORK.length) % WORK.length)
            }}
          >
            <ChevronLeft />
          </button>
          <Img
            src={WORK[lightbox].src}
            alt={WORK[lightbox].title}
            seed={`work-${lightbox}`}
            w={1400}
            h={900}
            className="max-h-[88vh] max-w-full rounded-lg object-contain"
          />
          <button
            aria-label="Next"
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((lightbox + 1) % WORK.length)
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Blog                                                                      */
/* -------------------------------------------------------------------------- */

function Blog() {
  return (
    <Section id="blog" className="bg-slate-50">
      <SectionHeading eyebrow="What we musing on" title="Our Blog" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {POSTS.map((p, i) => (
          <article
            key={p.title}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <Img
                src={p.img}
                alt={p.title}
                seed={`blog-${i}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-md bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                {p.date}
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 text-xs text-slate-500">
                Posted by Admin · {p.comments} comments
              </div>
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                {p.title}
              </h3>
              {/* Replace with a <Link to="/blog/$slug"> once blog routes exist */}
              <a
                href="#blog"
                className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600"
              >
                Read More <ArrowRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

type FormState = { name: string; email: string; phone: string; message: string }
const EMPTY: FormState = { name: '', email: '', phone: '', message: '' }

function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setForm(EMPTY)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'

  return (
    <Section id="contact" className="bg-white">
      <SectionHeading eyebrow="Get in touch" title="Contact Us" />

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          {[
            {
              icon: MapPin,
              title: 'Our Address',
              lines: [
                'Squadmind HQ., House 191, Road 1, Wing B3, Mohakhali New DOHS, Dhaka-1206. Bangladesh',
              ],
            },
            {
              icon: Phone,
              title: 'Call Us',
              lines: [
                '+88 01678 136798',
                '+88 01844 610631',
                '(Direct Call & WhatsApp)',
              ],
            },
            {
              icon: Mail,
              title: 'Email Us',
              lines: [
                'info@squadmindglobal.com',
                'marketing@squadmindglobal.com',
              ],
            },
          ].map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="mb-1 font-bold text-slate-900">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-sm text-slate-600">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4 lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={set('name')}
              className={inputCls}
            />
            <input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={set('email')}
              className={inputCls}
            />
          </div>
          <input
            placeholder="Phone number"
            value={form.phone}
            onChange={set('phone')}
            className={inputCls}
          />
          <textarea
            required
            rows={6}
            placeholder="How can we help?"
            value={form.message}
            onChange={set('message')}
            className={inputCls}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Submit Contact'}
          </button>
          {status === 'sent' && (
            <p className="text-sm font-medium text-emerald-600">
              Thanks! We’ve received your message and will get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm font-medium text-red-600">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>

      <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200">
        <iframe
          title="SquadMind Global Ltd. location"
          src={MAP_SRC}
          className="h-95 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Footer + back-to-top                                                      */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="bg-slate-950 px-5 py-12 text-white/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <Img
            src={`${ORIGIN}/squadmind_logo-sm-main.png`}
            alt="SquadMind Global"
            seed="squadmind-logo"
            w={200}
            h={60}
            className="mx-auto mb-3 h-10 w-auto md:mx-0"
          />
          <p className="text-sm">
            © {new Date().getFullYear()} SquadMind Global. All rights reserved.
          </p>
        </div>
        <div className="text-center">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white">
            Connect With Us
          </h4>
          <div className="flex justify-center gap-3">
            <a
              href="https://www.facebook.com/squadmindglobal"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 font-bold transition hover:bg-orange-500 hover:text-white"
            >
              f
            </a>
            <a
              href="https://www.linkedin.com/company/squadmindglobal"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-bold transition hover:bg-orange-500 hover:text-white"
            >
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 rounded-full bg-orange-500 p-3 text-white shadow-lg transition hover:bg-orange-600"
    >
      <ArrowUp size={20} />
    </a>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

function HomePage() {
  useEffect(() => {
    document.title =
      'SquadMind Global Ltd | Event, Exhibition & Marketing Agency'
    const prev = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = prev
    }
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Subsidiaries />
        <Clientele />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
