"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";

type HeaderProps = {
  brand: string;
  subBrand: string;
};

export function Header({ brand, subBrand }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1280px] items-center justify-between rounded-[26px] border border-white/10 px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled ? "bg-[#0b1019]/94 shadow-soft backdrop-blur-xl" : "bg-[#0b1019]/75 backdrop-blur-md"
        )}
      >
        <Link href="/" className="group flex items-center gap-3">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070a12] shadow-glow">
            <Image
              src="/yandrixa-logo.png"
              alt="Yandrixa Smart Solutions logo"
              width={56}
              height={56}
              className="h-14 w-14 object-cover"
              priority
            />
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-white transition group-hover:text-brand-green">{brand}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">{subBrand}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href as Route}
                className={cn(
                  "text-sm font-medium transition hover:text-white",
                  active ? "text-white" : "text-brand-muted"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" variant="accent">Start a Project</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
            className="container-shell mt-3 lg:hidden"
          >
            <div className="surface-card p-5">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-base font-medium transition hover:bg-white/5 hover:text-white",
                      pathname === item.href ? "bg-white/5 text-white" : "text-brand-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button href="/contact" variant="accent" className="mt-4 w-full">
                Start a Project
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
