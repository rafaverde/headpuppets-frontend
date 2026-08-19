const GRAPHQL_URL =
  process.env.WORDPRESS_GRAPHQL_URL || 'http://admin.headpuppets:8888/graphql'

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{
    message: string
    path?: Array<string | number>
  }>
}

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate: 3600,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Erro HTTP ao consultar o Wordpress: ${response.status}`)
  }

  const result = (await response.json()) as GraphQLResponse<T>

  if (result.errors?.length) {
    throw new Error(result.errors.map(error => error.message).join(', '))
  }

  if (!result.data) {
    throw new Error('O WordPress não retornou dados')
  }

  return result.data
}
