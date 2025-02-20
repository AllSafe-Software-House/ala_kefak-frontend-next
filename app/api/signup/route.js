import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function POST(req) {
  const body = await req.json();
  console.log(body)
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      {
        status: 400,
      }
    );
  }

  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const userExists = db.users.find((user) => user.email === email);
  if (userExists) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
    });
  }

  const token = uuidv4();
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
    verifyCode: "222222",
    verified: false,
    acountType:null,
    token: token,
    image: "/images/user.jpg",
    skills: [],
    projects: [],
    badges: [],
    workExperience: [],
    education: [],
    certificates: [],
    templates: [],
    location:null,
    rating:null,
    about:{
      title:"Title",
      description:""
    },
    profileCompletion: {
      stepsCompleted: 0,
      totalSteps: 5
    },
  };

  db.users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

  return new Response(
    JSON.stringify({
      message: "User created successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    }),
    { status: 201 }
  );
}
