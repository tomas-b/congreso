import data from '../content/data.json'

export const dynamic = 'force-static'

const TYPE_LABEL = {
  nota: 'nota', procedimiento: 'procedimiento', privilegio: 'privilegio',
  informe: 'informe', discurso: 'discurso', incidente: 'incidente', votacion: 'votación',
}

const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString('es-AR', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Buenos_Aires',
  })

export default function Page() {
  const chunks = [...data.chunks].reverse()
  const timeline = [...(data.timeline || [])].reverse()
  const done = chunks.filter((c) => c.text).length
  const ctx = data.context || {}

  return (
    <main>
      <header className="masthead">
        <div className="kicker">
          <span className="live-dot" /> Senado de la Nación · sesión en vivo ·{' '}
          <a href={data.session.youtube}>stream</a>
        </div>
        <h1>Ley de Inviolabilidad de la <em>Propiedad Privada</em></h1>
        <div className="meta-row">
          {ctx.billId || 'PE-13/2026'} · {ctx.chamber || 'Senado'} · preside {ctx.presiding || '—'} ·
          actualizado {fmtTime(data.generatedAt)} hs · {done}/{chunks.length} bloques transcritos
        </div>
      </header>

      {data.status && (
        <section className="status">
          <div className="status-headline">{data.status.headline}</div>
          <p>{data.status.detail}</p>
          {data.votes?.length > 0 && (
            <div className="votes">
              {data.votes.map((v, i) => (
                <span key={i} className={`vote vote-${v.result}`}>
                  <b>{v.result === 'aprobada' ? '✓' : '✗'}</b> {v.name} <i>({v.tally})</i>
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="columns">
        <section className="timeline-col">
          <h2 className="rubric">Cronología <span>— lo más reciente arriba</span></h2>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={i} className={`tl-item stance-${t.stance || 'neutral'}`}>
                <div className="tl-time">{t.time}</div>
                <div className="tl-body">
                  <div className="tl-tags">
                    <span className={`badge badge-${t.type}`}>{TYPE_LABEL[t.type] || t.type}</span>
                    {t.speaker && <span className="speaker">{t.speaker}</span>}
                    {t.bloc && <span className="bloc">{t.bloc}</span>}
                  </div>
                  <div className="tl-title">{t.title}</div>
                  {t.detail && <p className="tl-detail">{t.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="side-col">
          {data.nextSteps && (
            <div className="panel">
              <h2 className="rubric">Cómo sigue</h2>
              <ol className="steps">
                {data.nextSteps.map((s, i) => (
                  <li key={i} className={`step step-${s.state}`}>{s.label}</li>
                ))}
              </ol>
            </div>
          )}
          {ctx.blocs && (
            <div className="panel">
              <h2 className="rubric">El recinto <span>— 72 bancas, quórum 37</span></h2>
              <div className="seatbar">
                {ctx.blocs.map((b, i) => (
                  <div key={i} className={`seg stance-bg-${b.stance}`}
                    style={{ width: `${(b.seats / 72) * 100}%` }} title={`${b.name}: ${b.seats}`} />
                ))}
                <div className="quorum-tick" style={{ left: `${(37 / 72) * 100}%` }} />
              </div>
              <ul className="bloc-list">
                {ctx.blocs.map((b, i) => (
                  <li key={i}><span className={`swatch stance-bg-${b.stance}`} />{b.name} <b>{b.seats}</b></li>
                ))}
              </ul>
            </div>
          )}
          {ctx.glossary && (
            <div className="panel">
              <h2 className="rubric">Glosario</h2>
              {ctx.glossary.map((g, i) => (
                <details key={i} className="gloss">
                  <summary>{g.term}</summary>
                  <p>{g.def}</p>
                </details>
              ))}
            </div>
          )}
        </aside>
      </div>

      {data.about && (
        <section className="about">
          <h2 className="rubric">La sesión</h2>
          <p dangerouslySetInnerHTML={{ __html: data.about }} />
        </section>
      )}

      <section className="transcripts">
        <h2 className="rubric">Transcripción completa <span>— por bloque, lo más reciente arriba</span></h2>
        {chunks.map((c) => (
          <details key={c.id} className="chunk">
            <summary>
              <span className="chunk-label">{c.label}</span>
              <span className="tag">{c.id}</span>
              {!c.text && <span className="pending">⏳ transcribiendo…</span>}
            </summary>
            {c.text && <p className="text">{c.text}</p>}
          </details>
        ))}
      </section>

      <footer>
        Transcripción automática (Whisper) del <a href={data.session.youtube}>stream oficial</a> —
        puede contener errores. Resumen curado durante la sesión.
      </footer>
    </main>
  )
}
