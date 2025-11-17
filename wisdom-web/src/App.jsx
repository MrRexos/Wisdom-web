import React, { useEffect, useRef, useState } from 'react';

const navLinks = [
  'How it works',
  'For Customers',
  'For Professionals',
  'Categories',
  'Testimonials',
  'Pricing',
];

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
          style={{ backgroundImage: "url('https://storage.googleapis.com/wisdom-images/IMG_8517%20-%20copia.PNG')", opacity: 0.95 }}
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

          <section className="mt-24 max-w-6xl mx-auto justify-center space-y-10">
            <SectionHeading title="How Wisdom works" />
            <div className="flex flex-wrap items-center gap-3 justify-center">
              {['customers', 'professionals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-6 py-2 text-sm font-semibold capitalize ${
                    activeTab === tab ? 'bg-[#050505] text-white' : 'bg-[#f5f5f5] text-[#4c5563]'
                  }`}
                >
                  {tab === 'customers' ? 'For customers' : 'For professionals'}
                </button>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <Card key={step.title}>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-4 text-[#4c5563]">{step.description}</p>
                </Card>
              ))}
            </div>
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