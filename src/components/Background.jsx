// Fixed aurora of blurred colour blobs — the coloured light the glass panels refract.
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-blob top-[-12%] left-[-10%] h-[55vmax] w-[55vmax]" style={{ background: 'var(--blob-1)' }} />
      <div
        className="aurora-blob top-[8%] right-[-18%] h-[45vmax] w-[45vmax]"
        style={{ background: 'var(--blob-2)', animationDelay: '-8s', animationDuration: '32s' }}
      />
      <div
        className="aurora-blob bottom-[-20%] left-[15%] h-[50vmax] w-[50vmax]"
        style={{ background: 'var(--blob-3)', animationDelay: '-14s', animationDuration: '30s' }}
      />
      <div
        className="aurora-blob right-[10%] bottom-[5%] h-[28vmax] w-[28vmax]"
        style={{ background: 'var(--blob-4)', animationDelay: '-4s', animationDuration: '22s', opacity: 'calc(var(--blob-opacity) * 0.6)' }}
      />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
