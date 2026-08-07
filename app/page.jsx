import data from '../content/data.json'

export const dynamic = 'force-static'

export default function Page() {
  const chunks = [...data.chunks].reverse()
  const done = chunks.filter((c) => c.text).length
  const generated = new Date(data.generatedAt).toLocaleTimeString('es-AR', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Buenos_Aires',
  })
  return (
    <main>
      <header>
        <h1>{data.session.title}</h1>
        <div className="meta">
          {data.session.topic} · {chunks.length} bloques capturados, {done} transcritos ·
          actualizado {generated} (hora AR) · se refresca solo cada 60 s ·{' '}
          <a href={data.session.youtube}>stream original</a>
        </div>
      </header>

      {data.summaryHtml && (
        <div className="summary" dangerouslySetInnerHTML={{ __html: data.summaryHtml }} />
      )}

      <h2 className="divider">Transcripción completa (más reciente arriba)</h2>
      {chunks.map((c) => (
        <section key={c.id}>
          <h2>
            {c.label} <span className="tag">{c.id}</span>
          </h2>
          {c.text ? (
            <p className="text">{c.text}</p>
          ) : (
            <p className="pending">⏳ transcribiendo…</p>
          )}
        </section>
      ))}
    </main>
  )
}
