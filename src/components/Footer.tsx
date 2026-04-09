import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-brand-700">GAVIO</h3>
            <p className="mt-2 text-sm text-gray-500">
              Innovation au quotidien. Produits tech selectionnes avec soin.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Informations</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/cgv" className="text-sm text-gray-500 hover:text-gray-900 transition">Conditions Generales de Vente</Link></li>
              <li><Link href="/mentions" className="text-sm text-gray-500 hover:text-gray-900 transition">Mentions Legales</Link></li>
              <li><Link href="/politique" className="text-sm text-gray-500 hover:text-gray-900 transition">Politique de Confidentialite</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="mailto:contact@gavio.fr" className="text-sm text-gray-500 hover:text-gray-900 transition">contact@gavio.fr</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Gavio. Tous droits reserves. Droit de retractation 14 jours.
          </p>
        </div>
      </div>
    </footer>
  )
}
