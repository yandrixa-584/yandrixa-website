export function FormStatus({
  state,
  message
}: {
  state: "idle" | "success" | "error";
  message?: string;
}) {
  if (!message || state === "idle") {
    return null;
  }

  return (
    <div
      className={`fixed right-4 top-24 z-[90] max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur md:right-6 ${
        state === "success"
          ? "border-emerald-300 bg-emerald-50/95 text-emerald-800"
          : "border-rose-300 bg-rose-50/95 text-rose-800"
      }`}
      role={state === "error" ? "alert" : "status"}
      aria-live={state === "error" ? "assertive" : "polite"}
    >
      {message}
    </div>
  );
}
