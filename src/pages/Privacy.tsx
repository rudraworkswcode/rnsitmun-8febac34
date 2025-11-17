import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  const title = "Privacy Policy | RNSIT MUN";
  const description = "Read the RNSIT MUN Privacy Policy: how we collect, use, and protect your data.";
  const canonical = "https://rnsitmun.vercel.app/privacy";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description,
    url: canonical
  };

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <header className="bg-gradient-to-b from-background to-primary/5 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground font-inter">
            Privacy Policy
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <article className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2>Overview</h2>
            <p>
              This Privacy Policy explains how RNSIT MUN ("we", "us", "our") collects, uses,
              and protects personal information when you visit our website, register for events,
              or interact with our services. We are committed to safeguarding your privacy and
              being transparent about our practices.
            </p>
          </section>

          <section className="mb-10">
            <h2>Information We Collect</h2>
            <ul>
              <li>
                Contact information: name, email address, phone number, and affiliation, when you
                register for events or contact us.
              </li>
              <li>
                Usage data: pages visited, interactions, device and browser information, approximate
                location based on IP, collected via cookies and analytics.
              </li>
              <li>
                Media and content you submit (e.g., forms, applications, or feedback).
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To operate and improve the website and our events.</li>
              <li>To communicate about registrations, schedules, and updates.</li>
              <li>To personalize content and measure engagement.</li>
              <li>To comply with legal obligations and protect our community.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>Cookies and Analytics</h2>
            <p>
              We use cookies and similar technologies to remember preferences and analyze how our
              site is used. You can control cookies through your browser settings, though disabling
              them may impact features.
            </p>
          </section>

          <section className="mb-10">
            <h2>Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share limited data with trusted
              service providers (e.g., hosting, analytics) who process it on our behalf under
              confidentiality agreements, and with authorities if required by law.
            </p>
          </section>

          <section className="mb-10">
            <h2>Data Security</h2>
            <p>
              We apply reasonable technical and organizational measures to protect your data.
              However, no method of transmission or storage is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2>Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal information. To do
              so, contact us at <a href="mailto:mun@rnsit.ac.in">mun@rnsit.ac.in</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2>Third-Party Links</h2>
            <p>
              Our site may link to external websites. We are not responsible for their content or
              privacy practices.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              For questions about this Privacy Policy, contact us at
              <a className="ml-1" href="mailto:mun@rnsit.ac.in">mun@rnsit.ac.in</a>.
            </p>
          </section>
        </article>
      </main>
    </Layout>
  );
};

export default Privacy;
