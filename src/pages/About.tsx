import { Layout } from "@/components/layout/Layout";
import { achievements, currently, education, stack } from "@/data/profile";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-sm font-medium">{title}</h2>
      {children}
    </section>
  );
}

export default function About() {
  return (
    <Layout back={{ to: "/", label: "Sachin Verma" }}>
      <h1 className="text-xl font-medium">About</h1>

      <Section title="Currently">
        <div className="space-y-3 leading-relaxed text-muted-foreground">
          {currently.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <p className="text-muted-foreground">{education.school}</p>
        <p className="mt-1 font-mono text-[0.8125rem] text-meta">
          {[education.degree, education.dates, education.grade].join(" · ")}
        </p>
      </Section>

      <Section title="Achievements">
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          {achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </Section>

      <Section title="Stack">
        <dl className="space-y-2">
          {Object.entries(stack).map(([group, values]) => (
            <div key={group} className="flex gap-4">
              <dt className="w-24 shrink-0 font-mono text-[0.8125rem] leading-6 text-meta">{group}</dt>
              <dd className="text-muted-foreground">{values.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </Layout>
  );
}
