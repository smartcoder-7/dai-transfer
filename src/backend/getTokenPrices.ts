export async function backendGetTokenPrices({
  baseUrl,
  query,
}: {
  baseUrl: string;
  query: Record<string, string>;
}) {
  const headers: Record<string, string> = {};
  headers['Content-Type'] = 'application/json';
  const searchParams = new URLSearchParams(query).toString();
  const apiUrl = baseUrl + (searchParams ? `?${searchParams}` : '');

  const data = await fetch(apiUrl, {
    headers,
    method: 'get',
  });
  const response = await data.json();

  return response;
}
