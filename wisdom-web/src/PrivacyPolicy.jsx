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
        <p className="privacy-policy-kicker">Last updated: September 16, 2026</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-policy-intro">
          At Wisdom, we take the privacy and protection of our users’ personal data seriously.
        </p>
        <p>
          This Privacy Policy clearly explains what information we collect, why we use it, who we may share it with, how long we retain it, and what rights you have when you use the Wisdom application, our website, and the services associated with the platform.
        </p>
        <p>
          Wisdom operates as a marketplace that connects people looking for services with people or companies offering them. For this reason, certain data processing activities are necessary to manage accounts, profiles, searches, bookings, communications, payments, collections, invoicing, verifications, support, and legal obligations.
        </p>
        <p>
          This Privacy Policy is for informational purposes. Where processing requires your consent, we will request it specifically. The use of Wisdom is also governed by our Terms and Conditions and by the policies applicable to each functionality.
        </p>

        <Section title="1. Data Controller">
          <p>
            The controller responsible for the personal data managed directly by Wisdom is:
          </p>
          <p>
            Owner: Oier Hernanz Arroyo<br />
            Trade name: Wisdom<br />
            Address: Carrer de la Font dels Reis, 60, Mataró<br />
            Email: <a href="mailto:hello@wisdomapp.es">hello@wisdomapp.es</a><br />
            Website: wisdomapp.es
          </p>
          <p>
            Wisdom is the trade name under which the controller provides and manages the platform’s services.
          </p>
          <p>
            For certain processing activities related to payments, identity verification, invoicing, or other services provided by external entities, other controllers or processors may be involved, as explained in this Policy.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>
            The information we process depends on how you use Wisdom. A person may use the platform as a client, as a professional, or in both roles.
          </p>

          <h3>A) Account and profile information</h3>
          <p>
            When you create or manage an account, we may collect information such as your first and last name, username, email address, profile photo, phone number where necessary, securely stored password or credentials associated with your account, and language, currency, appearance, and notification preferences.
          </p>
          <p>
            If you use Apple, Google, or another compatible provider to sign in, we will receive the information that such provider allows us to obtain in accordance with your account settings and permissions, such as an identifier, name, or email address.
          </p>
          <p>
            Certain profile information may be visible to other users where necessary to use the marketplace.
          </p>

          <h3>B) Professional and service information</h3>
          <p>
            If you publish or offer services, we may process the information you provide to create and manage your activity within Wisdom, including your professional name, photograph, description, experience, background, languages, images, previous work, categories, tags, prices, availability, location or service area, and other information associated with your services.
          </p>
          <p>
            We also process information relating to your activity on the platform, such as requests received, bookings completed, response time, cancellations, ratings, number of services completed, and other metrics necessary to manage your profile, reputation, and the operation of Wisdom.
          </p>
          <p>
            Information that you expressly publish as part of a service or professional profile may be visible to other users.
          </p>

          <h3>C) Bookings and provision of services</h3>
          <p>
            When you make, receive, or manage a booking, we may process the information necessary to organize it, including the service booked, the client and professional involved, date and time, duration, frequency or recurrence, price, booking status, description or instructions, modifications, cancellations, incidents, payments, refunds, assistance, and other associated information.
          </p>
          <p>
            When an address is necessary to provide an in-person service, the booking address may be shared with the relevant professional. We do not publicly display users’ private addresses or professionals’ exact locations when it is not necessary to show them.
          </p>
          <p>
            Wisdom keeps records of the booking lifecycle in order to properly manage requests, acceptances, changes, cancellations, payments, disputes, and support.
          </p>

          <h3>D) Location and addresses</h3>
          <p>
            Wisdom may process location data to display relevant services, calculate distances, verify service areas, facilitate searches, or complete bookings.
          </p>
          <p>
            This data may include addresses entered or saved by the user, coordinates associated with those addresses and, where the user has granted the corresponding permission, the location provided by the device.
          </p>
          <p>
            Where applicable, we may also use technical information such as the IP address to approximately estimate the country, region, or city from which the service is being used, for example to improve results, security, or regional settings.
          </p>
          <p>
            Access to the device’s precise location will only take place where the functionality requires it and in accordance with the operating system’s permissions. You can withdraw these permissions from your device settings.
          </p>

          <h3>E) Chats, files, and communications</h3>
          <p>
            Wisdom allows messages to be exchanged between clients, professionals, and support. We may process the content of conversations, messages, images, documents, attachments, replies, sending dates, read status, and other metadata necessary to provide the messaging service.
          </p>
          <p>
            We may use automated systems to detect contact information, attempts to circumvent platform rules, fraud, spam, abuse, or content contrary to our policies.
          </p>
          <p>
            Where necessary to investigate an incident, dispute, report, fraud, or possible breach, Wisdom’s authorized team may access the relevant information from a conversation.
          </p>
          <p>
            You should not communicate particularly sensitive data through Wisdom unless it is necessary for the provision of the service.
          </p>

          <h3>F) Favorites, lists, reviews, and user-generated content</h3>
          <p>
            We may store services you save as favorites, lists you create, associated notes, invitations or collaborations on lists, and other preferences related to the use of the platform.
          </p>
          <p>
            When you publish a review, we may process and publicly display the rating, comment, images you have added, related service, and profile information necessary to reasonably identify the review.
          </p>
          <p>
            Reviews form part of Wisdom’s reputation and trust system and may remain linked to the activity carried out even if certain parts of the profile subsequently change, unless their deletion is required by law or under our policies.
          </p>

          <h3>G) Payments, collections, and refunds</h3>
          <p>
            Wisdom uses specialized providers to manage payments and money movements.
          </p>
          <p>
            When a client makes a payment, we may process information relating to the transaction, such as amount, currency, status, transaction identifiers, method used, refunds, payment issues, and limited payment method data.
          </p>
          <p>
            Full bank card details are handled by specialized payment providers such as Stripe. Wisdom does not need to store your full card number or security code in order to operate normally.
          </p>
          <p>
            We may retain identifiers or limited information provided by the payment provider, such as card type, last digits, country, payment method status, or technical identifiers necessary to make subsequent authorized charges, issue refunds, or manage a booking.
          </p>
          <p>
            When the payment method for a booking is temporarily retained in order to make the final charge, it will only be used in accordance with the conditions accepted during the booking and the rules of the payment system.
          </p>

          <h3>H) Banking information and professional verification</h3>
          <p>
            In order for a professional to receive payments, it may be necessary to collect or transmit identification, tax, or banking information.
          </p>
          <p>
            Depending on the country, type of professional, and requirements of the payment provider, this information may include legal name, date of birth, address, phone number, nationality, tax identification number, DNI, NIE, passport or other identity document, company information, representatives, directors or beneficial owners, as well as IBAN, bank account, or other information necessary to make transfers.
          </p>
          <p>
            Some of this information may be collected directly by Stripe or another payment and verification provider. In other cases, Wisdom may collect it in order to securely transmit it to the relevant provider or to comply with its own obligations.
          </p>
          <p>
            Identity documents and banking details are never displayed publicly.
          </p>
          <p>
            Stripe and other financial providers may request additional information when necessary to comply with their customer identification and verification obligations, fraud prevention, financial regulations, or requirements for enabling payments and transfers.
          </p>

          <h3>I) Tax and invoicing information</h3>
          <p>
            Wisdom may process the data necessary to issue, manage, retain, or facilitate invoices and other documents relating to transactions carried out on the platform.
          </p>
          <p>
            This data may include name or company name, NIF, NIE, CIF or equivalent, tax address, country of residence, VAT number, transaction information, amounts, taxes, bookings, and associated documents.
          </p>
          <p>
            When a professional expressly authorizes Wisdom to issue invoices on their behalf and in their name, we will process the tax data necessary to provide that service and retain evidence of such authorization, which may include date, time, IP address, and other information necessary to demonstrate consent to the delegation of invoicing.
          </p>
          <p>
            Subsequent changes to tax data will not automatically modify documents that have already been issued where applicable regulations require them to be kept unchanged.
          </p>

          <h3>J) Technical, usage, and security information</h3>
          <p>
            When you use Wisdom, we may automatically collect certain technical information necessary to provide, protect, and improve the service, such as IP address, device type, operating system, application version, language, time zone, technical identifiers, operational events, errors, sessions, access dates and times, and security-related logs.
          </p>
          <p>
            We may also record certain actions performed within the account where necessary to prevent fraud, investigate unauthorized access, maintain platform security, or provide evidence of relevant actions.
          </p>

          <h3>K) Information obtained from third parties</h3>
          <p>
            We may receive information from providers necessary to provide our services, including authentication providers such as Apple or Google, payment and verification providers such as Stripe, app stores such as the Apple App Store or Google Play, map and address providers, and other technical providers.
          </p>
          <p>
            The information received will depend on the functionality used and the applicable conditions and permissions of each external service.
          </p>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>
            We use the information collected for the following purposes.
          </p>

          <h3>A) Providing and managing Wisdom</h3>
          <p>
            We process the data necessary to create and maintain accounts, display profiles and services, perform searches, manage favorites and lists, facilitate communications, process bookings, organize calendars, manage payments and refunds, issue documents, manage Premium subscriptions, and provide the other functions of the platform.
          </p>
          <p>
            The main legal basis for these processing activities is the performance of the contract between the user and Wisdom or the implementation of measures requested by the user prior to entering into a contract.
          </p>

          <h3>B) Facilitating the relationship between clients and professionals</h3>
          <p>
            We share the information strictly necessary between the parties to a booking so that the service can be properly organized and provided.
          </p>
          <p>
            This may include basic identity information, service information, date, time, instructions, service address where applicable, and communications relating to the booking.
          </p>
          <p>
            Financial information, identity documents, or private tax information are not shared with other users unless legally necessary for the contractual relationship, invoicing, or compliance with an obligation.
          </p>

          <h3>C) Managing payments and transfers</h3>
          <p>
            We process the information necessary to make deposits, final charges, refunds, transfers to professionals, manage payment issues, prevent fraud, and reconcile transactions.
          </p>
          <p>
            For this purpose, we may share information with Stripe, financial institutions, payment providers, and other participants necessary for the transaction.
          </p>

          <h3>D) Verifying professionals and preventing fraud</h3>
          <p>
            We may use identity, account, device, booking, payment, and behavioral information to verify users, protect clients and professionals, detect fraudulent activity, prevent abuse, prevent unlawful use of the platform, and protect the integrity of Wisdom.
          </p>
          <p>
            The legal basis may be the performance of the contract, compliance with legal obligations, and the legitimate interests of Wisdom and its users in having a secure platform.
          </p>

          <h3>E) Invoicing and tax compliance</h3>
          <p>
            We process personal and tax data to generate, manage, send, and retain invoices, receipts, corrective documents, booking summaries, accounting records, and other necessary documentation.
          </p>
          <p>
            Where Wisdom issues documents on behalf of a professional, it will do so in accordance with the corresponding authorization and applicable agreement.
          </p>

          <h3>F) Compliance with legal obligations, DAC7, and authority requests</h3>
          <p>
            Wisdom may collect, verify, retain, and disclose information where necessary to comply with legal obligations applicable to digital platform operators.
          </p>
          <p>
            Where Wisdom qualifies as a platform operator required to report information and a professional qualifies as a reportable seller, we may process data such as their identity, address, tax residence, tax identification number, date of birth where applicable, information on the activity carried out, consideration received, commissions or fees, information relating to accounts used to receive payments, and other information required by applicable regulations, including DAC7.
          </p>
          <p>
            This information may be disclosed to the Spanish Tax Agency or other competent authorities and, where appropriate under the legal information exchange system, subsequently transmitted to authorities in other Member States of the European Union or participating jurisdictions.
          </p>
          <p>
            These processing activities are carried out to comply with legal obligations and do not depend on the user’s consent.
          </p>

          <h3>G) Security, support, and dispute resolution</h3>
          <p>
            We may use information about bookings, communications, payments, access, and activity to handle support requests, investigate incidents, resolve disputes, manage reports, and protect the rights of Wisdom, its users, or third parties.
          </p>

          <h3>H) Communications and notifications</h3>
          <p>
            We use your contact and device information to send you necessary communications relating to your account, bookings, chats, payments, invoices, security, disputes, transfers, verification, Premium, or pending actions.
          </p>
          <p>
            These communications form part of the operation of the service and some cannot be disabled while you maintain an account if they are necessary to perform the contract, ensure security, or comply with legal obligations.
          </p>
          <p>
            Promotional communications, discounts, news, or other commercial communications will only be sent where there is a valid legal basis, and you may stop receiving them through the available mechanisms.
          </p>

          <h3>I) Improving Wisdom</h3>
          <p>
            We may analyze usage information in aggregate or individually where necessary to detect errors, understand how features are used, improve searches and recommendations, prevent problems, develop new features, and optimize the experience.
          </p>
          <p>
            We will always seek to use the minimum amount of information necessary for these purposes.
          </p>
        </Section>

        <Section title="4. Legal Bases for Processing">
          <p>
            Depending on the purpose, Wisdom processes personal data on one or more of the following legal bases:
          </p>
          <p>
            <strong>Performance of a contract:</strong> where processing is necessary to create an account, display a service, manage a booking, make a payment, maintain a conversation, or provide a requested functionality.
          </p>
          <p>
            <strong>Legal obligation:</strong> where we must retain documentation, issue certain invoices, respond to authorities, comply with tax obligations, apply DAC7, or comply with applicable regulatory obligations.
          </p>
          <p>
            <strong>Legitimate interest:</strong> where necessary to protect the platform, prevent fraud, ensure security, defend claims, reasonably improve the service, or protect other users, always after considering the rights and interests of the persons concerned.
          </p>
          <p>
            <strong>Consent:</strong> where the law requires specific authorization, for example for certain device permissions, commercial communications, or processing activities requiring express consent. You may withdraw your consent at any time without affecting the lawfulness of processing carried out previously.
          </p>
        </Section>

        <Section title="5. Mandatory and Optional Data">
          <p>
            Not all data requested by Wisdom is mandatory.
          </p>
          <p>
            Where information is optional, you may decide whether to provide it. However, certain functionalities require specific information in order to work.
          </p>
          <p>
            For example, certain payments cannot be made without a valid payment method, an in-person service cannot be provided without knowing the location necessary for the booking, certain invoices cannot be issued without the corresponding tax information, and a professional cannot be allowed to receive payments where the required identification requirements have not been completed.
          </p>
          <p>
            Where the law requires Wisdom to obtain certain information from a professional, failure to provide that information may prevent or restrict access to the affected functions until the necessary information is completed.
          </p>
        </Section>

        <Section title="6. Payments, Stripe, and Financial Providers">
          <p>
            Wisdom uses specialized providers to process payments, manage payment methods, verify professionals, and make transfers.
          </p>
          <p>
            Stripe may process information as an independent controller or as a service provider depending on the type of transaction and applicable relationship. Its own terms and privacy policies may also apply.
          </p>
          <p>
            The information Stripe needs to verify a professional depends, among other factors, on the country, type of activity, whether the professional is an individual or legal entity, business structure, and the financial services that need to be enabled.
          </p>
          <p>
            In some cases, Stripe may request additional documents or temporarily prevent payments or transfers until verification is completed.
          </p>
          <p>
            Wisdom may receive information about verification status, outstanding requirements, account identifiers, payments, refunds, or transfers without necessarily receiving all sensitive data used by Stripe to perform its checks.
          </p>
          <p>
            On iOS, when a Premium subscription is purchased through in-app purchases, the subscription payment and payment method are managed by Apple. Wisdom may receive the information necessary to determine the product purchased, subscription status, renewals, cancellations, refunds, or validity of Premium access, but does not receive the full card number used in the App Store.
          </p>
        </Section>

        <Section title="7. DAC7 and Professionals’ Tax Obligations">
          <p>
            The European DAC7 rules and their national implementing legislation establish due diligence and information-reporting obligations for certain digital platform operators.
          </p>
          <p>
            Where these rules apply to Wisdom, we may request from professionals the information necessary to determine their identity and tax residence, establish whether they are subject to reporting, and comply with the corresponding reporting obligations.
          </p>
          <p>
            The data processed for this purpose may differ from the data required by Stripe to make payments. The fact that a professional has successfully passed verification by a financial provider does not necessarily eliminate the independent tax obligations that may apply to Wisdom.
          </p>
          <p>
            Wisdom may verify the information provided using documents, verification providers, legally permitted sources, or other mechanisms provided for by applicable regulations.
          </p>
          <p>
            The processing and disclosure of this data is intended to comply with Wisdom’s legal obligations as a platform. Information provided to tax authorities may subsequently be exchanged between countries in accordance with European regulations and applicable international agreements.
          </p>
        </Section>

        <Section title="8. Invoicing on Behalf of Professionals">
          <p>
            Wisdom may offer professionals a system through which the platform generates tax documents on behalf of and in the name of the professional where the professional has expressly authorized this arrangement.
          </p>
          <p>
            In these cases, Wisdom will use the professional’s and client’s tax data necessary to generate, deliver, and retain the corresponding documents.
          </p>
          <p>
            Authorization for Wisdom to manage the issuance of an invoice does not make Wisdom the provider of the professional service or transfer the service provider’s own tax obligations to Wisdom. This matter is explained in greater detail in the Terms and Conditions and the Invoicing and Tax Policy.
          </p>
          <p>
            From a data protection perspective, Wisdom may act as controller in relation to its own processing and, where legally appropriate, process certain data on behalf of the professional for the administrative issuance of documentation.
          </p>
        </Section>

        <Section title="9. Who We Share Information With">
          <p>
            Wisdom does not sell your personal data.
          </p>
          <p>
            We may disclose or allow access to certain information in the following cases:
          </p>

          <h3>A) Other users</h3>
          <p>
            We share with clients and professionals the information necessary to display profiles, manage bookings, and provide the contracted services.
          </p>

          <h3>B) Technology providers</h3>
          <p>
            We may work with companies that provide hosting, storage, databases, email delivery, notifications, support, maps, technical analytics, security, fraud prevention, or other functions necessary to operate Wisdom.
          </p>
          <p>
            These providers may only process data in accordance with applicable contractual and legal conditions.
          </p>

          <h3>C) Payment and verification providers</h3>
          <p>
            We may disclose information to Stripe, financial institutions, payment networks, wallet providers, and other participants where necessary to make payments, refunds, transfers, verify professionals, or prevent fraud.
          </p>

          <h3>D) Apple, Google, and app stores</h3>
          <p>
            When you use their authentication systems, purchases, subscriptions, notifications, or other integrated services, an exchange of information may take place where necessary to provide those functions.
          </p>

          <h3>E) Public authorities and government bodies</h3>
          <p>
            We may disclose data to tax, judicial, law enforcement, regulatory, and other public authorities where there is a legal obligation, a valid request, or where necessary to bring, exercise, or defend legal claims.
          </p>
          <p>
            This includes disclosures required under DAC7 where applicable.
          </p>

          <h3>F) Business transactions</h3>
          <p>
            In the event of a merger, acquisition, restructuring, financing, asset transfer, or change of control of Wisdom, data may form part of the transaction where necessary and provided that the corresponding legal safeguards are respected.
          </p>
        </Section>

        <Section title="10. International Data Transfers">
          <p>
            Some providers used by Wisdom may operate from countries outside the European Economic Area.
          </p>
          <p>
            Where an operation involves an international transfer of data, Wisdom will apply the mechanisms required by data protection regulations, such as European Commission adequacy decisions, standard contractual clauses, legally recognized frameworks, or other valid safeguards.
          </p>
          <p>
            You may request additional information about the applicable safeguards using the contact details provided in this Policy.
          </p>
        </Section>

        <Section title="11. Retention of Information">
          <p>
            We retain data only for as long as necessary for the purposes for which it was collected and, subsequently, for the periods necessary to comply with legal obligations or address potential liabilities.
          </p>
          <p>
            Account data may be retained while you keep your account active.
          </p>
          <p>
            When you request deletion of your account, we will delete or anonymize data that is no longer necessary, but certain records may remain restricted or retained where there is a legal obligation or a legitimate need to defend against claims.
          </p>
          <p>
            Data relating to bookings, payments, refunds, disputes, or security may be retained for the periods necessary to manage liabilities arising from those transactions.
          </p>
          <p>
            Tax and accounting documentation will be retained for the periods legally required. In Spain, certain tax obligations have limitation periods of four years and business documentation may be subject to retention obligations of six years or other specific periods.
          </p>
          <p>
            Invoices and documents already issued are not deleted or modified simply because a user closes their account where legislation requires them to be retained.
          </p>
          <p>
            Records necessary to comply with DAC7 will be retained in accordance with the periods established by applicable regulations.
          </p>
          <p>
            Data processed solely on the basis of consent will cease to be used for the relevant purpose when you withdraw that consent, unless another legal basis permits or requires its retention.
          </p>
        </Section>

        <Section title="12. Account Deletion">
          <p>
            You may request deletion of your account through the options available in Wisdom or by contacting us.
          </p>
          <p>
            Deleting an account does not necessarily mean the immediate deletion of all associated data.
          </p>
          <p>
            Wisdom may retain, under appropriate restrictions, data necessary to comply with tax, accounting, regulatory, anti-fraud, or security obligations, or to bring, exercise, or defend legal claims.
          </p>
          <p>
            Deleting an account also does not allow tax documents that must remain immutable to be altered or information affecting the legitimate rights of other persons, such as certain transaction or booking records, to be deleted.
          </p>
        </Section>

        <Section title="13. Information Security">
          <p>
            Wisdom applies technical and organizational measures intended to protect data against loss, unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p>
            These measures may include access controls, encryption where appropriate, authentication, security logs, separation of permissions, specialized providers, backups, and mechanisms for detecting anomalous activity.
          </p>
          <p>
            Payment methods and certain particularly sensitive data are managed using specialized providers and tokenization mechanisms or equivalent protections.
          </p>
          <p>
            However, no system connected to the Internet can guarantee absolute security. If we detect a security breach that must be reported to users or an authority under applicable law, we will act in accordance with those obligations.
          </p>
        </Section>

        <Section title="14. Moderation, Fraud, and Automated Systems">
          <p>
            Wisdom may use rules and automated systems to protect the platform.
          </p>
          <p>
            For example, certain systems may detect contact information improperly shared in chat, fraud attempts, spam, anomalous behavior, abuse of payment systems, or breaches of our policies.
          </p>
          <p>
            These tools may block content, request additional checks, or flag activity for review.
          </p>
          <p>
            Where an automated decision may produce legal effects or significantly affect a person within the meaning of data protection regulations, Wisdom will apply the legally required safeguards, including the possibility of requesting human intervention where applicable.
          </p>
        </Section>

        <Section title="15. Communications and Notifications">
          <p>
            Wisdom uses different channels to keep users informed, including in-app notifications, push notifications, local notifications, and email.
          </p>
          <p>
            Communications relating to bookings, messages, payments, invoices, refunds, security, verifications, disputes, or essential operation of the service are considered operational or transactional communications.
          </p>
          <p>
            Users may manage certain preferences, such as push notification permissions or non-essential communications.
          </p>
          <p>
            Not all communications necessary for security, legal compliance, payments, or execution of bookings can be disabled while using the service.
          </p>
          <p>
            Promotional communications will be handled separately from essential communications and will provide the opt-out or unsubscribe mechanisms required by applicable regulations.
          </p>
        </Section>

        <Section title="16. Particularly Sensitive Data">
          <p>
            Wisdom allows users to book services in a wide variety of fields, including some related to health, wellness, advice, or other activities that could lead a user to disclose sensitive information.
          </p>
          <p>
            Wisdom does not request medical records and does not intend to collect special categories of personal data except where a functionality legitimately requires it.
          </p>
          <p>
            We recommend that you do not include medical, biometric, ideological, religious, sexual, or other particularly sensitive information in profiles, reviews, chats, or descriptions unless it is genuinely necessary.
          </p>
          <p>
            If it becomes necessary to process special categories of data, Wisdom will apply a legal basis and the additional safeguards required by the relevant legislation.
          </p>
        </Section>

        <Section title="17. Privacy of Minors">
          <p>
            Wisdom is intended for persons over the age of 18.
          </p>
          <p>
            We do not knowingly allow persons under the age of 18 to use the platform as registered users or professionals.
          </p>
          <p>
            If we detect that an account has been created in breach of this requirement, we may take the necessary measures to restrict or delete it and manage the corresponding data in accordance with our legal obligations.
          </p>
        </Section>

        <Section title="18. Your Rights">
          <p>
            If the data protection regulations of your territory apply, you may have the right to:
          </p>
          <ul>
            <li>Access the personal data we process about you.</li>
            <li>Request the correction of inaccurate or incomplete data.</li>
            <li>Request the deletion of your data where legally applicable.</li>
            <li>Request restriction of certain processing activities.</li>
            <li>Object to processing based on legitimate interests in the circumstances provided by law.</li>
            <li>Receive certain data in a structured, commonly used, and machine-readable format and request its portability where applicable.</li>
            <li>Withdraw previously given consent at any time.</li>
            <li>Request information about the safeguards applicable to certain international transfers.</li>
            <li>Exercise rights relating to automated individual decisions where applicable.</li>
          </ul>
          <p>
            To exercise these rights, you may write to <a href="mailto:hello@wisdomapp.es">hello@wisdomapp.es</a>. We may request additional information where reasonably necessary to verify your identity and protect your data.
          </p>
          <p>
            Exercising these rights is free of charge, except in the exceptional cases provided for by law.
          </p>
          <p>
            You also have the right to lodge a complaint with a data protection authority. If you are in Spain, you may contact the Spanish Data Protection Agency (AEPD).
          </p>
        </Section>

        <Section title="19. Users’ Responsibility for Information Provided">
          <p>
            Users must provide truthful, accurate, and up-to-date information where necessary to use Wisdom.
          </p>
          <p>
            A user must not provide another person’s personal data unless they have a lawful basis to do so.
          </p>
          <p>
            Professionals are responsible for keeping up to date the information necessary to carry out their activity and comply with their own legal and tax obligations.
          </p>
          <p>
            The use of verification, invoicing, or communication systems by Wisdom does not replace the legal obligations that apply individually to clients, professionals, or companies.
          </p>
        </Section>

        <Section title="20. Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy when our functionalities, providers, processing practices, or applicable regulations change.
          </p>
          <p>
            The date of the latest modification will appear at the beginning of the document.
          </p>
          <p>
            Where a change is material and the law requires the user to be specifically informed, we will use reasonable means such as notices within the application, email, or other appropriate channels.
          </p>
          <p>
            If new processing requires consent, merely updating this Policy will not replace that consent, and it will be requested separately where applicable.
          </p>
        </Section>

        <Section title="21. Contact">
          <p>
            If you have questions about this Privacy Policy, about the processing of your personal data, or wish to exercise any of your rights, you can contact us at:
          </p>
          <p>
            <a href="mailto:hello@wisdomapp.es">hello@wisdomapp.es</a>
          </p>
        </Section>

        <footer className="privacy-policy-footer">Wisdom</footer>
      </article>
    </main>
  );
}
