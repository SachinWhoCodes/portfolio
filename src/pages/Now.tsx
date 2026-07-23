import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default function Now() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "home", path: "/" }, { label: "now" }]} />

      <article className="max-w-3xl page-fade-in">
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            What I'm Doing Now
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Last updated: July 2026 · Gwalior, India
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // building
          </h2>
          <div className="font-sans text-foreground/90 leading-relaxed space-y-4">
            <p>
              Currently at <strong className="text-foreground">TalkFever</strong> as a
              Full Stack Developer Intern, working on backend infrastructure for a
              social platform with 13.8M users. My main focus is the creator
              monetization system — payment pipelines with Razorpay, a double-entry
              ledger for wallet transactions, and a polymorphic content publishing
              model backed by PostgreSQL.
            </p>
            <p>
              On the side, continuing to ship developer tools through{" "}
              <strong className="text-foreground">Acadable Labs</strong>:
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="border border-border p-4">
              <div className="flex items-start gap-3">
                <span className="font-mono text-muted-foreground shrink-0">→</span>
                <div>
                  <span className="font-mono text-sm text-foreground">
                    QueryMesh
                  </span>
                  <span className="tech-tag ml-2">private alpha</span>
                  <p className="font-sans text-sm text-foreground/70 mt-1">
                    Wire-protocol proxy for Postgres that rewrites N+1 patterns into
                    JOINs and caches reads with row-level invalidation. Drop-in via
                    DATABASE_URL — no SDK, no ORM changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border p-4">
              <div className="flex items-start gap-3">
                <span className="font-mono text-muted-foreground shrink-0">→</span>
                <div>
                  <span className="font-mono text-sm text-foreground">
                    Assembly AI Lab
                  </span>
                  <span className="tech-tag ml-2">research</span>
                  <p className="font-sans text-sm text-foreground/70 mt-1">
                    Multi-agent constitutional deliberation platform. Orchestrates LLM
                    delegates through a deterministic five-phase workflow: clause
                    parsing, speaker election, debate, amendments, voting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // learning
          </h2>
          <div className="font-sans text-foreground/90 leading-relaxed space-y-4">
            <p>
              Diving deeper into PostgreSQL internals — wire protocol, query planning,
              and how proxies like PgBouncer and Supavisor work under the hood.
              QueryMesh is forcing me to understand Postgres at the TCP level, which
              is a very different perspective from writing SQL.
            </p>
            <p>
              Also exploring constitutional AI patterns for the Assembly AI Lab
              project, specifically how to make multi-agent deliberation deterministic
              and auditable rather than just "let the LLMs chat."
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // reading
          </h2>
          <ul className="space-y-2 font-sans text-foreground/90">
            <li className="flex">
              <span className="font-mono text-muted-foreground mr-3">→</span>
              <span>
                <em>Designing Data-Intensive Applications</em> by Martin Kleppmann
              </span>
            </li>
            <li className="flex">
              <span className="font-mono text-muted-foreground mr-3">→</span>
              <span>PostgreSQL 16 Internals (Postgres Pro documentation)</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // elsewhere
          </h2>
          <p className="font-sans text-foreground/90 leading-relaxed">
            Final year of BTech at MITS Gwalior. Wrapping up the SAGIT research
            paper. Maintaining LazyServe and PackShell on npm.
          </p>
        </section>
      </article>
    </Layout>
  );
}
