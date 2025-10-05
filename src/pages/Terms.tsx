import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  const title = "Terms of Service | RNSIT MUN";
  const description = "Read the RNSIT MUN Terms of Service governing use of our website and events.";
  const canonical = "https://rnsitmun.vercel.app/terms";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
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
            Terms of Service
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <article className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using the RNSIT MUN website and services, you agree to be bound by
              these Terms. If you do not agree, please discontinue use.
            </p>
          </section>

          <section className="mb-10">
            <h2>Use of Website and Events</h2>
            <ul>
              <li>Use the site and services only for lawful purposes and in a respectful manner.</li>
              <li>Do not attempt to disrupt, interfere, or gain unauthorized access to systems.</li>
              <li>Respect intellectual property rights and content usage guidelines.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>Accounts and Registrations</h2>
            <p>
              When registering for events, provide accurate information. You are responsible for
              safeguarding your information and informing us of any unauthorized use.
            </p>
          </section>

          <section className="mb-10">
            <h2>Registration and Payment Terms</h2>
            <ul>
              <li>Once registration and payment are completed, the amount is non-refundable under normal circumstances.</li>
              <li>Refunds will only be considered if the event is officially cancelled by the management or if a verified issue occurs during the registration process.</li>
              <li>Participants are responsible for ensuring accurate information during registration; any discrepancies must be reported immediately.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>Content</h2>
            <p>
              Content on this site is owned by RNSIT MUN or its licensors and is protected by
              applicable laws. You may not reproduce or distribute content without permission.
            </p>
          </section>

          <section className="mb-10">
            <h2>Disclaimers</h2>
            <p>
              The site and services are provided "as is" without warranties of any kind. We do not
              guarantee uninterrupted or error-free operation.
            </p>
          </section>

          <section className="mb-10">
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, RNSIT MUN shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of the site or
              participation in events.
            </p>
          </section>

          <section className="mb-10">
            <h2>Changes to These Terms</h2>
            <p>
              We may modify these Terms at any time. Continued use after updates constitutes your
              acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these Terms? Contact us at
              <a className="ml-1" href="mailto:mun@rnsit.ac.in">mun@rnsit.ac.in</a>.
            </p>
          </section>
        </article>
      </main>
    </Layout>
  );
};

export default Terms;
