export function Footer({ name }: { name: string }) {
  return (
    <footer className="w-full bg-surface-container-lowest mt-auto border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-margin py-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-text-primary tracking-tight">{name}</span>
          <span className="font-label-nav text-label-nav text-on-surface-variant uppercase tracking-widest">
            — BSIT Portfolio
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-right">
          © {new Date().getFullYear()} {name}. Built with precision and cyber-romantic minimalism.
        </p>
      </div>
    </footer>
  )
}
