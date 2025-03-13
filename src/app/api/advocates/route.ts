import { Advocate } from "@/types";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { type NextRequest } from "next/server";
import { count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageSize = searchParams.get("pageSize")
    ? Number.parseInt(searchParams.get("pageSize") as string, 10)
    : 10;
  const pageNumber = searchParams.get("pageNumber")
    ? Number.parseInt(searchParams.get("pageNumber") as string, 10)
    : 1;

  const dataCountResult = await db.select({ count: count() }).from(advocates);

  const data = await db
    .select()
    .from(advocates)
    .limit(pageSize)
    .offset((pageNumber - 1) * pageSize);

  return Response.json({ data, count: dataCountResult[0].count });
}
