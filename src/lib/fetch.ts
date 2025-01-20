interface CommonResponse<T> {
  success: boolean;
  error: string;
  data: T;
}

async function nzFetcher<T>(path: string): Promise<T> {
  const response = await fetch(path, { method: "GET" });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const responseData: CommonResponse<T> = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }

  return responseData.data;
}

export async function swrFetcher<T>(
  input: string | URL | globalThis.Request,
  _?: RequestInit,
) {
  return nzFetcher<T>(input.toString());
}
