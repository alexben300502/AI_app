import WaitlistForm from '@/components/WaitlistForm'
import VideoEmbed from '@/components/VideoEmbed'

export const metadata = {
  title: 'AI Interview Coach — Prépare tes entretiens avec l’IA',
  description: 'Simulations réalistes, feedback structuré (méthode STAR), et rapport. Rejoins la waitlist.',
  openGraph: {
    title: 'AI Interview Coach',
    description: 'Simulations + feedback IA',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="font-semibold">AI Interview Coach</div>
        <a href="#waitlist" className="rounded-xl border px-4 py-2">Essai gratuit</a>
      </header>

      {/* Hero */}
      <section className="px-4">
        <div className="max-w-5xl mx-auto text-center py-16 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Prépare tes entretiens <span className="whitespace-nowrap">avec l’IA</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simulations réalistes (texte/audio) et feedback actionnable basé sur la méthode STAR.
          </p>
          <div id="waitlist" className="pt-2">
            <WaitlistForm />
          </div>
          <p className="text-xs text-gray-500">Aucune carte requise. On t’écrit au lancement.</p>
        </div>
      </section>

      {/* Demo */}
      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold">Voir la démo (2 min)</h2>
          <VideoEmbed />
        </div>
      </section>

      {/* Bénéfices */}
      <section className="px-4 py-14">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8">Pourquoi c’est mieux que de réviser seul ?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Simulation réaliste', desc: 'Questions adaptées au poste. Réponds à l’écrit ou à l’oral.' },
              { title: 'Feedback structuré', desc: 'Méthode STAR : pertinence, structure, impact, langage.' },
              { title: 'Rapport & suivi', desc: 'Score et axes d’amélioration à chaque session.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border p-6 bg-white">
                <h4 className="font-semibold mb-1">{c.title}</h4>
                <p className="text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8">Comment ça marche</h3>
          <ol className="grid md:grid-cols-3 gap-6 list-decimal list-inside">
            <li className="rounded-2xl border p-6 bg-white">
              Choisis ton job cible (ex. conseil, marketing, data).
            </li>
            <li className="rounded-2xl border p-6 bg-white">
              Réponds aux questions (texte ou audio).
            </li>
            <li className="rounded-2xl border p-6 bg-white">
              Reçois un feedback actionnable et un score.
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-xl font-semibold">FAQ</h3>
          <details className="rounded-xl border p-4">
            <summary className="font-medium cursor-pointer">Combien ça coûte ?</summary>
            <p className="text-gray-600 mt-2">Au lancement : freemium, puis 19€/mois pour les fonctionnalités avancées.</p>
          </details>
          <details className="rounded-xl border p-4">
            <summary className="font-medium cursor-pointer">Mes données sont-elles protégées ?</summary>
            <p className="text-gray-600 mt-2">Oui. Pas de partage à des tiers, et suppression sur demande.</p>
          </details>
          <details className="rounded-xl border p-4">
            <summary className="font-medium cursor-pointer">Quelles langues ?</summary>
            <p className="text-gray-600 mt-2">Français et anglais pour commencer.</p>
          </details>
        </div>
      </section>

      <footer className="px-4 py-10 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <span>© {new Date().getFullYear()} AI Interview Coach</span>
          <a className="text-gray-600 underline" href="/privacy">Politique de confidentialité</a>
        </div>
      </footer>
    </main>
  )
}
