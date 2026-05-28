import styles from './LegalPage.module.css';

const pages = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: January 2025',
    body: (
      <>
        <h3>Information We Collect</h3>
        <p>
          When you contact us through our website or WhatsApp, we collect the information you
          voluntarily provide: your name, email address, phone number, and project details.
          We use this information solely to respond to your inquiry and provide our services.
        </p>

        <h3>How We Use Your Information</h3>
        <p>We use your information only for the following purposes:</p>
        <ul>
          <li>To respond to your inquiries and provide quotes</li>
          <li>To communicate with you about your project</li>
          <li>To improve our services based on feedback</li>
          <li>To send occasional updates if you have opted in</li>
        </ul>

        <h3>Data Protection</h3>
        <p>
          We take reasonable measures to protect your personal information from unauthorized
          access, alteration, or disclosure. We do not sell, trade, or share your personal
          information with third parties except as required by law.
        </p>

        <h3>Cookies</h3>
        <p>
          Our website uses minimal cookies necessary for the dark/light mode preference to
          function. We do not use tracking cookies or third-party analytics that collect
          personal data.
        </p>

        <h3>Third-Party Services</h3>
        <p>
          When you contact us via WhatsApp, your communication is governed by Meta&apos;s
          Privacy Policy. When you email us, your communication is handled by standard email
          protocols. We recommend reviewing the privacy policies of these platforms.
        </p>

        <h3>Your Rights</h3>
        <p>
          You have the right to request access to, correction of, or deletion of your
          personal data held by us. To exercise these rights, contact us at
          aucxley@gmail.com.
        </p>

        <h3>Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted
          on this page with an updated revision date.
        </p>

        <h3>Contact</h3>
        <p>
          If you have questions about this Privacy Policy, please reach out via
          email at aucxley@gmail.com or WhatsApp at +254 796 606 363.
        </p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: January 2025',
    body: (
      <>
        <h3>Agreement to Terms</h3>
        <p>
          By using our website and services, you agree to these Terms of Service.
          If you do not agree, please do not use our services.
        </p>

        <h3>Services</h3>
        <p>
          Aucxley Solutions provides website development, web application development,
          e-commerce solutions, and related digital services. The specific scope, timeline,
          and pricing for each project will be outlined in a separate agreement or proposal.
        </p>

        <h3>Payment Terms</h3>
        <p>
          Payment terms are agreed upon during the proposal stage. Typically, a deposit
          is required before work begins, with the balance due upon completion or as
          otherwise specified in the project agreement. All prices are in Kenyan Shillings
          (KES) unless otherwise stated.
        </p>

        <h3>Project Timeline</h3>
        <p>
          Estimated timelines are provided in good faith. Delays may occur due to factors
          beyond our control, including late client feedback, third-party dependencies,
          or unforeseen technical challenges. We will communicate any changes promptly.
        </p>

        <h3>Client Responsibilities</h3>
        <p>You agree to:</p>
        <ul>
          <li>Provide timely feedback and approvals to keep the project on schedule</li>
          <li>Supply all necessary content, images, and branding materials</li>
          <li>Ensure you have the rights to any materials you provide</li>
          <li>Make payments according to the agreed schedule</li>
        </ul>

        <h3>Intellectual Property</h3>
        <p>
          Upon full payment, you own the final delivered product. We reserve the right
          to showcase the work in our portfolio unless otherwise agreed in writing.
          We retain ownership of any tools, frameworks, or libraries used in development.
        </p>

        <h3>Confidentiality</h3>
        <p>
          We treat all client information and project details as confidential and will
          not share them with third parties without your consent, except as required by law.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          Aucxley Solutions is not liable for any indirect, incidental, or consequential
          damages arising from the use of our services. Our total liability is limited to
          the amount paid for the specific service giving rise to the claim.
        </p>

        <h3>Governing Law</h3>
        <p>
          These terms are governed by the laws of the Republic of Kenya. Any disputes
          shall be resolved through amicable negotiation or in the courts of Kenya.
        </p>

        <h3>Contact</h3>
        <p>
          For questions about these terms, contact us at aucxley@gmail.com or
          via WhatsApp at +254 796 606 363.
        </p>
      </>
    ),
  },
};

export default function LegalPage({ page, onBack }) {
  const data = pages[page];
  if (!data) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <a href="/" className={styles.backBtn} onClick={(e) => { e.preventDefault(); onBack(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </a>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.updated}>{data.updated}</p>
        </div>
        <div className={styles.content}>
          {data.body}
        </div>
      </div>
    </section>
  );
}
