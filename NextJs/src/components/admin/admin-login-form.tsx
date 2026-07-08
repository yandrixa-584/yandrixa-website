export function AdminLoginForm({ error }: { error?: string }) {
  return (
    <form action="/api/admin/login" method="post" className="surface-card mx-auto max-w-lg space-y-5 p-8">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
          Admin email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35"
          placeholder="Enter superadmin email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35"
          placeholder="Enter admin password"
          required
        />
      </div>
      {error ? <p className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-green px-5 py-3 font-semibold text-brand-dark transition hover:brightness-110"
      >
        Login to admin
      </button>
    </form>
  );
}
