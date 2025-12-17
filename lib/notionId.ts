/**
 * Normaliza IDs do Notion para o formato aceito pela API.
 *
 * Exemplos de entrada:
 *  - "091438f7-7173-47cd-a240-9e7bea28fff2"
 *  - "091438f7717347cda2409e7bea28fff2"
 *
 * Saída:
 *  - "091438f7717347cda2409e7bea28fff2"
 */
export function normalizeNotionId(rawId: string): string {
  if (!rawId) return rawId

  return rawId.trim().replace(/-/g, '')
}





