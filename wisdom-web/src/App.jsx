import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const sharedScreens = [
  '/images/IMG_7890.PNG',
  '/images/IMG_7959.PNG',
  '/images/IMG_7960.PNG',
  '/images/IMG_7965%20(1).PNG',
];

const navLinks = [
  'How it works',
  'For Customers',
  'For Professionals',
  'Categories',
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
  //{ label: 'Get it on Google Play' },
];

const beforeAfter = {
  before:
    'You open five tabs, text three providers, wait hours for replies and never see the final price until the last message.',
  after:
    'You open Wisdom, type “cleaning tomorrow at 6pm”, compare rated professionals with clear prices, and confirm your booking in a few taps.',
  midText: 'Save hours every week with Wisdom.',
};

const discoverButtons = ['Browse categories', 'View nearby services'];

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
const ANGLE_PER_ITEM = 15.5; // Tu ángulo solicitado
const RADIUS = 340; // Radio calculado para que con 15.5° no se amontonen las palabras

const HowItWorks3D = ({ activeTab, flows }) => {
  const containerRef = useRef(null);
  const steps = flows[activeTab] || flows.customers;

  // 1. Control del Scroll:
  // Usamos un contenedor muy alto (350vh) para dar tiempo al usuario a leer y ver la animación.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 2. Estado discreto (Sin valores intermedios):
  // En lugar de pasar el valor "float" del scroll a la rotación, 
  // calculamos qué índice (0, 1, 2 o 3) debe estar activo.
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Dividimos el scroll en pasos exactos
    const stepLength = 1 / (steps.length - 1); 
    // Math.round asegura que salte al más cercano, sin quedarse a medias
    const newIndex = Math.round(latest / stepLength);
    
    // Aseguramos que no se salga de los límites
    const clampedIndex = Math.min(Math.max(newIndex, 0), steps.length - 1);

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  return (
    // CONTENEDOR SCROLL TRACK:
    // Tiene una altura grande (400vh) para permitir el scroll de la página.
    // Es 'relative' para que el sticky de adentro funcione respecto a este padre.
    <div 
      ref={containerRef} 
      className="relative h-[250vh] w-full"
    >
      {/* 
          CONTENEDOR STICKY:
          Se pega al top:0 y ocupa toda la pantalla (h-screen).
          El usuario hace scroll "a través" del padre, pero este div se queda fijo.
      */}
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
                {/* Tus ajustes de posición: left-14 y left-32 */}
                <div className="relative h-full w-full left-14 md:left-32">
                  {steps.map((step, index) => (
                    <FanItem
                      key={step.id}
                      item={step}
                      index={index}
                      activeIndex={activeIndex} // Pasamos el índice entero
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- DERECHA: MÓVIL --- */}
          <div className="order-1 flex h-[45vh] w-full flex-1 items-center justify-center md:order-2 md:h-auto">
            {/* Contenedor principal con las medidas del móvil */}
            <div className="relative aspect-[9/19] w-[220px] md:w-[340px]">
              
              {/* 
                  CAPA 1: EL MARCO (Phone Frame) 
                  Lo ponemos con z-20 para que esté POR ENCIMA de las fotos.
                  Así, si la foto se sale un milímetro, el marco la tapa y queda perfecto.
              */}
              <img
                src="/images/phone.png"
                alt="Wisdom app"
                className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain drop-shadow-2xl"
              />

              {/* 
                  CAPA 2: LA PANTALLA (Screenshots)
                  Lo ponemos con z-10 para que esté POR DEBAJO.
                  
                  AJUSTES CLAVE:
                  1. inset-[10px] md:inset-[15px]: Ajuste preciso en píxeles. 
                     Esto empuja la imagen hacia dentro lo justo para librar el borde del teléfono.
                  2. rounded-[30px] md:rounded-[50px]: Aumentamos la curva. 
                     Los iPhones modernos tienen esquinas muy redondas. Si pones menos, se ven picos negros.
              */}
              <div className="absolute inset-[10px] md:inset-[16px] z-10 overflow-hidden rounded-[32px] md:rounded-[50px] bg-black">
                 {steps.map((step, index) => (
                   <motion.img
                     key={step.id}
                     src={step.screen}
                     alt={step.label}
                     initial={{ opacity: 0 }}
                     animate={{ 
                       opacity: activeIndex === index ? 1 : 0,
                       scale: activeIndex === index ? 1 : 1.05 
                     }}
                     transition={{ duration: 0.4, ease: "easeInOut" }}
                     // 'object-cover' asegura que la foto llene todo el hueco sin deformarse
                     className="absolute h-full w-full object-cover"
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

// --- FanItem Actualizado (Lógica Discreta) ---
const FanItem = ({ item, index, activeIndex }) => {
  // Calculamos la distancia basada en enteros puros.
  // Si activeIndex es 1 y yo soy 0, la distancia es -1.
  const distance = index - activeIndex;
  
  // Multiplicamos por el ángulo fijo.
  // Al ser 'distance' un entero, el resultado siempre es múltiplo de 15.5.
  // Cero decimales = Cero rotaciones intermedias.
  const rotate = distance * ANGLE_PER_ITEM;
  
  // Definimos si el elemento es visible o el activo
  const isActive = index === activeIndex;
  const isVisible = Math.abs(distance) < VISIBLE_RANGE;

  return (
    <motion.div
      // Usamos 'animate' en lugar de 'style'. 
      // Framer Motion se encarga de la transición suave entre el estado A y B.
      animate={{
        rotate: rotate,
        opacity: isVisible ? (isActive ? 1 : 0.3) : 0, // Opacidad simple: Activo=1, Cerca=0.3, Lejos=0
        color: isActive ? "#050505" : "#e5e7eb",
      }}
      transition={{
        // Ajustamos el resorte para que el "salto" se sienta bien
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


// Componente individual para cada palabra en la ruleta
const WordItem = ({ item, index, total, progress }) => {
  // Transformaciones matemáticas para simular el cilindro 3D
  
  // Opacidad: 1 cuando está en el centro, desvanece al alejarse
  const opacity = useTransform(progress, (val) => {
    const pos = index / (total - 1);
    const distance = Math.abs(val - pos);
    return 1 - distance * 2.5; // Ajusta 2.5 para que desaparezcan antes o después
  });

  // Posición Y: Se mueve hacia arriba/abajo
  const y = useTransform(progress, (val) => {
    const pos = index / (total - 1);
    return (val - pos) * -400; // -400 controla la velocidad de separación vertical
  });

  // Rotación X: Crea el efecto de cilindro
  const rotateX = useTransform(progress, (val) => {
    const pos = index / (total - 1);
    const distance = val - pos;
    return distance * 60; // 60 grados de rotación máxima
  });

  // Escala: Se hace más pequeño al alejarse
  const scale = useTransform(progress, (val) => {
    const pos = index / (total - 1);
    const distance = Math.abs(val - pos);
    return 1 - distance * 0.4;
  });

  return (
    <motion.div
      style={{
        opacity,
        y,
        rotateX,
        scale,
        transformStyle: "preserve-3d",
        transformOrigin: "center center -100px", // Punto de fuga para el efecto 3D
      }}
      className="absolute inset-0 flex flex-col items-center justify-center md:items-start"
    >
      <h3 className="text-5xl font-semibold leading-tight text-[#050505] md:text-7xl">
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
      if (!headerRef.current || !heroRef.current) return;

      const headerRect = headerRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      const isOverHero = heroRect.top < headerRect.bottom && heroRect.bottom > headerRect.top;
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

  const steps = activeTab === 'customers' ? customerSteps : professionalSteps;

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#050505]">
      <header
        ref={headerRef}
        className={`
          fixed top-4 left-1/2 z-20 w-[calc(100%-2rem)] -translate-x-1/2
          flex items-center rounded-full px-4 py-4 text-sm font-semibold
          transition-[background-color,box-shadow,backdrop-filter,border-radius] duration-300
          ${headerOverHero
            ? 'max-w-none bg-transparent shadow-none backdrop-blur-none pr-[40px] pl-[50px]'
            : 'max-w-6xl bg-white/80 shadow-lg backdrop-blur-[10px] px-6'}
        `}
      >
        <div
          className={`flex flex-1 justify-start transition-transform duration-300 ${
            headerOverHero ? '-translate-x-6' : 'translate-x-0'
          }`}
        >
          <div
            className={`text-lg font-semibold transition-colors ${
              headerOverHero ? 'text-white' : 'text-[#050505]'
            }`}
          >
            Wisdom
          </div>
        </div>

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

        <div
          className={`flex flex-1 justify-end gap-3 transition-transform duration-300 ${
            headerOverHero ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          <button
            className={`rounded-full px-6 py-2 text-sm font-semibold shadow-lg transition-all duration-300 ${
              headerOverHero ? 'bg-white text-[#050505] hover:bg-white/90' : 'bg-[#050505] text-white hover:bg-black'
            }`}
          >
            Get the app
          </button>
        </div>
      </header>

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

        <div className="mt-24 items-center justify-center px-4 pb-24">

          {/* How Wisdom Works*/}

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

            {/* Nueva sección interactiva tipo "Summarize" */}
            <HowItWorks3D activeTab={activeTab} flows={howItWorksFlows} />
          </section>


          <section className="mt-24 max-w-6xl mx-auto justify-center space-y-10">
            <SectionHeading
              title="Booking services has never been easier"
            />
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
            <SectionHeading title="Simplify your day with Wisdom"  />
            <div className="grid gap-6 md:grid-cols-2">
              {simplifyHighlights.map((item) => (
                <Card key={item.title}>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-[#4c5563]">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>


          {/* <section className="mt-24 max-w-6xl mx-auto justify-center space-y-10">
            <SectionHeading title="Discover" subtitle="Find the right professional for anything you need." />
            <p className="text-lg text-[#4c5563]">
              From home cleaning to personal training, beauty, tutoring and more – Wisdom puts every kind of service in a single,
              simple app. Search by category, budget, language, rating and location to see only the professionals that actually
              fit your life.
            </p>
            <div className="flex flex-wrap gap-4">
              {discoverButtons.map((label) => (
                <button key={label} className="rounded-full bg-[#050505] px-8 py-3 text-sm font-semibold text-white">
                  {label}
                </button>
              ))}
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7f8794]">About Discover</p>
          </section>

          <section className="mt-24 max-w-6xl mx-auto justify-center space-y-8">
            <SectionHeading title="Book" subtitle="Schedule, chat and pay in one place." />
            <p className="text-lg text-[#4c5563]">
              Pick a time that works for you, confirm the booking and pay securely without leaving the app. Message your professional,
              share photos or details and keep every update in one clear conversation.
            </p>
            <a href="#" className="text-sm font-semibold text-[#050505] underline">
              About Booking
            </a>
          </section> */}
          

          {/*Comment*/}

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
          
          {/*Safety*/}

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

          {/*Pricing + Devices*/}

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