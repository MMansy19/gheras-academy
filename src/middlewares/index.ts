import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => Response | NextResponse | Promise<Response | NextResponse>;

export type MiddlewareFactory = (next: CustomMiddleware) => CustomMiddleware;

function defaultMiddleware(
  _request: NextRequest,
  _event: NextFetchEvent,
  response: NextResponse,
) {
  return response;
}

export function chain(
  factories: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const factory = factories[index];

  if (!factory) {
    return defaultMiddleware;
  }

  const next = chain(factories, index + 1);
  return factory(next);
}
