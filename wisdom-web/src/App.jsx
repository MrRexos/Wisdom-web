import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const navLinks = ['Vision', 'How it works', 'For professionals', 'Safety'];
const EXPERIENCE_TABS = ['customers', 'professionals'];
const EXPERIENCE_CONTENT = {
  customers: [
    { title: "One search.", description: "From plumbers to piano teachers." },
    { title: "Total clarity.", description: "See prices and reviews upfront." },
    { title: "Secure.", description: "Your data and payments, protected." },
  ],
  professionals: [
    { title: "Freedom.", description: "Offer any service you can imagine." },
    { title: "Control.", description: "Set your rates, schedule, and rules." },
    { title: "Growth.", description: "Automated tools to manage clients and payments." },
  ],
};

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
    title: 'Proven Reputation',
    description: 'Talent is open to everyone, but trust is earned. Reviews are locked to actual bookings, ensuring every star reflects a real job completed. You hire based on performance, not promises.',
    icon: (
      // Icono de estrella/reputación
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
  },
  {
    title: 'Protected Payments',
    description: 'No hidden fees. You pay a small deposit to book, and the rest is secured. If plans change, our Wisdom Guarantee has you covered.',
    icon: (
      // Icono de candado/escudo
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
  },
  {
    title: 'Privacy by Design',
    description: 'Your phone number and payment details never leave the app. Chat, share photos, and pay securely inside our encrypted bubble.',
    icon: (
      // Icono de privacidad/escudo con check
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
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
    { id: 'search', label: 'Search', screen: sharedScreens[0] },
    { id: 'choose', label: 'Choose',  screen: sharedScreens[1] },
    { id: 'reserve', label: 'Reserve',  screen: sharedScreens[2] },
    { id: 'relax', label: 'Relax',  screen: sharedScreens[3] },
  ],
  professionals: [
    { id: 'publish', label: 'Publish',  screen: sharedScreens[0] },
    { id: 'manage', label: 'Manage',  screen: sharedScreens[1] },
    { id: 'deliver', label: 'Deliver',  screen: sharedScreens[2] },
    { id: 'earn', label: 'Earn',  screen: sharedScreens[3] },
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
const ENDLESS_PIN_DISTANCE = 600;
const ENDLESS_TEXT_START_SCALE = 0.95;
const ENDLESS_TEXT_END_SCALE = 1.08;
const DEFAULT_LENIS_LERP = 0.08;
const DEFAULT_LENIS_WHEEL_MULTIPLIER = 1;
const SOFT_PIN_START_VIEWPORT_RATIO = 0.92;
const SOFT_PIN_ENTRY_CRUISE_DISTANCE = 400;
const SOFT_PIN_ENTRY_DECEL_DISTANCE = 500;
const SOFT_PIN_ENTRY_CRUISE_PROGRESS = 0.58;
const SOFT_PIN_CENTER_HOLD_DISTANCE = 240;
const SOFT_PIN_EXIT_RELEASE_DISTANCE = 500;
const SOFT_PIN_EXIT_OFFSCREEN_DISTANCE = 860;
const SOFT_PIN_EXIT_RELEASE_PROGRESS = 0.18;
const SOFT_PIN_EXIT_OFFSCREEN_EXTRA_FACTOR = 1.04;
const INITIAL_ANIMATED_BOX_COLOR = '#F9F8F8';
const HERO_PARALLAX_MAX_SCROLL_Y = 0;
const PRO_STORY_SQUARE_VIEWPORT_FACTOR = 0.25;
const PRO_STORY_SQUARE_MIN_SIZE = 130;
const PRO_STORY_SQUARE_MAX_SIZE = 520;
const PRO_STORY_SCALE_DISTANCE = 460;
const PRO_STORY_PIN_HOLD_DISTANCE = 500;
const PRO_STORY_TEXT_FADE_DISTANCE = 120;
const PRO_STORY_TEXT_HOLD_DISTANCE = 420;
const PRO_STORY_REVERSE_HOLD_DISTANCE = 260;
const PRO_STORY_REVERSE_SLIDE_DISTANCE = 560;
const PRO_STORY_POST_EXIT_HOLD_DISTANCE = 150;
const PRO_STORY_SCROLL_DISTANCE_MULTIPLIER = 2;
const PRO_STORY_TEXT_ENTRY_OFFSET = 52;
const PRO_STORY_TEXT_RISE_RATIO = 0.22;
const PRO_STORY_TEXT_EXIT_EXTRA_DISTANCE = 36;
const PRO_STORY_IMAGE_HEIGHT_RATIO = 1248 / 832;
// Ajuste fino para alinear opticamente la imagen con el bloque de texto.
// (negativo = sube la imagen)
const SEARCH_IMAGE_VERTICAL_OFFSET = -68;

const HowItWorks3D = ({ steps, activeIndex }) => (
  // 1. ELIMINADO max-w-7xl: Ahora es "w-full" para que se expanda hasta los bordes.
  <div className="relative mx-auto flex w-full flex-col items-center justify-between gap-10 md:flex-row md:px-0">
    
    {/* COLUMNA IZQUIERDA (TEXTO) */}
    <div className="order-2 flex h-[500px] w-full flex-1 items-center justify-center md:order-1 md:h-[700px] md:justify-start">
      <div className="relative flex h-full w-full flex-col items-center justify-center md:items-start">
        <div
          className="relative h-[700px] w-full max-w-5xl"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        >
          {/* 2. RESTAURADO EL LEFT: Ponemos md:left-24 o lg:left-32. 
              Esto evita que la "S" de Search se corte al girar. */}
          <div className="relative h-full w-full left-12 md:left-24 lg:left-32">
            {steps.map((step, index) => (
              <FanItem key={step.id} item={step} index={index} activeIndex={activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* COLUMNA DERECHA (MÓVIL) */}
    {/* 3. MÓVIL A LA DERECHA: Aseguramos md:justify-end y damos un padding derecho opcional */}
    <div className="order-1 flex h-[45vh] w-full flex-1 items-center justify-center md:order-2 md:h-auto md:justify-end md:pr-12 lg:pr-24">
      <div className="relative flex h-auto w-[220px] items-center justify-center md:w-[300px]">
        <img
          src="/images/phone.png"
          alt="Phone frame"
          className="pointer-events-none relative z-20 h-auto w-full drop-shadow-2xl"
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
);

const HowItWorksSection = ({ sectionRef, flows, activeTab, onTabChange }) => {
  const steps = flows[activeTab] || flows.customers;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "center center",
      end: "+=1800", // Define la distancia del scroll para los 4 pasos
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          steps.length - 1,
          Math.floor(progress * steps.length)
        );
        setActiveIndex(index);
      }
    });

    return () => {
      st.kill();
    };
  }, [steps.length]);

  return (
    <section ref={sectionRef} className="relative mt-[20vh] w-full overflow-visible z-0">
      <div ref={containerRef} className="flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[1800px] origin-center scale-[0.9] flex-col justify-center gap-8 px-6 pt-28 pb-10 md:scale-[0.94] md:gap-9 md:pt-32 md:pb-14">
          <div className="flex flex-col items-center gap-6 mt-14">
            <SectionHeading title="How Wisdom works" />

            <div className="flex justify-center">
              <div className="pointer-events-auto relative flex rounded-full bg-[#F3F4F6] p-1">
                {EXPERIENCE_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => onTabChange(tab)}
                    className={`relative z-10 px-6 py-2 text-sm font-semibold transition-colors duration-200 ${activeTab === tab ? 'text-[#050505]' : 'text-[#6B7280]'
                      }`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="works-toggle-bg"
                        className="absolute inset-0 rounded-full bg-white shadow-sm"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 capitalize">
                      {tab === 'customers' ? 'For customers' : 'For professionals'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <HowItWorks3D steps={steps} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
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

const InteractiveToggleSection = ({ sectionRef, activeMode, onModeChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Reiniciar el hover cuando cambiamos de pestaña para evitar bugs visuales
  useEffect(() => {
    setHoveredIndex(null);
  }, [activeMode]);

  const toggleItems = [
    { label: 'Client', value: 'customers' },
    { label: 'Profesional', value: 'professionals' }
  ];

  // Seleccionamos el contenido según el modo activo
  const contentItems = EXPERIENCE_CONTENT[activeMode] || EXPERIENCE_CONTENT.customers;

  return (
    <section ref={sectionRef} className="fade-section -mt-[190vh] min-h-[42vh] w-full mx-auto flex flex-col justify-center items-center py-4">

      {/* Selector Superior */}
      {/* <SectionHeading title="The dual experience" /> */}
      <div className="mt-4 mb-16 rounded-full bg-[#F3F4F6] p-1 flex relative">
        {toggleItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onModeChange(item.value)}
            className={`relative z-10 flex items-center gap-2 px-6 py-2 text-sm font-semibold transition-colors duration-200 ${activeMode === item.value ? 'text-[#050505]' : 'text-[#6B7280]'
              }`}
          >
            {/* Fondo Blanco Animado (Motion) */}
            {activeMode === item.value && (
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
    }, 3600); // Cambia más lento
    return () => clearInterval(interval);
  }, [contentPool]);

  // Si no hay datos, no renderizamos nada
  if (!contentPool.length) return null;

  return (
    // CAMBIO 1: Se cambió bg-[#F3F3F3] por bg-white
    <section className="relative z-10 -mt-[130vh] h-[120vh] w-full overflow-hidden bg-white flex items-center justify-center" style={{
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
    const duration = 18 + Math.random() * 14; // Duración aún más lenta (18-32s)
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
  // --- AÑADIR ESTO ---
  const lenisRef = useRef(null);
  const appRef = useRef(null);
  const animadaBoxRef = useRef(null);    // El cuadro gris
  const searchSectionRef = useRef(null); // La sección destino
  const searchImageRef = useRef(null);   // La imagen destino
  const searchTextRef = useRef(null);    // El texto destino
  const endlessSearchSectionRef = useRef(null); // Sección "Endless searches..."
  const endlessSearchTextRef = useRef(null);    // Texto de la sección "Endless searches..."
  const proStorySectionRef = useRef(null);
  const proStoryPinRef = useRef(null);
  const proStoryImageRef = useRef(null);
  const proStoryTextsRef = useRef(null);
  const untilNowSectionRef = useRef(null);
  const untilNowTextRef = useRef(null);
  const unifiedSectionRef = useRef(null);
  const chaosSectionRef = useRef(null);
  const dualExperienceSectionRef = useRef(null);
  const secureSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const howWorksRef = useRef(null);
  const [experienceMode, setExperienceMode] = useState('customers');

  useEffect(() => {
    // 1. Configuración de Lenis (Scroll Suave)
    const lenis = new Lenis({
      lerp: DEFAULT_LENIS_LERP, // Un poco más alto para que se sienta fluido con los pins
      smoothWheel: true,
      wheelMultiplier: DEFAULT_LENIS_WHEEL_MULTIPLIER,
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
    window.scrollTo(0, 0);

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
          if (item.getAttribute('data-disable-mouse-parallax') === 'true') return;
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
        if (item.getAttribute('data-disable-mouse-parallax') === 'true') return;
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
          const currentX = Number(gsap.getProperty(animatedBox, 'x')) || 0;
          const currentY = Number(gsap.getProperty(animatedBox, 'y')) || 0;
          const boxTopWithoutTransform = boxRect.top - currentY;
          const boxLeftWithoutTransform = boxRect.left - currentX;

          gsap.set(animatedBox, {
            top: boxTopWithoutTransform - parentRect.top,
            left: boxLeftWithoutTransform - parentRect.left,
            bottom: 'auto',
            right: 'auto',
            width: boxRect.width,
            height: boxRect.height,
          });
        };

        const refreshMoveMetrics = () => {
          const source = animatedBox.getBoundingClientRect();
          const currentX = Number(gsap.getProperty(animatedBox, 'x')) || 0;
          const currentY = Number(gsap.getProperty(animatedBox, 'y')) || 0;
          const sourceLeft = source.left - currentX;
          const sourceTop = source.top - currentY;
          const target = searchImageRef.current.getBoundingClientRect();
          const text = searchTextRef.current.getBoundingClientRect();
          const textCenterY = text.top + (text.height / 2);

          moveMetrics.x = target.left - sourceLeft;
          moveMetrics.y = textCenterY - (sourceTop + (target.height / 2)) + SEARCH_IMAGE_VERTICAL_OFFSET;
          moveMetrics.width = target.width;
          moveMetrics.height = target.height;
        };

        // Evita que el parallax del mouse contamine la medición inicial.
        gsap.set(animatedBox, { x: 0, y: 0 });
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

      if (proStorySectionRef.current && proStoryPinRef.current && proStoryImageRef.current && proStoryTextsRef.current) {
        const proSection = proStorySectionRef.current;
        const proPin = proStoryPinRef.current;
        const proImage = proStoryImageRef.current;
        const proImageMedia = proImage.querySelector('img');
        const proTextsLayer = proStoryTextsRef.current;
        const proTextBlocks = gsap.utils.toArray('[data-pro-story-text]', proStoryTextsRef.current);
        const getSquareSize = () => Math.round(
          gsap.utils.clamp(
            PRO_STORY_SQUARE_MIN_SIZE,
            PRO_STORY_SQUARE_MAX_SIZE,
            window.innerWidth * PRO_STORY_SQUARE_VIEWPORT_FACTOR,
          ),
        );

        const getOffscreenOffset = () => {
          const squareSize = getSquareSize();
          return Math.round(
            (window.innerHeight)
            + (squareSize)
            + window.innerHeight
          );
        };
        const getFullscreenWidth = () => window.innerWidth;
        const getFullscreenHeight = () => Math.round(getFullscreenWidth() * PRO_STORY_IMAGE_HEIGHT_RATIO);
        const getFullscreenOverflowY = () => Math.max(0, getFullscreenHeight() - window.innerHeight);
        const getFullscreenTopAlignY = () => Math.round(getFullscreenOverflowY() * 0.5);
        const getFullscreenBottomAlignY = () => -Math.round(getFullscreenOverflowY() * 0.5);
        const getTextRiseDistance = () => Math.round(
          gsap.utils.clamp(
            90,
            window.innerHeight * 0.32,
            getFullscreenOverflowY() * PRO_STORY_TEXT_RISE_RATIO,
          ),
        );
        const softlySnapToUntilNowCenter = () => {
          if (!untilNowSectionRef.current) return;
          const sectionRect = untilNowSectionRef.current.getBoundingClientRect();
          const sectionTop = window.scrollY + sectionRect.top;
          const sectionCenter = sectionTop + (sectionRect.height / 2);
          const targetY = sectionCenter - (window.innerHeight / 2);
          if (!Number.isFinite(targetY)) return;

          const delta = Math.abs(targetY - window.scrollY);
          if (delta < 12 || delta > 180) return;

          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetY, {
              duration: 0.2,
              easing: (t) => 1 - ((1 - t) * (1 - t)),
            });
            return;
          }

          window.scrollTo({ top: targetY, behavior: 'smooth' });
        };

        const resetProStoryImage = () => {
          const squareSize = getSquareSize();
          gsap.set(proImage, {
            width: squareSize,
            height: squareSize,
            borderRadius: 0,
            y: getOffscreenOffset(),
            autoAlpha: 1,
            willChange: 'transform,width,height,opacity',
          });
          if (proImageMedia) {
            gsap.set(proImageMedia, {
              objectPosition: '50% 50%',
            });
          }
          if (proTextsLayer) {
            gsap.set(proTextsLayer, {
              y: 0,
              willChange: 'transform',
            });
          }
        };

        gsap.set(proTextBlocks, {
          autoAlpha: 0,
          y: PRO_STORY_TEXT_ENTRY_OFFSET,
          willChange: 'transform,opacity',
        });

        resetProStoryImage();

        gsap.timeline({
          scrollTrigger: {
            trigger: proSection,
            start: 'top bottom',
            end: 'center center',
            scrub: 0.2,
            invalidateOnRefresh: true,
            onRefresh: resetProStoryImage,
            onLeaveBack: () => {
              resetProStoryImage();
              gsap.set(proTextBlocks, { autoAlpha: 0, y: PRO_STORY_TEXT_ENTRY_OFFSET });
            },
          },
        }).fromTo(
          proImage,
          { y: () => getOffscreenOffset() },
          {
            y: 0,
            ease: 'none',
            duration: 1,
          },
        );

        const fullStoryDistance = PRO_STORY_PIN_HOLD_DISTANCE
          + PRO_STORY_SCALE_DISTANCE
          + (proTextBlocks.length * ((PRO_STORY_TEXT_FADE_DISTANCE * 2) + PRO_STORY_TEXT_HOLD_DISTANCE))
          + PRO_STORY_SCALE_DISTANCE
          + PRO_STORY_REVERSE_HOLD_DISTANCE
          + PRO_STORY_REVERSE_SLIDE_DISTANCE
          + PRO_STORY_POST_EXIT_HOLD_DISTANCE;
        const scaledFullStoryDistance = Math.round(fullStoryDistance * PRO_STORY_SCROLL_DISTANCE_MULTIPLIER);
        const textSequenceDistance = proTextBlocks.length * ((PRO_STORY_TEXT_FADE_DISTANCE * 2) + PRO_STORY_TEXT_HOLD_DISTANCE);

        const proStoryTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: proPin,
            start: 'center center+=1',
            end: () => `+=${scaledFullStoryDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeave: softlySnapToUntilNowCenter,
            onRefresh: () => {
              const squareSize = getSquareSize();
              gsap.set(proImage, {
                width: squareSize,
                height: squareSize,
                borderRadius: 0,
              });
              if (proImageMedia) {
                gsap.set(proImageMedia, {
                  objectPosition: '50% 50%',
                });
              }
              if (proTextsLayer) {
                gsap.set(proTextsLayer, { y: 0 });
              }
            },
          },
        });
        const holdState = { progress: 0 };

        proStoryTimeline.to(holdState, {
          progress: 1,
          ease: 'none',
          duration: PRO_STORY_PIN_HOLD_DISTANCE,
        });

        proStoryTimeline.to(proImage, {
          width: () => getFullscreenWidth(),
          height: () => getFullscreenHeight(),
          y: () => getFullscreenTopAlignY(),
          autoAlpha: 1,
          borderRadius: 0,
          ease: 'none',
          duration: PRO_STORY_SCALE_DISTANCE,
        });

        proStoryTimeline.add('proStoryTextSequenceStart');
        proStoryTimeline.to(proImage, {
          y: () => getFullscreenBottomAlignY(),
          ease: 'none',
          duration: textSequenceDistance,
        }, 'proStoryTextSequenceStart');

        const proStoryTextsTimeline = gsap.timeline();
        proTextBlocks.forEach((textBlock) => {
          proStoryTextsTimeline
            .fromTo(
              textBlock,
              { autoAlpha: 0, y: PRO_STORY_TEXT_ENTRY_OFFSET },
              { autoAlpha: 1, y: 0, ease: 'none', duration: PRO_STORY_TEXT_FADE_DISTANCE },
            )
            .to(textBlock, {
              autoAlpha: 1,
              y: () => -getTextRiseDistance(),
              ease: 'none',
              duration: PRO_STORY_TEXT_HOLD_DISTANCE,
            })
            .to(textBlock, {
              autoAlpha: 0,
              y: () => -(getTextRiseDistance() + PRO_STORY_TEXT_EXIT_EXTRA_DISTANCE),
              ease: 'none',
              duration: PRO_STORY_TEXT_FADE_DISTANCE,
            });
        });
        proStoryTimeline.add(proStoryTextsTimeline, 'proStoryTextSequenceStart');

        proStoryTimeline.to(proImage, {
          width: () => getSquareSize(),
          height: () => getSquareSize(),
          y: 0,
          autoAlpha: 1,
          borderRadius: 0,
          ease: 'none',
          duration: PRO_STORY_SCALE_DISTANCE,
        });

        proStoryTimeline.to(holdState, {
          progress: 2,
          ease: 'none',
          duration: PRO_STORY_REVERSE_HOLD_DISTANCE,
        });

        proStoryTimeline.to(proImage, {
          y: () => -getOffscreenOffset(),
          ease: 'none',
          duration: PRO_STORY_REVERSE_SLIDE_DISTANCE,
        });

        proStoryTimeline.to(holdState, {
          progress: 3,
          ease: 'none',
          duration: PRO_STORY_POST_EXIT_HOLD_DISTANCE,
        });
      }

      if (endlessSearchSectionRef.current && endlessSearchTextRef.current) {
        const endlessText = endlessSearchTextRef.current;

        let lastSnapTimestamp = 0;
        const SNAP_COOLDOWN_MS = 900;

        const getSectionCenteredScrollY = (sectionEl) => {
          if (!sectionEl) return Number.NaN;
          const sectionRect = sectionEl.getBoundingClientRect();
          const sectionTop = window.scrollY + sectionRect.top;
          const sectionCenter = sectionTop + (sectionRect.height / 2);
          return sectionCenter - (window.innerHeight / 2);
        };

        const softlySnapToSectionCenter = (sectionEl) => {
          const now = Date.now();
          if (now - lastSnapTimestamp < SNAP_COOLDOWN_MS) return;

          const targetY = getSectionCenteredScrollY(sectionEl);
          if (!Number.isFinite(targetY)) return;

          const delta = Math.abs(targetY - window.scrollY);
          if (delta < 8 || delta > 600) return;

          lastSnapTimestamp = now;

          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetY, {
              duration: 0.55,
              easing: (t) => 1 - ((1 - t) * (1 - t) * (1 - t)),
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

      if (untilNowSectionRef.current && untilNowTextRef.current) {
        const untilNowText = untilNowTextRef.current;

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
          if (delta < 12 || delta > 180) return;

          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetY, {
              duration: 0.2,
              easing: (t) => 1 - ((1 - t) * (1 - t)),
            });
            return;
          }

          window.scrollTo({ top: targetY, behavior: 'smooth' });
        };

        const softlySnapToEndlessCenter = () => softlySnapToSectionCenter(endlessSearchSectionRef.current);

        const playUntilNowIntro = () => {
          gsap.killTweensOf(untilNowText);
          gsap.set(untilNowText, {
            opacity: 0,
            scale: ENDLESS_TEXT_START_SCALE,
            transformOrigin: '50% 50%',
          });

          gsap.timeline()
            .to(untilNowText, {
              opacity: 1,
              duration: 1,
              ease: 'power1.out',
            }, 0)
            .to(untilNowText, {
              scale: ENDLESS_TEXT_END_SCALE,
              duration: 2,
              ease: 'power1.out',
            }, 0);
        };

        gsap.set(untilNowText, {
          opacity: 0,
          scale: ENDLESS_TEXT_START_SCALE,
          transformOrigin: '50% 50%',
        });

        ScrollTrigger.create({
          trigger: untilNowSectionRef.current,
          start: "center center",
          end: `+=${ENDLESS_PIN_DISTANCE}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: playUntilNowIntro,
          onEnterBack: playUntilNowIntro,
          onLeave: () => {
            gsap.killTweensOf(untilNowText);
            gsap.to(untilNowText, {
              opacity: 0,
              duration: 0.5,
              ease: 'power1.out',
            });
          },
          onLeaveBack: () => {
            gsap.killTweensOf(untilNowText);
            gsap.to(untilNowText, {
              opacity: 0,
              duration: 0.5,
              ease: 'power1.out',
              onComplete: () => {
                gsap.set(untilNowText, { scale: ENDLESS_TEXT_START_SCALE });
              },
            });
            softlySnapToEndlessCenter();
          },
        });
      }

      [unifiedSectionRef, chaosSectionRef, dualExperienceSectionRef, secureSectionRef, ctaSectionRef].forEach((ref) => {
        if (ref.current) {
          const sectionEl = ref.current;
          const getSoftPinStartTop = () => Math.round(window.innerHeight * SOFT_PIN_START_VIEWPORT_RATIO);
          const getSoftPinCenterOffset = () => {
            const sectionHeight = sectionEl.offsetHeight;
            const centeredTop = (window.innerHeight - sectionHeight) / 2;
            return Math.round(centeredTop - getSoftPinStartTop());
          };
          const getSoftPinEntryCruiseOffset = () => (
            Math.round(getSoftPinCenterOffset() * SOFT_PIN_ENTRY_CRUISE_PROGRESS)
          );
          const getSoftPinExitOffset = () => {
            const centerOffset = getSoftPinCenterOffset();
            const offscreenDistance = Math.max(window.innerHeight, sectionEl.offsetHeight);
            return Math.round(centerOffset - (offscreenDistance * SOFT_PIN_EXIT_OFFSCREEN_EXTRA_FACTOR));
          };
          const getSoftPinExitReleaseOffset = () => {
            const centerOffset = getSoftPinCenterOffset();
            const exitOffset = getSoftPinExitOffset();
            return Math.round(
              centerOffset + ((exitOffset - centerOffset) * SOFT_PIN_EXIT_RELEASE_PROGRESS)
            );
          };
          const softPinTotalDistance =
            SOFT_PIN_ENTRY_CRUISE_DISTANCE
            + SOFT_PIN_ENTRY_DECEL_DISTANCE
            + SOFT_PIN_CENTER_HOLD_DISTANCE
            + SOFT_PIN_EXIT_RELEASE_DISTANCE
            + SOFT_PIN_EXIT_OFFSCREEN_DISTANCE;

          gsap.set(sectionEl, {
            y: 0,
            willChange: 'transform',
          });

          const softPinTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: `top ${Math.round(SOFT_PIN_START_VIEWPORT_RATIO * 100)}%`,
              end: `+=${softPinTotalDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                gsap.set(sectionEl, { y: 0, opacity: 1 });
              },
              onLeaveBack: () => {
                gsap.set(sectionEl, { y: 0, opacity: 1 });
              },
              onLeave: () => {
                gsap.set(sectionEl, { opacity: 0 });
              },
              onEnterBack: () => {
                gsap.set(sectionEl, { opacity: 1 });
              }
            },
          });

          softPinTimeline
            .to(sectionEl, {
              y: () => getSoftPinEntryCruiseOffset(),
              ease: 'none',
              duration: SOFT_PIN_ENTRY_CRUISE_DISTANCE,
            })
            .to(sectionEl, {
              y: () => getSoftPinCenterOffset(),
              ease: 'none',
              duration: SOFT_PIN_ENTRY_DECEL_DISTANCE,
            })
            .to({}, {
              duration: SOFT_PIN_CENTER_HOLD_DISTANCE,
            })
            .to(sectionEl, {
              y: () => getSoftPinExitReleaseOffset(),
              ease: 'none',
              duration: SOFT_PIN_EXIT_RELEASE_DISTANCE,
            })
            .to(sectionEl, {
              y: () => getSoftPinExitOffset(),
              ease: 'none',
              duration: SOFT_PIN_EXIT_OFFSCREEN_DISTANCE,
            });
        }
      });
    }, appRef);

    return () => {
      if (lenisRef.current?.options) {
        lenisRef.current.options.lerp = DEFAULT_LENIS_LERP;
        lenisRef.current.options.wheelMultiplier = DEFAULT_LENIS_WHEEL_MULTIPLIER;
      }
      ctx.revert();
    };
  }, []);

  const scrollToSection = (sectionRef) => {
    if (!sectionRef?.current) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(sectionRef.current, {
        offset: -110,
        duration: 1.15,
      });
      return;
    }

    const targetY = window.scrollY + sectionRef.current.getBoundingClientRect().top - 110;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleNavClick = (link) => {
    if (link === 'How it works') {
      setExperienceMode('customers');
      scrollToSection(howWorksRef);
      return;
    }

    if (link === 'For professionals') {
      setExperienceMode('professionals');
      scrollToSection(dualExperienceSectionRef);
      return;
    }

    if (link === 'Vision') {
      scrollToSection(searchSectionRef);
      return;
    }

    if (link === 'Safety') {
      scrollToSection(secureSectionRef);
    }
  };

  return (
    <div ref={appRef} className="min-h-screen bg-white text-[#050505]">

      <header className="fixed backdrop-blur-xl top-4 left-1/2 z-20 flex w-[min(1100px,calc(100%-2rem))] -translate-x-1/2 items-center rounded-full px-4 py-3 font-semibold bg-white/50">
        
        {/* IZQUIERDA: Agrupamos logo y texto en un solo flex-1 */}
        <div className="flex flex-1 items-center justify-start gap-2 ml-2">
          <img
            src='https://storage.googleapis.com/wisdom-images/app_icon.png'
            alt="Wisdom Icon"
            className="relative flex h-10 w-10 md:h-8 md:w-8 items-center justify-center"
          />
          <div className="text-lg">Wisdom</div>
        </div>

        {/* CENTRO: Nav (al tener flex-1 a los lados, se centra matemáticamente) */}
        <nav className="hidden flex-none flex-wrap items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => handleNavClick(link)}
              className="text-sm font-semibold text-[#4c5563] hover:text-[#050505] transition-colors"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* DERECHA: Botón en su propio flex-1 */}
        <div className="flex flex-1 justify-end">
          <button className="rounded-full bg-[#050505] px-6 py-2 text-sm font-semibold text-white hover:bg-black transition-colors">
            Get the app
          </button>
        </div>
        
      </header>
      <main className="">

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
                  data-disable-mouse-parallax={isAnimatedBox ? 'true' : undefined}
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
          <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center justify-center px-4">
            
            {/* Título Principal */}
            <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-bold text-[#111111] leading-[1.1] tracking-tight">
              Hire any professional.<br />Book with confidence.
            </h1>
            
            {/* Subtítulo */}
            <p className="mt-6 text-xl md:text-[23px] font-medium text-[#9F9F9F] leading-relaxed max-w-2xl">
              The first marketplace where trust is the default.<br className="hidden md:block" />
              Simple. Secure payments. Verified reviews. One app.
            </p>
            
            {/* Contenedor de Botones */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              
              {/* Botón App Store */}
              <button className="flex items-center justify-center gap-2.5 rounded-[28px] bg-[#111111] px-7 py-3 text-[15px] font-semibold text-white transition-all hover:scale-105 hover:bg-black">
                <svg viewBox="0 0 384 512" width="20" height="20" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                App Store
              </button>
              
              {/* Botón Play Store */}
              <button className="flex items-center justify-center gap-2.5 rounded-[28px] bg-[#111111] px-7 py-3 text-[15px] font-semibold text-white transition-all hover:scale-105 hover:bg-black">
                <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                Play Store
              </button>
              
            </div>
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
        <section ref={proStorySectionRef} className="relative min-h-[200vh] w-screen overflow-hidden">
          <div ref={proStoryPinRef} className="relative flex h-screen w-screen items-center justify-center">
            <div ref={proStoryImageRef} className="relative overflow-hidden">
              <img
                src="/images/pro_alone4.png"
                alt="People collaborating in a group"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" aria-hidden />
            </div>
            <div ref={proStoryTextsRef} className="pointer-events-none absolute inset-0 z-10">
              <p
                data-pro-story-text
                className="absolute bottom-40 left-14 max-w-[min(500px,78vw)] text-left text-base font-semibold leading-snug text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] md:bottom-56 md:left-44 md:text-xl"
              >
                Looking for help used to be a leap of faith.
              </p>
              <p
                data-pro-story-text
                className="absolute bottom-40 left-14 max-w-[min(560px,80vw)] text-left text-sm font-semibold leading-snug text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] md:bottom-56 md:left-44 md:text-lg"
              >
                Great skills got lost in noise. Managing bookings was manual, trust was hard to build, and credibility took years to establish.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Until now */}
        <section ref={untilNowSectionRef} className="fade-section min-h-[50vh] mx-auto flex w-full justify-center items-center px-6 py-24 -mt-[210vh] bg-white relative">
          <p ref={untilNowTextRef} className="text-center text-8xl font-semibold">Until now.</p>
        </section>

        {/* 6. Unified */}
        <section ref={unifiedSectionRef} className="fade-section min-h-screen w-full mx-auto flex flex-col justify-center items-center px-6 py-24 -mt-[-20vh] gap-40 overflow-hidden pt-20">

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
        <section ref={chaosSectionRef} className="fade-section -mt-[165vh] min-h-screen mx-auto flex w-full justify-center items-center px-6 py-20">
          <p className="mx-auto max-w-[1000px] text-center text-[42px] leading-[1.3] font-semibold leading-relaxed text-[#050505]">
            We replaced word-of-mouth with verified data. We replaced uncertainty with transparent profiles. A single ecosystem where quality is visible, and trust is the default.
          </p>
        </section>

        {/* 8. Dual experience */}
        <InteractiveToggleSection
          sectionRef={dualExperienceSectionRef}
          activeMode={experienceMode}
          onModeChange={setExperienceMode}
        />

        <CosmosSpiral serviceFamilies={serviceFamilies} />

        {/* 9. How Wisdom works */}
        <HowItWorksSection
          sectionRef={howWorksRef}
          flows={howItWorksFlows}
          activeTab={experienceMode}
          onTabChange={setExperienceMode}
        />

        {/* 10. Secure & Trust */}
        <section ref={secureSectionRef} className="fade-section mt-[200vh] min-h-screen w-full mx-auto flex flex-col justify-center items-center px-6 py-24">

          {/* Título de la sección */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#050505]">
              Wisdom is security
            </h2>
          </div>

          {/* Grid de tarjetas: Cambiado a lg:grid-cols-3 */}
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }} // Animación suave al pasar el ratón
                className="group flex flex-col rounded-[32px] bg-[#F9FAFB] p-8 md:p-10 transition-transform duration-300"
              >
                {/* Contenedor del Icono: Ahora es un círculo pequeño a la izquierda */}
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                  <div className="text-[#3b82f6]"> {/* Puedes cambiar este color si lo prefieres negro como text-[#050505] */}
                    {feature.icon}
                  </div>
                </div>

                {/* Textos alineados a la izquierda */}
                <div className="flex flex-col flex-grow text-left">
                  <h3 className="mb-4 text-xl font-bold text-[#050505]">{feature.title}</h3>
                  <p className="text-base font-medium leading-relaxed text-[#6B7280]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 11. CTA Final & Footer */}
        <section ref={ctaSectionRef} className="fade-section -mt-[180vh] w-full min-h-screen relative flex flex-col items-center justify-center bg-white">
          
          {/* Contenido del CTA (Centrado en la pantalla) */}
          <div className="flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-4xl md:text-[42px] font-bold tracking-tight text-[#050505]">
              Ready to simplify your life?
            </h2>
            <p className="mt-5 text-lg md:text-xl text-[#9ca3af] font-medium max-w-md leading-relaxed">
              Join the new standard for services today on Apple and Android.
            </p>
            <button className="mt-10 rounded-full bg-[#0F0F0F] px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
              Give Wisdom a try
            </button>
          </div>

          {/* FOOTER (Fijado en la parte inferior de esta sección) */}
          <div className="absolute bottom-0 w-full px-6 py-8 md:px-12 flex flex-col xl:flex-row justify-between items-center text-[15px] bg-white">
            
            {/* Izquierda: Marca y Copyright */}
            <div className="flex items-center gap-3 mb-6 xl:mb-0">
              <span className="font-medium text-[#050505]">WISDOM</span>
              <span className="text-[#9ca3af]">© 2026</span>
            </div>

            {/* Derecha: Enlaces */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
              
              {/* Grupo Connect */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-[#050505]">Connect</span>
                <div className="flex flex-wrap items-center gap-4 text-[#9ca3af]">
                  <a href="#" className="hover:text-[#050505] transition-colors">Instagram</a>
                  <a href="#" className="hover:text-[#050505] transition-colors">TikTok</a>
                  <a href="#" className="hover:text-[#050505] transition-colors">X</a>
                </div>
              </div>

              {/* Grupo More */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-[#050505]">More</span>
                <div className="flex items-center gap-4 text-[#9ca3af]">
                  <a href="#" className="hover:text-[#050505] transition-colors">Terms</a>
                  <a href="#" className="hover:text-[#050505] transition-colors">Privacy</a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      
    </div>
  );
}

export default App;
