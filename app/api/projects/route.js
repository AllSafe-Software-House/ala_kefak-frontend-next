import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(process.cwd(), "db.json");

export async function GET(req) {
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const projects = db.projects;

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const isRecent = url.searchParams.get("key") === "recent";
  const limit = 10;

  const sortedProjects = isRecent
    ? projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : projects;

  const pagesCount = Math.ceil(sortedProjects.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProjects = sortedProjects.slice(startIndex, endIndex);

  return new Response(
    JSON.stringify({
      projects: paginatedProjects,
      pagesCount: pagesCount,
      currentPage: page,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req) {
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const body = await req.json();

  const newProject = {
    id: uuidv4(),
    ...body,
  };

  db.projects.push(newProject);

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");

  return new Response(
    JSON.stringify({
      message: "Project added successfully",
      project: newProject,
    }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
}
