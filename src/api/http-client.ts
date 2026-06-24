const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'

/**
 * Função genérica para buscar dados do Strapi.
 * O <T> permite que o TypeScript injete as interfaces que acabamos de criar.
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Configuração padrão para todas as requisições
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options, // Permite sobrescrever opções (como cache) depois
  }

  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, defaultOptions)

    if (!response.ok) {
      console.log(`[API Error]: ${response.status} - ${response.statusText}`)
      throw new Error(`Falha ao buscar dados no Strapi na rota: ${endpoint}`)
    }

    // Retorna dados tipados
    const data = await response.json()
    return data as T
  } catch (err) {
    // Trata erros desconhecidos
    console.error('[Fetch exception]:', err)
    throw err
  }
}
