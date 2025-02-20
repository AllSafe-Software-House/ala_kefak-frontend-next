import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function GET(req, { params }) {
  const { user : userId } =   params; 

  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = db.users.find((user) => user.id == userId);

  if (!user) {
    return new Response(
      JSON.stringify({ message: "User not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ user }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function PUT(request, { params }) {
  const { user : userId } =   params; 
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const body = await request.json();

  const userIndex = db.users.findIndex((user) => user.id == userId);

  if (userIndex === -1) {
    return new Response(
      JSON.stringify({ message: "User not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  db.users[userIndex] = { ...db.users[userIndex], ...body };

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");

  return new Response(
    JSON.stringify({ message: "User updated successfully", user: db.users[userIndex] }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function DELETE(request, { params }) {
  const { user : userId } =   params; 
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const updatedUsers = db.users.filter((user) => user.id !== userId);

  if (updatedUsers.length === db.users.length) {
    return new Response(
      JSON.stringify({ message: "User not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  db.users = updatedUsers;

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");

  return new Response(
    JSON.stringify({ message: "User deleted successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
