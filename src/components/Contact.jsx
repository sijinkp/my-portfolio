import { useState } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, Send, Info } from 'lucide-react';
import { contact, profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters.';
  return e;
}

function ContactLink({ href, Icon, label, value }) {
  if (!href) {
    return (
      <li className="contact-link is-pending">
        <Icon size={18} aria-hidden="true" />
        <span className="contact-link__label">{label}</span>
        <span className="contact-link__value">Coming soon</span>
      </li>
    );
  }
  const external = href.startsWith('http');
  return (
    <li>
      <a className="contact-link" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        <Icon size={18} aria-hidden="true" />
        <span className="contact-link__label">{label}</span>
        <span className="contact-link__value">{value}</span>
        <ArrowUpRight size={16} aria-hidden="true" className="contact-link__arrow" />
        {external && <span className="visually-hidden">(opens in a new tab)</span>}
      </a>
    </li>
  );
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };
  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    // No backend is connected: hand the message to the visitor's email app, or copy it for LinkedIn.
    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    if (contact.email) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
      setStatus({ type: 'mail', text: 'Your email app should open with the message ready to send.' });
    } else {
      let copied = false;
      try {
        await navigator.clipboard.writeText(body);
        copied = true;
      } catch {
        /* clipboard unavailable */
      }
      setStatus({
        type: 'linkedin',
        text: `This form isn't connected to a mail service yet, so nothing was sent. ${
          copied ? 'Your message has been copied to the clipboard — ' : ''
        }please send it via LinkedIn.`,
      });
    }
  };

  const field = (name) => ({
    id: `cf-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    onBlur: blur(name),
    'aria-invalid': Boolean(touched[name] && errors[name]),
    'aria-describedby': touched[name] && errors[name] ? `cf-${name}-err` : undefined,
  });
  const err = (name) =>
    touched[name] && errors[name] ? (
      <span id={`cf-${name}-err`} className="field__error">{errors[name]}</span>
    ) : null;

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading index="06" kicker="Contact" id="contact-title" title={<>Let’s build something <em>useful.</em></>}>
          Whether it’s an enterprise system that needs a steady hand, an API that needs to connect things cleanly, or an
          idea about where AI fits in — I’d be glad to hear about it.
        </SectionHeading>

        <div className="contact">
          <div data-reveal>
            <ul className="contact-links">
              <ContactLink href={contact.email && `mailto:${contact.email}`} Icon={Mail} label="Email" value={contact.email} />
              <ContactLink href={contact.linkedin} Icon={Linkedin} label="LinkedIn" value="in/sijin-prakasan" />
              <ContactLink href={contact.github} Icon={Github} label="GitHub" value={contact.github.replace(/^https?:\/\/(www\.)?/, '')} />
            </ul>
            <p className="contact__closing">
              Thanks for stopping by — I’d genuinely like to hear what you’re working on.
              <span className="contact__sign">— {profile.firstName}</span>
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate data-reveal>
            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input type="text" autoComplete="name" {...field('name')} />
              {err('name')}
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input type="email" autoComplete="email" {...field('email')} />
              {err('email')}
            </div>
            <div className="field">
              <label htmlFor="cf-message">Message</label>
              <textarea rows={5} {...field('message')} />
              {err('message')}
            </div>
            <button type="submit" className="btn btn--primary">
              <Send size={15} aria-hidden="true" /> {contact.email ? 'Compose email' : 'Prepare message'}
            </button>
            <p className="form__note">
              <Info size={13} aria-hidden="true" /> No server is connected — this form doesn’t send messages by itself.
            </p>
            {status && (
              <p className="form__status" role="status">
                {status.text}{' '}
                {status.type === 'linkedin' && (
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">Open LinkedIn</a>
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
