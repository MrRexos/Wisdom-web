import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

// ... (Mantén tus arrays de datos: sharedScreens, navLinks, howItWorksFlows, etc. IGUAL QUE ANTES) ...
const sharedScreens = [
  '/images/IMG_7890.PNG',
  '/images/IMG_7959.PNG',
  '/images/IMG_7960.PNG',
  '/images/IMG_7965%20(1).PNG',
];

const navLinks = [
  'Use cases',
  'Services',
  'Features',
  'Testimonials',
  'Pricing',
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

const heroButtons = [
  { label: 'Download for free', primary: true },
];

// ... (Mantén el resto de constantes: heroButtons, discoverButtons, customerSteps, etc.) ...
const customerSteps = [
  {
    title: 'Tell us what you need',
    description: 'Search by service, category or location to see trusted professionals around you.',
  },
  {
    title: 'Compare your options',
    description: 'Check prices, reviews, photos, availability and distance at a glance.',
  },
  {
    title: 'Book with confidence',
    description:
      'Choose a time, pay securely in the app, and relax. You are covered by the Wisdom Guarantee and clear cancellation policies.',
  },
];

const professionalSteps = [
  {
    title: 'Create your profile',
    description:
      'Show your services, photos, prices, locations and availability in a clean, professional profile.',
  },
  {
    title: 'Receive bookings, not random messages',
    description:
      'Get clear requests with all the details you need, accept or propose a new time and manage your calendar from your phone.',
  },
  {
    title: 'Get paid securely',
    description: 'Wisdom handles payments, receipts and payouts, so you can focus on delivering great work.',
  },
];

const bookingHighlights = [
  {
    title: 'Keep everything in one place',
    description:
      'Save your home, gym or office addresses, preferred times and favourite professionals for one-tap rebooking.',
  },
  {
    title: 'Add multiple sources',
    description:
      'Find services by searching, browsing categories, exploring the map or using personalised suggestions.',
  },
];

const bookingExtra = [
  {
    title: 'Smart filters',
    description:
      'Filter by price, rating, distance, availability, language and more – then save your favourite combinations for next time.',
  },
  {
    title: 'Request changes',
    description:
      'Need to adjust the time or add an extra service? Request edits directly in the chat and keep all changes in one thread.',
  },
  {
    title: 'Advanced personalisation',
    description:
      'From recurring bookings to flexible locations, Wisdom adapts to your routine instead of forcing you to adapt to the app.',
  },
];

const simplifyHighlights = [
  {
    title: 'Live status',
    description:
      'See when a professional confirms your booking, is on the way, or has completed the service.',
  },
  {
    title: 'Stay focused on what matters',
    description:
      'Automatic reminders and notifications help you stay organised without managing endless chats and notes.',
  },
  {
    title: 'One conversation, all the details',
    description:
      'Share photos, videos or voice notes inside Wisdom so your professional knows exactly what you need – before they arrive.',
  },
  {
    title: 'Flexible when plans change',
    description:
      'Reschedule or adjust your booking within the policies set by each professional, without awkward phone calls.',
  },
];

const businessHighlights = [
  'Invite your team or work solo — Whether you are an independent professional or part of a larger team, Wisdom helps you centralise bookings, clients and payments.',
  'Simple onboarding — Create a professional profile in minutes. Add your services, prices, locations, photos and languages – no website required.',
  'See your impact — Track bookings, earnings and repeat clients to understand how Wisdom is helping you grow.',
  'Built for trust — Verified profiles, transparent prices and real reviews help new clients choose you with confidence.',
];

const testimonials = [
  {
    quote: '“Wisdom makes it easy for clients to find me and book without back-and-forth.”',
    author: 'Laura, Hair stylist',
  },
  {
    quote: '“I stopped juggling messages in three different apps. Now everything goes through Wisdom.”',
    author: 'Karim, Handyman',
  },
  {
    quote: '“Clear prices, instant bookings and a clean dashboard – this is how services should work.”',
    author: 'Marta, Cleaner',
  },
];

const safetyBlocks = [
  {
    title: 'Transparent and local',
    description:
      'See total prices, fees and policies before you book. No hidden surprises when you confirm.',
  },
  {
    title: 'Wisdom Guarantee',
    description:
      'If something does not go as expected, our Wisdom Guarantee and clear booking policies help you get support and a fair resolution.',
  },
  {
    title: 'Verified professionals',
    description:
      'Professionals are required to provide key information and are rated after every booking, helping you choose with confidence.',
  },
  {
    title: 'Control over your data',
    description:
      'You decide what to share with professionals. Your messages, photos and payment details stay inside Wisdom and are never sold.',
  },
];

const pricingPlans = [
  {
    audience: 'For customers',
    price: 'Free',
    description: 'Download Wisdom for free and pay only for the services you book.',
    features: ['Up-front pricing', 'No subscription required', 'Secure in-app payments'],
  },
  {
    audience: 'For professionals',
    price: 'Simple, flexible fees',
    description:
      'Get started for free. Pay a small fee per booking when you earn through Wisdom.',
    features: [
      'No fixed monthly commitment to start',
      'Tools to manage bookings and clients',
      'Support when you need it',
    ],
  },
];

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

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="mb-10 text-center">
    {eyebrow && (
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7f8794]">
        {eyebrow}
      </p>
    )}
    <h2 className="mt-3 text-[45px] font-semibold text-[#050505]">{title}</h2>
    {subtitle && <p className="mt-4 text-lg text-[#4c5563]">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`rounded-[32px] bg-[#f5f5f5] p-8 ${className}`}>{children}</div>
);

const ITEM_HEIGHT = 90;
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
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
        <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center pl-4 md:pl-12 gap-8 md:flex-row md:justify-between">
          {/* --- IZQUIERDA: RULETA --- */}
          <div className="order-2 flex h-[500px] w-full flex-1 items-center justify-center md:order-1 md:h-[700px] md:justify-start">
            <div className="relative flex h-full w-full flex-col items-center justify-center md:items-start">
              <div
                className="relative h-[700px] w-full max-w-6xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                }}
              >
                <div className="relative h-full w-full left-14 md:left-32">
                  {steps.map((step, index) => (
                    <FanItem
                      key={step.id}
                      item={step}
                      index={index}
                      activeIndex={activeIndex}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- DERECHA: MÓVIL --- */}
          <div className="order-1 flex h-[45vh] w-full flex-1 items-center justify-center md:order-2 md:h-auto">
            <div className="relative flex justify-center items-center w-[220px] md:w-[300px] h-auto">
              <img
                src="/images/phone.png"
                alt="Phone frame"
                className="relative z-20 w-full h-auto pointer-events-none drop-shadow-2xl"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[85%] h-[94%] rounded-[30px] md:rounded-[46px] overflow-hidden bg-black">
                {steps.map((step, index) => (
                  <motion.img
                    key={step.id}
                    src={step.screen}
                    alt={step.label}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      scale: activeIndex === index ? 1 : 1.02
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
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
        color: isActive ? "#050505" : "#e5e7eb",
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 25
      }}
      style={{
        transformOrigin: `${-RADIUS}px 50%`,
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%"
      }}
      className="flex flex-col items-center justify-center md:items-start"
    >
      <h3 className="whitespace-nowrap text-xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-[60px] cursor-pointer">
        {item.label}.
      </h3>
    </motion.div>
  );
};

function App() {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const [headerOverHero, setHeaderOverHero] = useState(true);
  const [activeTab, setActiveTab] = useState('customers');

  useEffect(() => {
    const handleScroll = () => {
      // Solo necesitamos saber la posición del scroll relative al hero
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      // Si el fondo del hero pasa hacia arriba más allá de un punto (ej: 100px), activamos el modo "sticky"
      const isOverHero = heroRect.bottom > 100; 
      setHeaderOverHero(isOverHero);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#050505]">
      {/* HEADER CORREGIDO:
         Usamos motion.header para animar el width, background y padding simultáneamente.
      */}
      <motion.header
        ref={headerRef}
        // Posicionamiento fijo base
        className="fixed top-4 left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full font-semibold overflow-hidden"
        // Definimos los estilos iniciales
        initial={false}
        // Animamos propiedades según el estado
        animate={{
          // Width: 100% cuando está en Hero, 72rem (max-w-6xl) cuando está sticky
          width: headerOverHero ? "calc(100% - 2rem)" : "min(100% - 2rem, 72rem)",
          // Fondo: Transparente en Hero, Blanco borroso en sticky
          backgroundColor: headerOverHero ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.8)",
          backdropFilter: headerOverHero ? "blur(0px)" : "blur(10px)",
          boxShadow: headerOverHero 
            ? "0 0 0 0 rgba(0,0,0,0)" 
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          // Padding: Más grande en Hero para separar elementos, normal en sticky
          paddingLeft: headerOverHero ? "50px" : "24px",
          paddingRight: headerOverHero ? "40px" : "24px",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* LOGO WISDOM: Se mueve hacia el centro (x:0) desde la izquierda (x:-20) */}
        <motion.div
          className="flex flex-1 justify-start"
          animate={{
            x: headerOverHero ? -20 : 200,
            opacity: 1 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div
            className={`text-lg font-semibold transition-colors duration-300 ${
              headerOverHero ? 'text-white' : 'text-[#050505]'
            }`}
          >
            Wisdom
          </div>
        </motion.div>

        {/* NAV LINKS (No se mueven, solo fade de color) */}
        <nav className="hidden flex-none flex-wrap items-center justify-center gap-4 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-semibold transition-colors duration-300 ${
                headerOverHero ? 'text-white/90 hover:text-white' : 'text-[#4c5563] hover:text-[#050505]'
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* BOTÓN GET APP: Se mueve hacia el centro (x:0) desde la derecha (x:20) */}
        <motion.div
          className="flex flex-1 justify-end gap-3"
          animate={{
            x: headerOverHero ? 20 : -145
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <button
            className={`rounded-full px-6 py-2 text-sm font-semibold shadow-lg transition-colors duration-300 ${
              headerOverHero ? 'bg-white text-[#050505] hover:bg-white/90' : 'bg-[#050505] text-white hover:bg-black'
            }`}
          >
            Get the app
          </button>
        </motion.div>
      </motion.header>

      <main>
        <section
          ref={heroRef}
          className="relative m-4 min-h-[calc(100vh-2rem)] overflow-hidden rounded-[30px] bg-cover bg-center bg-no-repeat px-6 pt-[140px] pb-12 text-white"
          style={{ backgroundImage: "url('https://storage.googleapis.com/wisdom-images/hand3.png')", opacity: 0.99 }}
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">Services, not searching</h1>
            <p className="mx-auto mt-9 max-w-3xl text-lg text-white/90">
              Book any professional in minutes.
            </p>
            <p className="mx-auto max-w-3xl text-lg text-white/90">
              Discover trusted services near you, compare in one view, and confirm instantly with secure payment.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {heroButtons.map((button) => (
                <button
                  key={button.label}
                  className={`rounded-full px-8 py-3 text-base font-semibold shadow-lg ${
                    button.primary ? 'bg-white text-[#050505]' : 'bg-[#050505] text-white'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ... Resto del contenido (sin cambios) ... */}
        <div className="mt-24 items-center justify-center px-4 pb-24">
          <section className=" justify-center space-y-10">
            <SectionHeading title="How Wisdom works" />
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['customers', 'professionals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-6 py-2 text-sm font-semibold capitalize ${
                    activeTab === tab
                      ? 'bg-[#050505] text-white'
                      : 'bg-[#f5f5f5] text-[#4c5563]'
                  }`}
                >
                  {tab === 'customers' ? 'For customers' : 'For professionals'}
                </button>
              ))}
            </div>
            <HowItWorks3D activeTab={activeTab} flows={howItWorksFlows} />
          </section>

          <section className="mt-24 max-w-6xl mx-auto justify-center space-y-10">
            <SectionHeading title="Booking services has never been easier" />
            <div className="grid gap-6 md:grid-cols-2">
              {bookingHighlights.map((highlight) => (
                <Card key={highlight.title}>
                  <h3 className="text-2xl font-semibold">{highlight.title}</h3>
                  <p className="mt-4 text-[#4c5563]">{highlight.description}</p>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {bookingExtra.map((item) => (
                <Card key={item.title}>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-[#4c5563]">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-24 max-w-6xl mx-auto justify-center space-y-10">
            <SectionHeading title="Simplify your day with Wisdom" />
            <div className="grid gap-6 md:grid-cols-2">
              {simplifyHighlights.map((item) => (
                <Card key={item.title}>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-[#4c5563]">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-24 space-y-10 relative m-4 min-h-[calc(100vh-2rem)] overflow-hidden rounded-[30px] bg-[#f5f5f5] p-8 ">
            <SectionHeading title="Grow your business with Wisdom" subtitle="Alex — Personal Trainer" />
            <p className="text-lg text-[#4c5563]">Build a stronger client base with less admin.</p>
            <div className="space-y-4">
              {businessHighlights.map((highlight) => (
                <p key={highlight} className="text-[#4c5563]">
                  {highlight}
                </p>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.author} className="bg-white">
                  <p className="text-lg font-medium">{testimonial.quote}</p>
                  <p className="mt-4 text-sm font-semibold text-[#7f8794]">{testimonial.author}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-24 max-w-6xl mx-auto justify-center space-y-10">
            <SectionHeading title="Your safety comes first" />
            <div className="grid gap-6 md:grid-cols-3">
              {safetyBlocks.map((block) => (
                <Card key={block.title}>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7f8794]">{block.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{block.title}</h3>
                  <p className="mt-4 text-[#4c5563]">{block.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-24 max-w-6xl mx-auto justify-center space-y-10">
            <SectionHeading title="Clear pricing" />
            <div className="grid gap-6 md:grid-cols-2">
              {pricingPlans.map((plan) => (
                <Card key={plan.audience} className="bg-white">
                  <p className="text-sm font-semibold text-[#7f8794]">{plan.audience}</p>
                  <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
                  <p className="mt-4 text-[#4c5563]">{plan.description}</p>
                  <ul className="mt-6 space-y-2 text-sm text-[#050505]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-lg">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
            <p className="text-lg text-[#4c5563]">
              One app, all your devices — Use Wisdom on your phone or tablet. Start a search on one device and continue on another – your favourites, bookings and messages are always in sync.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-[#050505] px-8 py-3 text-sm font-semibold text-white">Download Wisdom</button>
            </div>
          </section>
        </div>

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
      </main>
    </div>
  );
}

export default App;