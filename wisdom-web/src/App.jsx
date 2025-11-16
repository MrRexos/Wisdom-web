import StaticSky from './components/StaticSky.jsx';

const navLinks = ['Use cases', 'Features', 'Pricing', 'Our doctors'];

const saveTimeCards = [
  {
    title: 'Letters',
    subtitle: 'Instantly generate personalised medical letters',
    description: 'Upload past letters or consultation recordings. Choose documents, type in, and the rest is ready for you.',
    pill: 'Choose documents',
  },
  {
    title: 'Transcribe',
    subtitle: 'Transcribe dictations, consultations & telehealth',
    description: 'Securely transcribe every encounter, no matter the format. Dictate, upload, or sync from your tools.',
    pill: 'Choose documents',
  },
];

const writingCards = [
  {
    title: 'Upload to train Letters',
    description: 'We learn your style based on your past letters, and create a template that sounds exactly like you.',
    accent: 'Add Text',
  },
  {
    title: 'Add multiple sources',
    description: 'Add text, upload files or scans, consultation recordings, or even dictations. We will turn it into a letter.',
    accent: 'Add Sources',
  },
];

const practiceSteps = [
  {
    number: '1',
    title: 'Invite your practice to Letters',
    description: 'Easily get started by inviting your team — including doctors, allied health professionals, and administrative staff.',
  },
  {
    number: '2',
    title: 'Seamlessly onboard your practice',
    description: 'Our intuitive platform means your practice can hit the ground running with helpful nudges and clear next steps.',
  },
  {
    number: '3',
    title: "See your team's impact",
    description: 'Letters keeps your team focused. Track efficiency gains, task completion, and workload insights at a glance.',
  },
];

const testimonials = [
  {
    name: 'Dr. Ram Nisharani',
    role: 'The Carlyle Dentists',
    quote:
      'We set up Letters in our surgery for all our dentists — we have 5 surgeries and the experience has been great.',
  },
  {
    name: 'Grace MacPherson',
    role: 'Practice Manager',
    quote:
      'Letters has transformed the way our doctors maintain accuracy of patient files. The support from the team has been phenomenal.',
  },
  {
    name: 'Dr. David Lenz',
    role: 'Orthopaedic Surgeon',
    quote: 'It picks up everything and I can trust the detail. It helps me be miles ahead.',
  },
];

const securityHighlights = [
  {
    title: 'Secure with bank-grade protection',
    description: 'Letters complies with Australian privacy regulations, including the Australian Privacy Act 1988.',
  },
  {
    title: 'Your data never leaves Australia',
    description: 'All data is processed and stored exclusively on secure servers located in Sydney.',
  },
  {
    title: 'Recordings & files are never stored',
    description: 'We delete audio & files instantly once processed, so your conversations remain private.',
  },
];

const pricingPlans = [
  {
    name: 'Letters Basic',
    price: 'Free',
    description: 'For solo use with light needs.',
    perks: ['3 letters / day', '3 transcriptions / day', '1 personalised template'],
    cta: 'Start for Free',
  },
  {
    name: 'Letters Pro',
    price: '$66/mo',
    badge: 'Save $150',
    description: 'For busy doctors & growing practices.',
    perks: ['Unlimited letters', 'Unlimited transcriptions', 'Consultations assistant', 'Patients: $600/mo per team'],
    cta: 'Start 2-Week Trial',
    highlighted: true,
  },
  {
    name: 'Letters Enterprise',
    price: 'Flexible',
    description: 'For practices, clinics and beyond.',
    perks: ['Dedicated pricing', 'Custom security', 'Support options', 'Deployment options'],
    cta: 'Talk to Sales',
  },
];

const devices = [
  {
    title: 'Dictate on the go',
    description: 'Capture notes from your phone with a simplified view built for quick updates.',
  },
  {
    title: 'Transcribe with context',
    description: 'See transcripts, templates, and letters together on your main workspace.',
  },
  {
    title: 'Review anywhere',
    description: 'Pick up where you left off on tablet or desktop with synced drafts.',
  },
];

const SectionHeading = ({ eyebrow, title, highlight }) => (
  <div className="mb-10 text-center">
    {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7f8794]">{eyebrow}</p>}
    <h2 className="mt-3 text-4xl font-semibold text-[#050505]">
      {title}
      {highlight && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#e8f1ff] px-3 py-1 text-lg font-medium">{highlight}</span>}
    </h2>
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${className}`}>
    {children}
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#050505]">
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <header className="flex flex-wrap items-center justify-between gap-4 py-8">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span role="img" aria-label="letters" className="text-2xl">✉️</span>
            Letters
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#4c5563]">
            {navLinks.map((link) => (
              <a key={link} href="#" className="transition hover:text-[#050505]">
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <button className="rounded-full px-5 py-2 text-[#050505] transition hover:bg-white">Login</button>
            <button className="rounded-full bg-[#050505] px-6 py-2 text-white shadow-lg">Sign up</button>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[48px] bg-[#bcdff7] px-6 py-20 text-white">
          <StaticSky className="absolute inset-0 h-full w-full" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Use cases — Features — Pricing — Our doctors</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">Patients, not paperwork</h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80">
              Write letters instantly that sound like you. Enjoy unlimited, gold-standard transcriptions. Save 5+ hours weekly on paperwork.
            </p>
            <button className="mt-8 rounded-full bg-white px-8 py-3 text-base font-semibold text-[#050505] shadow-lg">
              Sign up for free
            </button>

            <div className="mt-16 w-full max-w-3xl rounded-[36px] bg-white/95 p-8 text-left text-[#050505] shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm font-semibold">
                <span className="rounded-full bg-[#f5f6fb] px-4 py-1">Before</span>
                <span className="rounded-full bg-[#050505] px-4 py-1 text-white">After</span>
              </div>
              <div className="mt-6 grid gap-6 text-sm text-[#4c5563] sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f4f7fb] p-5">
                  <p>Dictate for 20 minutes. Transcribe manually. Tidy up formatting. Double check for typos.</p>
                </div>
                <div className="rounded-2xl bg-[#e9f3ff] p-5">
                  <p>
                    Upload the dictation, attach documents, and review your letter in minutes. Sign, send, done.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 space-y-10">
          <SectionHeading eyebrow="Save hours a week" title="Save hours a week with Letters" />
          <div className="grid gap-6 md:grid-cols-2">
            {saveTimeCards.map((card) => (
              <Card key={card.title} className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-[#7f8794]">
                  <span className="rounded-full bg-[#f4f5f7] px-3 py-1 text-[#050505]">{card.title}</span>
                  {card.pill}
                </div>
                <h3 className="text-2xl font-semibold">{card.subtitle}</h3>
                <p className="text-[#4c5563]">{card.description}</p>
                <div className="mt-8 h-48 rounded-3xl bg-[#dfeefd]"></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <SectionHeading title="How Letters works" highlight="Letters" />
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-[#050505] px-6 py-2 text-sm font-semibold text-white">Letters</button>
            <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#4c5563] shadow">Transcribe</button>
          </div>
          <div className="mt-10 overflow-hidden rounded-[40px] bg-[#bcdff7] p-1">
            <div className="relative rounded-[38px] bg-[#bcdff7] px-8 py-12 text-white">
              <StaticSky className="absolute inset-0 h-full w-full" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em]">
                  Letters
                </div>
                <h3 className="mt-6 text-4xl font-semibold">Welcome to Letters</h3>
                <p className="mt-4 max-w-2xl text-lg text-white/80">
                  Capture everything from dictations to consult notes. Upload sources, personalise templates, and let Letters do the heavy lifting.
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="rounded-3xl bg-white/20 p-5">
                      <p className="text-sm font-semibold text-white/80">Step {step}</p>
                      <div className="mt-3 h-24 rounded-2xl bg-white/30"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 space-y-8">
          <SectionHeading title="Writing letters has never been easier" highlight="Letters" />
          <div className="grid gap-6 md:grid-cols-2">
            {writingCards.map((card) => (
              <Card key={card.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7f8794]">{card.accent}</p>
                <h3 className="mt-3 text-2xl font-semibold">{card.title}</h3>
                <p className="mt-4 text-[#4c5563]">{card.description}</p>
                <div className="mt-8 h-48 rounded-3xl bg-[#f2f5fb]"></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-28 rounded-[48px] bg-gradient-to-b from-white to-[#f0f4fb] p-10 text-center">
          <h3 className="text-3xl font-semibold">Gold-Standard Transcriptions</h3>
          <p className="mt-4 text-lg text-[#4c5563]">
            Extensive medical vocabulary & custom dictionary to supercharge transcription accuracy.
          </p>
          <div className="mt-10 h-64 rounded-[36px] bg-[#e3ecfa]"></div>
        </section>

        <section className="mt-28">
          <SectionHeading title="Supercharge your practice with Letters" highlight="Letters" />
          <div className="grid gap-6 md:grid-cols-3">
            {practiceSteps.map((step) => (
              <Card key={step.number} className="flex flex-col gap-4">
                <div className="h-12 w-12 rounded-full bg-[#050505] text-center text-xl font-semibold text-white leading-[3rem]">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-[#4c5563]">{step.description}</p>
                <div className="mt-auto h-32 rounded-3xl bg-[#f1f4fb]"></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <SectionHeading title="What our doctors say" highlight="Letters" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <p className="text-lg font-medium text-[#050505]">“{testimonial.quote}”</p>
                <div className="mt-6 text-sm font-semibold text-[#7f8794]">
                  {testimonial.name}
                  <br />
                  <span className="text-[#4c5563]">{testimonial.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <SectionHeading title="Your data is safe" highlight="Letters" />
          <div className="grid gap-6 md:grid-cols-3">
            {securityHighlights.map((item) => (
              <Card key={item.title}>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-[#4c5563]">{item.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#050505] text-4xl text-white">🔒</div>
          </div>
        </section>

        <section className="mt-28 overflow-hidden rounded-[48px] bg-[#bcdff7] px-8 py-16 text-white">
          <StaticSky className="absolute inset-0 hidden md:block" />
          <div className="relative z-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Annual — 16.7% • Monthly</p>
            <h3 className="mt-4 text-4xl font-semibold">Flexible pricing</h3>
            <p className="mt-3 text-lg text-white/80">Pick the plan that fits your workflow.</p>
          </div>
          <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[32px] bg-white/90 p-8 text-left text-[#050505] ${
                  plan.highlighted ? 'shadow-[0_30px_80px_rgba(15,23,42,0.2)]' : 'shadow-[0_20px_50px_rgba(15,23,42,0.1)]'
                }`}
              >
                <div className="flex items-center justify-between text-sm font-semibold text-[#7f8794]">
                  {plan.name}
                  {plan.badge && <span className="rounded-full bg-[#e8f1ff] px-3 py-1 text-[#050505]">{plan.badge}</span>}
                </div>
                <p className="mt-4 text-3xl font-semibold">{plan.price}</p>
                <p className="mt-2 text-sm text-[#4c5563]">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-[#050505]">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className="text-lg">•</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full rounded-full bg-[#050505] px-4 py-3 text-sm font-semibold text-white">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-28 text-center">
          <SectionHeading title="Letters works seamlessly across all your devices" />
          <p className="mx-auto max-w-3xl text-lg text-[#4c5563]">
            Whether you’re on web, iPad, or iOS — start on one device, pick up on another. Your letters and transcriptions sync instantly, so you are always up to date.
          </p>
          <button className="mt-8 rounded-full bg-[#050505] px-8 py-3 text-base font-semibold text-white shadow-lg">
            Sign up for free
          </button>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {devices.map((device) => (
              <Card key={device.title}>
                <div className="h-52 rounded-[32px] bg-[#f0f4fb]"></div>
                <h3 className="mt-6 text-xl font-semibold">{device.title}</h3>
                <p className="mt-2 text-[#4c5563]">{device.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
