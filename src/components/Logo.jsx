// Tech / tool logos from src/assets/logos (Devicon, MIT · Simple Icons, CC0).
// Single-colour marks are drawn as a CSS mask in the current text colour so they work in both themes.
const files = import.meta.glob('../assets/logos/*.svg', { eager: true, query: '?url', import: 'default' });
const urls = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.match(/([\w-]+)\.svg$/)[1], url]));
const mono = new Set(['apple', 'linux', 'openai']);

export default function Logo({ name, className = 'size-5' }) {
  const url = urls[name];
  if (!url) return null;
  if (mono.has(name)) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 bg-current ${className}`}
        style={{ mask: `url("${url}") center / contain no-repeat`, WebkitMask: `url("${url}") center / contain no-repeat` }}
      />
    );
  }
  return <img src={url} alt="" aria-hidden="true" loading="lazy" className={`shrink-0 object-contain ${className}`} />;
}
