import SkyBackdrop from './components/SkyBackdrop';
import './App.css';

const navLinks = ['Use cases', 'Features', 'Pricing', 'Our doctors'];

const featureCards = [
  {
    id: 'letters',
    title: 'Letters',
    subtitle: 'Instantly generate personalised medical letters',
    description: 'Upload patient letters. Upload consultations recordings. Choose documents.',
    footer: 'Type 1',
  },
  {
    id: 'transcribe',
    title: 'Transcribe',
    subtitle: 'Transcribe dictations, consultations & telehealth',
    description: 'The patient has been taking Amoxicillin 500mg BID and using Nasocort.',
    footer: 'About Transcribe',
  },
];

const writingCards = [
  {
    title: 'Upload to train Letters',
    description: 'Generate personalised letters that sound like you',
    points: [
      'We learn your style based on your past letters.',
      'Create a template that sounds exactly like you.',
    ],
  },
  {
    title: 'Add multiple sources',
    description: 'Upload any source to create your letter',
    points: [
      'Add text, upload files or scans, consultations recordings.',
      'We turn it all into a polished letter instantly.',
    ],
  },
];

const practiceSteps = [
  {
    step: '1',
    title: 'Invite your practice to Letters',
    description:
      'Easily get started by inviting your team – including doctors, allied health professionals, and administrative staff.',
  },
  {
    step: '2',
    title: 'Seamlessly onboard your practice',
    description:
      'Onboarding is quick and effortless. Our intuitive platform means your practice can be up and running fast.',
  },
  {
    step: '3',
    title: "See your team's impact",
    description:
      "Letters keeps your momentum going. Track letters & assign new tasks. Monitor usage in real time.",
  },
];

const testimonials = [
  {
    name: 'Dr. Ram Nisharani',
    role: 'The Cardiology Dentists',
    quote:
      'We set up Letters in our surgery for all our dentists – we have 5 surgeries and the doctors love it. Highly recommend Letters and give up inbox!'
  },
  {
    name: 'Grace McPherson',
    role: 'Practice Manager',
    quote:
      'As a Practice Manager of 4 specialist clinics, Letters has transformed the way our doctors maintain accuracy of patient letters.'
  },
  {
    name: 'Dr. David Lenz',
    role: 'Orthopaedic Surgeon',
    quote:
      "We can now go into the next consultation feeling confident that Letters has captured the story. It's miles ahead."
  },
];

const securityHighlights = [
  {
    title: 'Secure with bank-grade protection',
    description: 'Letters complies with Australian privacy regulations, including the Australian Privacy Act 1988.',
  },
  {
    title: 'Your data never leaves Australia',
    description: 'We store all Letters servers in Sydney. All data is processed on secure servers located locally.',
  },
  {
    title: 'Recordings & files are never stored',
    description: 'Your conversations are private to you. We delete audio & files instantly once processed.',
  },
];

const pricingPlans = [
  {
    title: 'Letters Basic',
    price: 'Free',
    description: 'For solo use with light needs.',
    bullets: ['1 letter / day', '3 transcriptions / day', '1 personalised template'],
    cta: 'Start for Free',
  },
  {
    title: 'Letters Pro',
    price: '$66/mo',
    description: 'For busy doctors & growing practices.',
    bullets: ['Unlimited letters', 'Consultations', 'Assistant', 'Patients: $60/mo per patient'],
    cta: 'Start 2-Week Trial',
    highlight: 'Save $150',
  },
  {
    title: 'Letters Enterprise',
    price: 'Flexible',
    description: 'For practices, clinics and beyond.',
    bullets: ['Dedicated pricing', 'Custom security', 'Deployment options'],
    cta: 'Book a call',
  },
];

const deviceCards = [
  {
    title: 'Mobile dictation',
    description: 'Record on your phone and send it straight to Letters.',
  },
  {
    title: 'Transcribe app',
    description: 'Turn spoken notes into accurate transcripts in seconds.',
  },
  {
    title: 'Desktop workspace',
    description: 'Review, edit and sign off letters on any computer.',
  },
];

const workflowTabs = ['Letters', 'Transcribe'];

const SectionHeading = ({ kicker, title, highlight, description }) => (
  <div className="text-center max-w-3xl mx-auto mb-12">
    {kicker && <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c7c7c] mb-4">{kicker}</p>}
    <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-[#111]">
      {title} {highlight && <span className="inline-flex items-center justify-center rounded-2xl bg-[#eff3ff] px-3 py-1 text-base md:text-3xl ml-2">{highlight}</span>}
    </h2>
    {description && <p className="text-lg text-[#5d5d5d] mt-6">{description}</p>}
  </div>
);

const PlaceholderCard = ({ label }) => (
  <div className="rounded-[32px] bg-white/70 backdrop-blur-sm border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.15)] p-6 w-full max-w-md">
    <div className="text-xs uppercase tracking-[0.2em] text-[#7f8da5]">{label}</div>
    <div className="mt-4 h-24 rounded-2xl bg-gradient-to-r from-[#fefefe] to-[#f4f6ff]" />
  </div>
);

function App() {
  return (
    <div className="bg-[#f8f8f8] text-[#050505]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SkyBackdrop topColor="#d8ecff" bottomColor="#7ca8de" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#dff0ff]/60 via-transparent to-[#eef6ff]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-8 pb-24">
          <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm font-medium text-white/90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <div className="h-10 w-10 rounded-2xl bg-white/15 backdrop-blur text-lg font-semibold flex items-center justify-center">L</div>
                <span className="text-lg font-semibold tracking-tight">Letters</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              {navLinks.map((link) => (
                <a key={link} className="hover:text-white transition-colors" href="#">{link}</a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="text-white/80 font-medium">Login</button>
              <button className="px-4 py-2 rounded-full bg-white text-[#050505] font-semibold shadow-lg">Sign up</button>
            </div>
          </nav>

          <div className="mt-16 text-center text-white">
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">Use cases · Features · Pricing · Our doctors</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mt-6">Patients, not paperwork</h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Write letters instantly that sound like you. Enjoy unlimited, gold-standard transcriptions. Save 5+ hours weekly on paperwork.
            </p>
            <button className="mt-10 inline-flex items-center justify-center px-8 py-3 rounded-full bg-black text-white text-lg font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
              Sign up for free
            </button>
          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <PlaceholderCard label="Before" />
              <PlaceholderCard label="After" />
            </div>
            <div className="w-full max-w-4xl rounded-[40px] bg-white/70 backdrop-blur border border-white/60 shadow-[0_25px_90px_rgba(15,23,42,0.25)] p-10">
              <p className="text-center text-lg text-[#2f3547]">"This is a letter for Jimmy. Thank you for seeing Jimmy in our clinic..."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c7c7c]">Letters</p>
            <h2 className="text-3xl md:text-5xl font-semibold mt-4">Save 🕒 hours a week with Letters</h2>
          </div>
          <button className="self-start md:self-auto px-5 py-2 rounded-full border border-[#d8d8d8] font-medium text-[#050505] bg-white">About Letters</button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {featureCards.map((card) => (
            <div key={card.id} className="rounded-[36px] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)] p-8">
              <div className="flex items-center gap-3 text-sm font-medium text-[#7c7c7c]">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f6ff] text-[#4b63ff]">{card.title.charAt(0)}</span>
                <span>{card.title}</span>
              </div>
              <h3 className="text-2xl font-semibold mt-6">{card.subtitle}</h3>
              <p className="mt-4 text-[#5d5d5d] leading-relaxed">{card.description}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#050505]">
                <span>{card.footer}</span>
                <span aria-hidden>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <SectionHeading
          title="How"
          highlight="Letters"
          description="Hover to see letters"
        />
        <div className="flex justify-center gap-3 mb-10">
          {workflowTabs.map((tab, idx) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-full text-sm font-semibold ${idx === 0 ? 'bg-black text-white' : 'bg-white text-[#5d5d5d] border border-[#ebebeb]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="rounded-[36px] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)] p-8">
          <div className="rounded-[32px] border border-dashed border-[#cfd6e6] bg-gradient-to-b from-[#dff0ff] to-[#f7fbff] h-[420px] flex items-center justify-center text-2xl text-[#7c8ba7]">
            Welcome to Letters
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <SectionHeading
          title="Writing"
          highlight="letters"
          description="Generate personalised letters in seconds"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {writingCards.map((card) => (
            <div key={card.title} className="rounded-[36px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.1)] p-8">
              <h3 className="text-2xl font-semibold">{card.title}</h3>
              <p className="mt-4 text-[#5d5d5d]">{card.description}</p>
              <ul className="mt-6 space-y-3 text-[#050505]">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="text-[#4b63ff] text-lg">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="rounded-[48px] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.1)] p-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c7c7c]">Gold-Standard Transcriptions</p>
          <h3 className="mt-6 text-4xl font-semibold">Extensive medical vocabulary & custom dictionary to supercharge transcription accuracy.</h3>
          <div className="mt-10 h-64 rounded-[32px] bg-gradient-to-b from-[#ffffff] to-[#edf2ff] border border-[#edf0fb]" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <SectionHeading
          title="Supercharge your Practice"
          highlight="⚡"
          description="Three simple steps to get Letters running across your practice"
        />
        <div className="grid gap-10 lg:grid-cols-3">
          {practiceSteps.map((step) => (
            <div key={step.step} className="rounded-[36px] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)] p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-[#eff3ff] text-[#4b63ff] font-semibold flex items-center justify-center text-xl">{step.step}</div>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="text-[#5d5d5d] flex-1">{step.description}</p>
              <div className="h-32 rounded-3xl bg-[#f5f7fb] border border-dashed border-[#d7dbe8]" />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <SectionHeading
          title="Trusted by doctors"
          highlight="🩺"
          description="Letters keeps up with busy teams across clinics"
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-[36px] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)] p-8 flex flex-col">
              <p className="text-lg leading-relaxed text-[#2f3547] flex-1">“{testimonial.quote}”</p>
              <div className="mt-8">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-[#7c7c7c]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <SectionHeading
          title="Your data is safe"
          highlight="🔒"
          description="Security designed for healthcare teams"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {securityHighlights.map((item) => (
            <div key={item.title} className="rounded-[32px] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)] p-8">
              <div className="h-16 w-16 rounded-full bg-[#eff3ff] flex items-center justify-center text-2xl mb-6">🔐</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-[#5d5d5d]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SkyBackdrop topColor="#dfefff" bottomColor="#87b1e8" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center text-[#050505]">
          <SectionHeading
            title="Flexible pricing"
            description="Choose the plan that fits your practice"
          />
          <div className="flex flex-col md:flex-row gap-8 mt-12">
            {pricingPlans.map((plan) => (
              <div key={plan.title} className={`flex-1 rounded-[36px] bg-white/90 backdrop-blur border border-white/70 p-8 text-left shadow-[0_25px_80px_rgba(15,23,42,0.12)] ${plan.highlight ? 'ring-2 ring-[#4b63ff]' : ''}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{plan.title}</h3>
                  {plan.highlight && (
                    <span className="text-sm font-semibold text-[#4b63ff] bg-[#eef1ff] px-3 py-1 rounded-full">{plan.highlight}</span>
                  )}
                </div>
                <p className="mt-2 text-3xl font-semibold">{plan.price}</p>
                <p className="mt-2 text-[#5d5d5d]">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-[#050505]">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <span className="text-[#4b63ff]">✔</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full rounded-full bg-black text-white py-3 font-semibold">{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <SectionHeading
          title="Letters works seamlessly across"
          highlight="all your devices"
          description="Whether you're on web, iPad, or iOS – start on one device, pick up on another."
        />
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mt-12">
          {deviceCards.map((device) => (
            <div key={device.title} className="flex-1 rounded-[36px] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)] p-8 text-center">
              <div className="mx-auto h-48 w-full max-w-xs rounded-[32px] bg-[#f4f6fb] border border-dashed border-[#d8dceb]" />
              <h3 className="mt-6 text-xl font-semibold">{device.title}</h3>
              <p className="mt-2 text-[#5d5d5d]">{device.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-black text-white text-lg font-semibold">
            Sign up for free
          </button>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 text-center text-sm text-[#7c7c7c]">
        © {new Date().getFullYear()} Letters. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
