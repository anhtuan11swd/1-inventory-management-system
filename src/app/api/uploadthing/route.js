import { createRouteHandler } from "uploadthing/next";
import { requireAuth } from "@/lib/requireAuth";

import { ourFileRouter } from "./core";

const uploadHandler = createRouteHandler({
  router: ourFileRouter,
});

export async function GET(request) {
  const unauthorized = await requireAuth();

  if (unauthorized) {
    return unauthorized;
  }

  return uploadHandler.GET(request);
}

export async function POST(request) {
  const unauthorized = await requireAuth();

  if (unauthorized) {
    return unauthorized;
  }

  return uploadHandler.POST(request);
}
