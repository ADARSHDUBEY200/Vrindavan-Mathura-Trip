export function CMSLoading({ label = "Loading…", fullScreen = false }: { label?: string; fullScreen?: boolean }) {
  return (
    <div className={`grid place-items-center ${fullScreen ? "min-h-dvh bg-[#040421]" : "py-24"}`} role="status">
      <div className="flex flex-col items-center gap-4">
        <span className="size-10 animate-spin rounded-full border-4 border-white/10 border-t-sky-500" />
        <span className="text-sm text-white/60">{label}</span>
      </div>
    </div>
  );
}
