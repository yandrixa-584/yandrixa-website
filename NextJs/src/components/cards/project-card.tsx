import { Badge } from "@/components/ui/badge";
import type { ProjectEntry } from "@/types/content";

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <article className="surface-card flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{project.category}</Badge>
        <Badge className="border-brand-green/20 bg-brand-green/8 text-brand-green">{project.status}</Badge>
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-base leading-7">{project.summary}</p>
      <div className="mt-6 space-y-4 text-sm text-brand-muted">
        <div>
          <p className="font-semibold uppercase tracking-[0.18em] text-white/80">Business challenge</p>
          <p className="mt-2">{project.challenge}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.18em] text-white/80">Solution direction</p>
          <p className="mt-2">{project.solution}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-brand-muted">
            {item}
          </span>
        ))}
      </div>
      {project.externalUrl ? (
        <a href={project.externalUrl} target="_blank" rel="noreferrer" className="mt-6 text-sm font-semibold text-brand-green">
          View external reference
        </a>
      ) : null}
    </article>
  );
}
