import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-lg font-bold" style={{ color: 'var(--color-accent)' }}>GAVIO</h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Innovation au quotidien.<br />Produits tech selectionnes avec soin.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/cgv" className="text-sm transition-colors duration-200 hover:underline" style={{ color: 'var(--color-text-muted)' }}>Conditions Generales de Vente</Link></li>
              <li><Link href="/mentions" className="text-sm transition-colors duration-200 hover:underline" style={{ color: 'var(--color-text-muted)' }}>Mentions Legales</Link></li>
              <li><Link href="/politique" className="text-sm transition-colors duration-200 hover:underline" style={{ color: 'var(--color-text-muted)' }}>Politique de Confidentialite</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>Contact</h4>
            <a href="mailto:contact@gavio.fr" className="text-sm" style={{ color: 'var(--color-accent)' }}>contact@gavio.fr</a>
          </div>
        </div>
        <div className="mt-12 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            &copy; {new Date().getFullYear()} Gavio. Tous droits reserves.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Droit de retractation 14 jours
          </p>
        </div>
      </div>
    </footer>
  )
}
