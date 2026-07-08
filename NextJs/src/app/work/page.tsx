import { EmptyState } from "@/components/ui/empty-state";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectCard } from "@/components/cards/project-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Selected Capabilities",
    description: "Browse selected capabilities and solution directions Yandrixa can build across software, operations, and digital growth.",
    path: "/work"
  });
}

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected capabilities"
        title="Capability examples that show what Yandrixa can build"
        description="Until verified project references are available, this page presents selected capabilities clearly instead of making unsupported client claims."
        badges={["Capability examples", "Concept demonstrations", "Internal products"]}
      />
      <section className="section-space pt-0">
        <div className="container-shell">
          {projects.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Capability entries can be added here"
              description="Update `src/content/projects.ts` with verified project references, internal products, or concept demonstrations before presenting this page publicly."
              cta={{ label: "View services", href: "/services" }}
            />
          )}
        </div>
      </section>
      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title="Need a solution similar to one of these capability areas?"
            description="Yandrixa can scope the right combination of technology, workflow design, and delivery support around your business requirement."
            primaryCta={{ label: "Discuss your project", href: "/contact" }}
          />
        </div>
      </section>
    </>
  );
}
