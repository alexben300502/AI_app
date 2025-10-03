export default function VideoEmbed() {
  // Remplace l'URL par ton lien Loom "embed"
  const url = 'https://www.loom.com/embed/<YOUR-VIDEO-ID>'
  return (
    <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow">
      <iframe
        src={url}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        title="Demo"
      />
    </div>
  )
}
