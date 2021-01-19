export const fetcher = async (url: string, ...opts: any) => {
  const response = await fetch(url, ...opts);
  const data = await response.json();

  return data;
};
