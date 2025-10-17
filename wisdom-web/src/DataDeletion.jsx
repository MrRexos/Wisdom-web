import { useEffect } from 'react';
import './DataDeletion.css';

export default function DataDeletion() {
  useEffect(() => {
    document.title = 'Wisdom – Data Deletion Request';
  }, []);

  useEffect(() => {
    document.body.classList.add('data-deletion-active');
    return () => {
      document.body.classList.remove('data-deletion-active');
    };
  }, []);

  return (
    <main className="data-deletion-page">
      <header className="data-deletion-header">
        <h1>Wisdom – Data Deletion Request</h1>
        <p>
          <span className="label">Developer</span>
          <span>Oier Hernanz Arroyo</span>
        </p>
        <p>
          <span className="label">App</span>
          <span>Wisdom (com.anonymous.Wisdom_expo)</span>
        </p>
      </header>

      <section className="data-deletion-card">
        <h2>How to request deletion</h2>
        <p>
          Email{' '}
          <a href="mailto:wisdom.helpcontact@gmail.com">wisdom.helpcontact@gmail.com</a> from the address linked to your account. Tell us whether you need a partial deletion (services, chats, addresses, images) or a full account removal. We process every request within 30 days and confirm completion by email.
        </p>
      </section>

      <section className="data-deletion-card">
        <h2>What we delete</h2>
        <ul>
          <li>Profile details</li>
          <li>Saved addresses</li>
          <li>Services and related images</li>
          <li>Chats and messages</li>
          <li>Reviews and ratings</li>
          <li>Booking history</li>
        </ul>
      </section>

      <section className="data-deletion-card">
        <h2>What we retain and for how long</h2>
        <p>
          Payment and billing records (Stripe) and security or fraud logs are retained for up to 90 days to meet legal obligations. After that period they are deleted or anonymized.
        </p>
      </section>

      <section className="data-deletion-card">
        <h2>Security</h2>
        <p>All data is transmitted over encrypted connections (TLS/HTTPS).</p>
      </section>

      <footer className="data-deletion-footer">
        <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
      </footer>
    </main>
  );
}
