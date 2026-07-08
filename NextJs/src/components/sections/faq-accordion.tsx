"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQAccordion({
  items
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <div key={item.question} className="surface-card overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="text-lg font-semibold text-white">{item.question}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-brand-green transition ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="border-t border-white/8 px-6 pb-6 pt-4 text-base leading-7 text-brand-muted">{item.answer}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
