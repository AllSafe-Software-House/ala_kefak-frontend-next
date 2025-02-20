import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required" }),
      {
        status: 400,
      }
    );
  }

  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }

  if (!user.token) {
    user.token = uuidv4();
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
  }

  return new Response(
    JSON.stringify({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: user.token,
        image:user.image
      },
      token: user.token,
    }),
    { status: 200 }
  );
}
