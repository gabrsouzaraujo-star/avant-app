/**
 * Dados estruturados (schema.org) da pagina.
 *
 * O `<` e escapado para que nenhum texto de conteudo consiga fechar a tag
 * <script> antes da hora.
 */
export function JsonLd({ dados }: { dados: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, "\\u003c"),
      }}
    />
  );
}
