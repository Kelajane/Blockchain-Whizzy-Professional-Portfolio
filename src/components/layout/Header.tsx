import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems, personalInfo } from '../../data/portfolio';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-white uppercase">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs text-slate-100">
            DA
          </span>
          <span className="hidden sm:inline">{personalInfo.shortName}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
          >
            Resume
            <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-200 md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-slate-950"
            >
              View Resume
              <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
