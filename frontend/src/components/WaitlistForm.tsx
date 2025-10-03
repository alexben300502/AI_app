'use client'

import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

declare global {
  interface Window {
    plausible?: (event: string, options?: Record<string, unknown>) => void
  }
}


export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // UTM + referrer
  const [utm, setUtm] = useState({ source: '', medium: '', campaign: '' })
  const [referrer, setReferrer] = useState('')
  const [honeypot, setHoneypot] = useState('') // should stay empty

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUtm({
      source: params.get('utm_source') ?? '',
      medium: params.get('utm_medium') ?? '',
      campaign: params.get('utm_campaign') ?? '',
    })
    setReferrer(document.referrer || '')
  }, [])

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (honeypot) return // bot trap
    if (!isValidEmail(email)) {
      setError("Merci d'entrer un email valide.")
      return
    }

    setLoading(true)
    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert({
          email,
          referrer,
          utm_source: utm.source,
          utm_medium: utm.medium,
          utm_campaign: utm.campaign,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        })

      if (insertError) {
        // Gère l'unicité (email déjà inscrit)
        if (insertError.message?.toLowerCase().includes('duplicate')) {
          setSuccess(true)
          return
        }
        throw insertError
      }

      // Plausible event (si activé)
      if (window.plausible) {
        window.plausible('waitlist_submit', { props: { utm_source: utm.source || 'direct' } })
      }


      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError("Oups, une erreur est survenue. Réessaie dans un instant.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border p-4 bg-green-50 text-green-800">
        Merci ! 🎉 Tu es bien inscrit·e. On te prévient au lancement.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      {/* Honeypot anti-bot */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
      />
      <label htmlFor="email" className="sr-only">Ton email</label>
      <input
        id="email"
        type="email"
        placeholder="ton.email@ecole.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-xl border px-4 py-3"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl px-4 py-3 font-medium bg-black text-white hover:opacity-90 disabled:opacity-60"
      >
        {loading ? 'Inscription…' : "Rejoindre l'early access"}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <p className="text-xs text-gray-500">
        Pas de spam. Tu peux te désinscrire à tout moment.
      </p>
    </form>
  )
}
