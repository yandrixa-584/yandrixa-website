"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Testimonial } from "@/content/testimonials";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const accentClasses: Record<Testimonial["accent"], string> = {
  purple: "from-brand-purple/70 to-fuchsia-400/40 text-fuchsia-100",
  green: "from-brand-green/60 to-emerald-400/35 text-lime-950",
  blue: "from-sky-500/60 to-cyan-400/35 text-sky-50",
  amber: "from-amber-400/70 to-orange-400/35 text-amber-950"
};

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="testimonial-card mx-3 flex w-[300px] shrink-0 flex-col rounded-[26px] border border-white/10 bg-[#141928]/90 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:bg-[#1a2031] sm:w-[340px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-semibold shadow-[0_14px_30px_rgba(0,0,0,0.24)]",
              accentClasses[item.accent]
            )}
          >
            {item.initials}
          </div>
          <div>
            <p className="text-base font-semibold text-white">{item.name}</p>
            <p className="text-sm text-brand-muted">
              {item.role} • {item.company}
            </p>
          </div>
        </div>
        <Quote className="h-5 w-5 text-brand-green/70" />
      </div>
      <div className="mt-4 flex gap-1 text-brand-green">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-base leading-7 text-brand-muted">{item.feedback}</p>
    </article>
  );
}

export function TestimonialsMarquee({ items }: { items: Testimonial[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const loopItems = [...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let frameId = 0;

    const step = () => {
      if (!paused) {
        const halfway = container.scrollWidth / 2;
        container.scrollLeft += 0.55;

        if (container.scrollLeft >= halfway) {
          container.scrollLeft = 0;
        }
      }

      frameId = window.requestAnimationFrame(step);
    };

    frameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frameId);
  }, [paused]);

  const moveBy = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    setPaused(true);
    container.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth"
    });
  };

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Client feedback"
            title="What clients say about working with Yandrixa"
            description="A few words from business owners, founders, and teams who value clear communication, practical solutions, and reliable delivery."
          />
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" className="h-12 w-12 px-0" onClick={() => moveBy("left")}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button type="button" variant="accent" className="h-12 w-12 px-0" onClick={() => moveBy("right")}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="testimonial-scroll mt-12 overflow-hidden rounded-[30px] border border-white/8 bg-white/5 py-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex w-max">
            {loopItems.map((item, index) => (
              <TestimonialCard key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
