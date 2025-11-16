import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

const navLinks = ['Use cases', 'Features', 'Pricing', 'Our doctors'];

const highlightCards = [
  {
    id: 'letters',
    badge: 'Letters',
    title: 'Instantly generate personalised medical letters',
    description: 'Upload past letters, consultations or just start typing — Letters adapts to your style in seconds.',
    actions: ['Upload past letters', 'Upload consultations recordings', 'Type it'],
    accent: '📄',
  },
  {
    id: 'transcribe',
    badge: 'Transcribe',
    title: 'Transcribe dictations, consultations & telehealth',
    description: 'Save every detail with gold-standard, AI-assisted transcripts built for clinicians.',
    actions: ['Upload patient letters', 'Choose documents', 'Assistant'],
    accent: '🩺',
  },
];

const writingCards = [
  {
    title: 'Generate personalised letters that sound like you',
    description: 'We learn your style based on your past letters, and create a template that sounds exactly like you.',
    badge: 'Upload to train Letters',
    placeholder: 'Signature template',
  },
  {
    title: 'Upload any source to create your letter',
    description: 'Add text, upload files or scans, consultations, telehealth visits — we will turn information into a draft.',
    badge: 'Add multiple sources',
    placeholder: 'Add Sources',
  },
];

const practiceSteps = [
  {
    step: '1',
    title: 'Invite your practice to Letters',
    description: 'Easily get started by inviting your team — including doctors, allied health professionals, and administrative staff.',
  },
  {
    step: '2',
    title: 'Seamlessly onboard your practice',
    description: 'Our intuitive platform means your practice is up and running fast, supported by helpful tooltips and clear states.',
  },
  {
    step: '3',
    title: "See your team’s impact",
    description: 'Letters keeps your clinicians focused on patients. Track results with simple metrics and admin savings.',
  },
];

const testimonials = [
  {
    name: 'Dr. Ram Kishanani',
    role: 'The Carlyle Dentists',
    quote: 'The ease of use, the instant draft and the outstanding support make Letters indispensable.',
  },
  {
    name: 'Grace MacPherson',
    role: 'Operations Lead',
    quote: 'We have seen a significant reduction in report turnaround times and admin costs.',
  },
  {
    name: 'Dr. David Lanz',
    role: 'Clinical Director',
    quote: 'It picks up every detail. If the dictation is messy, it still helps me to finalise things on time.',
  },
];

const securityHighlights = [
  {
    title: 'Secure with bank-grade protection',
    description: 'Letters complies with Australian privacy regulations, including the Australian Privacy Act 1988.',
  },
  {
    title: 'Your data never leaves Australia',
    description: 'Your data is processed and stored exclusively on secure servers located in Sydney.',
  },
  {
    title: 'Recordings & files are never stored',
    description: 'We delete audio & files instantly once processed, so your information stays in your control.',
  },
];

const pricingPlans = [
  {
    name: 'Letters Basic',
    price: 'Free',
    description: 'For sole use with light needs.',
    items: ['4 letters / day', '3 transcriptions / day', '1 personalised template'],
    cta: 'Start for Free',
    featured: false,
  },
  {
    name: 'Letters Pro',
    price: '$66/mo',
    description: 'For busy doctors & growing practices.',
    items: ['Unlimited letters', 'Unlimited transcriptions', 'Consultations Assistant', 'Practices: $660/mo up to 10'],
    cta: 'Start a 2-Week Trial',
    featured: true,
  },
  {
    name: 'Letters Enterprise',
    price: 'Flexible',
    description: 'For practices, clinics and beyond.',
    items: ['Dedicated support', 'Discounted pricing', 'Practice enablement', 'Custom deployment options'],
    cta: 'Talk to Sales',
    featured: false,
  },
];

const devicePreviews = [
  {
    title: 'Dictate',
    description: 'Capture audio notes anywhere.',
  },
  {
    title: 'Transcribe',
    description: 'Turn speech into structured notes.',
  },
  {
    title: 'Letters',
    description: 'Review, edit and send instantly.',
  },
];

const HeroBadge = ({ label, value }) => (
  <div className="rounded-full bg-[var(--white)]/70 px-4 py-2 text-sm font-medium text-[var(--slate)]">
    <span className="mr-2 text-base">{label}</span>
    <span className="font-semibold text-[var(--rich-ink)]">{value}</span>
  </div>
);

const SkyScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: '#CDE8FF', side: THREE.BackSide });
    const skyDome = new THREE.Mesh(geometry, material);
    scene.add(skyDome);

    const ambient = new THREE.AmbientLight('#FFFFFF', 0.6);
    scene.add(ambient);

    renderer.render(scene, camera);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
};

function App() {
  return (
    <div className="bg-[var(--cloud)] text-[var(--ink)] font-inter">
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 hero-overlay" aria-hidden="true" />
        <SkyScene />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-8">
          <header className="flex flex-wrap items-center justify-between gap-4 py-4 text-sm font-medium text-[var(--slate)]">
            <div className="flex items-center gap-2 text-[var(--ink)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--white)] text-lg font-semibold text-[var(--accent)] shadow-lg">
                L
              </div>
              <span className="text-base font-semibold text-[var(--ink)]">Letters</span>
            </div>
            <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
              {navLinks.map((item) => (
                <button key={item} className="text-sm text-[var(--slate)] transition hover:text-[var(--ink)]">
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3 text-[var(--ink)]">
              <button className="font-semibold">Login</button>
              <button className="rounded-full bg-[var(--ink)] px-5 py-2 text-[var(--white)] font-semibold">
                Sign up
              </button>
            </div>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">Use cases</p>
            <h1 className="text-4xl font-semibold text-[var(--rich-ink)] md:text-6xl">Patients, not paperwork</h1>
            <p className="max-w-3xl text-lg text-[var(--slate)]">
              Write letters instantly that sound like you. Enjoy unlimited, gold-standard transcriptions and save 5+ hours weekly on paperwork.
            </p>
            <button className="rounded-full bg-[var(--rich-ink)] px-8 py-3 text-lg font-semibold text-[var(--white)]">
              Sign up for free
            </button>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <HeroBadge label="Before" value="Dictate for 20 mins" />
              <HeroBadge label="After" value="2 mins to finalise" />
            </div>
          </div>

          <div className="mt-10 rounded-[32px] bg-[var(--white)] p-8 card-shadow">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[var(--soft-gray)] p-6">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-gray)] px-4 py-1 text-xs font-semibold uppercase text-[var(--slate)]">
                  Before
                </p>
                <p className="text-[var(--slate)]">
                  Dictate for 20 minutes. The patient is leaving and you still have to re-type everything.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--soft-gray)] bg-[var(--pale-blue)]/60 p-6">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--white)] px-4 py-1 text-xs font-semibold uppercase text-[var(--slate)]">
                  After
                </p>
                <p className="text-[var(--slate)]">
                  Dictate for 2 minutes. The draft pops up while you consult, ready to review and send.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="space-y-24 py-24">
        <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">Letters</p>
            <h2 className="section-heading text-3xl font-semibold md:text-5xl">Save hours a week with Letters</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {highlightCards.map((card) => (
              <div key={card.id} className="soft-card-shadow rounded-[36px] bg-[var(--white)] p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--soft-gray)] px-4 py-2 text-sm font-semibold text-[var(--slate)]">
                  {card.accent} {card.badge}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--rich-ink)]">{card.title}</h3>
                <p className="mt-4 text-[var(--slate)]">{card.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {card.actions.map((action) => (
                    <span key={action} className="rounded-full bg-[var(--pale-blue)] px-4 py-2 text-sm font-semibold text-[var(--slate)]">
                      {action}
                    </span>
                  ))}
                </div>
                <button className="mt-8 text-[var(--ink)] underline-offset-4 hover:underline">About {card.badge}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Workflow</p>
            <h2 className="section-heading text-3xl font-semibold md:text-5xl">How Letters works</h2>
          </div>
          <div className="pill-toggle mx-auto flex max-w-md gap-3 rounded-full bg-[var(--soft-gray)] p-2">
            <button className="w-1/2 rounded-full bg-[var(--white)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">Letters</button>
            <button className="w-1/2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--slate)]">Transcribe</button>
          </div>
          <div className="mockup-panel card-shadow rounded-[40px] p-8">
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-semibold text-[var(--rich-ink)]">Welcome to Letters</h3>
                <p className="text-[var(--slate)]">
                  Toggle between Letters and Transcribe to see how your workflow adapts. The blue panel represents the clean UI that keeps you focused.
                </p>
                <button className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--white)]">
                  Dejar de seleccionar
                </button>
              </div>
              <div className="flex-1 rounded-[32px] bg-[var(--pale-blue)]/60 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--slate)]">Letters</p>
                <h4 className="mt-6 text-2xl font-semibold text-[var(--rich-ink)]">Welcome To</h4>
                <div className="mt-8 h-48 rounded-[28px] bg-[var(--white)]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Drafts</p>
            <h2 className="section-heading text-3xl font-semibold md:text-5xl">Writing letters has never been easier</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {writingCards.map((card) => (
              <div key={card.title} className="soft-card-shadow rounded-[36px] bg-[var(--white)] p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-gray)] px-4 py-2 text-sm font-semibold text-[var(--slate)]">
                  {card.badge}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--rich-ink)]">{card.title}</h3>
                <p className="mt-4 text-[var(--slate)]">{card.description}</p>
                <div className="mt-8 h-40 rounded-[28px] bg-[var(--pale-blue)]/70"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Transcriptions</p>
          <h2 className="section-heading text-3xl font-semibold md:text-5xl">Gold-Standard Transcriptions</h2>
          <p className="mx-auto max-w-3xl text-[var(--slate)]">
            Extensive medical vocabulary & a custom dictionary supercharge transcription accuracy.
          </p>
          <div className="card-shadow mt-4 rounded-[40px] bg-[var(--white)] p-10">
            <div className="mx-auto h-72 max-w-3xl rounded-[32px] bg-[var(--pale-blue)]/60"></div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Onboarding</p>
            <h2 className="section-heading text-3xl font-semibold md:text-5xl">Supercharge your practice with Letters</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {practiceSteps.map((step) => (
              <div key={step.step} className="soft-card-shadow rounded-[36px] bg-[var(--white)] p-8 text-left">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--pale-blue)] text-2xl font-semibold text-[var(--ink)]">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--rich-ink)]">{step.title}</h3>
                <p className="mt-4 text-[var(--slate)]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Testimonials</p>
            <h2 className="section-heading text-3xl font-semibold md:text-5xl">Trusted by modern practices</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="testimonial-card soft-card-shadow rounded-[32px] p-8 text-left">
                <p className="text-[var(--slate)]">“{testimonial.quote}”</p>
                <div className="mt-6">
                  <p className="text-lg font-semibold text-[var(--rich-ink)]">{testimonial.name}</p>
                  <p className="text-sm text-[var(--slate)]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Security</p>
            <h2 className="section-heading text-3xl font-semibold md:text-5xl">Your data is safe</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {securityHighlights.map((item) => (
              <div key={item.title} className="soft-card-shadow rounded-[32px] bg-[var(--white)] p-8">
                <h3 className="text-xl font-semibold text-[var(--rich-ink)]">{item.title}</h3>
                <p className="mt-4 text-[var(--slate)]">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full padlock-circle">
            <div className="h-24 w-20 rounded-3xl bg-[var(--ink)]"></div>
          </div>
        </section>

        <section className="hero-gradient py-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Pricing</p>
              <h2 className="section-heading text-3xl font-semibold md:text-5xl">Flexible pricing</h2>
              <div className="mt-4 inline-flex rounded-full bg-[var(--white)] px-2 py-1 text-sm font-semibold text-[var(--slate)]">
                <button className="rounded-full bg-[var(--ink)] px-4 py-1 text-[var(--white)]">Annual -16.7%</button>
                <button className="rounded-full px-4 py-1 text-[var(--slate)]">Monthly</button>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`soft-card-shadow rounded-[36px] p-8 ${
                    plan.featured ? 'bg-[var(--white)] border border-[var(--ink)]' : 'bg-[var(--white)]'
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">{plan.name}</p>
                  <h3 className="mt-4 text-4xl font-semibold text-[var(--rich-ink)]">{plan.price}</h3>
                  <p className="mt-2 text-[var(--slate)]">{plan.description}</p>
                  <ul className="mt-6 space-y-3 text-[var(--slate)]">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-8 w-full rounded-full border border-[var(--ink)] px-4 py-3 text-sm font-semibold ${
                      plan.featured ? 'bg-[var(--ink)] text-[var(--white)]' : 'text-[var(--ink)]'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--slate)]">Devices</p>
          <h2 className="section-heading text-3xl font-semibold md:text-5xl">Letters works seamlessly across all your devices</h2>
          <p className="mx-auto max-w-3xl text-[var(--slate)]">
            Whether you’re on web, iPad, or iOS — start on one device, pick up on another. Your letters and transcriptions sync instantly.
          </p>
          <button className="mx-auto rounded-full bg-[var(--rich-ink)] px-8 py-3 text-lg font-semibold text-[var(--white)]">
            Sign up for free
          </button>
          <div className="grid gap-8 md:grid-cols-3">
            {devicePreviews.map((device) => (
              <div key={device.title} className="soft-card-shadow rounded-[32px] bg-[var(--white)] p-8">
                <div className="mx-auto mb-6 h-48 w-full rounded-[28px] bg-[var(--pale-blue)]/70"></div>
                <h3 className="text-xl font-semibold text-[var(--rich-ink)]">{device.title}</h3>
                <p className="mt-2 text-[var(--slate)]">{device.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
