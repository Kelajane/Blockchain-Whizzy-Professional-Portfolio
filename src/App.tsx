import { ArrowRight, BriefcaseBusiness, Code2, Download, Github, Linkedin, Mail, MapPin, Sparkles, Star, CheckCircle2 } from 'lucide-react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Button } from './components/ui/Button';
import { SectionHeading } from './components/ui/SectionHeading';
import { capabilities, journey, personalInfo, projects, skillGroups, socialLinks } from './data/portfolio';

function App() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-slate-200 selection:text-slate-950">
      <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.16),_transparent_55%)]" />

      <Header />

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {personalInfo.availability}
              </div>

              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {personalInfo.headline}
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 md:text-lg">
                {personalInfo.summary}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                >
                  View work
                  <ArrowRight size={16} />
                </a>

                <a
                  href={personalInfo.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} />
                  {personalInfo.location}
                </span>
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
                  <Mail size={15} />
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-slate-700/30 via-slate-900 to-slate-950 blur-2xl" />
              <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40">
                <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400">portfolio</span>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">role</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{personalInfo.title}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">focus</p>
                      <p className="mt-3 flex items-center gap-2 text-lg font-medium text-white">
                        <Code2 size={18} /> Frontend
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">specialty</p>
                      <p className="mt-3 flex items-center gap-2 text-lg font-medium text-white">
                        <Sparkles size={18} /> Product UI
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">strength</p>
                      <Star className="text-amber-300" size={16} />
                    </div>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
                        Responsive, accessible interfaces
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
                        Clean design systems and implementation
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
                        Thoughtful product decision-making
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="Building digital experiences with clear thinking and craft."
            description="I blend interface design, frontend engineering, and product logic to create work that feels direct, confident, and easy to use."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
              <p className="text-lg leading-8 text-slate-200">
                I’m David Anthony, a frontend developer and digital product-minded builder focused on creating thoughtful user experiences. My work sits at the intersection of clear design decisions, strong interfaces, and practical engineering.
              </p>
              <p className="mt-5 text-base leading-7 text-slate-300">
                I enjoy solving product problems in ways that are polished and accessible, whether that means shaping layout and interaction patterns, turning concepts into production-ready interfaces, or improving a user journey with better clarity and flow.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">What I care about</p>
              <ul className="mt-5 space-y-4 text-base text-slate-200">
                {[
                  'Clear user experience',
                  'Strong frontend fundamentals',
                  'Design systems and consistency',
                  'Meaningful product decisions',
                  'Simple communication with technical depth',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Skills"
            title="I work across design, frontend engineering, and product thinking."
            description="The stack below reflects the areas I’m strongest in and the tools I use to bring product work to life."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.category} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{group.category}</p>
                <ul className="mt-5 space-y-3 text-sm text-slate-200">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work that demonstrates clarity, craft, and product thinking."
            description="I focus on projects that combine decision-making, visual quality, and practical implementation."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className={`group overflow-hidden rounded-[1.75rem] border ${
                  project.featured ? 'border-slate-600 bg-slate-900' : 'border-slate-800 bg-slate-900/70'
                } transition hover:-translate-y-1 hover:border-slate-600`}
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {project.featured ? (
                      <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{project.description}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-400">{project.impact}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a href={project.href} className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-slate-200">
                      Live project
                      <ArrowRight size={15} />
                    </a>
                    <a href={project.repo} className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white">
                      Source
                      <Github size={15} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Journey"
            title="A practical path shaped by product thinking and technical depth."
            description="The work and learning behind my approach is grounded in building interfaces that are usable, scalable, and easy to trust."
          />

          <div className="mt-10 space-y-5">
            {journey.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{item.period}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <span className="inline-flex rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
                    {item.company}
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-base leading-7 text-slate-300">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="I help build interfaces that are useful, confident, and responsive."
            description="This is the practical range of work I’m best positioned to support."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-slate-200">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950">
                  <BriefcaseBusiness size={16} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 md:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Resume</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Professionals can review my background in full.
                </h2>
              </div>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
              >
                View resume
                <Download size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something clear, useful, and durable."
            description="I’m open to meaningful frontend and product work, collaborations, and thoughtful conversations."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 md:p-8">
              <div className="space-y-5 text-slate-200">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-600"
                >
                  <Mail size={18} className="text-slate-100" />
                  <span>{personalInfo.email}</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-600"
                >
                  <Linkedin size={18} className="text-slate-100" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-600"
                >
                  <Github size={18} className="text-slate-100" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 md:p-8">
              <p className="text-sm leading-7 text-slate-300">
                If you’re looking for a developer who values clarity, product thinking, and a polished execution style, I’d be glad to hear about the work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
