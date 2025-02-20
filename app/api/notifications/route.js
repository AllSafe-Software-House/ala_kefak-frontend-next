import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");


export async function GET(req) {
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return new Response(
    JSON.stringify({ notifications: db.notifications }),
    { status: 200 }
  );
}
