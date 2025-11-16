import { useMemo, useState } from 'react';
import SkyStars from './components/SkyStars';

const navLinks = ['Use cases', 'Features', 'Pricing', 'Our doctors'];

const saveCards = [
  {
    title: 'Letters',
    subtitle: 'Instantly generate personalised medical letters',
    description:
      'Upload patient letters, consultations or prompts and choose the exact document you need in seconds.',
    actions: ['Upload past letters', 'Choose documents', 'Type it in'],
    accent: '#f8f2ff',
  },
  {
    title: 'Transcribe',
    subtitle: 'Transcribe dictations, consultations & telehealth',
    description:
      'Turn minutes into text with clinically accurate transcriptions that fit straight into your workflow.',
    actions: ['Upload consultations', 'Choose audio', 'Drop recordings'],
    accent: '#eef8ff',
  },
];

const workflowTabs = {
  letters: {
    title: 'Letters',
    description: 'Personalise every letter with templates that learn from your style.',
    steps: [
      'Select a tone that mirrors your past letters.',
      'Drop in prompts, dictations or forms to prefill.',
      'Generate a gold-standard draft ready for sign-off.',
    ],
  },
  transcribe: {
    title: 'Transcribe',
    description: 'Upload any recording for fast, accurate transcripts.',
    steps: [
      'Choose the appointment, consult or meeting file.',
      'Our dictionary catches every speciality-specific detail.',
      'Export straight into your clinical system.',
    ],
  },
};

const writingCards = [
  {
    title: 'Generate personalised letters that sound like you',
    description:
      'Let us learn your style based on past letters and create a template that sounds exactly like you.',
    accent: '#f3f5ff',
  },
  {
    title: 'Upload any source to create your letter',
    description:
      'Add text, upload files or scans, consultations, recordings — we will turn it all into a refined letter.',
    accent: '#fff8f0',
  },
];

const practiceSteps = [
  {
    title: 'Invite your practice to Letters',
    description:
      'Easily get started by inviting your team — including doctors, allied health professionals and admin staff.',
  },
  {
    title: 'Seamlessly onboard your practice',
    description:
      'Our intuitive platform means your practice is up and running in days, helped by helpful scripts and clear actions.',
  },
  {
    title: "See your team's impact",
    description:
      'Letters keeps your clinicians focused while dashboards show the time saved by each person, week after week.',
  },
];

const testimonials = [
  {
    name: 'Dr. Ram Neshwani',
    role: 'The Cardiology Dentists',
    quote:
      'We set up Letters in our surgery for all our dentists — we have 5 surgeries and the difference is huge. The support is like nothing else, highly recommend Letters.',
  },
  {
    name: 'Grace MacPherson',
    role: 'Practice Manager',
    quote:
      'As a Practice Manager, Letters has transformed the way our doctors maintain accuracy of patient files. The reduction in admin time has been immediate.',
  },
  {
    name: 'Dr. David Lenz',
    role: 'Oral Health Surgeon',
    quote:
      'It picks up every detail. It is so quick that I use it daily, even for missed dictations and follow ups.',
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
    description: 'We delete audio & files instantly once processed. Your conversations remain private forever.',
  },
];

const pricingPlans = [
  {
    name: 'Letters Basic',
    price: 'Free',
    description: 'For solo use with light needs.',
    features: ['Unlimited letters', '3/day transcriptions', '1 personalised template'],
    cta: 'Start for Free',
  },
  {
    name: 'Letters Pro',
    price: '$66/mo',
    description: 'For busy doctors & growing practices.',
    features: ['Unlimited letters', 'Consultations', 'Assistant', 'Practice tools'],
    cta: 'Start a 2-Week Trial',
  },
  {
    name: 'Letters Enterprise',
    price: 'Flexible',
    description: 'For practices, clinics and beyond.',
    features: ['Custom pricing', 'Dedicated support', 'Deployment options'],
    cta: 'Contact Sales',
  },
];

const deviceCards = [
  {
    title: 'iPhone & Android',
    description: 'Dictate from your phone anywhere and the transcript appears instantly on desktop.',
  },
  {
    title: 'Web App',
    description: 'Craft letters, edit transcripts and collaborate with your team in real time.',
  },
  {
    title: 'Tablet ready',
    description: 'Pick up on iPad to sign off documents with the same clean workspace.',
  },
];

const SectionWrapper = ({ children, className = '' }) => (
  <section className={`py-20 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

function App() {
  const [activeWorkflow, setActiveWorkflow] = useState('letters');
  const [billingCycle, setBillingCycle] = useState('annual');

  const workflowContent = workflowTabs[activeWorkflow];
  const billingTag = useMemo(
    () => (billingCycle === 'annual' ? 'Save 18%/yr' : 'Pay monthly'),
    [billingCycle],
  );

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900 font-inter">
      <section className="relative overflow-hidden rounded-b-[56px] bg-gradient-to-b from-[#9ec4ff] via-[#cfe1ff] to-[#f8fbff] pb-32">
        <div className="absolute inset-0 opacity-80">
          <SkyStars />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <header className="flex items-center justify-between py-8">
            <div className="flex items-center space-x-2">
              <div className="h-9 w-9 rounded-2xl bg-white/80 flex items-center justify-center text-xl font-semibold text-blue-500">
                L
              </div>
              <span className="text-lg font-semibold text-slate-900">Letters</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-800">
              {navLinks.map((link) => (
                <button type="button" key={link} className="hover:text-blue-700 transition-colors">
                  {link}
                </button>
              ))}
            </nav>
            <div className="flex items-center space-x-4 text-sm font-semibold">
              <button type="button" className="text-slate-800">Login</button>
              <button type="button" className="rounded-full bg-slate-900 px-5 py-2 text-white shadow-lg">Sign up</button>
            </div>
          </header>
          <div className="text-center pt-16">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Use cases</p>
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold text-slate-900">Patients, not paperwork</h1>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto">
              Write letters instantly that sound like you. Enjoy unlimited, gold-standard transcriptions. Save 5+ hours weekly on paperwork.
            </p>
            <button
              type="button"
              className="mt-8 rounded-full bg-slate-900 px-8 py-3 text-white text-sm font-semibold shadow-2xl"
            >
              Sign up for free
            </button>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-3xl rounded-[36px] bg-white/90 shadow-[0_40px_120px_rgba(15,23,42,0.15)] p-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
                    Before
                  </div>
                  <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                    Dictate for 12 minutes. Think about formatting, headings, patient tone and double check spelling while toggling between systems.
                  </p>
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
                    After
                  </div>
                  <p className="mt-4 text-slate-900 font-semibold">
                    Use Letters to create gold-standard letters instantly. Upload dictations, choose your template and we deliver the perfect letter ready to send.
                  </p>
                </div>
              </div>
              <div className="mt-8 h-32 rounded-3xl bg-gradient-to-r from-[#dbeafe] to-[#e0e7ff]" />
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Save more time</p>
          <h2 className="mt-4 text-4xl font-semibold">Save <span className="inline-flex items-center">5
            <span className="ml-2 text-2xl">hours</span>
          </span> a week with Letters</h2>
          <p className="mt-4 text-lg text-slate-600">Instantly generate personalised medical letters and transcriptions.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {saveCards.map((card) => (
            <div key={card.title} className="rounded-[36px] bg-white p-8 shadow-[0_25px_90px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-500">{card.title}</div>
                <div className="h-10 w-10 rounded-2xl" style={{ backgroundColor: card.accent }} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-900">{card.subtitle}</h3>
              <p className="mt-3 text-slate-600">{card.description}</p>
              <div className="mt-6 space-y-2">
                {card.actions.map((action) => (
                  <div key={action} className="flex items-center space-x-3 text-sm text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-slate-900" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-32 rounded-3xl" style={{ backgroundColor: card.accent }} />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Product tour</p>
          <h2 className="mt-4 text-4xl font-semibold">How <span className="text-blue-600">Letters</span> works</h2>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          {Object.keys(workflowTabs).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setActiveWorkflow(key)}
              className={`rounded-full px-6 py-2 text-sm font-semibold shadow ${
                activeWorkflow === key ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600'
              }`}
            >
              {workflowTabs[key].title}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
          <div>
            <p className="text-lg font-semibold text-slate-900">{workflowContent.title}</p>
            <p className="mt-4 text-slate-600">{workflowContent.description}</p>
            <ul className="mt-6 space-y-4 text-slate-600">
              {workflowContent.steps.map((step) => (
                <li key={step} className="flex items-start space-x-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[40px] bg-gradient-to-b from-[#a5c8ff] via-[#cfe2ff] to-white p-10 shadow-[0_35px_120px_rgba(37,99,235,0.25)]">
            <div className="h-64 rounded-3xl bg-white/80" />
            <div className="mt-6 flex items-center justify-between text-sm text-slate-700">
              <span>Letters Workspace</span>
              <span className="font-semibold">Drag or select →</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Writing</p>
          <h2 className="mt-4 text-4xl font-semibold">Writing <span className="text-blue-600">letters</span> has never been easier</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {writingCards.map((card) => (
            <div key={card.title} className="rounded-[36px] bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
              <h3 className="text-2xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-4 text-slate-600">{card.description}</p>
              <div className="mt-8 h-36 rounded-3xl" style={{ backgroundColor: card.accent }} />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4">
        <div className="rounded-[48px] bg-white p-12 text-center shadow-[0_25px_120px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.5em] text-slate-500">Accuracy</p>
          <h2 className="mt-5 text-4xl font-semibold">Gold-Standard Transcriptions</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Extensive medical vocabulary & a custom dictionary to supercharge transcription accuracy.
          </p>
          <div className="mt-10 h-60 rounded-[40px] bg-gradient-to-b from-white via-[#f1f5ff] to-transparent" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Onboarding</p>
          <h2 className="mt-4 text-4xl font-semibold">Supercharge your Practice with Letters</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {practiceSteps.map((step, index) => (
            <div key={step.title} className="rounded-[32px] bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mb-6">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-slate-600">{step.description}</p>
              <div className="mt-8 h-32 rounded-3xl bg-slate-100" />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-6">
        <div className="rounded-[48px] bg-white/70 p-8 shadow-[0_25px_90px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-[32px] bg-white p-8 flex flex-col justify-between">
                <p className="text-slate-600">{testimonial.quote}</p>
                <div className="mt-8">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Security</p>
          <h2 className="mt-4 text-4xl font-semibold">Your data is safe</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {securityHighlights.map((highlight, index) => (
            <div
              key={highlight.title}
              className={`rounded-[32px] bg-white p-8 text-center shadow-[0_30px_100px_rgba(15,23,42,0.08)] ${
                index === 1 ? 'md:-mt-8 md:mb-8' : ''
              }`}
            >
              <div className="h-20 w-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                {index === 1 ? '🛰️' : index === 2 ? '🔒' : '🛡️'}
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{highlight.title}</h3>
              <p className="mt-3 text-slate-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto rounded-[48px] bg-gradient-to-b from-[#b5d2ff] via-[#dce7ff] to-white p-12 shadow-[0_35px_150px_rgba(59,130,246,0.35)]">
          <div className="text-center text-slate-900">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-600">Pricing</p>
            <h2 className="mt-4 text-4xl font-semibold">Flexible pricing</h2>
            <p className="mt-3 text-slate-700">Pick the plan that matches your practice.</p>
            <div className="mt-6 inline-flex items-center rounded-full bg-white/70 p-1 text-sm font-semibold">
              {['annual', 'monthly'].map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-6 py-2 rounded-full ${
                    billingCycle === cycle ? 'bg-slate-900 text-white shadow' : 'text-slate-600'
                  }`}
                >
                  {cycle === 'annual' ? 'Annual' : 'Monthly'}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.5em] text-slate-600">{billingTag}</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div key={plan.name} className={`rounded-[36px] bg-white p-8 ${index === 1 ? 'shadow-[0_40px_120px_rgba(15,23,42,0.2)]' : 'shadow-[0_25px_90px_rgba(15,23,42,0.12)]'}`}>
                <p className="text-sm font-semibold text-slate-500">{plan.name}</p>
                <p className="mt-4 text-4xl font-semibold">{plan.price}</p>
                <p className="mt-2 text-slate-600">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-slate-900" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`mt-8 w-full rounded-full px-6 py-3 text-sm font-semibold ${
                    index === 1 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Devices</p>
          <h2 className="mt-4 text-4xl font-semibold">Letters works seamlessly across all your devices</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you are on web, iPad or iOS — start on one device, pick up on another. Letters stays perfectly in sync.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {deviceCards.map((card) => (
            <div key={card.title} className="rounded-[32px] bg-white p-8 text-center shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
              <div className="mx-auto h-36 w-full rounded-3xl bg-slate-100" />
              <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button type="button" className="rounded-full bg-slate-900 px-8 py-3 text-white text-sm font-semibold">
            Sign up for free
          </button>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default App;
