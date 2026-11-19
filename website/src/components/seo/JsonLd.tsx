type Json = Record<string, unknown>;

/**
 * Server-rendered JSON-LD. `<` is escaped so content can never close the
 * script tag early (prevents injection if a string ever contains "</script>").
 */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
