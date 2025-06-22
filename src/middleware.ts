import { getCookie } from "cookies-next/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PathEnum } from "./shared/enums";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const accessToken = await getCookie("accessToken", { res, req });

  if (!accessToken) {
    return NextResponse.redirect(new URL(PathEnum.LOGIN, req.url));
  }

  return res;
}

export const config = {
  matcher: ["/"],
};
