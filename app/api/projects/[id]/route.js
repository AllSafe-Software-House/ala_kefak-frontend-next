import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function GET(req, { params }) {
  const { id : projectId } =   params; 

  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const project = db.projects.find((project) => project.id == projectId);
console.log("project id " ,projectId)
  if (!project) {
    return new Response(
      JSON.stringify({ message: "project not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ project }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}


export async function PUT(req, { params }) {
  const { id } = params;
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const body = await req.json();

  const projectIndex = db.projects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    return new Response(
      JSON.stringify({ message: "Project not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  db.projects[projectIndex] = { ...db.projects[projectIndex], ...body };

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");

  return new Response(
    JSON.stringify({ message: "Project updated successfully", project: db.projects[projectIndex] }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const updatedProjects = db.projects.filter((project) => project.id !== id);

  if (updatedProjects.length === db.projects.length) {
    return new Response(
      JSON.stringify({ message: "Project not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  db.projects = updatedProjects;

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");

  return new Response(
    JSON.stringify({ message: "Project deleted successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
