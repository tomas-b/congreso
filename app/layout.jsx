export const metadata = {
  title: 'Sesión Congreso — transcripción en vivo',
  description: 'Transcripción y resumen en vivo de la sesión del Senado argentino',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="refresh" content="60" />
      </head>
      <body>{children}</body>
    </html>
  )
}
