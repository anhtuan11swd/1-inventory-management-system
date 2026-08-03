export async function getData(endpoint) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}${endpoint}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Không thể tải dữ liệu từ ${endpoint}`);
  }

  return res.json();
}
