import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const id = searchParams.get("id");

  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  let user;

  if (id) {
    console.log("id is",id)
    user = db.users.find((u) => u.id == id);
  } else if (email) {
    console.log(id)
    user = db.users.find((u) => u.email == email);
  }

  if (!user) {
    return new Response(
      JSON.stringify({ message: "User not found" }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({ user }),
    { status: 200 }
  );
}
