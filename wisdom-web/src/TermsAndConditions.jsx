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

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = 'Terms and Conditions - Wisdom';
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
        <p className="privacy-policy-kicker">Last updated: September 16, 2026</p>
        <h1>Terms and Conditions</h1>
        <p className="privacy-policy-intro">
          These Terms and Conditions govern access to and use of Wisdom, including its mobile application, website, and associated services.
        </p>
        <p>
          Wisdom is a digital platform that allows people looking for services to find, compare, contact, book, and pay individuals or legal entities that offer them.
        </p>
        <p>
          By creating an account, publishing a service, making or accepting a booking, subscribing to Wisdom Premium, or using any functionality that requires acceptance of these Terms, you declare that you have read and accepted them.
        </p>
        <p>
          Simply browsing the parts of Wisdom available without registration does not constitute the contracting of a professional service.
        </p>
        <p>
          These Terms must be interpreted together with the Privacy Policy, Booking Policy, Cancellation Policy, Invoicing and Tax Policy, Premium Policy, Wisdom Guarantee, and any other specific conditions that may apply.
        </p>

        <Section title="1. Owner of Wisdom">
          <p>
            Wisdom is the trade name used to operate the platform.
          </p>
          <p>
            Owner: Oier Hernanz Arroyo<br />
            Trade name: Wisdom<br />
            Address: Carrer de la Font dels Reis, 60, Mataró<br />
            Email: <a href="mailto:hello@wisdomapp.es">hello@wisdomapp.es</a><br />
            Website: wisdomapp.es
          </p>
          <p>
            Unless expressly stated otherwise, references to “Wisdom” in these Terms refer to the owner and the Wisdom technology platform.
          </p>
        </Section>

        <Section title="2. Definitions">
          <p>
            For the purposes of these Terms:
          </p>
          <p>
            “User” means any person who accesses or uses Wisdom.
          </p>
          <p>
            “Client” means the user who uses Wisdom to search for, request, or contract a service.
          </p>
          <p>
            “Professional” or “Provider” means any individual or legal entity that publishes or offers services through Wisdom, regardless of whether they legally act as a businessperson, professional, self-employed worker, company, or private individual.
          </p>
          <p>
            “Service” means the activity offered by a Professional and contracted or available for contracting through Wisdom.
          </p>
          <p>
            “Booking” means the relationship created within Wisdom to request, accept, organize, provide, pay for, and manage a Service.
          </p>
          <p>
            “Payout Amount” means the amount corresponding to the work carried out by the Professional.
          </p>
          <p>
            “Service Fee” means the amount charged by Wisdom for intermediary services, infrastructure, payments, support, and other functionalities associated with a booking.
          </p>
          <p>
            “Premium” means the subscription service that provides certain additional benefits in accordance with the Premium Policy.
          </p>
        </Section>

        <Section title="3. Nature of Wisdom">
          <p>
            Wisdom is a marketplace and provider of digital intermediary services.
          </p>
          <p>
            Wisdom provides the technological infrastructure necessary for Clients and Professionals to find each other, communicate, organize services, make bookings, make payments, manage documentation, leave reviews, and use support mechanisms.
          </p>
          <p>
            Unless Wisdom expressly states that a particular service is provided directly by it, Wisdom is not the person who materially performs the services published by Professionals.
          </p>
          <p>
            The contract relating to the actual provision of a Service is entered into between the Client and the corresponding Professional.
          </p>
          <p>
            The Professional decides which services they offer, their characteristics, price or pricing system, availability, and other conditions within the options permitted by the platform, and decides whether to accept or reject requests received.
          </p>
          <p>
            Wisdom does not become the employer, representative, partner, agent, or contracting party of the Professional merely by allowing them to use the platform.
          </p>
          <p>
            This contractual classification does not replace any mandatory rules that may apply based on the actual circumstances of a relationship.
          </p>
        </Section>

        <Section title="4. Client and Professional May Be the Same Person">
          <p>
            A Wisdom account may be used both to contract and to offer services.
          </p>
          <p>
            A user may act as a Client in one transaction and as a Professional in another.
          </p>
          <p>
            The applicable obligations will depend on the role being performed at each moment.
          </p>
        </Section>

        <Section title="5. Minimum Age">
          <p>
            To create an account and use Wisdom’s transactional functionalities, you must be at least 18 years old and have sufficient legal capacity to enter into contracts.
          </p>
          <p>
            Creating an account on behalf of a minor or allowing a minor to use an account as if it were their own is not permitted.
          </p>
          <p>
            Wisdom may request information reasonably necessary to verify a user’s age or identity where there are grounds to do so.
          </p>
        </Section>

        <Section title="6. Creating an Account">
          <p>
            The user must provide truthful, complete, and up-to-date information.
          </p>
          <p>
            It may be necessary to provide, among other information, a name, email address, profile information, and any additional information required to use certain functions.
          </p>
          <p>
            The user is responsible for keeping their account information up to date.
          </p>
          <p>
            Impersonating another person, creating accounts using false information, using another person’s identity without authorization, or providing forged documents is not permitted.
          </p>
          <p>
            Wisdom may verify certain information where necessary for security, payments, regulatory compliance, or operation of the platform.
          </p>
        </Section>

        <Section title="7. Account Security">
          <p>
            Login credentials are personal.
          </p>
          <p>
            The user must take reasonable measures to prevent unauthorized access and notify Wisdom of any suspected misuse.
          </p>
          <p>
            Transactions carried out from an authenticated account may be considered to have been performed by its owner unless there are indications of fraudulent access or evidence to the contrary.
          </p>
          <p>
            Wisdom may request additional verification for logins, payments, sensitive changes, or behavior it considers unusual.
          </p>
        </Section>

        <Section title="8. Public Information and Profiles">
          <p>
            Certain information may be displayed publicly so that Wisdom can operate as a marketplace.
          </p>
          <p>
            For Professionals, this may include name, photograph, description, experience, services, prices, languages, previous work, ratings, activity metrics, badges, or other relevant information.
          </p>
          <p>
            Users are responsible for the truthfulness of the content they publish.
          </p>
          <p>
            Presenting qualifications, credentials, licenses, experience, photographs, work, ratings, or accreditations belonging to other people as your own is not permitted.
          </p>
        </Section>

        <Section title="9. Professional Status">
          <p>
            Wisdom allows different types of people to offer services provided that they may legally do so.
          </p>
          <p>
            Depending on the activity, frequency, income, country, and circumstances of the Provider, legislation may impose different obligations.
          </p>
          <p>
            The Professional is responsible for determining whether they must, among other obligations:
          </p>
          <ul>
            <li>Register as self-employed or an equivalent status.</li>
            <li>Complete tax or census registrations.</li>
            <li>Operate through a company.</li>
            <li>Hold licenses or authorizations.</li>
            <li>Belong to a professional association.</li>
            <li>Hold specific qualifications.</li>
            <li>Take out mandatory insurance.</li>
            <li>Apply taxes.</li>
            <li>Declare income.</li>
            <li>Issue invoices.</li>
            <li>Comply with labor, health, administrative, or sector-specific obligations.</li>
          </ul>
          <p>
            Wisdom does not determine whether a person must register as self-employed and cannot guarantee that the way in which a user carries out their activity is fiscally, legally, labor-wise, or administratively correct.
          </p>
          <p>
            Using Wisdom does not replace any tax, legal, employment, or professional advice that each Provider may need.
          </p>
        </Section>

        <Section title="10. Professional, Businessperson, or Private Individual">
          <p>
            For the purposes of consumer regulations, Wisdom may ask the Provider to declare whether they act as a businessperson or professional or whether they offer a particular service as a private individual.
          </p>
          <p>
            The Provider must declare their status truthfully.
          </p>
          <p>
            Where the person offering the service declares that they are not acting as a businessperson or professional, Wisdom may inform the Client that specific consumer protection rules applicable to contracts between businesses and consumers may not apply to the underlying contractual relationship between the parties.
          </p>
          <p>
            Where the Provider acts as a businessperson or professional, they will be responsible for complying with the obligations imposed on the service provider by consumer and user regulations.
          </p>
          <p>
            Wisdom may request additional information or carry out checks where there is a legal obligation to verify traders operating on the platform.
          </p>
          <p>
            A false declaration regarding the Provider’s legal, professional, or business status constitutes a breach of these Terms.
          </p>
        </Section>

        <Section title="11. Regulated Services">
          <p>
            Some categories available on Wisdom may be subject to specific regulation.
          </p>
          <p>
            The technical possibility of publishing a Service within a category does not mean that every user is legally authorized to provide it.
          </p>
          <p>
            Where an activity requires a qualification, professional registration, license, authorization, insurance, certification, or equivalent requirement, it is the Professional’s responsibility to have these in place before offering or performing the Service.
          </p>
          <p>
            Wisdom may request supporting documentation and restrict or remove services where there are reasonable doubts regarding compliance with such requirements.
          </p>
        </Section>

        <Section title="12. Information About Services">
          <p>
            The Professional must describe their services clearly, truthfully, and sufficiently.
          </p>
          <p>
            Relevant information may include what is offered, what is excluded, price, calculation method, format, location, travel radius, experience, duration, availability, and any other relevant condition.
          </p>
          <p>
            Publishing misleading information about a Service is not permitted.
          </p>
          <p>
            The Client must read the listing, price, and conditions before booking and ask any relevant questions that are not sufficiently clear.
          </p>
        </Section>

        <Section title="13. Booking Operation">
          <p>
            The full rules governing requests, acceptance, availability, deposits, modifications, performance, completion, payments, recurring bookings, and disputes are set out in the Booking Policy.
          </p>
          <p>
            Making a request does not mean that the Professional has accepted it.
          </p>
          <p>
            The contract for the provision of the Service is subject to the corresponding acceptance and to the conditions displayed during the contracting process.
          </p>
          <p>
            Accepting a booking also does not mean that the Service has materially begun.
          </p>
          <p>
            Performance is managed in accordance with the workflow defined by Wisdom.
          </p>
        </Section>

        <Section title="14. Price and Service Fee">
          <p>
            The price of a transaction may consist of the Payout Amount corresponding to the Professional and Wisdom’s Service Fee.
          </p>
          <p>
            Unless a different condition is indicated before contracting, Wisdom’s standard Service Fee is calculated as:
          </p>
          <p>
            max. (€1, 10% of the Payout Amount + €0.50).
          </p>
          <p>
            Therefore, the Service Fee will never be less than €1.
          </p>
          <p>
            Where Wisdom Premium or another valid promotion applies, different conditions may be used, which will be shown to the user where appropriate.
          </p>
          <p>
            Applicable taxes and the corresponding breakdown will be displayed in accordance with applicable tax and invoicing rules.
          </p>
        </Section>

        <Section title="15. Deposits">
          <p>
            Wisdom uses deposits for certain bookings to confirm the commitment of the parties.
          </p>
          <p>
            The deposit may cover all or part of the Service Fee depending on the type of booking.
          </p>
          <p>
            For services subject to a quote, a minimum deposit may be used.
          </p>
          <p>
            The specific conditions are displayed before confirming the transaction.
          </p>
          <p>
            Deposit refunds are governed by the Booking Policy and the Cancellation Policy.
          </p>
        </Section>

        <Section title="16. Payments">
          <p>
            Payments made through Wisdom are managed through specialized providers, including Stripe.
          </p>
          <p>
            Wisdom may use tokenization mechanisms to enable subsequent payments related to a booking without directly storing complete card details.
          </p>
          <p>
            Where the booking allows it and the user has authorized the corresponding mechanism, the method initially used may subsequently be used to make the final payment.
          </p>
          <p>
            Certain methods, such as some wallets, may require a new confirmation by the user.
          </p>
          <p>
            The full rules are explained in the Booking Policy.
          </p>
        </Section>

        <Section title="17. Payment Obligation">
          <p>
            The Client agrees to pay the amounts validly generated by the services contracted.
          </p>
          <p>
            The fact that a payment attempt fails does not extinguish the corresponding obligation.
          </p>
          <p>
            Where a payment method is rejected, expires, has insufficient funds, or requires additional authentication, Wisdom may request another method or restrict certain functionalities until the outstanding amount is resolved.
          </p>
        </Section>

        <Section title="18. Automatic Charges">
          <p>
            For certain bookings, Wisdom may automatically process the final charge where the conditions previously accepted by the Client are met.
          </p>
          <p>
            The system, its limits, deadlines, and exceptions are explained in the Booking Policy.
          </p>
          <p>
            Among other protections, Wisdom does not apply the ordinary automatic charging mechanism where the final price exceeds the established tolerance limits, where there is no sufficiently comparable estimate, in certain services subject to a quote, or where the payment method used necessarily requires express authorization for the new charge.
          </p>
        </Section>

        <Section title="19. Payments to Professionals">
          <p>
            Amounts corresponding to the Professional are transferred in accordance with the payout system established by Wisdom and the corresponding financial provider.
          </p>
          <p>
            Transfers may be temporarily withheld where there is a dispute, fraud investigation, claim, legal obligation, verification issue, negative balance, restriction imposed by the financial provider, or any other reasonable cause related to the security of the transaction.
          </p>
          <p>
            Wisdom does not guarantee that a bank transfer will appear in the Professional’s account at a specific time, as third parties, financial institutions, and payment systems are involved.
          </p>
        </Section>

        <Section title="20. Transactions Outside Wisdom">
          <p>
            Users must not use Wisdom to find each other and deliberately move a transaction originating on Wisdom outside the platform for the purpose of avoiding its fees, payment systems, security measures, or policies.
          </p>
          <p>
            Repeatedly requesting or encouraging direct payment outside Wisdom in order to circumvent applicable conditions is not permitted.
          </p>
          <p>
            Where a transaction is carried out outside Wisdom, the platform may lack sufficient information, traceability, and control to apply its payment, protection, support, invoicing, or dispute resolution systems.
          </p>
          <p>
            Wisdom may take measures against deliberate attempts to circumvent the platform.
          </p>
        </Section>

        <Section title="21. Chat and Communications">
          <p>
            Wisdom provides messaging tools to facilitate communication between users.
          </p>
          <p>
            Messages must be used lawfully, professionally, and respectfully.
          </p>
          <p>
            It is prohibited to use chat to:
          </p>
          <ul>
            <li>Harass, threaten, or intimidate.</li>
            <li>Send spam.</li>
            <li>Commit fraud.</li>
            <li>Request illegal activities.</li>
            <li>Distribute malware.</li>
            <li>Share unlawful content.</li>
            <li>Deliberately circumvent Wisdom’s systems.</li>
          </ul>
          <p>
            Wisdom may establish message limits before a booking is made.
          </p>
          <p>
            Once a booking is confirmed, those limits may be increased or removed depending on how the platform operates.
          </p>
        </Section>

        <Section title="22. Contact Information Detection and Automated Moderation">
          <p>
            Wisdom may use automated systems to detect phone numbers, email addresses, links, circumvention attempts, spam, fraud, and other conduct contrary to the platform’s rules.
          </p>
          <p>
            These systems may block content, warn the user, record an incident, or refer certain cases for human review.
          </p>
          <p>
            Moderation decisions will be applied with the aim of being objective and proportionate to the conduct detected.
          </p>
          <p>
            Where required by law, Wisdom will inform the user of the restrictions applied and the available mechanisms for requesting a review.
          </p>
        </Section>

        <Section title="23. Prohibited Conduct">
          <p>
            Wisdom may not be used to:
          </p>
          <ul>
            <li>Carry out illegal activities.</li>
            <li>Offer prohibited goods or services.</li>
            <li>Commit or facilitate fraud.</li>
            <li>Impersonate others.</li>
            <li>Manipulate reviews.</li>
            <li>Create fake bookings.</li>
            <li>Tamper with payment systems.</li>
            <li>Carry out fraudulent chargebacks or returns.</li>
            <li>Deliberately conceal relevant information.</li>
            <li>Infringe intellectual property rights.</li>
            <li>Access accounts, systems, or information without authorization.</li>
            <li>Extract data on a large scale through unauthorized mechanisms.</li>
            <li>Introduce malware or harmful code.</li>
            <li>Interfere with Wisdom’s infrastructure.</li>
            <li>Artificially manipulate rankings, metrics, searches, or reputation.</li>
            <li>Use multiple accounts to circumvent restrictions.</li>
            <li>Use the platform to harass, discriminate against, or threaten others.</li>
          </ul>
          <p>
            Wisdom may investigate such conduct and take proportionate measures.
          </p>
        </Section>

        <Section title="24. Prohibited Services">
          <p>
            Services whose provision is illegal or infringes third-party rights may not be offered.
          </p>
          <p>
            Wisdom may establish additional restrictions for legal, security, financial, or operational reasons, or due to the requirements of its providers.
          </p>
          <p>
            The absence of an express prohibition on a category does not mean that an illegal activity is permitted.
          </p>
        </Section>

        <Section title="25. Reviews and Reputation">
          <p>
            Clients may review services they have contracted in accordance with Wisdom’s rules.
          </p>
          <p>
            Reviews must reflect a genuine experience and may not be used to extort, threaten, or manipulate another person.
          </p>
          <p>
            The following are prohibited:
          </p>
          <ul>
            <li>Buying or selling reviews.</li>
            <li>Creating fictitious bookings to obtain reviews.</li>
            <li>Leaving reviews through accounts controlled by the same user.</li>
            <li>Offering compensation conditional on a positive review.</li>
            <li>Threatening a negative review in order to obtain an improper advantage.</li>
          </ul>
          <p>
            Wisdom may remove content where there are sufficient indications of fraud, illegal content, impersonation, harassment, or other violations.
          </p>
          <p>
            A negative review will not be removed solely because it is unfavorable to the Professional.
          </p>
        </Section>

        <Section title="26. Rankings and Recommendations">
          <p>
            Wisdom may rank and recommend services using different parameters.
          </p>
          <p>
            These may include, among others, relevance to the search, location, availability, price, rating, activity, profile quality or completeness, reliability, responsiveness, history, service format, and certain legitimate Premium benefits.
          </p>
          <p>
            Wisdom may modify its ranking systems to improve the operation of the platform, prevent abuse, or adapt recommendations.
          </p>
          <p>
            General information about the main ranking parameters will be made available in an accessible manner where required by law.
          </p>
        </Section>

        <Section title="27. Wisdom Premium">
          <p>
            Wisdom may offer a Premium subscription with additional benefits.
          </p>
          <p>
            Its specific conditions are set out in the Premium Policy and in the information displayed before purchase.
          </p>
          <p>
            Plans may include benefits such as higher publishing limits, badges, additional functionality, financial benefits, positioning, statistics, support, or other features.
          </p>
          <p>
            Premium does not guarantee a specific number of views, requests, bookings, or income.
          </p>
        </Section>

        <Section title="28. Premium on iOS">
          <p>
            When Premium is purchased on iOS through an In-App Purchase subscription, Apple manages the payment, renewal, payment method, cancellation, and documentation relating to the payment.
          </p>
          <p>
            Wisdom receives the information necessary to determine whether the user retains the right to Premium access.
          </p>
          <p>
            Renewals, refunds, revocations, and changes managed by Apple may subsequently modify the Premium status of the account.
          </p>
          <p>
            Restoring a valid purchase does not constitute a new purchase and must not generate a second charge.
          </p>
        </Section>

        <Section title="29. Premium Outside iOS">
          <p>
            Where Premium is managed directly through a provider such as Stripe, the conditions displayed during the purchase process and the Premium Policy will apply.
          </p>
          <p>
            Automatically renewing subscriptions will continue to renew while active and not cancelled in accordance with the relevant conditions.
          </p>
          <p>
            Cancelling renewal does not necessarily mean immediately losing the Premium period already paid for.
          </p>
        </Section>

        <Section title="30. Promotions and Codes">
          <p>
            Wisdom may offer discounts, promotional codes, free periods, or Premium access granted on an exceptional basis.
          </p>
          <p>
            Promotions may be subject to duration, eligibility, territory, maximum number of uses, or other specific conditions.
          </p>
          <p>
            Using multiple accounts, false identities, or other methods to repeatedly obtain benefits intended for a single user is prohibited.
          </p>
          <p>
            Wisdom may cancel a promotion obtained fraudulently.
          </p>
        </Section>

        <Section title="31. Cancellations">
          <p>
            The cancellation rules for Services are explained in the Cancellation Policy and the Booking Policy.
          </p>
          <p>
            Depending on the timing, status, and responsible party, a cancellation may result in:
          </p>
          <ul>
            <li>A full refund.</li>
            <li>Loss of the deposit.</li>
            <li>Cancellation without penalty.</li>
            <li>Recording of a reliability incident.</li>
            <li>Entry into dispute.</li>
            <li>Other consequences provided for in the applicable policies.</li>
          </ul>
          <p>
            Relevant conditions must be displayed before the user confirms an action where appropriate.
          </p>
        </Section>

        <Section title="32. Statutory Right of Withdrawal">
          <p>
            Wisdom’s internal policies do not remove any rights that a consumer has by law.
          </p>
          <p>
            Where applicable law recognizes a right of withdrawal, that right will be respected regardless of ordinary cancellation rules.
          </p>
          <p>
            For certain service contracts, the consumer may have a statutory withdrawal period from the date of contracting.
          </p>
          <p>
            If they expressly request that a service begin during that period, the consequences provided for by law may apply.
          </p>
          <p>
            Where the service has been fully performed after the consumer expressly requested that it begin and acknowledged that they would lose the right of withdrawal once performance was complete, that right may expire in accordance with applicable law.
          </p>
          <p>
            These rules will also depend on whether the Provider actually acts as a businessperson or professional in relation to a consumer.
          </p>
        </Section>

        <Section title="33. Disputes">
          <p>
            Wisdom provides internal mechanisms for reporting incidents and opening disputes.
          </p>
          <p>
            The Wisdom team may review the information reasonably available, including the booking, payments, timing, communications, and information provided by the parties.
          </p>
          <p>
            Wisdom may make operational decisions on the platform, for example:
          </p>
          <ul>
            <li>Process or withhold a payment.</li>
            <li>Issue a refund.</li>
            <li>Cancel a booking.</li>
            <li>Maintain a transaction.</li>
            <li>Request additional information.</li>
            <li>Apply a measure to an account.</li>
          </ul>
          <p>
            Wisdom’s internal mediation does not constitute judicial or arbitration proceedings and does not prevent a person from exercising any rights available to them before competent authorities or courts.
          </p>
        </Section>

        <Section title="34. Wisdom Guarantee">
          <p>
            Wisdom may offer certain protection or assistance measures under the name Wisdom Guarantee.
          </p>
          <p>
            Its scope, requirements, exclusions, and procedure are governed by the corresponding Guarantee Policy.
          </p>
          <p>
            Commercial references to security, protection, or guarantee must be interpreted in accordance with that policy and do not constitute unlimited insurance or an absolute guarantee regarding the outcome of the Service.
          </p>
        </Section>

        <Section title="35. Responsibility for Providing the Service">
          <p>
            The Professional is responsible for properly providing the Service they have accepted.
          </p>
          <p>
            This includes, where applicable:
          </p>
          <ul>
            <li>Showing up.</li>
            <li>Complying with the agreed conditions.</li>
            <li>Acting diligently.</li>
            <li>Using appropriate means.</li>
            <li>Holding the necessary qualifications.</li>
            <li>Complying with applicable regulations.</li>
            <li>Being liable for damages legally attributable to them.</li>
          </ul>
          <p>
            The Client is responsible for providing reasonably necessary information, allowing the service to be performed under the agreed conditions, and complying with their own obligations.
          </p>
        </Section>

        <Section title="36. Scope of Wisdom’s Liability">
          <p>
            Wisdom is responsible for its own obligations as platform provider in accordance with applicable law.
          </p>
          <p>
            However, unless the law provides otherwise, Wisdom is not directly liable for acts or omissions that are exclusively attributable to the Client or Professional, such as:
          </p>
          <ul>
            <li>The material quality of the work performed.</li>
            <li>The Professional’s skill.</li>
            <li>Failure by the Provider to comply with their own obligations.</li>
            <li>Damage caused directly by either party during the provision of the Service.</li>
            <li>False information provided by a user.</li>
            <li>Lack of qualifications or authorizations concealed or falsified by a Professional.</li>
            <li>A user’s own tax violations.</li>
            <li>The Professional’s own employment-law violations.</li>
            <li>Actions carried out outside Wisdom without the platform’s knowledge or control.</li>
          </ul>
          <p>
            This does not limit the obligations that legally correspond to Wisdom for its own acts, for functions it actually assumes, or under mandatory consumer protection rules.
          </p>
        </Section>

        <Section title="37. Wisdom Does Not Guarantee the Outcome of a Service">
          <p>
            Wisdom provides discovery, reputation, payment, and support tools, but cannot guarantee that a particular Professional will satisfy the subjective expectations of every Client.
          </p>
          <p>
            Reviews, badges, verifications, or statistics reduce information asymmetry but do not constitute a universal certification of quality or a promise of a specific outcome.
          </p>
          <p>
            Where Wisdom carries out a specific verification, its meaning will be limited to the element actually verified.
          </p>
          <p>
            For example, verifying an identity does not automatically certify all of that person’s professional capabilities.
          </p>
        </Section>

        <Section title="38. Limitations That Do Not Apply">
          <p>
            Nothing in these Terms is intended to exclude or limit liabilities that cannot legally be excluded.
          </p>
          <p>
            In particular, no clause shall be interpreted as a waiver of mandatory consumer rights or as an exclusion of liability where legislation prohibits such exclusion.
          </p>
        </Section>

        <Section title="39. Availability of Wisdom">
          <p>
            Wisdom attempts to keep the platform available and functioning correctly, but does not guarantee uninterrupted operation.
          </p>
          <p>
            Interruptions may occur due to maintenance, updates, errors, third-party incidents, operating systems, payment providers, map services, Internet infrastructure, or other causes.
          </p>
          <p>
            Wisdom will seek to resolve incidents under its control within a reasonable period.
          </p>
          <p>
            Where an interruption affects a booking, payment, or important action, Wisdom may make the adjustments necessary to avoid unjustified harm where reasonably possible.
          </p>
        </Section>

        <Section title="40. Third-Party Providers">
          <p>
            Some functionalities depend on services provided by third parties, such as payment systems, app stores, authentication, hosting, maps, storage, email, or notifications.
          </p>
          <p>
            Use of such services may additionally be subject to their own terms and policies.
          </p>
          <p>
            Wisdom does not fully control the infrastructure of those providers, but will select and manage its integrations in accordance with the obligations legally applicable to it.
          </p>
        </Section>

        <Section title="41. Professional Taxation">
          <p>
            Each Professional is responsible for determining and complying with their own tax obligations.
          </p>
          <p>
            This includes, where applicable:
          </p>
          <ul>
            <li>Declaring income.</li>
            <li>Correctly applying VAT, personal income tax, or other taxes.</li>
            <li>Filing tax returns.</li>
            <li>Keeping books or records.</li>
            <li>Issuing invoices.</li>
            <li>Registering in the relevant tax censuses or schemes.</li>
            <li>Regularizing their status as self-employed, a company, or another legal form where required by law.</li>
          </ul>
          <p>
            Wisdom does not turn undeclared income into legally exempt income and cannot authorize a user to breach their tax obligations.
          </p>
        </Section>

        <Section title="42. Tax Information Declared by the Professional">
          <p>
            Where Wisdom allows tax information, tax regime, tax percentage, exemptions, or equivalent information to be configured, the Professional is responsible for providing the correct values.
          </p>
          <p>
            Wisdom may provide technical tools to apply the information entered, but this does not mean that it has provided individualized tax advice.
          </p>
          <p>
            If a Professional provides false or incorrect tax information, they may be liable for the consequences resulting from that declaration.
          </p>
          <p>
            Wisdom may correct, block, or request review of a configuration where there is a legal obligation or an obvious inconsistency.
          </p>
        </Section>

        <Section title="43. Invoicing">
          <p>
            The Service Fee charged by Wisdom and the professional service may correspond to different transactions and issuers.
          </p>
          <p>
            Wisdom will issue documentation relating to its own services where legally required.
          </p>
          <p>
            The invoice relating to the professional service corresponds to the Service Provider.
          </p>
          <p>
            The full rules are set out in the Invoicing and Tax Policy.
          </p>
        </Section>

        <Section title="44. Third-Party Invoicing">
          <p>
            Wisdom may offer the Professional a feature to generate invoices on their behalf and in their name where permitted by law and expressly authorized by the Professional.
          </p>
          <p>
            Wisdom’s involvement in the technical creation of the document does not make Wisdom the provider of the Service or the party responsible for the Professional’s taxes.
          </p>
          <p>
            The Professional remains responsible for checking that the tax information used, taxes applied, exemptions, and other information for which they are responsible are correct.
          </p>
          <p>
            Where the Professional does not delegate this function, they must provide the legally required documentation through their own means.
          </p>
        </Section>

        <Section title="45. Liability for Tax Irregularities">
          <p>
            The Professional may not attribute to Wisdom responsibility for tax violations resulting from:
          </p>
          <ul>
            <li>Failure to declare income.</li>
            <li>Incorrectly declaring their activity.</li>
            <li>Failure to complete a mandatory registration.</li>
            <li>Applying an incorrect tax due to false or incorrect information provided by them.</li>
            <li>Concealing information from Wisdom or the authorities.</li>
            <li>Providing false information about their tax status.</li>
            <li>Failing to file their tax returns.</li>
          </ul>
          <p>
            Wisdom will cooperate with authorities where legally required to do so.
          </p>
          <p>
            The above does not exclude any liability that may correspond to Wisdom for failing to comply with its own legal obligations.
          </p>
        </Section>

        <Section title="46. DAC7 and Reporting to Tax Authorities">
          <p>
            Wisdom will comply with reporting obligations applicable to digital platform operators, including rules derived from DAC7 where applicable.
          </p>
          <p>
            For this purpose, it may request, verify, retain, and disclose information relating to certain Providers.
          </p>
          <p>
            The information may include, where legally required, identity, address, tax residence, tax identification, date of birth, company information, financial account details, consideration received, transactions carried out, and fees or commissions.
          </p>
          <p>
            The fact that Wisdom reports information to a tax authority does not mean that it calculates or pays the Professional’s personal taxes.
          </p>
          <p>
            Each Provider remains responsible for their own tax obligations.
          </p>
        </Section>

        <Section title="47. KYC and Identity Verification">
          <p>
            Wisdom or its financial providers may require identification and verification processes.
          </p>
          <p>
            These checks may require personal information, identity documentation, business information, address, bank account, beneficial owners, or other legally required information.
          </p>
          <p>
            Failure to complete a verification may prevent the user from accepting bookings, receiving funds, or using certain functionalities.
          </p>
          <p>
            Passing a KYC process does not constitute a general certification of a person’s conduct, solvency, professional competence, or tax compliance.
          </p>
        </Section>

        <Section title="48. Cooperation With Authorities">
          <p>
            Wisdom may retain and disclose information where validly required by a competent authority or where there is a legal obligation.
          </p>
          <p>
            This may relate to judicial, tax, or regulatory investigations, fraud prevention, security, or other obligations.
          </p>
          <p>
            Wisdom is not required to conceal transactions or information in order to help a user break the law.
          </p>
        </Section>

        <Section title="49. Wisdom Intellectual Property">
          <p>
            Wisdom’s software, design, interfaces, brand, logos, graphic elements, original texts, databases, documentation, and other proprietary elements are protected by intellectual and industrial property laws.
          </p>
          <p>
            Unless expressly authorized, it is not permitted to:
          </p>
          <ul>
            <li>Substantially copy the application.</li>
            <li>Decompile it outside cases legally permitted.</li>
            <li>Redistribute protected parts.</li>
            <li>Use the brand in a way that creates confusion.</li>
            <li>Create products falsely presented as official.</li>
            <li>Systematically extract or reuse Wisdom databases.</li>
          </ul>
          <p>
            Wisdom grants the user a limited, personal, revocable, non-exclusive, and non-transferable license to use the platform in accordance with these Terms.
          </p>
        </Section>

        <Section title="50. User Content">
          <p>
            Users retain any rights they hold over photographs, descriptions, videos, messages, work, or other content uploaded to Wisdom.
          </p>
          <p>
            By publishing content, the user grants Wisdom a non-exclusive, worldwide, royalty-free license to the extent necessary to store, reproduce, technically adapt, display, and distribute such content within Wisdom and to operate, protect, and promote the platform or the Service itself.
          </p>
          <p>
            This license does not mean that Wisdom acquires ownership of the content.
          </p>
          <p>
            The user declares that they have sufficient rights or authorization to use anything they publish.
          </p>
          <p>
            Wisdom may remove content that infringes third-party rights or these Terms.
          </p>
        </Section>

        <Section title="51. Images and Work Belonging to Third Parties">
          <p>
            A Professional must not publish photographs of work, people, spaces, designs, or works where they do not have the right to do so.
          </p>
          <p>
            Where identifiable people appear, applicable privacy and image rights regulations must be respected.
          </p>
          <p>
            Responsibility for obtaining the necessary authorizations initially lies with the user who publishes the content.
          </p>
        </Section>

        <Section title="52. Content Moderation">
          <p>
            Wisdom may moderate information published by users.
          </p>
          <p>
            Moderation may involve automated systems, internal rules, and human review.
          </p>
          <p>
            Among other purposes, it may be used to detect:
          </p>
          <ul>
            <li>Illegal content.</li>
            <li>Fraud.</li>
            <li>Spam.</li>
            <li>Contact information prohibited in certain contexts.</li>
            <li>Impersonation.</li>
            <li>Review manipulation.</li>
            <li>Harassment.</li>
            <li>Content incompatible with marketplace rules.</li>
          </ul>
          <p>
            Wisdom will seek to apply these measures proportionately and consistently.
          </p>
        </Section>

        <Section title="53. Reporting Content">
          <p>
            Users may have mechanisms available to report profiles, services, messages, reviews, or other content.
          </p>
          <p>
            Deliberately making a false or abusive report may also constitute a breach.
          </p>
          <p>
            Wisdom will assess reports based on the information available and its legal obligations.
          </p>
        </Section>

        <Section title="54. Incidents and Strikes">
          <p>
            Wisdom may record incidents relating to conduct such as attributable cancellations, no-shows, fraud, system circumvention, or breaches of the rules.
          </p>
          <p>
            An individual incident does not necessarily imply suspension of an account.
          </p>
          <p>
            Wisdom may assess the context, severity, repetition, impact, and previous behavior.
          </p>
          <p>
            Accumulated incidents may affect certain functionalities, visibility, or continuation of an account where there is a legitimate and proportionate reason.
          </p>
        </Section>

        <Section title="55. Account Suspension and Restrictions">
          <p>
            Wisdom may restrict or suspend an account where there are reasonable grounds such as:
          </p>
          <ul>
            <li>Serious or repeated breach of these Terms.</li>
            <li>Fraud or risk of fraud.</li>
            <li>Impersonation.</li>
            <li>Manipulation of payments or reviews.</li>
            <li>Failure to complete mandatory verifications.</li>
            <li>Risk to other users.</li>
            <li>Illegal services.</li>
            <li>Outstanding payments.</li>
            <li>A request from an authority.</li>
            <li>Abusive use of the platform.</li>
            <li>Deliberate circumvention of Wisdom’s systems.</li>
          </ul>
          <p>
            Where legally appropriate, Wisdom will inform the user of the measure and the reasons for it.
          </p>
          <p>
            The information provided may be limited where necessary to prevent fraud, preserve an investigation, protect third parties, or comply with a legal obligation.
          </p>
        </Section>

        <Section title="56. Preventive Suspension">
          <p>
            Where there is a sufficiently serious risk, Wisdom may temporarily apply a restriction while investigating.
          </p>
          <p>
            A preventive suspension does not necessarily constitute a final decision.
          </p>
          <p>
            Wisdom will seek to review such situations within a reasonable period based on their complexity.
          </p>
        </Section>

        <Section title="57. Review of Decisions">
          <p>
            Where a moderation, restriction, or suspension decision may be reviewed under applicable law or Wisdom’s rules, the user may contact support and provide additional information.
          </p>
          <p>
            Wisdom may confirm, modify, or remove the measure.
          </p>
        </Section>

        <Section title="58. Account Deletion">
          <p>
            The user may request deletion of their account through the available mechanisms.
          </p>
          <p>
            The account may not necessarily be deleted immediately where there are:
          </p>
          <ul>
            <li>Active bookings.</li>
            <li>Outstanding payments.</li>
            <li>Disputes.</li>
            <li>Active recurring bookings.</li>
            <li>Tax or documentation obligations.</li>
            <li>Fraud investigations.</li>
            <li>Other obligations requiring information to be retained.</li>
          </ul>
          <p>
            Data that must legally be retained will be processed in accordance with the Privacy Policy.
          </p>
        </Section>

        <Section title="59. Voluntary Closure">
          <p>
            Ceasing to use Wisdom does not automatically eliminate obligations arising from bookings, payments, or services previously carried out.
          </p>
          <p>
            Outstanding amounts, invoices, disputes, and other obligations existing before closure will remain enforceable.
          </p>
        </Section>

        <Section title="60. Communications">
          <p>
            Wisdom may use email, push notifications, in-app notices, or other means associated with the account to communicate information about:
          </p>
          <ul>
            <li>Bookings.</li>
            <li>Payments.</li>
            <li>Invoices.</li>
            <li>Security.</li>
            <li>Verifications.</li>
            <li>Disputes.</li>
            <li>Premium.</li>
            <li>Contractual changes.</li>
            <li>Incidents.</li>
            <li>Support.</li>
          </ul>
          <p>
            Communications strictly necessary to perform the service, protect an account, or comply with legal obligations are not advertising communications.
          </p>
        </Section>

        <Section title="61. Device Notifications">
          <p>
            Users can control certain notification permissions from their device.
          </p>
          <p>
            Disabling notifications does not eliminate a contractual obligation or automatically modify a booking.
          </p>
          <p>
            It is the user’s responsibility to reasonably check the status of active transactions when notifications are disabled.
          </p>
        </Section>

        <Section title="62. Privacy">
          <p>
            The processing of personal data is governed by Wisdom’s Privacy Policy.
          </p>
          <p>
            That policy explains what data is collected, why it is used, who it may be shared with, how long it is retained, and what rights the user has.
          </p>
        </Section>

        <Section title="63. Changes to Wisdom">
          <p>
            Wisdom may develop, replace, add, or remove functionalities.
          </p>
          <p>
            Ordinary changes intended to improve the product, security, or compatibility may be made without modifying these Terms.
          </p>
          <p>
            Where a change materially alters the user’s contractual rights or obligations, the relevant rules concerning modification of terms will apply.
          </p>
        </Section>

        <Section title="64. Changes to These Terms">
          <p>
            Wisdom may modify these Terms where there is a justified reason, for example:
          </p>
          <ul>
            <li>Legislative changes.</li>
            <li>New functionalities.</li>
            <li>Relevant changes to payment systems.</li>
            <li>New regulatory obligations.</li>
            <li>Security needs.</li>
            <li>Reasonable changes to the operating model.</li>
            <li>Correction of ambiguous or incomplete clauses.</li>
          </ul>
          <p>
            Where a modification is significant, Wisdom will inform the user through an appropriate channel before it becomes applicable where required by law.
          </p>
          <p>
            Changes will not be applied retroactively to unjustifiably alter economic rights already acquired.
          </p>
          <p>
            Where a modification requires new express acceptance, Wisdom will request it.
          </p>
        </Section>

        <Section title="65. Electronic Contracting">
          <p>
            Contracts entered into through Wisdom may be formalized electronically.
          </p>
          <p>
            Before carrying out a transaction involving a payment obligation, Wisdom will display the essential information necessary for the user to identify what they are contracting and the amount they must pay or how it will be calculated.
          </p>
          <p>
            The user will have the opportunity to review the relevant information before confirming.
          </p>
          <p>
            Wisdom may retain electronic evidence of acceptances, transactions, and conditions applicable to a booking.
          </p>
        </Section>

        <Section title="66. Errors">
          <p>
            Where the user detects an error in the details of a transaction before confirming it, they must correct it using the available tools.
          </p>
          <p>
            If the error is detected later, the relevant modification, cancellation, or support mechanisms must be used.
          </p>
          <p>
            An obvious technical error in a price, availability, or other information does not automatically give a user the right to exploit in bad faith a clearly erroneous condition.
          </p>
          <p>
            Wisdom will act in accordance with applicable law and the specific circumstances.
          </p>
        </Section>

        <Section title="67. Languages">
          <p>
            Wisdom may be offered in several languages.
          </p>
          <p>
            Translations are intended to facilitate access to the platform.
          </p>
          <p>
            Where there is a relevant discrepancy between versions and the law permits a reference version to be designated, the version indicated by Wisdom in the relevant publication will be used.
          </p>
          <p>
            In any event, this rule may not be used to deprive a consumer of legally required information in an understandable form.
          </p>
        </Section>

        <Section title="68. Applicable Law">
          <p>
            These Terms are governed by Spanish law, without prejudice to any mandatory rules that may apply to the user due to their place of residence, consumer status, or other circumstances.
          </p>
          <p>
            The choice of Spanish law does not constitute a waiver by consumers of the mandatory protections granted to them by applicable law.
          </p>
        </Section>

        <Section title="69. Jurisdiction">
          <p>
            Where the user is a consumer, any dispute will be submitted to the courts and tribunals competent under applicable law.
          </p>
          <p>
            These Terms do not require the consumer to litigate exclusively before a court that is not legally competent for them.
          </p>
          <p>
            Where the relationship is exclusively between Wisdom and a user acting as a businessperson or professional and the law permits jurisdiction to be agreed, the parties may submit their disputes to the courts corresponding to the owner of Wisdom’s registered address, unless another mandatory jurisdiction applies.
          </p>
        </Section>

        <Section title="70. Dispute Resolution">
          <p>
            Before initiating formal proceedings, the user may contact support to attempt to resolve an issue.
          </p>
          <p>
            This mechanism is voluntary and does not prevent the exercise of rights before authorities, consumer bodies, or courts where applicable.
          </p>
        </Section>

        <Section title="71. Partial Invalidity">
          <p>
            If a clause of these Terms is declared null, invalid, or unenforceable, this will not automatically affect the remainder of the document where it can validly remain in force without that clause.
          </p>
          <p>
            The affected provision will be interpreted or replaced in accordance with applicable law to the extent legally possible.
          </p>
        </Section>

        <Section title="72. No Waiver">
          <p>
            The fact that Wisdom does not immediately exercise a right in response to a breach does not mean that it permanently waives its right to exercise it later.
          </p>
          <p>
            Likewise, an exception applied in a specific case does not automatically modify the general rules.
          </p>
        </Section>

        <Section title="73. Precedence of Specific Conditions">
          <p>
            Certain functionalities have more specific policies.
          </p>
          <p>
            Where there is a conflict regarding a particular matter, the specific policy will prevail for that matter, always within the limits permitted by law.
          </p>
          <p>
            These include:
          </p>
          <ul>
            <li>Booking Policy.</li>
            <li>Cancellation Policy.</li>
            <li>Invoicing and Tax Policy.</li>
            <li>Premium Policy.</li>
            <li>Wisdom Guarantee.</li>
            <li>Privacy Policy.</li>
          </ul>
        </Section>

        <Section title="74. Contact">
          <p>
            For questions relating to these Terms or the operation of Wisdom, you may contact:
          </p>
          <p>
            Wisdom<br />
            Owner: Oier Hernanz Arroyo<br />
            Email: <a href="mailto:hello@wisdomapp.es">hello@wisdomapp.es</a><br />
            Website: wisdomapp.es
          </p>
        </Section>

        <Section title="75. Acceptance">
          <p>
            By accepting these Terms, you declare that you have had the opportunity to read them before using the functionalities to which they apply.
          </p>
          <p>
            Acceptance of these Terms does not constitute a waiver of any right that applicable law recognizes as non-waivable.
          </p>
        </Section>

        <footer className="privacy-policy-footer">Wisdom</footer>
      </article>
    </main>
  );
}
