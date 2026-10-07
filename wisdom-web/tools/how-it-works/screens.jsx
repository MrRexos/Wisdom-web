/* eslint-disable react/prop-types -- Internal, static screenshot fixtures. */
/* eslint-disable react-refresh/only-export-components -- Standalone rendering entry. */
/* Static HTML ports of the Expo screens. See README.md for source mapping.
 * All fixture data is fictional. This entry never loads the app or its API. */
import { createRoot } from "react-dom/client";
import {
  Search,
  LayoutGrid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Home,
  Calendar,
  MessageSquare,
  BookOpen,
  Briefcase,
  Bell,
  Plus,
  MoreHorizontal,
  MapPin,
  Share,
  Edit3,
  ArrowUp,
  CheckCheck,
  Sparkles,
  Dumbbell,
  PawPrint,
  Paintbrush,
  Laptop,
  GraduationCap,
  Flower2,
  Wrench,
  Navigation,
} from "lucide-react";
import "./screens.css";

const assets = "./assets/";
const screens = [
  "search",
  "choose",
  "reserve",
  "relax",
  "publish",
  "manage",
  "deliver",
  "earn",
];
const cleaning = {
  title: "Home cleaning",
  name: "Emma Wilson",
  image: "cleaning.jpg",
  price: "€22",
  rating: "4.9",
  reviews: 86,
};
const training = {
  title: "Personal training",
  name: "Alex Morgan",
  image: "training.jpg",
  price: "€35",
  rating: "5.0",
  reviews: 42,
};
const photo = (name, className = "", style) => (
  <img src={`${assets}${name}`} className={className} style={style} alt="" />
);
const Icon = ({ as: Component, size = 22, ...props }) => (
  <Component size={size} strokeWidth={1.7} {...props} />
);

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect y="8" width="3" height="4" rx=".7" />
          <rect x="5" y="5.5" width="3" height="6.5" rx=".7" />
          <rect x="10" y="3" width="3" height="9" rx=".7" />
          <rect x="15" width="3" height="12" rx=".7" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 0C4.8 0 2 .9 0 2.8l1.8 1.8a9.6 9.6 0 0 1 12.4 0L16 2.8C14 .9 11.2 0 8 0Zm0 4.2c-2 0-3.8.7-5.2 1.9l1.8 1.8a5.1 5.1 0 0 1 6.8 0l1.8-1.8A8 8 0 0 0 8 4.2ZM8 8.5c-.9 0-1.6.3-2.2.8L8 11.5l2.2-2.2A3.3 3.3 0 0 0 8 8.5Z" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect
            x=".5"
            y=".5"
            width="21"
            height="11"
            rx="3"
            fill="none"
            stroke="currentColor"
            opacity=".4"
          />
          <rect
            x="2"
            y="2"
            width="18"
            height="8"
            rx="1.5"
            fill="currentColor"
          />
          <path d="M23 4v4c2 0 2-4 0-4Z" fill="currentColor" opacity=".5" />
        </svg>
      </div>
    </div>
  );
}

function Frame({ id, children, light = false, nav, pro = false }) {
  return (
    <article
      id={id}
      data-screen={id}
      className={`screen ${light ? "light" : ""}`}
    >
      <StatusBar />
      {children}
      {nav && <TabBar active={nav} pro={pro} />}
      <div className="home-indicator" />
    </article>
  );
}

function TabBar({ active, pro }) {
  const tabs = pro
    ? [
        [BookOpen, "Today"],
        [Calendar, "Calendar"],
        [Briefcase, "Services"],
        [MessageSquare, "Chat"],
        [null, "Settings"],
      ]
    : [
        [Home, "Home"],
        [Heart, "Favorites"],
        [Calendar, "Bookings"],
        [MessageSquare, "Chat"],
        [null, "Settings"],
      ];
  return (
    <nav className="tab-bar">
      {tabs.map(([I, label]) => (
        <div key={label} className={`tab ${label === active ? "active" : ""}`}>
          {I ? (
            <Icon
              as={I}
              size={25}
              fill={label === active ? "currentColor" : "none"}
            />
          ) : (
            photo(pro ? "emma.jpg" : "default-profile.jpg", "tab-avatar")
          )}
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
}

function Header({ title, detail, right, profile = false }) {
  return (
    <header className={`header ${profile ? "profile-header" : ""}`}>
      <div className="header-row">
        <Icon as={ChevronLeft} size={24} />
        <strong>{title}</strong>
        <div className="header-right">{right}</div>
      </div>
      {detail && <p>{detail}</p>}
    </header>
  );
}
const SectionTitle = ({ children }) => (
  <div className="section-title">
    <strong>{children}</strong>
    <span>
      View all <ChevronRight size={14} />
    </span>
  </div>
);

function ServiceCard({ service }) {
  return (
    <div className="home-service-card">
      <div className="home-service-image">
        {photo(service.image)}
        <span className="favorite">
          <Heart size={16} />
        </span>
      </div>
      <div className="home-service-copy">
        <strong>{service.title}</strong>
        <p>{service.name}</p>
        <div className="row between">
          <span className="small-rating">
            <Star size={10} fill="currentColor" />
            {service.rating} <em>({service.reviews})</em> · Mataró
          </span>
          <b>{service.price}/h</b>
        </div>
      </div>
    </div>
  );
}

function SearchScreen() {
  const categories = [
    [Sparkles, "Cleaning"],
    [Dumbbell, "Training"],
    [PawPrint, "Pet care"],
    [Paintbrush, "Painting"],
    [GraduationCap, "Classes"],
  ];
  const families = [
    [Home, "Home & Daily Life"],
    [Wrench, "Repairs & Renovations"],
    [Flower2, "Health & Wellness"],
    [PawPrint, "Family & Pet Care"],
    [GraduationCap, "Education & Training"],
    [Laptop, "Technology & Software"],
  ];
  return (
    <Frame id="search" light nav="Home">
      <div className="home-search row">
        <div className="search-pill row">
          <Search size={19} strokeWidth={2.3} />
          <strong>Search a service...</strong>
        </div>
        <div className="grid-pill">
          <LayoutGrid size={20} />
        </div>
      </div>
      <div className="home-address row">
        Mataró, Barcelona <ChevronDown size={20} />
      </div>
      <div className="category-rail">
        {categories.map(([I, name]) => (
          <div key={name}>
            <Icon as={I} size={24} />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <section className="near-section">
        <SectionTitle>Near you</SectionTitle>
        <div className="service-rail">
          <ServiceCard service={cleaning} />
          <ServiceCard service={training} />
        </div>
      </section>
      <section className="family-section">
        <SectionTitle>Explore services</SectionTitle>
        <div className="family-grid">
          {families.map(([I, name]) => (
            <div key={name}>
              <strong>{name}</strong>
              <Icon as={I} size={42} />
            </div>
          ))}
        </div>
      </section>
      <section className="top-rated">
        <SectionTitle>Top rated</SectionTitle>
      </section>
    </Frame>
  );
}

function ChooseScreen() {
  return (
    <Frame id="choose" light>
      <Header
        profile
        right={
          <>
            <Icon as={Share} size={24} />
            <Icon as={Heart} size={24} />
          </>
        }
      />
      <div className="service-profile">
        <div className="profile-overview">
          {photo("emma.jpg", "profile-portrait")}
          <h1>Home cleaning</h1>
          <p>Emma Wilson</p>
          <div className="profile-stats">
            <div>
              <b>124</b>
              <span>Bookings</span>
            </div>
            <div>
              <b>
                <Star size={21} fill="#F4B618" color="#F4B618" />
                4.9
              </b>
              <span>Rating</span>
            </div>
            <div>
              <b>38</b>
              <span>Repeats</span>
            </div>
          </div>
        </div>
        <section className="about-service">
          <h2>About the service</h2>
          <p className="classification">Home & Daily Life · Home cleaning</p>
          <p className="description">
            A fresh home, without the effort. I bring eco-friendly products and
            take care of every detail, from sparkling kitchens to spotless
            bathrooms.
          </p>
        </section>
        <section className="gallery">
          <h2>Gallery</h2>
          <div className="row">
            {photo("cleaning.jpg")}
            {photo("room.jpg", "room-crop")}
            {photo("room.jpg", "detail-crop")}
          </div>
        </section>
      </div>
      <div className="floating-action white">
        <button>
          Book for <span>€22.00</span>/hour
        </button>
      </div>
    </Frame>
  );
}

function ProfileCard({ pro = false }) {
  return (
    <div className={`card profile-card ${pro ? "pro-profile-card" : ""}`}>
      <div className="row">
        {photo("emma.jpg", "booking-avatar")}
        <div className="booking-name">
          <b>Home cleaning</b>
          {!pro && <p>Emma Wilson</p>}
        </div>
        <div className="booking-price">
          <b>
            €22.00<span>/hour</span>
          </b>
          {!pro && <p>Mataró</p>}
        </div>
      </div>
      {pro && (
        <>
          <div className="divider" />
          <div className="row">
            <div className="initials small">JL</div>
            <b className="client-name">Jamie Lewis</b>
          </div>
        </>
      )}
    </div>
  );
}
function DateCard({ edit = false }) {
  return (
    <div className="card date-card">
      <h2>Start date and duration {edit && <Edit3 size={17} />}</h2>
      <div className="row between date-row">
        <span className="row">
          <Calendar size={15} />
          Fri, 9 Oct
        </span>
        <span>09:00 - 12:00</span>
      </div>
      <b className="duration">3 hours</b>
    </div>
  );
}
function AddressCard({ edit = false }) {
  return (
    <div className="card address-card">
      <h2>Address {edit ? <Edit3 size={17} /> : <Navigation size={18} />}</h2>
      <div className="row address-row">
        <MapPin size={25} />
        <div>
          <b>Sunflower Lane, 12</b>
          <p>08302, Mataró, Barcelona, Spain</p>
        </div>
      </div>
    </div>
  );
}

function ReserveScreen() {
  return (
    <Frame id="reserve">
      <Header title="Confirm and Pay" />
      <div className="booking-content">
        <ProfileCard />
        <DateCard edit />
        <AddressCard edit />
        <div className="card payment-card">
          <h2>
            Payment method <Edit3 size={17} />
          </h2>
          <div className="bank-card">
            <span>
              •••• &nbsp; •••• &nbsp; •••• &nbsp; <small>4242</small>
            </span>
            <div className="row between">
              <small>12/29</small>
              <i />
            </div>
          </div>
          <p>This card will stay saved for future bookings.</p>
        </div>
      </div>
      <div className="floating-action">
        <button>Pay</button>
      </div>
    </Frame>
  );
}

function Bubble({ me, children, time }) {
  return (
    <div className={`message ${me ? "me" : ""}`}>
      <div className="bubble">{children}</div>
      <div className="message-time">
        {me && <CheckCheck size={16} color="#3695ff" />}
        {time}
      </div>
    </div>
  );
}
function RelaxScreen() {
  return (
    <Frame id="relax">
      <div className="chat-header row">
        <ChevronLeft size={24} />
        {photo("emma.jpg")}
        <b>Emma Wilson</b>
        <MoreHorizontal size={24} />
      </div>
      <div className="messages">
        <div className="chat-date">Today</div>
        <Bubble me time="9:32">
          Hi Emma! I’ve booked a clean for Friday. Could you focus on the
          kitchen and living room?
        </Bubble>
        <Bubble time="9:34">
          Of course, Jamie! You’re booked for 9:00–12:00. I’ll bring all the
          products and equipment.
        </Bubble>
        <div className="chat-photo">
          {photo("room.jpg")}
          <div className="message-time">9:35</div>
        </div>
        <Bubble time="9:35">
          I’ll take care of the details. You can enjoy your morning!
        </Bubble>
        <Bubble me time="9:36">
          Perfect. One less thing to worry about. Thank you!
        </Bubble>
      </div>
      <div className="composer row">
        <div className="attach">
          <Plus size={24} />
        </div>
        <div className="compose-field row">
          <span>Message</span>
          <div>
            <ArrowUp size={20} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

function ListingCard({ title, price, tags, images }) {
  return (
    <div className="listing-card">
      <div className="listing-title row between">
        <h2>{title}</h2>
        <Edit3 size={20} />
      </div>
      <div className="listing-pricing row">
        <span>
          <b>{price}</b>/hour
        </span>
        <div className="row tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="listing-person row">
        {photo("emma.jpg")}
        <div>
          <b>Emma Wilson</b>
          <div className="row between">
            <span>Mataró</span>
            <span className="row">
              <Star size={14} fill="#F4B618" color="#F4B618" />
              <strong>4.9</strong> (86 reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="listing-images row">
        {images.map((className, i) => (
          <img
            key={i}
            src={`${assets}${className ? "room.jpg" : "cleaning.jpg"}`}
            className={className}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
function PublishScreen() {
  return (
    <Frame id="publish" pro nav="Services">
      <div className="large-header row between">
        <h1>Your listings</h1>
        <div className="round-icon">
          <Plus size={23} />
        </div>
      </div>
      <div className="listings">
        <ListingCard
          title="Home cleaning"
          price="€22.00"
          tags={["Eco-friendly", "Reliable"]}
          images={["", "room-crop", "detail-crop"]}
        />
        <ListingCard
          title="Deep cleaning"
          price="€28.00"
          tags={["Move-in", "Deep clean"]}
          images={["room-crop", "detail-crop"]}
        />
      </div>
    </Frame>
  );
}

const bookings = [
  {
    name: "Jamie Lewis",
    initials: "JL",
    date: "9 Oct · 09:00",
    price: "€66.00",
    title: "Home cleaning",
  },
  {
    name: "Sophie Chen",
    initials: "SC",
    date: "9 Oct · 14:00",
    price: "€84.00",
    title: "Deep cleaning",
  },
  {
    name: "Oliver Reed",
    initials: "OR",
    date: "10 Oct · 10:00",
    price: "€66.00",
    title: "Home cleaning",
  },
  {
    name: "Isabella Rossi",
    initials: "IR",
    date: "12 Oct · 09:00",
    price: "€66.00",
    title: "Home cleaning",
  },
];
function ManageScreen() {
  return (
    <Frame id="manage" pro nav="Today">
      <div className="large-header row between dashboard-title">
        <h1>Professional dashboard</h1>
        <Bell size={24} />
      </div>
      <div className="client-bookings">
        <h2>Client bookings</h2>
        <div className="filter-rail">
          <span className="selected">Active</span>
          <span>Requests</span>
          <span>In progress</span>
          <span>Upcoming</span>
        </div>
        <div className="bookings-panel">
          {bookings.map((b) => (
            <div key={b.name} className="booking-list-row row">
              <div className="initials">{b.initials}</div>
              <div className="booking-list-details">
                <div className="row between">
                  <b>{b.name}</b>
                  <ChevronRight size={19} />
                </div>
                <p>{b.title}</p>
                <div className="row between">
                  <span className="row">
                    <Calendar size={13} />
                    {b.date}
                  </span>
                  <strong>{b.price}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
function DeliverScreen() {
  return (
    <Frame id="deliver">
      <Header
        title="Booking details"
        detail="Service in progress"
        right={
          <>
            <MessageSquare size={22} />
            <MoreHorizontal size={22} />
          </>
        }
      />
      <div className="details-content">
        <ProfileCard pro />
        <DateCard />
        <AddressCard />
        <div className="card earnings-card">
          <h2>Your earnings:</h2>
          <b className="professional-earnings">€66.00</b>
        </div>
      </div>
      <div className="floating-action">
        <button>Have you finished the service?</button>
      </div>
    </Frame>
  );
}
function EarnScreen() {
  return (
    <Frame id="earn">
      <Header title="Payments and refunds" />
      <div className="wallet-content">
        <div className="wallet-total">
          <h2>Total earnings:</h2>
          <b>€2,486.00</b>
        </div>
        <div className="wallet-menu">
          {["Bookings", "Payout method", "Billing and Taxes"].map((label) => (
            <div className="row between" key={label}>
              <span>{label}</span>
              <ChevronRight size={23} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const components = {
  search: SearchScreen,
  choose: ChooseScreen,
  reserve: ReserveScreen,
  relax: RelaxScreen,
  publish: PublishScreen,
  manage: ManageScreen,
  deliver: DeliverScreen,
  earn: EarnScreen,
};
const requested = new URLSearchParams(window.location.search).get("screen");
const selected = screens.includes(requested) ? [requested] : screens;
document.body.className = selected.length === 1 ? "single" : "overview";
createRoot(document.getElementById("root")).render(
  <main>
    {selected.map((id) => {
      const Screen = components[id];
      return (
        <section className="studio-item" key={id}>
          <h2 className="studio-label">{id}</h2>
          <Screen />
        </section>
      );
    })}
  </main>,
);
