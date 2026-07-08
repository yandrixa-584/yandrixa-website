export function ProcessTimeline({
  steps
}: {
  steps: Array<{ title: string; description: string }>;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-5">
      {steps.map((step, index) => (
        <div key={step.title} className="relative surface-card p-6">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-purple/18 text-lg font-semibold text-brand-green">
            {index + 1}
          </div>
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
          <p className="mt-3 text-base leading-7">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
