import { cookies } from "next/headers";

export async function getData(endpoint) {
  const cookieStore = await cookies();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}${endpoint}`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) {
    throw new Error(`Không thể tải dữ liệu từ ${endpoint}`);
  }

  return res.json();
}
