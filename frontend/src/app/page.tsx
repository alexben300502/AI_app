export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">AI Interview Coach</h1>
        <p className="text-gray-600">
          Front en ligne  — connecté à Vercel. Backend healthcheck ci-dessous :
        </p>
        <HealthCheck />
      </div>
    </main>
  )
}

async function HealthCheck() {
  // pointe vers le backend plus tard via variable d'environnement
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiUrl}/health`, { cache: "no-store" });
    const data = await res.json();
    return <pre className="text-left bg-gray-100 p-3 rounded">{JSON.stringify(data, null, 2)}</pre>
  } catch (e) {
    return <p className="text-red-600">Backend non joignable (config NEXT_PUBLIC_API_URL manquante ?)</p>
  }
}
