export default async function getQuote() {
  const response = await fetch("/api/quote");

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  return response.json();
}
