import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const navLinks = ['Use cases', 'Services', 'Features', 'Testimonials', 'Pricing'];

const heroTiles = [
  // Arriba Izquierda
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174847.png",
    size: 'w-32 h-20 md:w-40 md:h-28',
    style: { top: '-4%', left: '-2%' }
  },
  // Arriba Centro-Izquierda
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180612.png",
    size: 'w-40 h-20 md:w-60 md:h-32',
    style: { top: '7%', left: '20%' }
  },
  // Arriba Centro-Derecha
  {
    url: "https://storage.googleapis.com/wisdom-images/77502ab75202d6b38aa0df57113b6746.jpg",
    size: 'w-36 h-20 md:w-52 md:h-32',
    style: { top: '4%', right: '23%' }
  },
  // Arriba Derecha
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180656.png",
    size: 'w-40 h-20 md:w-60 md:h-32',
    style: { top: '12%', right: '-3%' }
  },
  // Abajo Izquierda
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181310.png",
    size: 'w-40 h-24 md:w-60 md:h-40',
    style: { bottom: '31%', left: '10%' }
  },
  // Abajo Izquierda Esquina
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20190223.png",
    size: 'w-36 h-24 md:w-56 md:h-40',
    style: { bottom: '-4%', left: '-3%' }
  },
  // Abajo Derecha
  {
    url: "https://storage.googleapis.com/wisdom-images/237ee01c-4454-4d81-8f27-f502f74ac9d3.jpeg",
    size: 'w-28 h-36 md:w-44 md:h-56',
    style: { bottom: '14%', right: '21%' }
  },
  // Abajo Derecha Esquina
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175117.png",
    size: 'w-40 h-20 md:w-60 md:h-32',
    style: { bottom: '-5%', right: '5%' }
  },
  // Abajo Centro
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174733.png",
    size: 'w-20 h-32 md:w-32 md:h-48',
    style: { bottom: '-6%', right: '49%' }
  },
];

const grayShapes = [
  { size: 'w-14 h-32 md:w-20 md:h-44', style: { top: '23%', left: '6%' } },
  { size: 'w-20 h-28 md:w-28 md:h-40', style: { top: '5%', left: '47%' } },
  { size: 'w-24 h-24 md:w-32 md:h-32', style: { top: '70%', right: '28%' } },

  // --- CAMBIO EN ESTE OBJETO (ÍNDICE 3) ---
  {
    size: 'w-20 h-28 md:w-28 md:h-40',
    style: { bottom: '13%', left: '28%' },
    isAnimated: true, // Marcador para identificarlo
    // Esta es la imagen que aparecerá DENTRO del cuadro gris
    imageInside: "https://storage.googleapis.com/wisdom-images/search_services.png"
  },
  // ----------------------------------------

  { size: 'w-28 h-32 md:w-38 md:h-44', style: { bottom: '23%', right: '-3%' } },
  { size: 'w-32 h-14 md:w-48 md:h-20', style: { top: '37%', right: '10%' } },
];

const sharedScreens = [
  '/images/IMG_7890.PNG',
  '/images/IMG_7959.PNG',
  '/images/IMG_7960.PNG',
  '/images/IMG_7965%20(1).PNG',
];

const securityFeatures = [
  {
    title: 'Transparent and local',
    description: 'See total prices, fees and policies before you book. No hidden surprises when you confirm.',
    icon: (
      // strokeWidth cambiado a "2"
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    ),
  },
  {
    title: 'Wisdom Guarantee',
    description: 'If something does not go as expected, our Wisdom Guarantee and clear booking policies help you get support.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
    ),
  },
  {
    title: 'Verified professionals',
    description: 'Professionals are required to provide key information and are rated after every booking, helping you choose with confidence.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    ),
  },
  {
    title: 'Control over your data',
    description: 'You decide what to share with professionals. Your messages, photos and payment details stay inside Wisdom.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
  },
];

const serviceFamilies = [
  {
    family: 'For you',
    categories: [
      { id: 2, category: 'Plumbing', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174847.png" },
      { id: 89, category: 'AI Development', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20201215.png" },
      { id: 1, category: 'Home Cleaning', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174733.png" },
      { id: 31, category: 'Personal Training', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175621.png" },
      { id: 317, category: 'Dog Walkers', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20190223.png" },
      { id: 318, category: 'Pet Care', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20190446.png" },
      { id: 5, category: 'Masonry', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175117.png" },
      { id: 83, category: 'App Development', url: "https://storage.googleapis.com/wisdom-images/451067aa-4bd3-43d8-874d-ff8b5e50ce7e.jpeg" },
      { id: 84, category: 'Web Development', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181853.png" },
      { id: 151, category: 'Architects', url: "https://storage.googleapis.com/wisdom-images/526bda5b-c0c2-4170-b552-12a17db69fa9.jpeg" },
      { id: 8, category: 'Painting', url: "https://storage.googleapis.com/wisdom-images/237ee01c-4454-4d81-8f27-f502f74ac9d3.jpeg" }
    ]
  },
  {
    family: 'Home & Maintenance',
    description: 'Find trusted professionals for your home.',
    categories: [
      { id: 1, category: 'Home Cleaning', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174733.png" },
      { id: 2, category: 'Plumbing', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174847.png" },
      { id: 3, category: 'Electrical Work', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175034.png" },
      { id: 5, category: 'Masonry', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175117.png" },
      { id: 6, category: 'Gardening', url: "https://storage.googleapis.com/wisdom-images/4a4881ba-a06f-4bb1-be9d-016d2b49eae4.jpeg" },
      { id: 8, category: 'Painting', url: "https://storage.googleapis.com/wisdom-images/237ee01c-4454-4d81-8f27-f502f74ac9d3.jpeg" }
    ]
  },
  {
    family: 'Health & Wellbeing',
    description: 'Take care of your body and mind.',
    categories: [
      { id: 31, category: 'Personal Training', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175621.png" },
      { id: 32, category: 'Nutritionists', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175812.png" },
      { id: 34, category: 'Psychology', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180032.png" },
      { id: 35, category: 'Yoga', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180113.png" },
      { id: 36, category: 'Meditation', url: "https://storage.googleapis.com/wisdom-images/53a50b05-32d7-4e90-86ce-62702bc97d65.jpeg" },
      { id: 37, category: 'Massages', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180612.png" },
      { id: 54, category: 'Therapy', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180656.png" }
    ]
  },
  {
    family: 'Education',
    description: 'Learn something new today.',
    categories: [
      { id: 56, category: 'Private Tutors', url: "https://storage.googleapis.com/wisdom-images/77502ab75202d6b38aa0df57113b6746.jpg" },
      { id: 57, category: 'Math Classes', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180933.png" },
      { id: 58, category: 'Languages', url: "https://storage.googleapis.com/wisdom-images/6f1a64adbbe28f7d572a9fef189ea542.jpg" },
      { id: 59, category: 'Science', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181138.png" },
      { id: 68, category: 'Job Interview', url: "https://storage.googleapis.com/wisdom-images/36548671ef1476a260d9e3dbb8fe4706.jpg" },
      { id: 65, category: 'Music', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181310.png" },
      { id: 61, category: 'Programming', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181628.png" }
    ]
  },
  {
    family: 'Digital & Online',
    description: 'Digital services for the modern world.',
    categories: [
      { id: 83, category: 'App Dev', url: "https://storage.googleapis.com/wisdom-images/451067aa-4bd3-43d8-874d-ff8b5e50ce7e.jpeg" },
      { id: 84, category: 'Web Dev', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181853.png" },
      { id: 89, category: 'AI Dev', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20201215.png" },
      { id: 85, category: 'Frontend', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20182501.png" },
      { id: 86, category: 'Backend', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20182034.png" },
      { id: 90, category: 'Design', url: "https://storage.googleapis.com/wisdom-images/a2b2c958-2d21-4308-8b07-51a1820f6faa.jpeg" },
      { id: 94, category: 'Video Editing', url: "https://storage.googleapis.com/wisdom-images/ad3a9403cb4273ff3bfb2ab24429bb62.jpg" },
      { id: 100, category: '3D Design', url: "https://storage.googleapis.com/wisdom-images/4475f6e7e9766c27834ae79e308907db2d4fe361f741e26a2e9357b0a6c63082_1920x1080.webp" },
      { id: 101, category: 'Content Creation', url: "https://storage.googleapis.com/wisdom-images/contentcretor.png" },
    ]
  },
  {
    family: 'Events',
    description: 'Make your events memorable.',
    categories: [
      { id: 172, category: 'Wedding Planners', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184608.png" },
      { id: 173, category: 'Catering', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184635.png" },
      { id: 174, category: 'Photography', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184808.png" },
      { id: 175, category: 'DJs', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184853.png" },
      { id: 178, category: 'Entertainers', url: "https://storage.googleapis.com/wisdom-images/1.webp" },
      { id: 181, category: 'Security', url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20185110.png" }
    ]
  }
];

const howItWorksFlows = {
  customers: [
    { id: 'search', label: 'Search', description: 'Search by service, category or location to see trusted professionals around you.', screen: sharedScreens[0] },
    { id: 'compare', label: 'Compare', description: 'Compare prices, reviews, photos, availability and distance in one clean view.', screen: sharedScreens[1] },
    { id: 'book', label: 'Book', description: 'Pick a time that works for you, confirm instantly and keep every detail in one place.', screen: sharedScreens[2] },
    { id: 'pay', label: 'Pay', description: 'Pay securely in the app and save your favourites for one-tap rebooking next time.', screen: sharedScreens[3] },
  ],
  professionals: [
    { id: 'create', label: 'Create', description: 'Create a professional profile with your services, prices, locations, photos and availability.', screen: sharedScreens[0] },
    { id: 'decide', label: 'Decide', description: 'Receive clear booking requests and decide which ones to accept or reschedule.', screen: sharedScreens[1] },
    { id: 'work', label: 'Work', description: 'Deliver your services while Wisdom keeps bookings, messages and details organised.', screen: sharedScreens[2] },
    { id: 'charge', label: 'Charge', description: 'Get paid securely through Wisdom, with invoices and payouts handled for you.', screen: sharedScreens[3] },
  ],
};

const footerNav = {
  primary: ['Home', 'How it works', 'For Customers', 'For Professionals', 'Categories', 'Testimonials', 'Safety', 'Pricing', 'Help & FAQ', 'Devices'],
  secondary: ['Blog', 'About Wisdom'],
  useCases: ['Home Services', 'Health & Wellness', 'Classes & Tutoring', 'Beauty & Grooming', 'Events & Experiences', 'Online Services'],
  legal: ['Privacy Policy', 'Terms of Use', 'Cancellation Policy', 'Booking Policy', 'Wisdom Guarantee'],
};


const PlaceholderBox = ({ className, style = {} }) => (
  <div className={`bg-[#d9d9d9] ${className}`} style={style} aria-hidden />
);

const SectionHeading = ({ title, subtitle, eyebrow }) => (
  <div className="space-y-3 text-center">
    <h2 className="text-5xl font-semibold text-[#050505]">{title}</h2>
  </div>
);

const VISIBLE_RANGE = 4;
const ANGLE_PER_ITEM = 15.5;
const RADIUS = 340;
const SEARCH_PIN_DISTANCE = 400;
const ENDLESS_PIN_DISTANCE = 750;
const ENDLESS_TEXT_START_SCALE = 0.95;
const ENDLESS_TEXT_END_SCALE = 1.08;
const INITIAL_ANIMATED_BOX_COLOR = '#F9F8F8';
const HERO_PARALLAX_MAX_SCROLL_Y = 0;
// Ajuste fino para alinear opticamente la imagen con el bloque de texto.
// (negativo = sube la imagen)
const SEARCH_IMAGE_VERTICAL_OFFSET = -68;

const HowItWorks3D = ({ activeTab, flows }) => {
  const containerRef = React.useRef(null);
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
                {/* Aumenté left-8 a left-12 y md:left-24 a md:left-40 para moverlo a la derecha */}
                <div className="relative h-full w-full left-12 md:left-40">
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
      {/* <p className="mt-3 max-w-md text-center text-sm text-[#4c5563] md:text-left md:text-base">{item.description}</p> */}
    </motion.div>
  );
};

const InteractiveToggleSection = () => {
  const [activeMode, setActiveMode] = useState('Client');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Reiniciar el hover cuando cambiamos de pestaña para evitar bugs visuales
  useEffect(() => {
    setHoveredIndex(null);
  }, [activeMode]);

  const toggleItems = [
    { label: 'Client' },
    { label: 'Profesional' }
  ];

  // Definimos el contenido para ambos modos
  const allContent = {
    'Client': [
      { title: "One search.", description: "From plumbers to piano teachers." },
      { title: "Total clarity.", description: "See prices and reviews upfront." },
      { title: "Secure.", description: "Your data and payments, protected." },
    ],
    'Profesional': [
      { title: "Freedom.", description: "Offer any service you can imagine." },
      { title: "Control.", description: "Set your rates, schedule, and rules." },
      { title: "Growth.", description: "Automated tools to manage clients and payments." },
    ]
  };

  // Seleccionamos el contenido según el modo activo
  const contentItems = allContent[activeMode];

  return (
    <section className="fade-section min-h-[80vh] w-full mx-auto flex flex-col justify-center items-center py-24">

      {/* Selector Superior */}
      {/* <SectionHeading title="The dual experience" /> */}
      <div className="mt-4 mb-16 rounded-full bg-[#F3F4F6] p-1 flex relative">
        {toggleItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveMode(item.label)}
            className={`relative z-10 flex items-center gap-2 px-6 py-2 text-sm font-semibold transition-colors duration-200 ${activeMode === item.label ? 'text-[#050505]' : 'text-[#6B7280]'
              }`}
          >
            {/* Fondo Blanco Animado (Motion) */}
            {activeMode === item.label && (
              <motion.div
                layoutId="toggle-bg"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Textos Principales Expandibles */}
      <div className="flex flex-col items-center text-center gap-2">
        <AnimatePresence mode='wait'>
          {/* Usamos un fragmento o div contenedor que se actualiza al cambiar activeMode */}
          <motion.div
            key={activeMode} // Clave para forzar re-renderizado suave al cambiar de modo
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            {contentItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-default"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.h2
                  className="text-5xl md:text-6xl font-semibold tracking-tight text-[#050505] transition-colors duration-300"
                  animate={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1 }}
                >
                  {item.title}
                </motion.h2>

                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 pb-4 text-lg text-[#6B7280] max-w-md mx-auto">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};


const CosmosSpiral = ({ serviceFamilies }) => {
  // 1. Aplanar todas las categorías para obtener imágenes y nombres
  const contentPool = useMemo(() => {
    const pool = [];
    serviceFamilies.forEach((family) => {
      if (family.categories) {
        family.categories.forEach((cat) => {
          if (cat.url) {
            pool.push({
              image: cat.url,
              label: cat.category // Usaremos esto para el texto cambiante
            });
          }
        });
      }
    });
    return pool;
  }, [serviceFamilies]);

  // 2. Estado para el texto cambiante (rotator)
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (contentPool.length === 0) return;
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % contentPool.length);
    }, 2000); // Cambia cada 2 segundos
    return () => clearInterval(interval);
  }, [contentPool]);

  // Si no hay datos, no renderizamos nada
  if (!contentPool.length) return null;

  return (
    // CAMBIO 1: Se cambió bg-[#F3F3F3] por bg-white
    <section className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center" style={{
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%)',
    }}>

      {/* --- CAPA DE ESPIRAL DE IMÁGENES --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <FloatingImage
            key={i}
            index={i}
            total={25}
            images={contentPool}
          />
        ))}
      </div>

      {/* --- CONTENIDO CENTRAL (TEXTO) --- */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 mix-blend-multiply">

        {/* 1. TÍTULO GRANDE */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-6 drop-shadow-sm">
          No categories. Just talent.
        </h1>

        {/* 2. SUBTÍTULO FIJO */}
        <p className="text-lg md:text-xl text-[#9F9F9F] font-medium max-w-2xl leading-relaxed mb-8  ">
          Wisdom gives you the freedom to find or offer whatever the world needs.
        </p>

        {/* 3. ELEMENTO DINÁMICO (CÁPSULA) */}
        <div className="flex w-full justify-center"> {/* Contenedor para centrar el grupo completo */}

          {/* Agrupamos con motion.div y layout para que el movimiento sea fluido */}
          <motion.div
            layout
            className="flex items-center gap-3"
            transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          >

            {/* Pequeño texto conector */}
            <motion.span
              layout
              transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
              className="text-md font-semibold uppercase tracking-widest text-[#9F9F9F]"
            >
              Like
            </motion.span>

            {/* Cápsula animada */}
            <motion.div
              layout
              className="relative h-12 overflow-hidden rounded-full bg-white/80 backdrop-blur-sm px-2 "
              transition={{ layout: { duration: 0.7, type: "spring", stiffness: 300, damping: 30 } }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  layout
                  key={textIndex}
                  // Quitamos 'absolute inset-0' para que el div tenga el ancho del texto
                  initial={{ y: 0, opacity: 0, filter: 'blur(1px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: 0, opacity: 0, filter: 'blur(1px)' }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center justify-center h-full"
                >
                  {/* whitespace-nowrap es vital para que no se parta la linea */}
                  <span className="text-[#1a1a1a] font-bold text-xl whitespace-nowrap">
                    {contentPool[textIndex]?.label || "Magic"}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* CAMBIO 2: Se ha eliminado el div del overlay con gradiente radial que había aquí */}
    </section>
  );
};

// Sub-componente para cada imagen flotante individual
const FloatingImage = ({ index, total, images }) => {
  // Seleccionar una imagen aleatoria del pool
  const randomImage = useMemo(() => images[Math.floor(Math.random() * images.length)].image, [images]);

  // Calcular posición inicial aleatoria en un anillo exterior
  const randomParams = useMemo(() => {
    const angle = Math.random() * 360; // Ángulo aleatorio
    const radius = 80 + Math.random() * 40; // Distancia del centro (en vw/vh relativos)
    const duration = 10 + Math.random() * 10; // Duración lenta (10-20s)
    const delay = (index / total) * 15; // Delay escalonado para que no salgan todas a la vez
    const size = 100 + Math.random() * 150; // Tamaño aleatorio entre 100px y 250px
    const rotation = Math.random() * 360; // Rotación inicial de la foto

    // Convertir coordenadas polares a cartesianas para el inicio (fuera de pantalla)
    // Usamos 'vw' y 'vh' para asegurar que salgan desde lejos
    const xStart = Math.cos(angle * (Math.PI / 180)) * 100;
    const yStart = Math.sin(angle * (Math.PI / 180)) * 100;

    return { xStart, yStart, duration, delay, size, rotation };
  }, [index, total]);

  return (
    <motion.div
      initial={{
        x: `${randomParams.xStart}vw`,
        y: `${randomParams.yStart}vh`,
        opacity: 0,
        scale: 1.5,
        rotate: randomParams.rotation,
        z: 0
      }}
      animate={{
        x: 0, // Va al centro
        y: 0, // Va al centro
        opacity: [0, 1, 1, 0], // Aparece y luego desaparece al llegar al centro
        scale: [1.2, 0.2], // Se hace pequeña al irse al fondo/centro
        rotate: randomParams.rotation + 180, // Gira mientras viaja
      }}
      transition={{
        duration: randomParams.duration,
        repeat: Infinity,
        repeatType: "loop",
        delay: -randomParams.delay, // Delay negativo para que la animación empiece ya "empezada"
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 flex items-center justify-center pointer-events-none"
      style={{
        width: randomParams.size,
        height: randomParams.size * 1.4, // Aspecto vertical
        marginLeft: `-${randomParams.size / 2}px`, // Centrar el div
        marginTop: `-${(randomParams.size * 1.4) / 2}px`,
      }}
    >
      <img
        src={randomImage}
        alt=""
        className="w-full h-full object-cover rounded-sm shadow-xl opacity-80 hover:opacity-100 transition-opacity"
      />
    </motion.div>
  );
};






function App() {
  const [activeTab, setActiveTab] = useState('customers');

  // --- AÑADIR ESTO ---
  const lenisRef = useRef(null);
  const appRef = useRef(null);
  const animadaBoxRef = useRef(null);    // El cuadro gris
  const searchSectionRef = useRef(null); // La sección destino
  const searchImageRef = useRef(null);   // La imagen destino
  const searchTextRef = useRef(null);    // El texto destino
  const endlessSearchSectionRef = useRef(null); // Sección "Endless searches..."
  const endlessSearchTextRef = useRef(null);    // Texto de la sección "Endless searches..."

  useEffect(() => {
    // 1. Configuración de Lenis (Scroll Suave)
    const lenis = new Lenis({
      lerp: 0.08, // Un poco más alto para que se sienta fluido con los pins
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Lógica de "Pinning" (1200px por sección)
    // Seleccionamos solo las secciones de texto/imagen que queremos congelar
    const sections = gsap.utils.toArray('.fade-section');

    sections.forEach((section) => {
      // Creamos una Timeline para tener control total
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center", // Se engancha cuando el CENTRO de la sección toca el CENTRO de la pantalla
          end: "+=1200",          // Aquí defines la "duración" del scroll (1200px)
          pin: false,              // Congela la sección
          pinSpacing: true,       // Empuja el siguiente contenido hacia abajo
          scrub: 0.5,             // Inercia suave (0.5s) para que no sea robótico
          anticipatePin: 1,       // <--- CLAVE: Evita el pequeño "salto" al enganchar
        }
      });


    });

    // 3. Parallax del ratón (Igual que antes)
    const parallaxItems = Array.from(document.querySelectorAll('.parallax-item'));
    const heroOnlyParallaxItems = parallaxItems.filter(
      (item) => item.getAttribute('data-hero-parallax-only') === 'true'
    );
    let isHeroTopZone = window.scrollY <= HERO_PARALLAX_MAX_SCROLL_Y;
    const mouseTweens = new WeakMap();

    const syncHeroTopZone = () => {
      const nextIsHeroTopZone = window.scrollY <= HERO_PARALLAX_MAX_SCROLL_Y;
      if (nextIsHeroTopZone === isHeroTopZone) return;

      isHeroTopZone = nextIsHeroTopZone;
      if (!isHeroTopZone) {
        heroOnlyParallaxItems.forEach((item) => {
          const activeTween = mouseTweens.get(item);
          if (activeTween) {
            activeTween.kill();
            mouseTweens.delete(item);
          }
          gsap.set(item, { x: 0, y: 0 });
        });
      }
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      parallaxItems.forEach((item) => {
        const heroOnly = item.getAttribute('data-hero-parallax-only') === 'true';
        if (heroOnly && !isHeroTopZone) {
          const activeTween = mouseTweens.get(item);
          if (activeTween) {
            activeTween.kill();
            mouseTweens.delete(item);
          }
          return;
        }

        const speed = parseFloat(item.getAttribute('data-speed')) || 20;
        const tween = gsap.to(item, {
          x: -x * speed,
          y: -y * speed,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        if (heroOnly) {
          mouseTweens.set(item, tween);
        }
      });
    };

    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', syncHeroTopZone, { passive: true });
    syncHeroTopZone();

    return () => {
      lenisRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', syncHeroTopZone);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Configuración general (Igual que antes)
      const sections = gsap.utils.toArray('.fade-section');
      sections.forEach((section) => {
        if (section !== endlessSearchSectionRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section, start: "center center", end: "+=1200",
              pin: false, pinSpacing: true, scrub: 0.5, anticipatePin: 1,
            }
          });
        }
      });

      // 2. Animación ESPECÍFICA: Cuadro Gris -> Imagen Final
      if (animadaBoxRef.current && searchImageRef.current && searchSectionRef.current && searchTextRef.current) {

        // Seleccionamos la imagen que está DENTRO del cuadro gris
        const animatedBox = animadaBoxRef.current;
        const innerImage = animatedBox.querySelector('img');
        const moveMetrics = { x: 0, y: 0, width: 0, height: 0 };

        const lockAnimatedBoxToPixels = () => {
          const parent = animatedBox.offsetParent;
          if (!parent) return;

          const parentRect = parent.getBoundingClientRect();
          const boxRect = animatedBox.getBoundingClientRect();

          gsap.set(animatedBox, {
            top: boxRect.top - parentRect.top,
            left: boxRect.left - parentRect.left,
            bottom: 'auto',
            right: 'auto',
            width: boxRect.width,
            height: boxRect.height,
          });
        };

        const refreshMoveMetrics = () => {
          const source = animatedBox.getBoundingClientRect();
          const target = searchImageRef.current.getBoundingClientRect();
          const text = searchTextRef.current.getBoundingClientRect();
          const textCenterY = text.top + (text.height / 2);

          moveMetrics.x = target.left - source.left;
          moveMetrics.y = textCenterY - (source.top + (target.height / 2)) + SEARCH_IMAGE_VERTICAL_OFFSET;
          moveMetrics.width = target.width;
          moveMetrics.height = target.height;
        };

        lockAnimatedBoxToPixels();
        refreshMoveMetrics();
        gsap.set(animatedBox, {
          willChange: 'transform,width,height,background-color',
          backgroundColor: INITIAL_ANIMATED_BOX_COLOR,
        });
        if (innerImage) {
          gsap.set(innerImage, { autoAlpha: 0, willChange: 'opacity' });
        }

        // TIMELINE PRINCIPAL (Movimiento + Transformación visual)
        const tlMove = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            endTrigger: searchSectionRef.current,
            end: "center center",
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: () => {
              lockAnimatedBoxToPixels();
              refreshMoveMetrics();
            },
            onLeaveBack: () => {
              gsap.set(animatedBox, { backgroundColor: INITIAL_ANIMATED_BOX_COLOR });
              if (innerImage) {
                gsap.set(innerImage, { autoAlpha: 0 });
              }
            },
          }
        });

        tlMove
          // a) Movimiento físico hacia la posición de destino
          .to(animatedBox, {
            x: () => moveMetrics.x,
            y: () => moveMetrics.y,
            width: () => moveMetrics.width,
            height: () => moveMetrics.height,
            borderRadius: "0px",
            ease: "none",
            duration: 1,
          })
          // b) Transformación visual: El gris desaparece y la imagen aparece
          // Ocurre DURANTE el viaje para evitar el "parpadeo" al final
          .to(animatedBox, { backgroundColor: 'transparent', duration: 0.2 }, 0.1)
          .to(innerImage, { autoAlpha: 1, duration: 0.2 }, 0.1);

        tlMove.eventCallback('onReverseComplete', () => {
          gsap.set(animatedBox, { backgroundColor: INITIAL_ANIMATED_BOX_COLOR });
          if (innerImage) {
            gsap.set(innerImage, { autoAlpha: 0 });
          }
        });

        // Mantener la imagen alineada mientras la sección está pineada
        const tlHold = gsap.timeline({
          scrollTrigger: {
            trigger: searchSectionRef.current,
            start: "center center",
            end: `+=${SEARCH_PIN_DISTANCE}`,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        tlHold.to(animatedBox, {
          y: `+=${SEARCH_PIN_DISTANCE}`,
          ease: "none",
        });

        // 3. PINNING (Sección Search se queda quieta un rato)
        const tlPin = gsap.timeline({
          scrollTrigger: {
            trigger: searchSectionRef.current,
            start: "center center",
            end: `+=${SEARCH_PIN_DISTANCE}`, // PINEADA 400 PX
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        // Solo animamos el texto, el cuadro ya llegó y es la imagen visible
        tlPin.fromTo(searchTextRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }
        );
      }

      if (endlessSearchSectionRef.current && endlessSearchTextRef.current) {
        const endlessText = endlessSearchTextRef.current;

        const getSectionCenteredScrollY = (sectionEl) => {
          if (!sectionEl) return Number.NaN;
          const sectionRect = sectionEl.getBoundingClientRect();
          const sectionTop = window.scrollY + sectionRect.top;
          const sectionCenter = sectionTop + (sectionRect.height / 2);
          return sectionCenter - (window.innerHeight / 2);
        };

        const softlySnapToSectionCenter = (sectionEl) => {
          const targetY = getSectionCenteredScrollY(sectionEl);
          if (!Number.isFinite(targetY)) return;

          const delta = Math.abs(targetY - window.scrollY);
          if (delta < 8 || delta > 1400) return;

          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetY, {
              duration: 0.42,
              easing: (t) => 1 - ((1 - t) * (1 - t)),
            });
            return;
          }

          window.scrollTo({ top: targetY, behavior: 'smooth' });
        };

        const softlySnapToEndlessCenter = () => softlySnapToSectionCenter(endlessSearchSectionRef.current);
        const softlySnapToSearchCenter = () => softlySnapToSectionCenter(searchSectionRef.current);

        const playEndlessIntro = () => {
          gsap.killTweensOf(endlessText);
          gsap.set(endlessText, {
            opacity: 0,
            scale: ENDLESS_TEXT_START_SCALE,
            transformOrigin: '50% 50%',
          });

          gsap.timeline()
            .to(endlessText, {
              opacity: 1,
              duration: 1,
              ease: 'power1.out',
            }, 0)
            .to(endlessText, {
              scale: ENDLESS_TEXT_END_SCALE,
              duration: 2,
              ease: 'power1.out',
            }, 0);
        };

        gsap.set(endlessText, {
          opacity: 0,
          scale: ENDLESS_TEXT_START_SCALE,
          transformOrigin: '50% 50%',
        });

        if (searchSectionRef.current) {
          ScrollTrigger.create({
            trigger: searchSectionRef.current,
            start: "center center",
            end: `+=${SEARCH_PIN_DISTANCE}`,
            onLeave: softlySnapToEndlessCenter,
            onEnterBack: softlySnapToSearchCenter,
          });
        }

        ScrollTrigger.create({
          trigger: endlessSearchSectionRef.current,
          start: "center center",
          end: `+=${ENDLESS_PIN_DISTANCE}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: playEndlessIntro,
          onEnterBack: playEndlessIntro,
          onLeave: () => {
            gsap.killTweensOf(endlessText);
            gsap.to(endlessText, {
              opacity: 0,
              duration: 0.5,
              ease: 'power1.out',
            });
          },
          onLeaveBack: () => {
            gsap.killTweensOf(endlessText);
            gsap.to(endlessText, {
              opacity: 0,
              duration: 0.5,
              ease: 'power1.out',
              onComplete: () => {
                gsap.set(endlessText, { scale: ENDLESS_TEXT_START_SCALE });
              },
            });
            softlySnapToSearchCenter();
          },
        });
      }
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="min-h-screen bg-white text-[#050505]">

      <header className="fixed backdrop-blur-xl top-4 left-1/2 z-20 flex w-[min(1100px,calc(100%-2rem))] -translate-x-1/2 items-center rounded-full bg-white/70 px-4 py-3 font-semibold">
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

      <main className=" pb-20">

        {/* 1. PORTADA - IMPORTANTE: Quitamos 'overflow-hidden' para que el cuadro pueda salir */}
        <section className="relative flex min-h-screen items-center justify-center px-6 fade-section z-10">

          {/* Capa de Cuadrados Grises (FONDO) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {grayShapes.map((shape, index) => {
              const isAnimatedBox = index === 3;

              return (
                <div
                  key={`shape-${index}`}
                  ref={isAnimatedBox ? animadaBoxRef : null}
                  // AÑADIDO: 'overflow-hidden' al propio cuadro para que recorte la imagen interna
                  className={`absolute bg-[#F9F8F8] ${shape.size} ${isAnimatedBox ? 'z-50 overflow-hidden parallax-item' : 'parallax-item'}`}
                  style={shape.style}
                  data-speed="40"
                  data-hero-parallax-only={isAnimatedBox ? 'true' : undefined}
                >
                  {/* SI ES EL CUADRO ANIMADO, RENDERIZAMOS LA IMAGEN DENTRO (OCULTA AL PRINCIPIO) */}
                  {isAnimatedBox && (
                    <img
                      src={shape.imageInside}
                      alt="Transition"
                      className="w-full h-full object-cover opacity-0" // Empieza invisible (gris)
                      // Usamos una clase específica para seleccionarla con GSAP luego si queremos, 
                      // o simplemente confiamos en que es la única img dentro.
                      id="inner-anim-img"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Capa de Imágenes (FRENTE) - Sin cambios */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {heroTiles.map((tile, index) => (
              <div key={`tile-${index}`} className={`parallax-item absolute overflow-hidden opacity-75 ${tile.size}`} style={tile.style} data-speed="60">
                <img src={tile.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Contenido Texto Hero - Sin cambios */}
          <div className="relative z-10 mx-auto max-w-xl text-center justify-center items-center">
            <h1 className="text-[44px] sm:text-[48px] font-semibold text-[#464545] leading-tight">
              Wisdom is where you find a{" "}
              <span className="text-[55px] sm:text-[55px] text-[#050505] font-bold">Professional.</span>
            </h1>
            <p className="text-2xl font-medium text-[#9F9F9F] mt-7">The first unified marketplace for every service. Simple. Secure. One app.</p>
            <button className="rounded-full bg-[#050505] mt-12 px-8 py-3 text-base font-semibold text-white hover:bg-black">Download for free</button>
          </div>
        </section>

        {/* 2. Search (TARGET SECTION) */}
        <section ref={searchSectionRef} className="min-h-screen w-full mx-auto flex flex-col justify-center items-center gap-12 md:gap-44 px-6 py-24 md:flex-row relative z-0">

          {/* Contenedor imagen con REF - La imagen aquí es INVISIBLE (opacity-0) */}
          {/* Sirve solo para marcar el tamaño y la posición donde debe aterrizar el cuadro gris */}
          <div ref={searchImageRef} className="aspect-[3/4] w-full max-w-[420px] shrink-0 relative">
            <img
              src="https://storage.googleapis.com/wisdom-images/search_services.png"
              alt=""
              className="w-full h-full object-cover opacity-0" // <--- IMPORTANTE: Invisible
            />
          </div>

          <div ref={searchTextRef} className="max-w-2xl">
            <p className="text-4xl md:text-6xl font-semibold leading-tight text-center md:text-left">
              Looking for help used to be a leap of faith.
            </p>
          </div>
        </section>

        {/* 3. Search 2 */}
        <section ref={endlessSearchSectionRef} className="fade-section min-h-screen mx-auto flex w-full justify-center items-center px-6 py-24">
          <p ref={endlessSearchTextRef} className="mx-auto max-w-[820px] text-center text-[42px] leading-[1.3] font-semibold leading-relaxed text-[#050505]">
            Endless searches. Reliance on word-of-mouth. Zero guarantees. The service world was fragmented, forcing you to guess instead of choose.
          </p>
        </section>

        {/* 4. Pro alone */}
        <section className="fade-section relative overflow-hidden min-h-screen mx-auto flex w-full justify-center items-center bg-gradient-to-br from-[#e8ecf0] via-white to-[#e8ecf0] px-6 py-28">
          <div className="absolute inset-0 opacity-100">
            <img src='https://storage.googleapis.com/wisdom-images/pro_alone.png' className="absolute inset-0" />
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

        {/* 5. Until now */}
        <section className="fade-section min-h-screen mx-auto flex w-full justify-center items-center px-6 py-24">
          <p className="text-center text-8xl font-semibold">Until now.</p>
        </section>

        {/* 6. Unified */}
        <section className="fade-section min-h-screen w-full mx-auto flex flex-col justify-center items-center gap-12 overflow-hidden pt-20">

          <div className="relative flex flex-1 w-full items-center justify-center">

            {/* 1. MEDITACIÓN */}
            <div className="absolute top-[2%] right-[35%] w-32 h-20 md:w-56 md:h-36 shadow-lg rotate-1">
              <img
                src="https://storage.googleapis.com/wisdom-images/53a50b05-32d7-4e90-86ce-62702bc97d65.jpeg"
                alt="Meditation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 2. CATERING */}
            <div className="absolute top-[14%] left-[20%] md:left-[21%] w-36 h-24 md:w-60 md:h-40 shadow-lg -rotate-2">
              <img
                src="https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184635.png"
                alt="Catering"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 3. ARQUITECTO */}
            <div className="absolute bottom-[14%] left-[20%] md:left-[25%] w-32 h-24 md:w-56 md:h-40 shadow-lg rotate-2">
              <img
                src="https://storage.googleapis.com/wisdom-images/526bda5b-c0c2-4170-b552-12a17db69fa9.jpeg"
                alt="Architect"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 4. FINANZAS */}
            <div className="absolute top-[35%] right-[17%] md:right-[18%] w-36 h-24 md:w-60 md:h-40 shadow-lg rotate-1">
              <img
                src="https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20185810.png"
                alt="Finances"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 5. JARDINERO */}
            <div className="absolute bottom-[5%] right-[26%] md:right-[28%] w-24 h-32 md:w-40 md:h-52 shadow-lg rotate-2">
              <img
                src="https://storage.googleapis.com/wisdom-images/393cd8b9-f908-4d5a-a67b-cf6850b287e9.jpg"
                alt="Gardener"
                className="w-full h-full object-cover"
              />
            </div>

            {/* LOGO CENTRAL */}
            <img
              src='https://storage.googleapis.com/wisdom-images/app_icon.png'
              alt="Wisdom Icon"
              className="relative z-10 flex h-40 w-40 md:h-72 md:w-72 items-center justify-center"
            />
          </div>

          {/* Texto inferior (le añadí un py-10 para darle aire abajo) */}
          {/* <div className="flex flex-col items-center gap-4 text-center z-20 pb-10 px-6">
              <p className="text-[32px] md:text-[42px] font-semibold">Wisdom unifies the chaos.</p>
            </div> */}

        </section>

        {/* 7. Chaos */}
        <section className="fade-section min-h-screen mx-auto flex w-full justify-center items-center px-6 py-20">
          <p className="mx-auto max-w-[1000px] text-center text-[42px] leading-[1.3] font-semibold leading-relaxed text-[#050505]">
            We replaced word-of-mouth with verified data. We replaced uncertainty with transparent profiles. A single ecosystem where quality is visible, and trust is the default.
          </p>
        </section>

        {/* 8. Dual experience */}
        <InteractiveToggleSection />

        <CosmosSpiral serviceFamilies={serviceFamilies} />

        {/* 9. Carrousel */}
        <section className="justify-center mt-30 space-y-10">
          <SectionHeading title="How Wisdom works" />

          {/* Contenedor del Selector Centrado */}
          <div className="flex justify-center">
            <div className="rounded-full bg-[#F3F4F6] p-1 flex relative">
              {['customers', 'professionals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 px-6 py-2 text-sm font-semibold transition-colors duration-200 ${activeTab === tab ? 'text-[#050505]' : 'text-[#6B7280]'
                    }`}
                >
                  {/* Fondo Blanco Animado */}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="works-toggle-bg" // ID único para esta sección
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Texto (con z-10 para estar encima del fondo blanco) */}
                  <span className="relative z-10 capitalize">
                    {tab === 'customers' ? 'For customers' : 'For professionals'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <HowItWorks3D activeTab={activeTab} flows={howItWorksFlows} />
        </section>

        {/* 10. Secure & Trust */}
        <section className="fade-section min-h-screen w-full mx-auto flex flex-col justify-center items-center px-6 py-24">

          {/* Título Serif estilo imagen */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold  text-[#050505]">
              Wisdom is security
            </h2>
          </div>

          {/* Grid de tarjetas */}
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }} // Animación suave al pasar el ratón (subir)
                className="group flex flex-col rounded-3xl bg-[#F9FAFB] p-6 transition-shadow duration-300 "
              >
                {/* Contenedor del Icono (Caja blanca dentro de la tarjeta gris) */}
                <div className="mb-6 flex h-24 w-full items-center justify-center rounded-2xl bg-white transition-transform duration-300 group-hover:scale-105">
                  <div className="text-[#050505]">
                    {feature.icon}
                  </div>
                </div>

                {/* Textos */}
                <div className="flex flex-col flex-grow">
                  <h3 className="mb-3 text-lg font-bold text-[#050505]">{feature.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-[#6B7280]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 11. CTA Final */}
        <section className="fade-section w-full min-h-screen w-full py-32 px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-[42px] font-bold tracking-tight text-[#050505]">
            Ready to simplify your life?
          </h2>
          <p className="mt-5 text-lg md:text-xl text-[#9ca3af] font-medium max-w-md leading-relaxed">
            Join the new standard for services today on Apple and Android.
          </p>
          <button className="mt-10 rounded-full bg-[#0F0F0F] px-8 py-3 text-sm font-bold text-white transition-transform hover:">
            Give Wisdom a try
          </button>
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
