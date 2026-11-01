import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { contact, profile } from '../data/content.js';
import Reveal from './Reveal.jsx';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const links = [
    { icon: Linkedin, label: 'LinkedIn', value: 'in/sijin-prakasan', href: contact.linkedin, external: true },
    contact.phone && { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Download, label: 'Résumé', value: 'Download PDF', href: profile.cvUrl, download: true },
    { icon: MapPin, label: 'Location', value: profile.location },
  ].filter(Boolean);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="glass glow-border relative overflow-hidden rounded-[2.5rem] p-7 sm:p-12 md:p-16">
        <div aria-hidden="true" className="absolute -top-32 -right-24 size-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-24 size-80 rounded-full bg-indigo-500/30 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">Contact</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Let’s build something <span className="text-gradient">that lasts.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Hiring, collaborating, or just want to talk .NET? My inbox is open.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-medium text-white shadow-[0_10px_30px_-10px_rgb(129_140_248/0.8)] transition-transform hover:scale-[1.03]"
              >
                <Mail size={18} />
                Email me
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                <span aria-live="polite">{copied ? 'Copied!' : contact.email}</span>
              </button>
            </div>
          </div>

          <ul className="grid gap-3">
            {links.map(({ icon: Icon, label, value, href, external, download }) => {
              const body = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--glass-strong)] text-accent ring-1 ring-[var(--glass-border)]">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs tracking-[0.12em] text-subtle uppercase">{label}</span>
                    <span className="block truncate font-medium">{value}</span>
                  </span>
                  {href && <ArrowUpRight size={18} className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />}
                </>
              );
              const cls = 'glass glass-hover group flex items-center gap-4 rounded-2xl p-4';
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className={cls}
                      {...(external && { target: '_blank', rel: 'noreferrer' })}
                      {...(download && { download: 'Sijin-Prakasan-CV.pdf' })}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
