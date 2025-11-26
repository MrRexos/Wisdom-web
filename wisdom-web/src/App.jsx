import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const navLinks = ['Use cases', 'Services', 'Features', 'Testimonials', 'Pricing'];

const heroTiles = [
  { size: 'w-28 h-32 md:w-32 md:h-36', top: '12%', left: '8%' },
  { size: 'w-20 h-24 md:w-24 md:h-28', top: '25%', left: '25%' },
  { size: 'w-24 h-28 md:w-28 md:h-32', top: '18%', right: '10%' },
  { size: 'w-24 h-28 md:w-28 md:h-32', top: '55%', left: '6%' },
  { size: 'w-32 h-40 md:w-36 md:h-44', top: '52%', right: '18%' },
  { size: 'w-24 h-28 md:w-28 md:h-32', bottom: '10%', left: '28%' },
  { size: 'w-28 h-32 md:w-32 md:h-36', bottom: '12%', right: '12%' },
];

const sharedScreens = [
  '/images/IMG_7890.PNG',
  '/images/IMG_7959.PNG',
  '/images/IMG_7960.PNG',
  '/images/IMG_7965%20(1).PNG',
];

const howItWorksFlows = {
  customers: [
    {
      id: 'search',
      label: 'Search',
      description:
        'Search by service, category or location to see trusted professionals around you.',
      screen: sharedScreens[0],
    },
    {
      id: 'compare',
      label: 'Compare',
      description:
        'Compare prices, reviews, photos, availability and distance in one clean view.',
      screen: sharedScreens[1],
    },
    {
      id: 'book',
      label: 'Book',
      description:
        'Pick a time that works for you, confirm instantly and keep every detail in one place.',
      screen: sharedScreens[2],
    },
    {
      id: 'pay',
      label: 'Pay',
      description:
        'Pay securely in the app and save your favourites for one-tap rebooking next time.',
      screen: sharedScreens[3],
    },
  ],
  professionals: [
    {
      id: 'create',
      label: 'Create',
      description:
        'Create a professional profile with your services, prices, locations, photos and availability.',
      screen: sharedScreens[0],
    },
    {
      id: 'decide',
      label: 'Decide',
      description:
        'Receive clear booking requests and decide which ones to accept or reschedule.',
      screen: sharedScreens[1],
    },
    {
      id: 'work',
      label: 'Work',
      description:
        'Deliver your services while Wisdom keeps bookings, messages and details organised.',
      screen: sharedScreens[2],
    },
    {
      id: 'charge',
      label: 'Charge',
      description:
        'Get paid securely through Wisdom, with invoices and payouts handled for you.',
      screen: sharedScreens[3],
    },
  ],
};

const footerNav = {
  primary: [
    'Home',
    'How it works',
    'For Customers',
    'For Professionals',
    'Categories',
    'Testimonials',
    'Safety',
    'Pricing',
    'Help & FAQ',
    'Devices',
  ],
  secondary: ['Blog', 'About Wisdom'],
  useCases: [
    'Home Services',
    'Health & Wellness',
    'Classes & Tutoring',
    'Beauty & Grooming',
    'Events & Experiences',
    'Online Services',
  ],
  legal: [
    'Privacy Policy',
    'Terms of Use',
    'Cancellation Policy',
    'Booking Policy',
    'Wisdom Guarantee',
  ],
};

const promiseCards = [
  {
    title: 'Web-clipper',
    description: 'Save anything from the internet without breaking your flow.',
  },
  {
    title: 'Mobile',
    description: 'A second brain, in your pocket. Instantly capture ideas or look something up.',
  },
  {
    title: 'Desktop',
    description: 'Search or capture to your Fabric digital mind instantly on your computer.',
  },
];

const PlaceholderBox = ({ className, style = {} }) => (
  <div className={`bg-[#d9d9d9] ${className}`} style={style} aria-hidden />
);

const SectionHeading = ({ title, subtitle, eyebrow }) => (
  <div className="space-y-3 text-center">
    {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-[#7f8794]">{eyebrow}</p>}
    <h2 className="text-4xl font-semibold text-[#050505]">{title}</h2>
    {subtitle && <p className="text-lg text-[#4c5563]">{subtitle}</p>}
  </div>
);

const VISIBLE_RANGE = 4;
const ANGLE_PER_ITEM = 15.5;
const RADIUS = 340;

const HowItWorks3D = ({ activeTab, flows }) => {
  const containerRef = useRef(null);
  const steps = flows[activeTab] || flows.customers;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepLength = 1 / (steps.length - 1);
    const newIndex = Math.round(latest / stepLength);
    const clampedIndex = Math.min(Math.max(newIndex, 0), steps.length - 1);

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10 px-4 md:flex-row md:gap-16">
          <div className="order-2 flex h-[500px] w-full flex-1 items-center justify-center md:order-1 md:h-[700px] md:justify-start">
            <div className="relative flex h-full w-full flex-col items-center justify-center md:items-start">
              <div
                className="relative h-[700px] w-full max-w-5xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                }}
              >
                <div className="relative h-full w-full left-8 md:left-24">
                  {steps.map((step, index) => (
                    <FanItem key={step.id} item={step} index={index} activeIndex={activeIndex} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 flex h-[45vh] w-full flex-1 items-center justify-center md:order-2 md:h-auto">
            <div className="relative flex h-auto w-[220px] items-center justify-center md:w-[300px]">
              <img
                src="/images/phone.png"
                alt="Phone frame"
                className="relative z-20 h-auto w-full pointer-events-none drop-shadow-2xl"
              />
              <div className="absolute left-1/2 top-1/2 z-10 h-[94%] w-[85%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] bg-black md:rounded-[46px]">
                {steps.map((step, index) => (
                  <motion.img
                    key={step.id}
                    src={step.screen}
                    alt={step.label}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      scale: activeIndex === index ? 1 : 1.02,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 h-full w-full object-fill"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FanItem = ({ item, index, activeIndex }) => {
  const distance = index - activeIndex;
  const rotate = distance * ANGLE_PER_ITEM;
  const isActive = index === activeIndex;
  const isVisible = Math.abs(distance) < VISIBLE_RANGE;

  return (
    <motion.div
      animate={{
        rotate: rotate,
        opacity: isVisible ? (isActive ? 1 : 0.3) : 0,
        color: isActive ? '#050505' : '#e5e7eb',
      }}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 25,
      }}
      style={{
        transformOrigin: `${-RADIUS}px 50%`,
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
      }}
      className="flex flex-col items-center justify-center md:items-start"
    >
      <h3 className="cursor-pointer whitespace-nowrap text-xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-[60px]">
        {item.label}.
      </h3>
      <p className="mt-3 max-w-md text-center text-sm text-[#4c5563] md:text-left md:text-base">{item.description}</p>
    </motion.div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('customers');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 1.1 });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const sections = gsap.utils.toArray('.fade-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#050505]">
      <header className="fixed top-4 left-1/2 z-20 flex w-[min(1100px,calc(100%-2rem))] -translate-x-1/2 items-center rounded-full bg-white px-8 py-3 font-semibold">
        <div className="flex flex-1 justify-start text-lg">Wisdom</div>
        <nav className="hidden flex-none flex-wrap items-center justify-center gap-4 md:flex">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-sm font-semibold text-[#4c5563] hover:text-[#050505]">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 justify-end">
          <button className="rounded-full bg-[#050505] px-6 py-2 text-sm font-semibold text-white hover:bg-black">Get the app</button>
        </div>
      </header>

      <main className="pt-28 pb-20">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 fade-section">
          <div className="absolute inset-0">
            {heroTiles.map((tile, index) => (
              <PlaceholderBox
                key={index}
                className={`absolute rounded-lg ${tile.size}`}
                style={{ top: tile.top, left: tile.left, right: tile.right, bottom: tile.bottom }}
              />
            ))}
          </div>
          <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Wisdom is where you find a Professional.</h1>
            <p className="text-lg text-[#4c5563]">The first unified marketplace for every service. Simple. Secure. One app.</p>
            <button className="rounded-full bg-[#050505] px-8 py-3 text-sm font-semibold text-white hover:bg-black">Download for free</button>
          </div>
        </section>

        <section className="fade-section mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-24 md:flex-row">
          <PlaceholderBox className="aspect-[3/4] w-full max-w-md rounded-3xl" />
          <p className="max-w-md text-3xl font-semibold leading-snug text-center md:text-left">
            Looking for help used to be a leap of faith.
          </p>
        </section>

        <section className="fade-section px-6 py-24">
          <p className="mx-auto max-w-3xl text-center text-2xl font-semibold leading-relaxed text-[#050505]">
            Endless searches. Reliance on word-of-mouth. Zero guarantees. The service world was fragmented, forcing you to guess instead of choose.
          </p>
        </section>

        <section className="fade-section relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#e8ecf0] via-white to-[#e8ecf0] px-6 py-28">
          <div className="absolute inset-0 opacity-50">
            <PlaceholderBox className="absolute inset-0" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-12 text-white md:flex-row md:items-center md:gap-16">
            <p className="max-w-sm text-xl font-semibold leading-snug drop-shadow-lg">
              Looking for help used to be a leap of faith.
            </p>
            <p className="max-w-sm text-xl font-semibold leading-snug drop-shadow-lg">
              Great skills got lost in noise. Managing bookings was manual, trust was hard to build, and credibility took years to establish.
            </p>
          </div>
        </section>

        <section className="fade-section px-6 py-24">
          <p className="text-center text-4xl font-semibold">Until now.</p>
        </section>

        <section className="fade-section flex flex-col items-center gap-12 px-6 py-20">
          <div className="relative flex h-[320px] w-full max-w-3xl items-center justify-center">
            <div className="absolute left-10 top-6"><PlaceholderBox className="h-24 w-24 rounded-xl" /></div>
            <div className="absolute right-12 top-8"><PlaceholderBox className="h-24 w-28 rounded-xl" /></div>
            <div className="absolute left-4 bottom-10"><PlaceholderBox className="h-24 w-24 rounded-xl" /></div>
            <div className="absolute right-4 bottom-6"><PlaceholderBox className="h-24 w-24 rounded-xl" /></div>
            <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-[#050505] text-3xl font-semibold text-white">
              W
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-[#050505] text-3xl font-semibold text-white">W</div>
            <p className="text-lg font-semibold">Wisdom unifies the chaos.</p>
          </div>
        </section>

        <section className="fade-section px-6 py-20">
          <p className="mx-auto max-w-4xl text-center text-xl leading-relaxed text-[#050505]">
            We replaced word-of-mouth with verified data. We replaced uncertainty with transparent profiles. A single ecosystem where quality is visible, and trust is the default.
          </p>
        </section>

        <section className="fade-section px-6 py-24">
          <SectionHeading title={<span>Always with <em>you.</em></span>} />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {promiseCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
                <PlaceholderBox className="mb-6 h-16 w-16 rounded-xl" />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm text-[#4c5563]">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fade-section mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:flex-row md:items-center">
          <div className="space-y-4 text-4xl font-semibold leading-tight text-[#9b9b9b]">
            <p className="text-[#050505]">Search.</p>
            <p>Compare.</p>
            <p>Book.</p>
            <p>Pay.</p>
          </div>
          <div className="flex flex-1 justify-center">
            <PlaceholderBox className="aspect-[10/21] w-[260px] rounded-[36px] shadow-lg md:w-[340px]" />
          </div>
        </section>

        <section className="fade-section px-4 py-24">
          <div className="mx-auto max-w-6xl rounded-[30px] bg-[#f5f5f5] px-6 py-16 md:px-12">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  activeTab === 'customers' ? 'bg-[#050505] text-white' : 'bg-white text-[#4c5563]'
                }`}
                onClick={() => setActiveTab('customers')}
              >
                For customers
              </button>
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  activeTab === 'professionals' ? 'bg-[#050505] text-white' : 'bg-white text-[#4c5563]'
                }`}
                onClick={() => setActiveTab('professionals')}
              >
                For professionals
              </button>
            </div>
            <HowItWorks3D activeTab={activeTab} flows={howItWorksFlows} />
          </div>
        </section>
      </main>

      <footer className="bg-[#050505] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <p className="text-lg font-semibold">Primary navigation</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {footerNav.primary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold">Secondary navigation</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {footerNav.secondary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold">Use Cases</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {footerNav.useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold">Legal</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {footerNav.legal.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/20 pt-8 text-sm text-white/70">
            <p>All rights reserved.</p>
            <p>Built in Barcelona, Spain – made for people who value their time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
