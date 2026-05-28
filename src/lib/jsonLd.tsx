export function JsonLd({ data }: { data: object }) {
  // Escape "<" zodat een waarde met "</script>" niet uit de script-tag kan breken.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
