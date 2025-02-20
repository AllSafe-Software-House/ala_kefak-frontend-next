import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function GET(req, { params }) {
  const { id } = await params;
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const template = db.templates.find((template) => template.id === id);

  if (!template) {
    return new Response(
      JSON.stringify({ message: "template not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ template }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function PUT(req, { params }) {
  const { id } = params;
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const body = await req.json();

  const templateIndex = db.templates.findIndex((template) => template.id === id);

  if (templateIndex === -1) {
    return new Response(
      JSON.stringify({ message: "template not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  db.templates[templateIndex] = { ...db.templates[templateIndex], ...body };

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");

  return new Response(
    JSON.stringify({ message: "template updated successfully", template: db.templates[templateIndex] }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const updatedtemplates = db.templates.filter((template) => template.id !== id);

  if (updatedtemplates.length === db.templates.length) {
    return new Response(
      JSON.stringify({ message: "template not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  db.templates = updatedtemplates;

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");

  return new Response(
    JSON.stringify({ message: "template deleted successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
