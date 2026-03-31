import React, { useMemo, useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Reset scroll on load
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  ScrollTrigger.clearScrollMemory && ScrollTrigger.clearScrollMemory("manual");
  window.scrollTo(0, 0);
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

// Hook para detectar tamaño de pantalla
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0, isMobile: false, isTablet: false });
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSize({
        width,
        height: window.innerHeight,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
};

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
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174847.png",
    position: { top: '5%', left: '2%' },
    size: { mobile: 'w-24 h-16', tablet: 'w-32 h-20', desktop: 'w-40 h-28' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180612.png",
    position: { top: '8%', left: '22%' },
    size: { mobile: 'w-28 h-16', tablet: 'w-40 h-20', desktop: 'w-60 h-32' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/77502ab75202d6b38aa0df57113b6746.jpg",
    position: { top: '6%', right: '22%' },
    size: { mobile: 'w-24 h-16', tablet: 'w-36 h-20', desktop: 'w-52 h-32' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180656.png",
    position: { top: '12%', right: '2%' },
    size: { mobile: 'w-28 h-16', tablet: 'w-40 h-20', desktop: 'w-60 h-32' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181310.png",
    position: { bottom: '28%', left: '8%' },
    size: { mobile: 'w-28 h-20', tablet: 'w-40 h-24', desktop: 'w-60 h-40' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20190223.png",
    position: { bottom: '2%', left: '2%' },
    size: { mobile: 'w-24 h-20', tablet: 'w-36 h-24', desktop: 'w-56 h-40' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/237ee01c-4454-4d81-8f27-f502f74ac9d3.jpeg",
    position: { bottom: '18%', right: '20%' },
    size: { mobile: 'w-20 h-28', tablet: 'w-28 h-36', desktop: 'w-44 h-56' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175117.png",
    position: { bottom: '2%', right: '5%' },
    size: { mobile: 'w-28 h-16', tablet: 'w-40 h-20', desktop: 'w-60 h-32' }
  },
  {
    url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174733.png",
    position: { bottom: '2%', left: '45%' },
    size: { mobile: 'w-16 h-24', tablet: 'w-20 h-32', desktop: 'w-32 h-48' }
  },
];

const grayShapes = [
  { position: { top: '23%', left: '6%' }, size: { mobile: 'w-12 h-24', desktop: 'w-20 h-44' } },
  { position: { top: '5%', left: '47%' }, size: { mobile: 'w-16 h-24', desktop: 'w-28 h-40' } },
  { position: { top: '70%', right: '28%' }, size: { mobile: 'w-20 h-20', desktop: 'w-32 h-32' } },
  {
    position: { bottom: '13%', left: '28%' },
    size: { mobile: 'w-16 h-24', desktop: 'w-28 h-40' },
    isAnimated: true,
    imageInside: "https://storage.googleapis.com/wisdom-images/search_services.png"
  },
  { position: { bottom: '23%', right: '2%' }, size: { mobile: 'w-24 h-28', desktop: 'w-38 h-44' } },
  { position: { top: '37%', right: '10%' }, size: { mobile: 'w-28 h-12', desktop: 'w-48 h-20' } },
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
    description: 'Talent is open to everyone, but trust is earned. Reviews are locked to actual bookings, ensuring every star reflects a real job completed.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
  },
  {
    title: 'Protected Payments',
    description: 'No hidden fees. You pay a small deposit to book, and the rest is secured. If plans change, our Wisdom Guarantee has you covered.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
  },
  {
    title: 'Privacy by Design',
    description: 'Your phone number and payment details never leave the app. Chat, share photos, and pay securely inside our encrypted bubble.',
    icon: (
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
    { id: 'choose', label: 'Choose', screen: sharedScreens[1] },
    { id: 'reserve', label: 'Reserve', screen: sharedScreens[2] },
    { id: 'relax', label: 'Relax', screen: sharedScreens[3] },
  ],
  professionals: [
    { id: 'publish', label: 'Publish', screen: sharedScreens[0] },
    { id: 'manage', label: 'Manage', screen: sharedScreens[1] },
    { id: 'deliver', label: 'Deliver', screen: sharedScreens[2] },
    { id: 'earn', label: 'Earn', screen: sharedScreens[3] },
  ],
};

// Constantes responsivas
const getResponsiveValues = (isMobile, isTablet) => ({
  VISIBLE_RANGE: 4,
  ANGLE_PER_ITEM: isMobile ? 12 : 15.5,
  RADIUS: isMobile ? 200 : isTablet ? 280 : 340,
  SEARCH_PIN_DISTANCE: isMobile ? 300 : 400,
  ENDLESS_PIN_DISTANCE: isMobile ? 400 : 600,
  SOFT_PIN_CENTER_HOLD_DISTANCE: isMobile ? 180 : 240,
  PRO_STORY_PIN_HOLD_DISTANCE: isMobile ? 350 : 500,
});

const SectionHeading = ({ title }) => (
  <div className="space-y-3 text-center">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#050505]">{title}</h2>
  </div>
);

// Componente FanItem mejorado
const FanItem = ({ item, index, activeIndex, radius, anglePerItem }) => {
  const distance = index - activeIndex;
  const rotate = distance * anglePerItem;
  const isActive = index === activeIndex;
  const isVisible = Math.abs(distance) < 4;

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
        transformOrigin: `${-radius}px 50%`,
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
      }}
      className="flex flex-col items-center justify-center md:items-start"
    >
      <h3 className="cursor-pointer whitespace-nowrap text-2xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[60px]">
        {item.label}.
      </h3>
    </motion.div>
  );
};

// Componente HowItWorks3D mejorado
const HowItWorks3D = ({ steps, activeIndex }) => {
  const { isMobile, isTablet } = useWindowSize();
  const { RADIUS, ANGLE_PER_ITEM } = getResponsiveValues(isMobile, isTablet);

  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-between gap-6 md:gap-10 md:flex-row md:px-0">
      
      {/* COLUMNA IZQUIERDA (TEXTO) */}
      <div className="order-2 flex h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full flex-1 items-center justify-center md:order-1 md:justify-start">
        <div className="relative flex h-full w-full flex-col items-center justify-center md:items-start">
          <div
            className="relative h-full w-full max-w-5xl"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            }}
          >
            <div className="relative h-full w-full left-4 sm:left-8 md:left-16 lg:left-24">
              {steps.map((step, index) => (
                <FanItem 
                  key={step.id} 
                  item={step} 
                  index={index} 
                  activeIndex={activeIndex}
                  radius={RADIUS}
                  anglePerItem={ANGLE_PER_ITEM}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA (MÓVIL) */}
      <div className="order-1 flex h-[35vh] sm:h-[40vh] md:h-auto w-full flex-1 items-center justify-center md:order-2 md:justify-end md:pr-4 lg:pr-12">
        <div className="relative flex h-auto w-[180px] sm:w-[200px] md:w-[260px] lg:w-[300px] items-center justify-center">
          <img
            src="/images/phone.png"
            alt="Phone frame"
            className="pointer-events-none relative z-20 h-auto w-full drop-shadow-2xl"
          />
          <div className="absolute left-1/2 top-1/2 z-10 h-[94%] w-[85%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[46px] bg-black">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => (
                activeIndex === index && (
                  <motion.img
                    key={step.id}
                    src={step.screen}
                    alt={step.label}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// HowItWorksSection mejorado
const HowItWorksSection = ({ sectionRef, flows, activeTab, onTabChange }) => {
  const steps = flows[activeTab] || flows.customers;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollDistance = isMobile ? 1200 : 1800;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "center center",
      end: `+=${scrollDistance}`,
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
  }, [steps.length, isMobile]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-visible z-0">
      <div ref={containerRef} className="flex min-h-screen w-full items-center justify-center overflow-hidden py-12 md:py-0">
        <div className="mx-auto flex h-full w-full max-w-[1800px] flex-col justify-center gap-6 md:gap-8 px-4 sm:px-6 pt-20 pb-8 md:pt-24 md:pb-12">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <SectionHeading title="How Wisdom works" />

            <div className="flex justify-center">
              <div className="pointer-events-auto relative flex rounded-full bg-[#F3F4F6] p-1">
                {EXPERIENCE_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => onTabChange(tab)}
                    className={`relative z-10 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${activeTab === tab ? 'text-[#050505]' : 'text-[#6B7280]'}`}
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

// InteractiveToggleSection mejorado
const InteractiveToggleSection = ({ sectionRef, activeMode, onModeChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setHoveredIndex(null);
  }, [activeMode]);

  const toggleItems = [
    { label: 'Client', value: 'customers' },
    { label: 'Profesional', value: 'professionals' }
  ];

  const contentItems = EXPERIENCE_CONTENT[activeMode] || EXPERIENCE_CONTENT.customers;

  return (
    <section ref={sectionRef} className="min-h-[50vh] md:min-h-[60vh] w-full mx-auto flex flex-col justify-center items-center py-8 md:py-12 px-4">
      <div className="mt-4 mb-8 md:mb-16 rounded-full bg-[#F3F4F6] p-1 flex relative">
        {toggleItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onModeChange(item.value)}
            className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${activeMode === item.value ? 'text-[#050505]' : 'text-[#6B7280]'}`}
          >
            {activeMode === item.value && (
              <motion.div
                layoutId="toggle-bg"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeMode}
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
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#050505] transition-colors duration-300"
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
                      <p className="pt-2 pb-4 text-base md:text-lg text-[#6B7280] max-w-md mx-auto px-4">
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

// FloatingImage mejorado
const FloatingImage = ({ index, total, images }) => {
  const randomImage = useMemo(() => images[Math.floor(Math.random() * images.length)].image, [images]);

  const randomParams = useMemo(() => {
    const angle = Math.random() * 360;
    const duration = 18 + Math.random() * 14;
    const delay = (index / total) * 15;
    const baseSize = 80 + Math.random() * 100;
    const rotation = Math.random() * 360;

    const xStart = Math.cos(angle * (Math.PI / 180)) * 100;
    const yStart = Math.sin(angle * (Math.PI / 180)) * 100;

    return { xStart, yStart, duration, delay, baseSize, rotation };
  }, [index, total]);

  return (
    <motion.div
      initial={{
        x: `${randomParams.xStart}vw`,
        y: `${randomParams.yStart}vh`,
        opacity: 0,
        scale: 1.5,
        rotate: randomParams.rotation,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: [0, 1, 1, 0],
        scale: [1.2, 0.2],
        rotate: randomParams.rotation + 180,
      }}
      transition={{
        duration: randomParams.duration,
        repeat: Infinity,
        repeatType: "loop",
        delay: -randomParams.delay,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 flex items-center justify-center pointer-events-none"
      style={{
        width: `clamp(60px, ${randomParams.baseSize}px, 15vw)`,
        height: `clamp(84px, ${randomParams.baseSize * 1.4}px, 21vw)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src={randomImage}
        alt=""
        className="w-full h-full object-cover rounded-sm shadow-xl opacity-80"
      />
    </motion.div>
  );
};

// CosmosSpiral mejorado
const CosmosSpiral = ({ serviceFamilies }) => {
  const contentPool = useMemo(() => {
    const pool = [];
    serviceFamilies.forEach((family) => {
      if (family.categories) {
        family.categories.forEach((cat) => {
          if (cat.url) {
            pool.push({
              image: cat.url,
              label: cat.category
            });
          }
        });
      }
    });
    return pool;
  }, [serviceFamilies]);

  const [textIndex, setTextIndex] = useState(0);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (contentPool.length === 0) return;
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % contentPool.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [contentPool]);

  if (!contentPool.length) return null;

  const imageCount = isMobile ? 15 : 25;

  return (
    <section className="relative z-10 min-h-screen w-full overflow-hidden bg-white flex items-center justify-center py-20" style={{
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
    }}>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {Array.from({ length: imageCount }).map((_, i) => (
          <FloatingImage
            key={i}
            index={i}
            total={imageCount}
            images={contentPool}
          />
        ))}
      </div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 mix-blend-multiply">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-4 md:mb-6 drop-shadow-sm">
          No categories. Just talent.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[#9F9F9F] font-medium max-w-2xl leading-relaxed mb-6 md:mb-8 px-4">
          Wisdom gives you the freedom to find or offer whatever the world needs.
        </p>

        <div className="flex w-full justify-center">
          <motion.div
            layout
            className="flex items-center gap-2 sm:gap-3"
            transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          >
            <motion.span
              layout
              className="text-sm md:text-md font-semibold uppercase tracking-widest text-[#9F9F9F]"
            >
              Like
            </motion.span>

            <motion.div
              layout
              className="relative h-10 md:h-12 overflow-hidden rounded-full bg-white/80 backdrop-blur-sm px-2"
              transition={{ layout: { duration: 0.7, type: "spring", stiffness: 300, damping: 30 } }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  layout
                  key={textIndex}
                  initial={{ y: 0, opacity: 0, filter: 'blur(1px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: 0, opacity: 0, filter: 'blur(1px)' }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center justify-center h-full"
                >
                  <span className="text-[#1a1a1a] font-bold text-lg md:text-xl whitespace-nowrap">
                    {contentPool[textIndex]?.label || "Magic"}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Unified Photos mejorado con posiciones responsivas
const unifiedPhotos = [
  {
    src: "https://storage.googleapis.com/wisdom-images/53a50b05-32d7-4e90-86ce-62702bc97d65.jpeg",
    alt: "Meditation",
    size: "w-24 h-16 sm:w-28 sm:h-18 md:w-40 md:h-28 lg:w-56 lg:h-36",
    position: { x: '15vw', y: '-20vh', rotate: 8 },
    mobilePosition: { x: '18vw', y: '-15vh', rotate: 6 }
  },
  {
    src: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184635.png",
    alt: "Catering",
    size: "w-28 h-18 sm:w-32 sm:h-20 md:w-44 md:h-32 lg:w-60 lg:h-40",
    position: { x: '-20vw', y: '-15vh', rotate: -6 },
    mobilePosition: { x: '-22vw', y: '-12vh', rotate: -4 }
  },
  {
    src: "https://storage.googleapis.com/wisdom-images/526bda5b-c0c2-4170-b552-12a17db69fa9.jpeg",
    alt: "Architect",
    size: "w-24 h-18 sm:w-28 sm:h-20 md:w-40 md:h-28 lg:w-56 lg:h-40",
    position: { x: '-18vw', y: '18vh', rotate: 5 },
    mobilePosition: { x: '-20vw', y: '15vh', rotate: 4 }
  },
  {
    src: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20185810.png",
    alt: "Finances",
    size: "w-28 h-18 sm:w-32 sm:h-20 md:w-44 md:h-32 lg:w-60 lg:h-40",
    position: { x: '22vw', y: '-2vh', rotate: 3 },
    mobilePosition: { x: '24vw', y: '-2vh', rotate: 2 }
  },
  {
    src: "https://storage.googleapis.com/wisdom-images/393cd8b9-f908-4d5a-a67b-cf6850b287e9.jpg",
    alt: "Gardener",
    size: "w-18 h-24 sm:w-20 sm:h-28 md:w-28 md:h-40 lg:w-40 lg:h-52",
    position: { x: '15vw', y: '22vh', rotate: -5 },
    mobilePosition: { x: '16vw', y: '18vh', rotate: -4 }
  }
];

function App() {
  const lenisRef = useRef(null);
  const appRef = useRef(null);
  const animadaBoxRef = useRef(null);
  const searchSectionRef = useRef(null);
  const searchImageRef = useRef(null);
  const searchTextRef = useRef(null);
  const endlessSearchSectionRef = useRef(null);
  const endlessSearchTextRef = useRef(null);
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
  const { isMobile, isTablet } = useWindowSize();

  // Inicialización de Lenis y scroll suave
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
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

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    });

    return () => {
      lenisRef.current = null;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Animaciones GSAP simplificadas y robustas
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const responsiveValues = getResponsiveValues(isMobile, isTablet);

      // Animación del cuadro gris a imagen
      if (animadaBoxRef.current && searchImageRef.current && searchSectionRef.current && searchTextRef.current) {
        const animatedBox = animadaBoxRef.current;
        const innerImage = animatedBox.querySelector('img');

        gsap.set(animatedBox, {
          willChange: 'transform,width,height,background-color',
          backgroundColor: '#F9F8F8',
        });
        
        if (innerImage) {
          gsap.set(innerImage, { autoAlpha: 0 });
        }

        // Timeline principal de movimiento
        const tlMove = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            endTrigger: searchSectionRef.current,
            end: "center center",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        tlMove.to(animatedBox, {
          x: () => {
            const source = animatedBox.getBoundingClientRect();
            const target = searchImageRef.current.getBoundingClientRect();
            return target.left - source.left + (target.width - source.width) / 2;
          },
          y: () => {
            const source = animatedBox.getBoundingClientRect();
            const target = searchImageRef.current.getBoundingClientRect();
            return target.top - source.top;
          },
          width: () => searchImageRef.current.getBoundingClientRect().width,
          height: () => searchImageRef.current.getBoundingClientRect().height,
          ease: "none",
          duration: 1,
        })
        .to(animatedBox, { backgroundColor: 'transparent', duration: 0.3 }, 0.7)
        .to(innerImage, { autoAlpha: 1, duration: 0.3 }, 0.7);

        // Pin de la sección search
        ScrollTrigger.create({
          trigger: searchSectionRef.current,
          start: "center center",
          end: `+=${responsiveValues.SEARCH_PIN_DISTANCE}`,
          pin: true,
          pinSpacing: true,
        });

        // Animación del texto
        gsap.fromTo(searchTextRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: searchSectionRef.current,
              start: "center center",
              end: `+=${responsiveValues.SEARCH_PIN_DISTANCE * 0.5}`,
              scrub: true,
            }
          }
        );
      }

      // Sección "Endless searches"
      if (endlessSearchSectionRef.current && endlessSearchTextRef.current) {
        gsap.set(endlessSearchTextRef.current, { opacity: 0, scale: 0.95 });

        ScrollTrigger.create({
          trigger: endlessSearchSectionRef.current,
          start: "center center",
          end: `+=${responsiveValues.ENDLESS_PIN_DISTANCE}`,
          pin: true,
          pinSpacing: true,
          onEnter: () => {
            gsap.to(endlessSearchTextRef.current, {
              opacity: 1,
              scale: 1.02,
              duration: 1,
              ease: 'power1.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(endlessSearchTextRef.current, {
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
            });
          },
          onLeave: () => {
            gsap.to(endlessSearchTextRef.current, {
              opacity: 0,
              duration: 0.5,
            });
          },
          onEnterBack: () => {
            gsap.to(endlessSearchTextRef.current, {
              opacity: 1,
              scale: 1.02,
              duration: 1,
            });
          },
        });
      }

      // Pro Story Section
      if (proStorySectionRef.current && proStoryPinRef.current && proStoryImageRef.current) {
        const proImage = proStoryImageRef.current;
        const proTextBlocks = gsap.utils.toArray('[data-pro-story-text]', proStoryTextsRef.current);
        
        const getSquareSize = () => Math.min(
          Math.max(130, window.innerWidth * 0.25),
          520
        );

        gsap.set(proImage, {
          width: getSquareSize(),
          height: getSquareSize(),
          y: window.innerHeight + getSquareSize(),
        });

        gsap.set(proTextBlocks, { autoAlpha: 0, y: 50 });

        // Entrada de la imagen
        gsap.timeline({
          scrollTrigger: {
            trigger: proStorySectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 0.5,
          },
        }).to(proImage, { y: 0, ease: 'none' });

        // Timeline principal del pin
        const totalDistance = isMobile ? 2500 : 3500;
        
        const proTl = gsap.timeline({
          scrollTrigger: {
            trigger: proStoryPinRef.current,
            start: 'center center',
            end: `+=${totalDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        // Escalar a pantalla completa
        proTl.to(proImage, {
          width: '100vw',
          height: '100vh',
          duration: 0.3,
          ease: 'none',
        });

        // Mostrar textos
        proTextBlocks.forEach((block, i) => {
          const startTime = 0.3 + (i * 0.25);
          proTl.to(block, { autoAlpha: 1, y: 0, duration: 0.08 }, startTime)
               .to(block, { autoAlpha: 1, duration: 0.1 }, startTime + 0.08)
               .to(block, { autoAlpha: 0, y: -30, duration: 0.08 }, startTime + 0.18);
        });

        // Volver al tamaño cuadrado y salir
        proTl.to(proImage, {
          width: getSquareSize(),
          height: getSquareSize(),
          duration: 0.15,
        }, 0.85)
        .to(proImage, {
          y: -window.innerHeight - getSquareSize(),
          duration: 0.15,
        }, 0.9);
      }

      // Until Now Section
      if (untilNowSectionRef.current && untilNowTextRef.current) {
        gsap.set(untilNowTextRef.current, { opacity: 0, scale: 0.95 });

        ScrollTrigger.create({
          trigger: untilNowSectionRef.current,
          start: "center center",
          end: `+=${responsiveValues.ENDLESS_PIN_DISTANCE}`,
          pin: true,
          pinSpacing: true,
          onEnter: () => {
            gsap.to(untilNowTextRef.current, {
              opacity: 1,
              scale: 1.05,
              duration: 1,
              ease: 'power1.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(untilNowTextRef.current, {
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
            });
          },
          onLeave: () => {
            gsap.to(untilNowTextRef.current, {
              opacity: 0,
              duration: 0.5,
            });
          },
          onEnterBack: () => {
            gsap.to(untilNowTextRef.current, {
              opacity: 1,
              scale: 1.05,
              duration: 1,
            });
          },
        });
      }

      // Unified Section con fotos
      if (unifiedSectionRef.current) {
        const photos = gsap.utils.toArray('.unified-photo', unifiedSectionRef.current);
        const unifiedText = unifiedSectionRef.current.querySelector('.unified-text');

        gsap.set(photos, { x: 0, y: 0, rotation: 0, scale: 0.2, opacity: 0 });
        gsap.set(unifiedText, { opacity: 0, y: 20 });

        const unifiedTl = gsap.timeline({
          scrollTrigger: {
            trigger: unifiedSectionRef.current,
            start: 'top 80%',
            end: `+=${isMobile ? 1500 : 2000}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        // Expandir fotos
        unifiedTl.to(photos, {
          x: (i, el) => isMobile ? el.dataset.mobileX : el.dataset.x,
          y: (i, el) => isMobile ? el.dataset.mobileY : el.dataset.y,
          rotation: (i, el) => parseFloat(el.dataset.rotate),
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.35,
          ease: "power2.out",
        }, 0)
        // Pausa
        .to({}, { duration: 0.15 })
        // Retraer fotos
        .to(photos, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.2,
          opacity: 0,
          duration: 0.25,
          ease: "power1.inOut",
        })
        // Mostrar texto
        .to(unifiedText, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        }, "-=0.1")
        // Pausa final
        .to({}, { duration: 0.1 });
      }

      // Chaos, Dual Experience y Secure sections con fade simple
      [chaosSectionRef, dualExperienceSectionRef, secureSectionRef].forEach((ref) => {
        if (ref.current) {
          gsap.fromTo(ref.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
              },
            }
          );
        }
      });

    }, appRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const scrollToSection = useCallback((sectionRef) => {
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
  }, []);

  const handleNavClick = useCallback((link) => {
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
  }, [scrollToSection]);

  return (
    <div ref={appRef} className="min-h-screen bg-white text-[#050505]">
      {/* Header responsivo */}
      <header className="fixed backdrop-blur-xl top-2 sm:top-4 left-1/2 z-50 flex w-[calc(100%-1rem)] sm:w-[min(1100px,calc(100%-2rem))] -translate-x-1/2 items-center rounded-full px-3 sm:px-4 py-2 sm:py-3 font-semibold bg-white/50">
        <div className="flex flex-1 items-center justify-start gap-2 ml-1 sm:ml-2">
          <img
            src='https://storage.googleapis.com/wisdom-images/app_icon.png'
            alt="Wisdom Icon"
            className="relative flex h-8 w-8 sm:h-10 sm:w-10 md:h-8 md:w-8 items-center justify-center"
          />
          <div className="text-base sm:text-lg">Wisdom</div>
        </div>

        <nav className="hidden md:flex flex-none flex-wrap items-center justify-center gap-4 lg:gap-8">
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

        <div className="flex flex-1 justify-end">
          <button className="rounded-full bg-[#050505] px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white hover:bg-black transition-colors">
            Get the app
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 z-10 overflow-hidden">
          {/* Gray shapes */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {grayShapes.map((shape, index) => {
              const isAnimatedBox = index === 3;
              const sizeClass = isMobile ? shape.size.mobile : shape.size.desktop;

              return (
                <div
                  key={`shape-${index}`}
                  ref={isAnimatedBox ? animadaBoxRef : null}
                  className={`absolute bg-[#F9F8F8] ${sizeClass} ${isAnimatedBox ? 'z-40 overflow-hidden' : ''}`}
                  style={shape.position}
                >
                  {isAnimatedBox && (
                    <img
                      src={shape.imageInside}
                      alt="Transition"
                      className="w-full h-full object-cover opacity-0"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Hero tiles */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {heroTiles.map((tile, index) => {
              const sizeClass = isMobile ? tile.size.mobile : (isTablet ? tile.size.tablet : tile.size.desktop);
              return (
                <div
                  key={`tile-${index}`}
                  className={`absolute overflow-hidden opacity-60 sm:opacity-75 ${sizeClass}`}
                  style={tile.position}
                >
                  <img src={tile.url} alt="" className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>

          {/* Hero content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center justify-center px-4">
            <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-[#111111] leading-[1.1] tracking-tight">
              Hire any professional.<br />Book with confidence.
            </h1>
            
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-[23px] font-medium text-[#9F9F9F] leading-relaxed max-w-2xl px-2">
              The first marketplace where trust is the default.
              <br className="hidden sm:block" />
              Simple. Secure payments. Verified reviews. One app.
            </p>
            
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2.5 rounded-[28px] bg-[#111111] px-5 sm:px-7 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-white transition-all hover:scale-105 hover:bg-black">
                <svg viewBox="0 0 384 512" width="18" height="18" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                App Store
              </button>
              
              <button className="flex items-center justify-center gap-2.5 rounded-[28px] bg-[#111111] px-5 sm:px-7 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-white transition-all hover:scale-105 hover:bg-black">
                <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                Play Store
              </button>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section ref={searchSectionRef} className="min-h-screen w-full mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-20 px-4 sm:px-6 py-16 md:py-24 relative z-0">
          <div ref={searchImageRef} className="aspect-[3/4] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] shrink-0 relative">
            <img
              src="https://storage.googleapis.com/wisdom-images/search_services.png"
              alt=""
              className="w-full h-full object-cover opacity-0"
            />
          </div>

          <div ref={searchTextRef} className="max-w-2xl">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-center md:text-left px-2 md:px-0">
              Looking for help used to be a leap of faith.
            </p>
          </div>
        </section>

        {/* Endless Search Section */}
        <section ref={endlessSearchSectionRef} className="min-h-[70vh] md:min-h-screen mx-auto flex w-full justify-center items-center px-4 sm:px-6 py-16 md:py-24">
          <p ref={endlessSearchTextRef} className="mx-auto max-w-[820px] text-center text-xl sm:text-2xl md:text-3xl lg:text-[42px] leading-[1.3] font-semibold text-[#050505] px-2">
            Endless searches. Reliance on word-of-mouth. Zero guarantees. The service world was fragmented, forcing you to guess instead of choose.
          </p>
        </section>

        {/* Pro Story Section */}
        <section ref={proStorySectionRef} className="relative min-h-[150vh] md:min-h-[200vh] w-full overflow-hidden">
          <div ref={proStoryPinRef} className="relative flex h-screen w-full items-center justify-center">
            <div ref={proStoryImageRef} className="relative overflow-hidden">
              <img
                src="/images/pro_alone4.png"
                alt="People collaborating"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" aria-hidden />
            </div>
            <div ref={proStoryTextsRef} className="pointer-events-none absolute inset-0 z-10">
              <p
                data-pro-story-text
                className="absolute bottom-32 sm:bottom-40 left-6 sm:left-14 max-w-[min(400px,80vw)] md:max-w-[500px] text-left text-sm sm:text-base md:text-xl font-semibold leading-snug text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] md:bottom-56 md:left-44"
              >
                Looking for help used to be a leap of faith.
              </p>
              <p
                data-pro-story-text
                className="absolute bottom-32 sm:bottom-40 left-6 sm:left-14 max-w-[min(450px,85vw)] md:max-w-[560px] text-left text-xs sm:text-sm md:text-lg font-semibold leading-snug text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] md:bottom-56 md:left-44"
              >
                Great skills got lost in noise. Managing bookings was manual, trust was hard to build, and credibility took years to establish.
              </p>
            </div>
          </div>
        </section>

        {/* Until Now Section */}
        <section ref={untilNowSectionRef} className="min-h-[50vh] md:min-h-[60vh] mx-auto flex w-full justify-center items-center px-4 sm:px-6 py-16 md:py-24 bg-white relative">
          <p ref={untilNowTextRef} className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold">Until now.</p>
        </section>

        {/* Unified Section */}
        <section ref={unifiedSectionRef} className="min-h-screen w-full mx-auto flex flex-col justify-center items-center px-4 sm:px-6 py-16 md:py-24 overflow-hidden bg-white relative z-10">
          <div className="relative flex flex-1 w-full items-center justify-center min-h-[50vh]">
            {unifiedPhotos.map((photo, index) => {
              const pos = isMobile ? photo.mobilePosition : photo.position;
              return (
                <div
                  key={index}
                  className={`unified-photo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${photo.size} shadow-lg`}
                  data-x={pos.x}
                  data-y={pos.y}
                  data-rotate={pos.rotate}
                  data-mobile-x={photo.mobilePosition.x}
                  data-mobile-y={photo.mobilePosition.y}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </div>
              );
            })}

            <img
              src='https://storage.googleapis.com/wisdom-images/app_icon.png'
              alt="Wisdom Icon"
              className="relative z-10 flex h-28 w-28 sm:h-36 sm:w-36 md:h-56 md:w-56 lg:h-72 lg:w-72 items-center justify-center"
            />
            
            <div className="unified-text absolute top-1/2 left-1/2 -translate-x-1/2 mt-20 sm:mt-24 md:mt-36 lg:mt-48 w-full text-center z-20 pointer-events-none px-4">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] font-semibold text-[#050505]">Wisdom unifies the chaos.</p>
            </div>
          </div>
        </section>

        {/* Chaos Section */}
        <section ref={chaosSectionRef} className="min-h-[60vh] md:min-h-screen mx-auto flex w-full justify-center items-center px-4 sm:px-6 py-12 md:py-20">
          <p className="mx-auto max-w-[1000px] text-center text-xl sm:text-2xl md:text-3xl lg:text-[42px] leading-[1.3] font-semibold text-[#050505] px-2">
            We replaced word-of-mouth with verified data. We replaced uncertainty with transparent profiles. A single ecosystem where quality is visible, and trust is the default.
          </p>
        </section>

        {/* Dual Experience Section */}
        <InteractiveToggleSection
          sectionRef={dualExperienceSectionRef}
          activeMode={experienceMode}
          onModeChange={setExperienceMode}
        />

        {/* Cosmos Spiral */}
        <CosmosSpiral serviceFamilies={serviceFamilies} />

        {/* How Wisdom Works */}
        <HowItWorksSection
          sectionRef={howWorksRef}
          flows={howItWorksFlows}
          activeTab={experienceMode}
          onTabChange={setExperienceMode}
        />

        {/* Security Section */}
        <section ref={secureSectionRef} className="min-h-screen w-full mx-auto flex flex-col justify-center items-center px-4 sm:px-6 py-16 md:py-24">
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#050505]">
              Wisdom is security
            </h2>
          </div>

          <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3 w-full">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                className="group flex flex-col rounded-[24px] sm:rounded-[32px] bg-[#F9FAFB] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-6 md:mb-8 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                  <div className="text-[#3b82f6]">
                    {feature.icon}
                  </div>
                </div>

                <div className="flex flex-col flex-grow text-left">
                  <h3 className="mb-3 md:mb-4 text-lg sm:text-xl font-bold text-[#050505]">{feature.title}</h3>
                  <p className="text-sm sm:text-base font-medium leading-relaxed text-[#6B7280]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA & Footer Section */}
        <section ref={ctaSectionRef} className="w-full min-h-screen relative flex flex-col items-center justify-center bg-white px-4">
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#050505]">
              Ready to simplify your life?
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#9ca3af] font-medium max-w-md leading-relaxed px-2">
              Join the new standard for services today on Apple and Android.
            </p>
            <button className="mt-8 sm:mt-10 rounded-full bg-[#0F0F0F] px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-bold text-white transition-transform hover:scale-105">
              Give Wisdom a try
            </button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full px-4 sm:px-6 md:px-12 py-6 md:py-8 flex flex-col lg:flex-row justify-between items-center text-[14px] sm:text-[15px] bg-white gap-4 lg:gap-0">
            <div className="flex items-center gap-3">
              <span className="font-medium text-[#050505]">WISDOM</span>
              <span className="text-[#9ca3af]">© 2026</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-14">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-medium text-[#050505]">Connect</span>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#9ca3af]">
                  <a href="#" className="hover:text-[#050505] transition-colors">Instagram</a>
                  <a href="#" className="hover:text-[#050505] transition-colors">TikTok</a>
                  <a href="#" className="hover:text-[#050505] transition-colors">X</a>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-medium text-[#050505]">More</span>
                <div className="flex items-center gap-3 sm:gap-4 text-[#9ca3af]">
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
