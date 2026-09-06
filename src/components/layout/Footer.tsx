import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolio';

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  x: ({ size, ...props }: any) => <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}><path d="M18.901 2H21.5l-6.97 7.98L22.7 22h-6.54l-5.13-7.44L5.47 22H2.87l7.46-8.53L1.3 2h6.7l4.64 6.88L18.9 2Zm-1.15 18h1.81L7.42 3.9H5.5L17.75 20Z" /></svg>,
  mail: Mail,
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">{personalInfo.shortName}</p>
            <p className="mt-2 max-w-md text-sm text-slate-300">Frontend-focused product builder crafting clean, reliable experiences for the web.</p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={link.platform}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white">
            Back to top
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
