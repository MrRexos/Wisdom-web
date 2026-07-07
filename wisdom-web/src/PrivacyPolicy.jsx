import { useEffect } from 'react';
import './PrivacyPolicy.css';

// This app does not use prop-types in its React components.
/* eslint-disable react/prop-types */
const Section = ({ title, children }) => (
  <section className="privacy-policy-section">
    <h2>{title}</h2>
    {children}
  </section>
);

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy - Wisdom';
  }, []);

  useEffect(() => {
    document.body.classList.add('privacy-policy-active');
    return () => {
      document.body.classList.remove('privacy-policy-active');
    };
  }, []);

  return (
    <main className="privacy-policy-page">
      <article className="privacy-policy-shell">
        <p className="privacy-policy-kicker">Last Updated: August 15, 2024</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-policy-intro">
          At Wisdom, we are committed to protecting the privacy of our users and professionals. This Privacy Policy describes how we collect, use, share, and protect your personal information when you use our mobile application, Wisdom, and all associated services.
        </p>
        <p>
          We encourage you to read this policy carefully to understand our data handling practices. By using Wisdom, you agree to the terms of this Privacy Policy. If you do not agree with the terms described below, we ask that you do not use our platform.
        </p>

        <Section title="1. Information We Collect">
          <p>To provide an optimal and personalized experience, we collect various types of information, including:</p>

          <h3>A) Information You Provide to Us</h3>
          <ul>
            <li><strong>Registration Information:</strong> When you register on Wisdom, we collect your name, email address, phone number, address, and other relevant information that may be necessary to create and maintain your account.</li>
            <li><strong>Profile Information:</strong> Service professionals may provide additional information, such as service descriptions, certifications, availability, pricing, and other information they consider relevant for their profiles.</li>
            <li><strong>Messaging and Communications:</strong> We collect information about communications made through our platform, including conversations with other users and professionals.</li>
          </ul>

          <h3>B) Information We Collect Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> We collect information about your interaction with the app, such as the features you use, the pages you visit, and the time spent on the platform.</li>
            <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to enhance your experience on our platform, remember your preferences, and collect information about your use of Wisdom.</li>
          </ul>

          <h3>C) Information from Third Parties</h3>
          <p>
            We may receive information about you from third parties, such as social media platforms, marketing partners, and service professionals. This information will be used in accordance with this Privacy Policy.
          </p>
        </Section>

        <Section title="2. Use of Collected Information">
          <p>The information we collect is used for the following purposes:</p>

          <h3>A) Provision of Services</h3>
          <ul>
            <li>To create and manage your account.</li>
            <li>To facilitate service bookings through the platform.</li>
            <li>To enable communication between users and service professionals.</li>
            <li>To process transactions and payments securely.</li>
          </ul>

          <h3>B) Improvement and Personalization</h3>
          <ul>
            <li>To personalize your experience on the platform and display relevant content.</li>
            <li>To improve and optimize the functionality of Wisdom.</li>
            <li>To conduct analysis and market studies to better understand our users and improve our services.</li>
          </ul>

          <h3>C) Security and Protection</h3>
          <ul>
            <li>To protect the integrity of the platform and prevent fraudulent or unauthorized activities.</li>
            <li>To verify the identity of users and professionals.</li>
            <li>To comply with our legal and regulatory obligations.</li>
          </ul>
        </Section>

        <Section title="3. Sharing of Information">
          <p>
            Wisdom does not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
          </p>

          <h3>A) With Other Users</h3>
          <p>
            When a user books services from a professional, we share the necessary information to facilitate the service, such as the name, location, and contact details.
          </p>

          <h3>B) With Third-Party Service Providers</h3>
          <p>
            We work with third parties who provide services such as payment processing, data hosting, analytics, and customer service. These third parties only have access to the information necessary to perform their functions and are required to protect your information in accordance with this policy.
          </p>

          <h3>C) For Legal Reasons</h3>
          <p>
            We may disclose your information if we are required to do so by law or if we believe in good faith that such disclosure is necessary to comply with a legal process, protect our rights, your safety, or the safety of others.
          </p>

          <h3>D) In the Context of a Merger or Acquisition</h3>
          <p>
            If Wisdom is acquired or merges with another company, your information may be transferred as part of that transaction. We will notify you through our platform if there is a change in ownership or in the use of your personal information.
          </p>
        </Section>

        <Section title="4. Information Security">
          <p>
            At Wisdom, we take the security of your personal information very seriously. We implement technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, while we strive to protect your information, we cannot guarantee the absolute security of data transmitted over the Internet or stored in our systems.
          </p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
          </p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            Wisdom is not directed to individuals under the age of 18, and we do not knowingly collect personal information from children. If we discover that we have collected personal information from a child under 18 without parental consent, we will take steps to delete that information as soon as possible.
          </p>
        </Section>

        <Section title="7. Changes to this Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of any significant changes through our platform or by other means before the changes take effect. By continuing to use Wisdom after the effective date of the new policy, you agree to those changes.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            If you have any questions or concerns about this Privacy Policy or our data handling practices, please feel free to contact us.
          </p>
        </Section>

        <Section title="9. Acceptance of this Privacy Policy">
          <p>
            By using Wisdom, you agree to the terms set forth in this Privacy Policy. If you do not agree with this policy, we ask that you do not use our app or its services.
          </p>
        </Section>

        <Section title="10. Additional Rights for Residents of the European Union and Other Territories">
          <p>
            If you reside in the European Union or other jurisdictions that provide additional privacy protections, you may have additional rights regarding your personal information, such as the right to data portability, the right to restrict processing, and the right to lodge a complaint with a supervisory authority.
          </p>
          <p>
            This Privacy Policy is designed to ensure that your personal information is handled transparently and responsibly, ensuring the privacy and security of our users at all times.
          </p>
        </Section>

        <footer className="privacy-policy-footer">Wisdom</footer>
      </article>
    </main>
  );
}
